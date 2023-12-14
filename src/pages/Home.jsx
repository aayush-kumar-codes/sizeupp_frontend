import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import banner1 from '../assets/banners/banner1.jpg'
import banner2 from '../assets/banners/banner2.jpg'
import banner3 from '../assets/banners/banner3.jpg'
import { BestSellers } from "../components/Home/BestSellers"
import { New } from "../components/Home/NewArrivals"
import Category from "../components/Home/Categories/Category";
import Offers from "../components/Home/SpecialOffers/Offers";
import Megamenu from "../components/Megamenu";

export const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // beforeChange: (prev, next) => {
    //   setDocActive(next);
    // },
    // appendDots: (dots) => (
    //   <div
    //     style={{
    //       position: "absolute",
    //       top: "50%",
    //       left: "7%",
    //       transform: "translateY(-50%)",
    //     }}
    //   >
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <div
    //     style={
    //       i === dotActive
    //         ? {
    //             width: "30px",
    //             color: "#262626",
    //             borderRight: "3px #262626 solid",
    //             padding: "8px 0",
    //             cursor: "pointer",
    //           }
    //         : {
    //             width: "30px",
    //             color: "transparent",
    //             borderRight: "3px white solid",
    //             padding: "8px 0",
    //             cursor: "pointer",
    //           }
    //     }
    //   >
    //     0{i + 1}
    //   </div>
    // ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "80%",
                left: "0%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),

        },
      },
    ],
  };
  return (
    <div className="bg-white my-10 w-[95%] h-[75%] mx-auto">
      <Slider {...settings}>
        <Link to="/">
          <div>

            {/*  */}
            <section
              style={{
                backgroundImage: `url(${banner3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="relative rounded-xl px-4 h-auto lg:h-[600px]"
            >
              <div
                className="absolute inset-0 bg-slate/75 sm:bg-transparent sm:from-slate/95 sm:to-slate/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
              ></div>

              <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
              >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                    Embrace Your Size,

                    <strong className="block font-extrabold text-orange-700"> Express Your Style: </strong>
                  </h1>

                  <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                    Where Fashion Meets Comfort for Every Body!
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4 text-center">
                    <a
                      href="#"
                      className="block w-full rounded bg-orange-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-700 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto"
                    >
                      Get Started
                    </a>

                    <a
                      href="#"
                      className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-orange-600 shadow hover:text-orange-700 focus:outline-none focus:ring active:text-orange-500 sm:w-auto"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Link>
        <Link to="/">
          <div className=''>
            <div className="relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
              <img src={banner2} alt="Banner Image" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              <div className="min-h-[600px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-start text-center text-white p-6">
                <h2 className="sm:text-4xl text-2xl font-bold mb-6">Explore New collection</h2>
                <p className="text-lg text-center text-gray-200">Embark on unforgettable journeys. Book your dream vacation today!</p>
                <a href="javascript:void(0)"
                  className="mt-8 bg-transparent text-white text-base font-semibold py-2.5 px-6 border-2 border-white rounded hover:bg-white hover:text-black transition duration-300 ease-in-out">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/">
          <div>

            <section
              style={{
                backgroundImage: `url(${banner1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="relative rounded-xl px-4 h-auto lg:h-[600px]"
            >
              <div
                className="absolute inset-0 bg-slate/75 sm:bg-transparent sm:from-slate/95 sm:to-slate/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
              ></div>

              <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
              >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                  <h1 className="text-3xl font-extrabold sm:text-5xl">
                    Embrace Your Size,

                    <strong className="block font-extrabold text-orange-700"> Express Your Style: </strong>
                  </h1>

                  <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                    Where Fashion Meets Comfort for Every Body!
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4 text-center">
                    <a
                      href="#"
                      className="block w-full rounded bg-orange-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-700 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto"
                    >
                      Explore More
                    </a>


                  </div>
                </div>
              </div>
            </section>
          </div>
        </Link>
      </Slider>
    </div>
  );
};


const Home = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <Megamenu />
      <Banner />
      <Category />
      <Offers />
      <BestSellers />
      <New />
    </>
  )
}

export default Home