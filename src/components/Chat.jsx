import React from 'react'

const Chat = () => {
  return (
    <div className='bg-black min-h-screen w-full flex text-white'>
      <div className='flex flex-col justify-center items-center min-h-screen w-[18vw] bg-[#2D2D2D]'>
        <div className='min-h-[15vh] bg-white w-full'></div>
        <div className='min-h-[70vh] bg-slate-800 w-full'></div>
        <div className='min-h-[15vh] bg-slate-700 w-full'></div>
      </div>
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <div className='min-h-[20vh] w-[82vw] flex justify-between items-center mx-2'>
          <h1 className='text-4xl'>Ever AI</h1>
          <div className='min-h-10 w-35 flex justify-center items-center bg-gray-500 text-xl rounded-[5px]'>General</div>
        </div>
        <div className='min-h-[80vh] w-[82vw] bg-[#1A1A1A] mx-2 rounded-t-xl flex flex-col justify-center items-center'>
          <div className='min-h-[80vh] w-[82vw] bg-gray-800 rounded-2xl'></div>
          <div className='min-h-[8vh] w-[75vw] rounded-2xl fixed bottom-10 flex gap-2'>
            <div className='w-[70vw] min-h-[8vh] bg-black rounded-2xl'></div>
            <div className='w-[5vw] bg-blue-500 min-h-[8vh] rounded-2xl'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat