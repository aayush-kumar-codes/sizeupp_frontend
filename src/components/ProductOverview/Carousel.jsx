import { useState, } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ImageZoom from './ImageZoom';

const Carousel = ({ images }) => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="relative -mx-8 md:mx-[20%] w-full h-full overflow-hidden">
      <div className="flex transition-transform duration-500 ease border" style={{ transform: 'translateX(-' + currentSlide * 100 + '%)' }}>
        {images.map((image, index) => (
          <div key={index} className={`flex-shrink-0 w-full h-full  ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            {/* <img
            src={import.meta.env.VITE_SERVER_URL + (image.img + '').slice(6)}
            alt={`Slide ${index + 1}`}
            className="w-full h-full  object-contain"
          /> */}
            {/* Zoomable image with ImageZoom component */}
            <ImageZoom imglink={import.meta.env.VITE_SERVER_URL + (images[currentSlide].img + '').slice(6)} className="w-full h-full  object-contain" />

          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute z-50 left-0 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-400 p-2">
        <ChevronLeftIcon className="w-7 h-7" />
      </button>
      <button onClick={nextSlide} className="absolute z-50 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-400 p-2">
        <ChevronRightIcon className="w-7 h-7" />

      </button>
    </div>
  );
};

export default Carousel;