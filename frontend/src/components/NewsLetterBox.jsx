import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (e) =>{
        e.preventDefault();

    }
  return (
    <div className='text-center mt-40'>
      <p className='text-2xl font-medium text-white'>Subscribe now & get 20% off</p>
      <p className='text-zinc-400 mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde necessitatibus beatae nam sint omnis excepturi!</p>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 py-4 px-5 border outline-none  text-white' type="email" placeholder='Enter your email'/>
        <button className='bg-white cursor-pointer hover:bg-zinc-200 text-zinc-950 text-base px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
