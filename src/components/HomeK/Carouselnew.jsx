import React, { useState, useEffect } from 'react';
import { banner1, banner2, banner3 } from "../../assets/banners";


const BannerData = [
  {
    id: 1,
    img: banner1,
    title: 'Live Your Dance',
    subtitle: 'Create',
    description: 'Memories',
  },
  {
    id: 2,
    img: banner2,
    title: 'Explore Your Creativity',
    subtitle: 'Innovate',
    description: 'Imagination',
  },
  {
    id: 3,
    img: banner3,
    title: 'Embrace Adventure',
    subtitle: 'Discover',
    description: 'New Horizons',
  },
];

const BannerCarousel = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % BannerData.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
  
    const handleDotClick = (index) => {
      setCurrentBanner(index);
    };
  

  return (
    <div className="relative h-screen">
      {BannerData.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000  bg-black ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
            
            }`}
           
        >
          <img
            src={banner.img}
            alt={`Banner ${banner.id}`}
            className={`object-cover w-full h-full ${
                index === currentBanner ? 'sm:origin-[75%]' : ''
              }`}
  
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 flex flex-row items-center md:justify-start justify-center text-white">
                  <div className="flex flex-col w-full mx-12">
                        <h1 className="text-[5rem]  font-bold">{banner.title}</h1>
                        <h2 className="text-4xl">{banner.subtitle}</h2>
                        <p className="text-[3rem]">{banner.description}</p>
                      
                  </div>
          </div>
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
