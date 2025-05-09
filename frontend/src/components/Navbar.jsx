import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { ShopContext } from '../context/ShopContext.jsx'

const Navbar = () => {

  const [visible, setVisible] = useState(false)
  const {setShowSearch,getCartCount} = useContext(ShopContext)

  return (
    <div className='flex justify-between items-center py-5 font-medium'>
      <Link to='/'><img className="w-36 invert-[55%]" src={assets.logo} alt="logo" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-white'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-zinc-500 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-zinc-500 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-zinc-500 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-zinc-500 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6 invert'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='cursor-pointer w-5' alt="search" />

        <div className='group relative'>

          <img src={assets.profile_icon} className='cursor-pointer w-5' alt="profile" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-zinc-200 text-zinc-400  rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative '>
        
        <img className='w-5 min-w-5' src={assets.cart_icon} alt="cart" />
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center rounded-full leading-4 bg-black text-white aspect-square text-[10px]'>{getCartCount()}</p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menu" />

      </div>

      {/* Sidebar for mobile*/ }

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-zinc-900 transition-all ${visible ? 'w-full' : 'w-0'} `}>
          <div className='flex flex-col text-zinc-500 '>
              <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:text-white'>
                <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="dropdown" />
                <p>Back</p>
              </div>

              <NavLink onClick={() =>{setVisible(false)}} className='py-2 pl-6 border-b hover:text-white' to='/'>HOME</NavLink>
              <NavLink onClick={() =>{setVisible(false)}} className='py-2 pl-6 border-b hover:text-white' to='/collection'>COLLECTION</NavLink>
              <NavLink onClick={() =>{setVisible(false)}} className='py-2 pl-6 border-b hover:text-white' to='/about'>ABOUT</NavLink>
              <NavLink onClick={() =>{setVisible(false)}} className='py-2 pl-6 border-b hover:text-white' to='/contact'>CONTACT</NavLink>
          </div>
      </div>

    </div>
  )
}

export default Navbar
