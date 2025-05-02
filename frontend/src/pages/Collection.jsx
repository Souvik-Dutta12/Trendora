import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterPrducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');

  const toogleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toogleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let prodctsCopy = products.slice();

    if(showSearch && search){
      prodctsCopy = prodctsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      prodctsCopy = prodctsCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0){
      prodctsCopy = prodctsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(prodctsCopy);
  }

  const sortProduct = ()=>{
    let filterProductCopy = filterPrducts.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(filterProductCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(filterProductCopy.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }
  
  useEffect(() => {
    applyFilter();
  }, [category, subCategory,search,showSearch])

  useEffect(()=>{

    sortProduct();
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter*/}

      <div className='min-w-60 '>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex item-center cursor-pointer gap-2 text-white'>FILTERS
          <img className={`h-3 mt-2 text-white sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category filter */}

        <div className={` bg-zinc-900 cursor-pointer border border-zinc-400 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-white'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-zinc-400'>
            <p className='flex gap-2 '>
              <input className='w-3 accent-white cursor-pointer' type="checkbox" value={'Men'} onChange={toogleCategory} />Men
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 accent-white cursor-pointer' type="checkbox" value={'Women'} onChange={toogleCategory} />Women
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 accent-white cursor-pointer' type="checkbox" value={'Kids'} onChange={toogleCategory} />Kids
            </p>
          </div>
        </div>

        {/*Subcategory filter */}

        <div className={`border cursor-pointer bg-zinc-900 border-zinc-400 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-white'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-zinc-400'>
            <p className='flex gap-2 '>
              <input className='w-3 accent-white cursor-pointer' type="checkbox" value={'Topwear'} onChange={toogleSubCategory} />Topwear
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 accent-white cursor-pointer' type="checkbox" value={'Bottomwear'} onChange={toogleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 accent-white cursor-pointer' type="checkbox" value={'Winterwear'} onChange={toogleSubCategory} />Winterwear
            </p>
          </div>
        </div>


      </div>

      {/*Right side */}

      <div className='flex-1 '>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={' COLLECTIONS'} />
          {/*Product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 cursor-pointer text-white hover:bg-zinc-800 border-zinc-400 text-sm px-2'>
            <option className='bg-zinc-900 cursor-pointer hover:bg-zinc-800 hover:text-white text-zinc-500' value="relevent">Sort by: Relevent</option>
            <option className='bg-zinc-900 cursor-pointer hover:bg-zinc-800 hover:text-white text-zinc-500' value="low-high">Sort by: Low to High</option>
            <option className='bg-zinc-900 cursor-pointer hover:bg-zinc-800 hover:text-white text-zinc-500' value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterPrducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
