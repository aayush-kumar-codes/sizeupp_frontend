import React from 'react'
import './slide.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import { GEGreen1, Wine1, Darknavy3, Maroon1, Navy1 } from '../../assets/images/men';

import { WMustard1, WBlue1 } from '../../assets/images/women';

import { Link } from 'react-router-dom';

const Slider = () => {
  return (
    <>
      <div className=" bg-[#0B1121]/90">
        {/* <div className="w-full h-full bg-white/10 absolute backdrop-blur "></div> */}
      <h1 className="heading font-extrabold tracking-wider text-white font-sans">Product collection</h1>
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
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
            <Link to="/products">
            <img src={GEGreen1} className='w-80' alt="slide_image" />
              
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <img src={WBlue1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Darknavy3} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Maroon1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={WMustard1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Wine1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Navy1} alt="slide_image" />
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