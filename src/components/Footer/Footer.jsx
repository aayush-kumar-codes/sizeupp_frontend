import { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/banners";


const Footer = () => {
  
  return (
    <>
    <footer className="text-gray-300 body-font bg-[#1E1E1E]">
  <div className=" px-8 py-24 mx-10 flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <a href="/" className="flex text-lg font-bold items-center md:justify-start justify-center text-white">
       <img src={logo} className="w-36"/>
        
      </a>
      <p className="mt-2 text-sm text-gray-500">Sizeupp: A Newly Launched One Stop Shop for All Things Plus Size </p>
      <div className="p-1">
            <a href="/about-us" className="text-gray-400 hover:text-white ">About Us</a>
            </div>
            <div className="p-1">
            <a href="/faq" className="text-gray-400 hover:text-white">FAQ</a>
          </div>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="text-lg font-bold text-white tracking-widest mb-3">Shop</h2>
        <nav className="list-none mb-10">
          <li className="p-1">
          <a href="/products" className="text-gray-400 hover:text-white">Men</a>
          </li>
          <li className="p-1">
            <a href="/products" className="text-gray-400 hover:text-white">Women</a>
          </li>
          <li className="p-1">
            <a href="/products" className="text-gray-400 hover:text-white">Accessories</a>
          </li>
          <li className="p-1">
           <a href="/products" className="text-gray-400 hover:text-white">New Arrivals</a>
          </li>
          <li className="p-1">
            <a href="/products" className="text-gray-400 hover:text-white">Seasonal Sale</a>
          </li>      
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="text-lg font-bold text-white tracking-widest mb-3">My Account</h2>
        <nav className="list-none mb-10">
          <li className="p-1">
            <a href="/profile" className="text-gray-400 hover:text-white">Profile</a>
          </li>
          <li className="p-1">
            <a href="/profile/my-orders" className="text-gray-400 hover:text-white">Orders</a>
          </li>
          <li className="p-1">
            <a href="/profile/manage-address" className="text-gray-400 hover:text-white">Addresses</a>
          </li>
          <li className="p-1">
            <a href="/profile/account-settings" className="text-gray-400 hover:text-white">Account Details</a>
          </li>     
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="text-lg font-bold text-white tracking-widest mb-3">Policies</h2>
        <nav className="list-none mb-10">
          <li className="p-1">
            <a href="/terms-condition" className="text-gray-400 hover:text-white">Terms & Condition</a>
          </li>
          <li className="p-1">
            <a href="/return-policy" className="text-gray-400 hover:text-white">Return Policies</a>
          </li>
          <li className="p-1">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          </li>
          <li className="p-1">
            <a href="/shipping-policy" className="text-gray-400 hover:text-white">Shipping Policy</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="text-lg font-bold text-white tracking-widest mb-3">Socials</h2>
        <nav className="list-none mb-10">
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a href="" className="text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a href="" className="ml-3 text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a href="" className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a href="" className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
        </nav>
      </div>
    </div>
  </div>
  <div className="">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 Sizeupp 
      </p>
     
    </div>
  </div>
</footer>
    </>
  );
};

export default Footer;