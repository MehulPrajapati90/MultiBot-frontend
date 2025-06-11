import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router"
import Home from "./components/Home.jsx"
import Chat from "./components/Chat.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"

const AppComponent = () => {
  const locate = useLocation();
  return (
    <div>

      {/* <BrowserRouter> */}

        <nav className={`bg-black text-white justify-between items-center h-[10vh] px-10 ${locate.pathname === "/"? "flex": "hidden"}`}>
          <Link to={"/"} className='tracking-[1px] text-4xl'>EVER AI</Link>
          <div className='flex gap-10 poppins-bold text-[18px] ml-12'>
            <Link to={"/chatroom"} element={<Chat/>} className='py-1 px-10 rounded-4xl border-2 border-[#705B00] shade'>TRY</Link>
            <h1 className='py-1 px-10 rounded-4xl border-2 border-[#705B00] shade'>Docs</h1>
          </div>
          <div className='flex gap-10 poppins-bold tracking-[1px] text-[15px]'>
            <Link to={"/signup"}>Signin</Link>
            <Link to={"/login"}>Login</Link>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/chatroom' element={<Chat />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>

      {/* </BrowserRouter> */}

    </div>
  )
}


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <AppComponent/>
      </BrowserRouter>
    </div>
  )
}

export default App