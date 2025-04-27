import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-50 text-sm '>
        <div>
            <img src={assets.logo} className='mb-5 invert-[55%] w-32' alt="logo" />
            <p className='w-full md:w-2/3 text-zinc-400'>Lorem ipsum dolor sit amet consecloremtetur, adipisicing elit. Impedit in esse quaerat voluptatem dicta veritatis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, quae Lorem ipsum dolor sit amet. Lorem ipsum dolor sit.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-white'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-zinc-400'>
            <li className='cursor-pointer hover:text-white'>Home</li>
            <li className='cursor-pointer hover:text-white'>About us</li>
            <li className='cursor-pointer hover:text-white'>Delivery</li>
            <li className='cursor-pointer hover:text-white'>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-zinc-400'>
            <li className='cursor-pointer hover:text-white'>+7-439-897-2630</li>
            <li className='cursor-pointer hover:text-white'>contact@Trendora.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className=' border-zinc-400  '/>
        <p className='py-5 text-sm text-center text-zinc-400'>Copyright 2025© trendora.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
