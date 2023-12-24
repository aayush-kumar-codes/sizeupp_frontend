import React from 'react'
import {dress,
    dress2,
    dress3,
  dress4
} from '../../assets/images'
import {
  Link
} from 'react-router-dom';
import { WBlue1 } from '../../assets/images/women';
import { Wine1 } from '../../assets/images/men';

export const Categories = [
    {
        id : 1,
        name : "Men's Shirts",
        img : Wine1,
    },
    {
        id : 2,
        name : "Women's Kurtis",
        img : WBlue1,
    },
    {
        id : 3,
        name : "Casual Wear",
        img : dress4,
    },
]

export default function ShopCategoryWise() {
  return (
      <div className="h-auto w-full flex flex-col lg:flex-row justify-center ">
        {
          Categories.map((product)=>
          <Layout
            Text={product.name}
            Image={product.img}
            key={product.id}
          />
          )
        }
      </div>
  )
}


const Layout = ({Text, Image}) => {
  return (
      <div className={`lg:w-1/3 h-[50rem] relative flex flex-col justify-end
      w-full 
      `}>
          <div className='w-full h-full absolute top-0 left-0 overflow-hidden'>
              <img src={Image} className='object-cover w-full h-full' alt="product" />
          </div>
          <div className='h-[60%] w-full flex flex-col justify-center items-center text-center z-10 gap-10 p-16'>
        <h1 className="font-extrabold tracking-wider text-5xl capitalize font-sans text-white drop-shadow-lg">{Text}</h1>
        <Link to="/products">
              <button className="border-2 border-white text-white w-48 h-16 text-2xl md:w-36 md:h-12 md:text-lg sm:w-28 sm:h-8 sm:text-base">Shop Now</button>

        </Link>
          </div>
      </div>
  )
}
  