import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { verifyAuth } from '../utils/authSlice.js';

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Verify auth status on app load
    dispatch(verifyAuth());
  }, [dispatch]);

  return (
    <div className='bg-black text-white min-h-[90vh] w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8'>
      <div className="flex flex-col justify-center items-center pt-10 md:pt-15 lg:pt-25 w-full max-w-7xl">
        <div className='flex flex-col md:flex-row md:items-end gap-2 w-full justify-center items-center text-center md:text-left'>
          <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl'>EVER AI</h1>
          <span className='text-xl sm:text-2xl md:text-3xl lg:text-4xl md:mb-3 font-medium'>Give's you everything</span>
        </div>
        <div className='w-full text-center md:text-center'>
          <span className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium'>yes probably everything!</span>
        </div>
        <Link 
          to={`${isAuthenticated ? "/chatroom" : "/login"}`} 
          className='text-lg sm:text-xl shade font-extrabold tracking-[1px] text-center border-2 border-[#705B00] hover:bg-purple-500 hover:border-purple-400 py-1 md:py-2 px-8 sm:px-10 md:px-15 rounded-full mt-6 md:mt-8 mb-0 md:mb-2 transition-all duration-200 transform hover:scale-105'
        >
          TRY Ever AI
        </Link>
      </div>

      <div className="w-full flex justify-center mt-8 md:mt-auto max-w-7xl">
        <img
          className='w-full hidden md:block max-w-4xl h-auto object-contain brightness-100 saturate-200 contrast-110 rounded-t-3xl transition-all hover:scale-97'
          src="https://raw.githubusercontent.com/MehulPrajapati90/Utils/refs/heads/main/ai.png"
          alt="UI of chat Document"
        />
        <img
          className='w-full md:hidden block max-w-4xl h-90 object-contain brightness-100 saturate-200 contrast-110 rounded-t-3xl transition-all hover:scale-97'
          src="https://raw.githubusercontent.com/MehulPrajapati90/Utils/refs/heads/main/mobile%20component.png"
          alt="UI of chat Document"
        />
      </div>
    </div>
  )
}

export default Home