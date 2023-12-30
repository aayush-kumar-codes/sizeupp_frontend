import React from 'react'
import './slide.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/autoplay";

import { EffectCoverflow, Pagination, Navigation,Autoplay } from 'swiper/modules';

import { GEGreen1, Wine1, Darknavy3, Maroon1, Navy1 } from '../../assets/images/men';
import { WMustard1, WBlue1 } from '../../assets/images/women';

import { col1, col2, col3, col4, col5, col6, col7 } from '../../assets/productcollection'

import { Link } from 'react-router-dom';

const Slider = () => {
  return (
    <>
      <div className=" bg-[#0B1121]/90 py-12">
        {/* <div className="w-full h-full bg-white/10 absolute backdrop-blur "></div> */}
        <h1 className="heading font-normal tracking-wider text-white font-serif">Product collection</h1>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}
          className="swiper_container"
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false
           }}

        >
          <SwiperSlide>
            <Link to="/products/10020175919">
              <img src={col1} className='w-80' alt="slide_image" />
            </Link>
          </SwiperSlide>

          <SwiperSlide>
          <Link to="/products/10020653710">
              <img src={col2} alt="slide_image" />
              </Link>
          </SwiperSlide>

          <SwiperSlide>
          <Link to="/products/10021893511">
              <img src={col3} alt="slide_image" />
              </Link>  
          </SwiperSlide>

          <SwiperSlide>
          <Link to="/products/10025050707">
              <img src={col4} alt="slide_image" />
              </Link> 
          </SwiperSlide>

          <SwiperSlide>
          <Link to="/products/20021364437">
              <img src={col5} alt="slide_image" />
              </Link> 
          </SwiperSlide>

          <SwiperSlide>
          <Link to="/products/20022593402">
              <img src={col6} alt="slide_image" />
              </Link> 
          </SwiperSlide>

          <SwiperSlide>
          <Link to="/products/200223101507">
            <img src={col7} alt="slide_image" />
            </Link> 
          </SwiperSlide>

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              {/* <ArrowLeftIcon className="h-6 w-6 text-gray-100" /> */}
            </div>
            <div className="swiper-button-next slider-arrow">
              {/* <ArrowRightIcon className="h-6 w-6 text-gray-100" /> */}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </>
  )
}

export default Slider