import React from 'react'
import { HomeIcon,ShoppingCartIcon,HeartIcon,UserIcon   } from "@heroicons/react/24/outline";


const MobileNav = () => {
  return (
    <>
    

{/* <!-- fixed nav --> */}
    <nav className=" sm:hidden z-50 fixed bottom-0 inset-x-0 bg-yellow-100 flex justify-between text-xs text-yellow-900 uppercase font-mono">

    <a href="/" className="w-full flex flex-col  py-2 px-3 text-center hover:bg-yellow-200 hover:text-yellow-800 transition duration-300">
            <HomeIcon className="h-5 w-5 mx-auto text-yellow-500" />
        Home
    </a>

    <a href="/products/cart" className="w-full flex flex-col  py-2 px-3 text-center hover:bg-yellow-200 hover:text-yellow-800">
        <ShoppingCartIcon className="h-5 w-5 mx-auto text-yellow-500" />
        Cart
    </a>

    <a href="/products/favourite" className="w-full flex flex-col  py-2 px-3 text-center hover:bg-yellow-200 hover:text-yellow-800">
        <HeartIcon className="h-5 w-5 mx-auto text-yellow-500" />
        Wishlist
    </a>

    <a href="/profile" className="w-full flex flex-col  py-2 px-3 text-center hover:bg-yellow-200 hover:text-yellow-800">
        <UserIcon className="h-5 w-5 mx-auto text-yellow-500" />
        Profile
    </a>

    </nav>
      </>
  )
}

export default MobileNav