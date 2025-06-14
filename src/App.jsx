import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router"
import Home from "./components/Home.jsx"
import Chat from "./components/Chat.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { verifyAuth } from './utils/authSlice.js'
import { logoutUser } from './utils/authSlice.js'
import { TbLogout } from "react-icons/tb";

const AppComponent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [isauth, setIsAuth] = useState(false);
  const [log, setLog] = useState(false);
  const logout = () => {
    dispatch(logoutUser());
  }

  const logDestruct = () => {
    const timeOut = setTimeout(() => {
      setLog(false);
      logout();
      navigate('/');
    }, 3000)

    return () => clearTimeout(timeOut);
  }

  const isAuthDestruct = () => {
    const timeOut = setTimeout(() => {
      setIsAuth(false);
      navigate('/');
    }, 3000)

    return () => clearTimeout(timeOut);
  }

  useEffect(() => {
    // Verify auth status on app load
    dispatch(verifyAuth());
  }, [dispatch]);

  const locate = useLocation();
  return (
    <div>

      <nav className={`bg-black text-white justify-between items-center h-[10vh] px-5 lg:px-10 ${locate.pathname === "/" ? "flex" : "hidden"}`}>
        <Link to={"/"} className='tracking-[1px] transition-all hover:text-blue-500 hover:scale-105 text-[20px] lg:text-4xl'>EVER AI</Link>
        <div className='flex gap-2 lg:gap-10 poppins-bold text-[10px] lg:text-[18px] mx-2 lg:ml-8'>
          <Link to={`${isAuthenticated ? "/chatroom" : "/signup"}`} className='py-1 px-5 lg:px-10 rounded-4xl transition-all hover:scale-105 hover:bg-purple-500 hover:border-purple-400 border-2 border-[#705B00] shade'>TRY</Link>
          <h1 className='py-1 px-5 lg:px-10 transition-all hover:scale-105 hover:bg-purple-500 hover:border-purple-400 rounded-4xl border-2 border-[#705B00] shade'>Docs</h1>
        </div>
        <div className='gap-3 lg:gap-10 poppins-bold tracking-[1px] text-[10px] lg:text-[15px] flex justify-center items-center'>
          <TbLogout onClick={() => {
            if (isAuthenticated) {
              setLog(true);
              logDestruct();
            }
          }} className={`${isAuthenticated ? "bg-red-600 text-red-200 hover:scale-110 hover:bg-red-800" : "bg-gray-600 text-gray-200 hover:scale-100 hover:bg-gray-800"} lg:text-3xl text-xl font-bold transition-all px-1 rounded-[5px]`} />
          {/* <Link className='transition-all hover:text-blue-500 hover:scale-105' onClick={()=>{
            if(isAuthenticated){
              setIsAuth(true)
              isAuthDestruct();
            }
          }} to={"/signup"}>Signin</Link> */}
          <Link className='transition-all hover:text-blue-500 hover:scale-105' onClick={()=>{
            if(isAuthenticated){
              setIsAuth(true)
              isAuthDestruct();
            }
          }} to={"/login"}>Login</Link>
        </div>

        <div className={`bg-red-700 text-red-200 tracking-[1px] hover:bg-red-500 px-5 py-2 top-20 left-[44.5%] text-xl rounded-[3px] transition-colors fixed ${log ? "block" : "hidden"}`}>
          LoggedOut!
        </div>

        <div className={`bg-green-700 text-green-200 tracking-[1px] hover:bg-green-500 px-5 py-2 top-20 left-[43%] text-xl rounded-[3px] transition-colors fixed ${isauth ? "block" : "hidden"}`}>
          Already LoggedIn!
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/chatroom' element={<Chat />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>

    </div>
  )
}


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </div>
  )
}

export default App
