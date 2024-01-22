import React, { useState, useEffect } from 'react';
import { banner1, banner2, banner3 } from "../../assets/banners";
import { Link } from 'react-router-dom';
import { mobile1,mobile2,mobile3 } from '../../assets/banners/mobile';
const BannerData = [
  {
    id: 1,
    img: banner1,
    smimg: mobile1,
    title: "Men's collection",
    subtitle: "10% OFF on First purchase- Use",
    description: 'FREE10',
    href:"/products?gender=2a812e75-af73-4638-b6a4-ca6d0529a368"
  },
  {
    id: 2,
    img: banner2,
    smimg: mobile2,
    title: "Women's collection",
    subtitle: "10% OFF on First purchase- Use",
    description: 'FREE10',
    href:"/products?gender=92aa7db0-e157-469d-ac90-e97d11e96940"
  }
];

const BannerCarousel = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % BannerData.length);
      }, 4000);
  
      return () => clearInterval(interval);
    }, []);
  
    const handleDotClick = (index) => {
      setCurrentBanner(index);
    };
  

  return (
    <div className="relative h-screen ">
      {BannerData.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full   bg-black  ${
            index === currentBanner ? 'transform translate-x-0' : 'transform -translate-x-full'
            
            }`}
        >
          <img
            src={banner.img}
            alt={`Banner ${banner.id}`}
            className={`object-cover hidden md:block w-full h-full ${
                index === currentBanner ? '' : ''
              }`}
  
          />
          <img
            src={banner.smimg}
            alt={`Banner ${banner.id}`}
            className={`object-cover md:hidden block w-full h-full ${
                index === currentBanner ? '' : ''
              }`}
  
          />
          {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
              <div className="absolute inset-0 flex flex-col md:justify-center justify-between md:p-0 py-24 md:items-start items-center text-white z-50">
            <div className="flex flex-col w-fit justify-start md:ml-24 ml-12">
              
                        <h1 className="text-[2.8rem] lg:text-[4rem] font-serif font-bold drop-shadow-xl">{banner.title}</h1>
                        <h2 className="md:text-4xl text-3xl font-[Times-new-roman] italic drop-shadow-xl" >{banner.subtitle}</h2>
                        <p className="text-[3rem] font-serif drop-shadow-xl">{banner.description}</p>
            </div>
            
                        <Link to={banner.href}>
                          <button className="border-2 border-white bg-black bg-opacity-20 mt-12 m-0 md:ml-24 text-white p-2 px-3 text-xl cursor-pointer ">Shop Now</button>
                        </Link>
          </div>
          
          {/* <div className="absolute w-full h-full top-0 z-1" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.6), transparent)" }}></div> */}
        </div>
      ))}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {BannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full bg-white opacity-50 focus:outline-none ${
                index === currentBanner ? 'opacity-100 scale-110' : ''
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
