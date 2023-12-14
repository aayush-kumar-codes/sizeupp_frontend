import { Link,useNavigate } from "react-router-dom"
import { dress } from "../assets/images"
import { styles } from "../style"
import React, { useState } from 'react';
import { GEGreen1, GEGreen2, GEGreen3, GEGreen4, GEGreen5 } from "../assets/images/men"
import { chevronDownIcon } from "../assets/icons";
import ReactImageMagnify from 'react-image-magnify';



const ProductImageView = () => {
  const arrayImages = [GEGreen1, GEGreen2, GEGreen3, GEGreen4, GEGreen5];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % arrayImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + arrayImages.length) % arrayImages.length);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };


  const handleMouseMove = (e) => {
    const img = document.getElementById("magnify-img");
    const preview = document.querySelector(".zoom-preview2");
    
    // calculating the ratio
    const x = preview.offsetWidth / 100;
    const y = preview.offsetHeight / 100;

    preview.style.backgroundImage = `url(${arrayImages[currentImageIndex]})`;
    preview.style.backgroundSize = `${img.width * x}px ${img.height * y}px`;

    const posX = e.nativeEvent.offsetX;
    const posY = e.nativeEvent.offsetY;

    preview.style.backgroundPosition = `-${posX * x}px -${posY * y}px`;

  };

  const handleMouseOut = () => {
    const preview = document.querySelector(".zoom-preview2");
    preview.style.backgroundImage = "none";

  };


  return (
    <>
      <div className="">

        <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
          <div className="w-full xl:flex xl:flex-row-reverse">
            <div className="relative  mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[600px]">
              <div className="flex justify-center mx-auto items-center ">
                {/* <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: `Product gallery ${currentImageIndex + 1}`,
                      isFluidWidth: true,
                      src: arrayImages[currentImageIndex],
                    },
                    largeImage: {
                      src: arrayImages[currentImageIndex],
                      width: 1200, // Set your desired width
                      height: 1800, // Set your desired height
                    },
                    isHintEnabled: true
                  }}
                /> */}
                
                 <img
                  alt={`Product gallery ${currentImageIndex + 1}`}
                  src={arrayImages[currentImageIndex]}
                  id="magnify-img"
                  width="650"
                  height="590"
                  className="rounded-lg object-cover md:h-[550px] md:w-full lg:h-full cursor-pointer md:cursor-crosshair"
                  onMouseMove={handleMouseMove}
                  onMouseOut={handleMouseOut}
                />
                
              </div>

              <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                <svg
                  onClick={handlePrevImage}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="bg-white rounded-full p-1 mx-2 cursor-pointer shadow-lg"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg
                  onClick={handleNextImage}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="bg-white rounded-full p-1 mx-2 cursor-pointer shadow-lg"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
            <div className="flex gap-2 xl:flex-col m-2 justify-center">
              {arrayImages.map((items, i) => {
                return (
                  <>
                    <div key={i}
                      onClick={() => handleImageClick(i)}
                      className={`border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 ${currentImageIndex === i ? 'border-black border scale-105' : '' // Add border for the selected image
                        }`}
                    >
                      <img
                        alt={`Product ${i + 1}`}
                        src={items}
                        decoding="async"
                        loading="lazy"
                        className="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                      />
                    </div>

                  </>
                )
              })}
            </div>

          </div>
        </div>
        <div className="hidden md:block zoom-preview2 rounded-lg absolute top-[20rem] right-[2rem] xl:right-[9rem] h-[30rem] w-[30rem] z-40">  </div>

      </div>
    </>
  )
}
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-sm">
      <header
        className={`flex cursor-pointer items-center justify-between border-t border-c-gray-300 py-5 transition-colors md:py-6 ${isOpen ? 'open' : ''}`}
        onClick={toggleAccordion}
      >
        <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg ">
          {title}
        </h2>
        <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
          <img src={chevronDownIcon} alt="chevronDownIcon" className={`w-4 h-4 ${isOpen ? 'scale-100 rotate-180' : ''
            }`} />

          <div
            className={`bg-heading  absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out `}
          />
        </div>
      </header>
      <div className={`accordion-text ${isOpen ? 'visible' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="pb-6 text-sm leading-7 text-c-gray-600 md:pb-7">{content}</div>
      </div>
    </div>
  );
};

const ProductOverview = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  
  const navigate = useNavigate()

  return (
    <div className={`${styles.padding}`}>

      <div className="flex items-center">
        {/* Nav menu- Breadcrumb */}
        <ol className={`inline-flex items-center space-x-1 md:space-x-3`}>
          <li className="inline-flex items-center">
            <Link
              to="/products"
              className="ml-1 inline-flex text-lg text-c-gray-800 hover:underline md:ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Products
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>

              <a href="#" className="ml-1 text-lg text-c-gray-800 hover:underline md:ml-2">
                Men
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="ml-1 text-lg font-medium text-c-gray-800 hover:underline md:ml-2">
                Oxford Casual Shirts - Sage Green
              </span>
            </div>
          </li>
        </ol>
      </div>

      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid grid-cols-1  gap-2">
          <ProductImageView />

        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-c-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              Oxford Casual Shirts - Sage Green
            </h2>
            <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
              100% Cotton
            </p>
            <p className="text-sm text-gray-800/80 font-semibold">In picture product size is 1 (128cm) in chest</p>

            <div className="mt-5 flex items-center ">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                ₹ 1,999.00
              </div>
              <span className="font-segoe pl-2 text-sm text-c-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                ₹ 2,999.00
              </span>
            </div>
          </div>
          <div className="border-b border-c-gray-300 pb-3  ">
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                size
              </h3>

              <ul className="colors -mr-3 flex flex-wrap">
                {['1', '2', '3', '4', '5', '6', '7'].map((size) => (
                  <li
                    key={size}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-c-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm "
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 ">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                color
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {['bg-[#B2AC88]'].map((color) => (
                  <li
                    key={color}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-c-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                  >
                    <span className={`block h-full w-full rounded ${color}`} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-c-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">

            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-c-gray-300 md:h-12">
              <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-c-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                onClick={increment}
              >
                +
              </button>
              <span className="duration-250 text-heading flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24">
                {count}
              </span>
              <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-c-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                onClick={decrement}
              >
                -
              </button>
            </div>
            <button
              type="button"
              onClick={() => {navigate('/products/cart')}}
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to cart
            </button>
          </div>
          <div className="py-6 ">
            <label htmlFor="pincode" className="block text-lg font-medium text-gray-800/80">
            Enter the pincode of your area to check product availability and delivery options
            </label>

            <input
              type="text"
              id="pincode"
              placeholder="Enter PinCode"
              name="pincode"
              onChange={() => { }}
              className="flex w-full ring-1 ring-link rounded-xl mt-2 bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => { }}
              className="inline-flex w-1/2 my-4 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Apply
            </button>
          </div>


          <div>
            <AccordionItem
              title="Product Details"
              content={
                <div className="grid grid-cols-2 gap-x-4">
                  <div className=" col-span-1 grid grid-rows-3 gap-y-6 border-r border-black/60">
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Occasion</h3>
                      <p className="text-lg">Casual Wear</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Sleeve Type</h3>
                      <p className="text-lg">Full Sleeves</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Pack Contains</h3>
                      <p className="text-lg">1 Casual-Shirt</p>
                    </div>
                  </div>
                  <div className=" col-span-1 grid grid-rows-3 gap-y-6">
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Material</h3>
                      <p className="text-lg">100% Cotton</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Design/Surface</h3>
                      <p className="text-lg">Solid</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Neckline Type</h3>
                      <p className="text-lg">Regular Collared</p>
                    </div>
                  </div>
                </div>
              }
            />
            <AccordionItem
              title="Additional Information"
              content={
                <div className="text-base font-semibold text-gray-800/80">
                  Machine Wash. Tumble Dry. Do Not Bleach. Wash Dark Color Separately. Warm Iron. Dry In Shade Do Not Iron On Print.
                </div>
              }
            />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ProductOverview