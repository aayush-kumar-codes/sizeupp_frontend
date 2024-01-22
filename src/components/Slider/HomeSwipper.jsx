import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import Slider from './Slider';
import './Homecarousel.css'
import { GEGreen1, Wine1, Darknavy3, Maroon1, Navy1 } from '../../assets/images/men';

import { WMustard1, WBlue1 } from '../../assets/images/women';

const HomeSwipper = () => {
  return (
    <>
          <Swiper
              slidesPerView={1}
              spaceBetween={10}
              autoplay={{
                  delay:2500,
                  disableOnInteraction:false,
              }}
              breakpoints={{
                  640: {
                      slidesPerView: 2,
                      spaceBetween:10,
                  },
                  768: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                  }, 1024: {
                    slidesPerView: 4,
                    spaceBetween:30,
                  }
              }}
              loop={true}
              modules={[Autoplay]}
              className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60vw h-40vh'
          >
              <SwiperSlide >
                <img src={WBlue1} alt="slide_image" className='rounded-xl oject-cover ' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Darknavy3} alt="slide_image" className='rounded-xl oject-cover ' />
                </SwiperSlide>
                <SwiperSlide>
                <img src={Maroon1} alt="slide_image" className='rounded-xl oject-cover ' />
                </SwiperSlide>
                <SwiperSlide>
                <img src={WMustard1} alt="slide_image" className='rounded-xl oject-cover ' />
                </SwiperSlide>
                <SwiperSlide>
                <img src={Wine1} alt="slide_image" className='rounded-xl oject-cover ' />
                </SwiperSlide>
                <SwiperSlide>
                <img src={Navy1} alt="slide_image" className='rounded-xl oject-cover ' />
              </SwiperSlide>
              
        </Swiper>
      </>
  )
}

export default HomeSwipper