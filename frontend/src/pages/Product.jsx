import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto  overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] rounded-md scroll- sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="items" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full rounded-md h-auto' src={image} alt="bigger" />
          </div>
        </div>

        {/*Product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2 text-white'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 invert" />
            <img src={assets.star_icon} alt="" className="w-3 invert" />
            <img src={assets.star_icon} alt="" className="w-3 invert" />
            <img src={assets.star_icon} alt="" className="w-3 invert" />
            <img src={assets.star_dull_icon} alt="" className="w-3 invert-[50%]" />
            <p className='pl-2 text-zinc-400'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium text-white'>{currency}{productData.price}</p>
          <p className='mt-5 text-zinc-400 md:w-4/5'>{productData.description}</p>
          <div className=' flex flex-col gap-4 my-8'>
            <p className='text-white'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} key={index} className={`border border-zinc-500 py-2 px-4 bg-zinc-800 cursor-pointer text-white ${item === size ? 'border-none' : ''}`}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-white cursor-pointer hover:bg-zinc-200 text-zinc-950 active:bg-zinc-300 active:text-zinc-950 text-sm px-8 py-3'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 border border-zinc-400' />
          <div className='text-sm text-zinc-400 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className='mt-35'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm text-white'>Description</b>
          <p className='border px-5 py-3 text-sm text-zinc-400  '>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-zinc-400 bg-zinc-800'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, iure ea. Aliquam numquam modi fugit corrupti sapiente inventore, facilis mollitia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quis maiores, tempora ducimus facere quas sunt neque nostrum? Illo exercitationem corporis ad maiores veniam facilis molestiae commodi laudantium eaque tempora! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit error sit doloremque, repellendus soluta qui.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure dolor veniam, tempora reiciendis dolore consequuntur aperiam rerum quibusdam doloribus placeat, repellat voluptatem inventore ratione animi consequatur necessitatibus ullam reprehenderit magnam.</p>
        </div>
      </div >

      {/*Related products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />


    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
