import React from 'react'

import Slider from "react-slick";



export const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-2"
      onClick={onClick}
    >
      <span className="text-xl">
            <svg fill="none" stroke="currentColor" width="32"
                  height="32" className='text-white' strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </div>
  );
};



export const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-2"
      onClick={onClick}
    >
      <span>
      <svg fill="none" stroke="currentColor" width="32"
                  height="32" className='text-white' strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
        </svg>
      </span>
    </div>
  );
};

const Product = () => {
    return (
        <>
        <div className="rounded-md border">
    <img
      src="https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
      alt="Laptop"
      className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
    />
    <div className="p-4">
      <h1 className="inline-flex items-center text-lg font-semibold">
        Nike Airmax v2
      </h1>
      <p className="mt-3 text-sm text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
        debitis?
      </p>
      <div className="mt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
          #Sneakers
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
          #Nike
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
          #Airmax
        </span>
      </div>
      <div className="mt-3 flex items-center space-x-2">
        <span className="block text-sm font-semibold">Colors : </span>
        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
      </div>
      <div className="mt-5 flex items-center space-x-2">
        <span className="block text-sm font-semibold">Size : </span>
        <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
          8 UK
        </span>
        <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
          9 UK
        </span>
        <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
          10 UK
        </span>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Add to Cart
      </button>
    </div>
  </div>
        </>
    )
}

const Offers = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
        ],
      };
  return (
      <>
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Best Deals of the Season</h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
                dicta incidunt est ipsam, officia dolor fugit natus?
            </p>
          </header>
          <div className='m-2'>
            <Slider {...settings}>
                <div className="px-2">
                <Product/>
                </div>
                <div className="px-2">
                <Product/>
                </div>
                <div className="px-2">
                <Product/>
                </div>
                <div className="px-2">
                <Product/>
                </div>
                <div className="px-2">
                <Product/>
                </div>
            </Slider>
              
          </div>
      </>
  )
}

export default Offers