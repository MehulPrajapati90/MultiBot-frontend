import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { BsFillSendFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import axiosClient from '../utils/axiosClient.js';
import { logoutUser } from "../utils/authSlice.js"
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";

const Chat = () => {
  const [behave, setBehave] = useState("general");
  const [userMessage, setUserMessage] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [currentChatHistory, setCurrentChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [log, setLog] = useState(false);
  const [open, Setopen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading, user } = useSelector((state) => state.auth);

  // console.log(user)

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const logDestruct = () => {
    const timeOut = setTimeout(() => {
      setLog(false);
      logout();
      navigate('/');
    }, 3000)

    return () => clearTimeout(timeOut);
  }

  // Handle logout
  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  }

  // Fetch all chat windows
  const fetchAllChats = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get("/api/v1/chat/getallchat");
      setAllChats(response.data.message || []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages for specific chat
  const fetchChatMessages = async (behavior) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get("/api/v1/chat/getchat", {
        params: { behaviour: behavior }
      });
      setCurrentChatHistory(response.data.message?.chatHistory || []);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new chat window
  const createNewChat = async (behavior) => {
    try {
      setIsLoading(true);
      await axiosClient.post("/api/v1/chat/room/continue", {
        behaviour: behavior
      });
      await fetchAllChats(); // Refresh chat list
      return true;
    } catch (error) {
      console.error("Error creating chat:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle behavior selection
  const handleBehaviorChange = async (behavior) => {
    // Check if chat exists
    const chatExists = allChats.some(chat => chat.behaviour === behavior);

    if (!chatExists) {
      const created = await createNewChat(behavior);
      if (!created) return;
    }

    setBehave(behavior);
    await fetchChatMessages(behavior);
  };

  // Send message
  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    try {
      setIsLoading(true);

      await axiosClient.post('/api/v1/chat/room/continue', {
        chatMessage: userMessage,
        behaviour: behave
      });

      setUserMessage("");
      await fetchChatMessages(behave); // Refresh messages
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete chat window
  const deleteChat = async () => {
    try {
      setIsLoading(true);
      await axiosClient.delete("/api/v1/chat/deletechat", {
        data: { behaviour: behave }
      });
      setBehave("general"); // Reset to default
      await Promise.all([fetchAllChats(), fetchChatMessages("general")]);
    } catch (error) {
      console.error("Error deleting chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
      return;
    }

    const initializeChat = async () => {
      await fetchAllChats();
      await fetchChatMessages(behave);
    };

    initializeChat();
  }, [isAuthenticated, navigate, authLoading]);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className='bg-black min-h-screen w-full flex justify-center items-center text-white'>
      {/* Left Sidebar */}

      <div className={`${open ? "fixed inset-0 z-40 w-full h-full" : "hidden"} md:relative md:flex md:z-0 flex-col justify-center items-center min-h-screen w-full md:w-[18vw] bg-[#1e1e1e]`}>
        <GiCancel onClick={() => {
          Setopen(false);
        }} className={`md:hidden ${!open ? "md:hidden" : "fixed top-3 left-3 rounded-2xl bg-blue-600 h-6 w-6 px-1 py-1"}`} />
        <div className='min-h-[15vh] bg-slate-800 w-full flex justify-center items-center flex-col'>
          <div className='min-h-[7.5vh] bg-slate-900 w-full flex justify-center items-center gap-3'>
            <FaRegUser className='h-8 w-8 px-1 py-1 border-1 border-blue-500 rounded-full bg-black text-blue-500' />
            <h1 className='text-2xl transition-all hover:text-blue-400 hover:scale-95 mt-1'>{user?.userName ? user.userName : "User"}</h1>
          </div>
          <div className='min-h-[7.5vh] bg-slate-900 w-full flex justify-center items-center gap-5 rounded-b-2xl border-b-2 border-blue-500'>
            <select
              value={behave}
              onChange={(e) => handleBehaviorChange(e.target.value)}
              className='text-center text-xl bg-black py-[2px] rounded-[5px] border-2'
            >
              <option value="general">General</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="brother">Brother</option>
              <option value="sister">Sister</option>
              <option value="collegefriend">College Friend</option>
              <option value="boyfriend">Boyfriend</option>
              <option value="girlfriend">Girlfriend</option>
              <option value="codinginstructor">Coding Instructor</option>
              <option value="professor">Professor</option>
              <option value="rohitnegi">Rohit Negi</option>
              <option value="x">X</option>
            </select>
          </div>
        </div>

        <div className='min-h-[70vh] w-full flex justify-start items-center flex-col gap-5 pt-10 max-h-[70vh] pb-10 overflow-y-auto no-scrollbar'>
          {allChats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleBehaviorChange(chat.behaviour)}
              className='w-[80%] min-h-10 tracking-[1px] transition-all hover:scale-95 hover:bg-blue-500 bg-[#001020] rounded-[5px] border-l-2 flex justify-between items-center text-xl px-5'
            >
              <div># {chat.behaviour}</div>
              {chat.behaviour === "general" ? ("") : <MdDeleteOutline
                onClick={(e) => {
                  e.stopPropagation();
                  if (chat.behaviour === behave) {
                    deleteChat();
                  } else {
                    if (window.confirm(`Delete ${chat.behaviour} chat?`)) {
                      axiosClient.delete("/api/v1/chat/deletechat", {
                        data: { behaviour: chat.behaviour }
                      }).then(fetchAllChats);
                    }
                  }
                }}
                className='text-red-200 bg-red-600 transition-all hover:bg-red-800 rounded-[5px]'
              />}
            </div>
          ))}
        </div>

        <div className='min-h-[15vh] bg-slate-950 w-full rounded-t-xl border-t-3 border-blue-500 flex justify-center items-center gap-2 md:gap-5'>
          <h1 className='md:text-3xl text-xl'>Logout</h1>
          <TbLogout onClick={() => {
            setLog(true);
            logDestruct();
          }} className='md:h-10 md:w-10 py-1 px-[7px] h-8 w-8 text-center rounded-full hover:scale-90 transition-all hover:bg-red-800 bg-red-600 text-red-200' />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className='flex flex-col justify-center items-center min-h-screen w-full md:w-[82vw]'>
        <div className='min-h-[20vh] w-full flex justify-center items-center gap-15 sm:gap-25 md:gap-100 lg:gap-150'>
          <Link to={"/"} className='md:text-4xl text-2xl transition-all hover:text-blue-500 hover:scale-95'>Ever AI</Link>
          <div className='min-h-10 w-30 md:w-45 flex justify-center items-center transition-all hover:bg-purple-600 hover:scale-95 text-blue-100 bg-blue-500 border-l-4 border-blue-100 text-xl rounded-[5px]'>
            # {behave}
          </div>
        </div>

        <div className='min-h-[80vh] w-full bg-[#1A1A1A] mx-2 rounded-t-xl flex flex-col justify-center items-center'>
          <div className='min-h-[80vh] w-full bg-gray-800 rounded-t-xl flex justify-center items-center'>
            <div className='min-h-[75vh] max-h-[75vh] w-[92vw] md:w-[80vw] bg-slate-800 border-l-3 border-t-3 border-blue-500 rounded-xl mt-1 md:mt-10 poppins-bold-chat flex flex-col gap-5 overflow-y-auto no-scrollbar p-5 pb-20 lg:p-20 lg:pb-80'>
              {currentChatHistory.map((message) => (
                <div key={message._id} className='text-[10px] md:text-[15px] text-justify flex'>
                  <span className={`${message.role === "model" ? "bg-blue-600 mr-10 lg:mr-96 border-l-3 " : "bg-purple-500 border-l-3 ml-auto"} px-5 py-1 rounded-[10px]`}>
                    {message.parts[0].text}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className={`min-h-[5vh] lg:min-h-[7vh] w-[68vw] lg:w-[75vw] rounded-[5px] md:rounded-2xl ${open ? "hidden" : "fixed"} bottom-5 flex gap-1 md:gap-2`}>
            <input
              type='text'
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              placeholder='Chat. . . . . . .'
              className='w-[68vw] lg:w-[70vw] text-[10px] lg:text-xl px-1 border-2 border-blue-500 bg-black rounded-[5px] md:rounded-[10px] poppins-bold-chat'
            />
            <button
              onClick={() => {
                if (userMessage === "") {
                  alert("Message empty")
                } else {
                  sendMessage()
                }
              }}
              disabled={isLoading}
              className={`${userMessage === "" ? "hover:bg-gray-700 bg-gray-500" : "hover:bg-blue-700 bg-blue-500"} px-2 lg:px-0 lg:w-[5vw] transition-all rounded-[5px] md:rounded-[10px] flex justify-center items-center disabled:opacity-50`}
            >
              <BsFillSendFill className='h-5 w-5 lg:h-8 lg:w-8' />
            </button>
          </div>
        </div>
      </div>
      <div className={`bg-red-900 text-red-200 tracking-[1px] hover:bg-red-500 px-5 py-2 top-10 left-[50%] text-xl rounded-[3px] transition-colors fixed ${log ? "block" : "hidden"}`}>
        LoggedOut!
      </div>
      <FaRegFolderOpen onClick={() => {
        Setopen(true);
      }} className={`md:hidden ${open ? "md:hidden" : "fixed top-3 left-3 rounded-2xl bg-blue-600 h-6 w-6 px-1 py-1"}`} />
    </div>
  );
};

export default Chat;