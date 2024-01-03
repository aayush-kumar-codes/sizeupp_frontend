import React,{useState} from 'react'
import { HomeIcon,ShoppingCartIcon,HeartIcon,UserIcon   } from "@heroicons/react/24/outline";
import {ArrowUpIcon } from "@heroicons/react/24/outline";

const ScrollButton = () =>{ 
  
    const [visible, setVisible] = useState(false) 
    
    const toggleVisible = () => { 
      const scrolled = document.documentElement.scrollTop; 
      if (scrolled > 300){ 
        setVisible(true) 
      }  
      else if (scrolled <= 300){ 
        setVisible(false) 
      } 
    }; 
    
    const scrollToTop = () =>{ 
      window.scrollTo({ 
        top: 0,  
        behavior: 'smooth'
        /* you can also use 'auto' behaviour 
           in place of 'smooth' */
      }); 
    }; 
    const isMobileView = window.innerWidth <= 640;

    window.addEventListener('scroll', toggleVisible); 
    
    return ( 
      <button className={`bg-black fixed bottom-16 rounded-full right-2 z-50 ${
        isMobileView ? 'block' : 'hidden ' // Show in mobile view, hide in desktop view
      }`} onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}} > 
       <ArrowUpIcon  className='lg:h-12 lg:w-12 w-10 h-10 p-2 text-white' 
        /> 
      </button> 
    ); 
  } 
const MobileNav = () => {
  return (
    <>
    <ScrollButton/>

{/* <!-- fixed nav --> */}
    <div className="md:hidden z-50 fixed bottom-0 inset-x-0 bg-[#FFAE00] flex justify-between text-xs  uppercase font-mono">

    <a href="/" className="w-full flex flex-col  py-2 px-3 text-center hover:bg-yellow-200 hover:text-yellow-800 transition duration-300">
            <HomeIcon className="h-5 w-5 mx-auto text-yellow-800" />
        Home
    </a>

    <a href="/products/cart" className="w-full flex flex-col  py-2 px-3 text-center hover:bg-yellow-200 hover:text-yellow-800">
        <ShoppingCartIcon className="h-5 w-5 mx-auto text-yellow-800" />
        Cart
    </a>

    <a href="/products/favourite" className="w-full flex flex-col  py-2 px-3 text-center hover:bg-yellow-200 hover:text-yellow-800">
        <HeartIcon className="h-5 w-5 mx-auto text-yellow-800" />
        Wishlist
    </a>

    <a href="/profile" className="w-full flex flex-col  py-2 px-3 text-center hover:bg-yellow-200 hover:text-yellow-800">
        <UserIcon className="h-5 w-5 mx-auto text-yellow-800" />
        Profile
    </a>

    </div>
      </>
  )
}

export default MobileNav