import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div className='bg-black text-white min-h-[90vh] w-full flex flex-col justify-between items-center'>
      <div className="flex flex-col justify-center items-center pt-25">
        <div className='flex items-end gap-2'>
          <h1 className='text-8xl'>EVER AI</h1>
          <span className='text-4xl mb-3 font-medium'>Give's you everything</span>
        </div>
        <div>
          <span className='text-4xl font-medium'>yes probably everything!</span>
        </div>
        <Link to={"/chatroom"} className='text-xl shade font-extrabold tracking-[1px] text-center border-2 border-[#705B00] hover:bg-[#ffc640] py-2 px-20 rounded-full mt-8 mb-2 transition-all duration-200 transform hover:scale-105'>
          TRY Ever AI
        </Link>
      </div>

      <div className="w-full flex justify-center mt-auto">
        <img
          className='max-w-full h-auto object-contain brightness-100 saturate-200 contrast-110 rounded-t-3xl transition-all hover:scale-97'
          src="https://raw.githubusercontent.com/MehulPrajapati90/Utils/refs/heads/main/ai.png"
          alt="UI of chat Document"
        />
      </div>
    </div>
  )
}

export default Home