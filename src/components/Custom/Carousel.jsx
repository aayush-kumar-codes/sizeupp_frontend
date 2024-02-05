import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { HeartIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartFill } from '@heroicons/react/20/solid'

const Carousel = ({
  id,
  slides = [],
  slideInterval = 1200,
  isFav,
  handleAddWishlist = () => { },
  handleRemoveWishlist = () => { }
}) => {

  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [autoSlide, setAutoSlide] = React.useState(false)


  const [intervalId, setIntervalId] = React.useState(null)

  const onMouseHover = () => {
    if (intervalId) {
      onMouseLeave()
    }
    console.log("Hovered")
    setAutoSlide(true)
    setIntervalId(setInterval(() => { setCurrentSlide((s) => (s === slides.length - 1 ? 0 : s + 1)) }, slideInterval))
  }

  const onMouseLeave = () => {
    console.log("Left")
    setCurrentSlide(0)
    setAutoSlide(false)
    clearInterval(intervalId)
    setIntervalId(null)
  }

  // const prev = () => {
  //   if (autoSlide) {
  //     onMouseLeave()
  //   }
  //   setCurrentSlide((s) => (s === 0 ? slides.length - 1 : s - 1))
  // }

  // const next = () => {
  //   if (autoSlide) {
  //     onMouseLeave()
  //   }
  //   setCurrentSlide((s) => (s === slides.length - 1 ? 0 : s + 1))
  // }

  const navigate = useNavigate()

  return (
    <div className="overflow-hidden relative" onMouseEnter={onMouseHover} onMouseLeave={onMouseLeave}>
      <div
        className="flex transition-transform cursor-pointer ease-out duration-500 z-50 aspect-[3/4]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, i) => {
          // let str = slide.img + ""
          // console.log(str)
          return (
            <img
              key={i}
              loading='lazy'
              onClick={() => { navigate(`${id}`) }}
              className="object-cover w-full h-full cursor-pointer rounded-lg"
              src={slide.img.includes("/media/media") ? import.meta.env.VITE_SERVER_URL + (slide.img + "").slice(6) : import.meta.env.VITE_SERVER_URL + (slide.img + "")}
              alt="dress"
            />
          )
        })
        }
      </div>
      {/* <div className={`w-8 z-20 absolute bottom-4 right-4 bg-white rounded-full p-1`}>
        {isFav ? <HeartFill className='cursor-pointer' onClick={() => handleRemoveWishlist(id)} />
          : <HeartIcon className='cursor-pointer' onClick={() => handleAddWishlist(id)} />}
      </div> */}

      {/* <button
        type='button'
        onClick={prev}
        className="p-1 rounded-full shadow absolute ml-2 top-1/2 bg-white/80 text-gray-800 hover:bg-white"
      >
        <ChevronLeftIcon className='w-4' />
      </button>
      <button
        type='button'
        onClick={next}
        className="p-1 rounded-full absolute mr-2 top-1/2 right-0 shadow bg-white/80 text-gray-800 hover:bg-white"
      >
        <ChevronRightIcon className='w-4' />
      </button> */}

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-[5px] h-[5px] md:w-[6px] md:h-[6px] bg-white rounded-full
              ${currentSlide === i ? "p-1.5" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.string).isRequired,
  slideInterval: PropTypes.number,
  id: PropTypes.string,
  func: PropTypes.func,
  isFav: PropTypes.bool,
  handleAddWishlist: PropTypes.func,
  handleRemoveWishlist: PropTypes.func
}

export default Carousel