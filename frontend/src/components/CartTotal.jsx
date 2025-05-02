import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const {currency,deliveryFee,getCartAmount} = useContext(ShopContext)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={' TOTALS'}/>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-base'>
            <div className='flex justify-between'>
                <p className='text-zinc-400'>Subtotal</p>
                <p className='text-white'>{currency}{getCartAmount()}.00</p>
            </div>
            <hr className='border-zinc-400'/>
            <div className='flex justify-between'>
                <p className='text-zinc-400'>Shipping Fee</p>
                <p className='text-white'>{currency}{deliveryFee}.00</p>
            </div>
            <hr className='border-zinc-400'/>
            <div className='flex justify-between'>
                <b className='text-zinc-400'>Total</b>
                <b className='text-white'>{currency}{getCartAmount() === 0 ? 0 : getCartAmount()+deliveryFee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
