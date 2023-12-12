import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { BestSellers } from "../components/Home/BestSellers"
import { New } from "../components/Home/NewArrivals"
import { banner1, banner2, banner3 } from "../assets/banners";
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
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
              width: "30px",
              color: "#262626",
              borderRight: "3px #262626 solid",
              padding: "8px 0",
              cursor: "pointer",
            }
            : {
              width: "30px",
              color: "transparent",
              borderRight: "3px white solid",
              padding: "8px 0",
              cursor: "pointer",
            }
        }
      >
        0{i + 1}
      </div>
    ),
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
                backgroundImage: `url(${banner1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="relative rounded-xl px-4"
            >
              <div
                className="absolute inset-0 bg-slate/75 sm:bg-transparent sm:from-slate/95 sm:to-slate/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
              ></div>

              <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
              >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                  <h1 className="text-3xl font-extrabold sm:text-5xl">
                    Let us find your

                    <strong className="block font-extrabold text-rose-700"> Forever Home. </strong>
                  </h1>

                  <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
                    numquam ea!
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4 text-center">
                    <a
                      href="#"
                      className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                    >
                      Get Started
                    </a>

                    <a
                      href="#"
                      className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
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
          <div className='px-4'>
            <img className='w-full rounded-2xl' src={banner2} alt='banner2' />
          </div>
        </Link>
        <Link to="/">
          <div>
            <img className='w-full rounded-2xl' src={banner3} alt='banner3' />
          </div>
        </Link>
      </Slider>
    </div>
  );
};


const Home = () => {
  return (
    <>
      <Megamenu />
      <Banner />
      <BestSellers />
      <New />
    </>
  )
}

export default Home