import { useState } from "react";
import { BannerData } from "../../constants/Banners";
import { Link } from "react-router-dom";

export default function Carousel() {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(BannerData.length - 1);
    else setCurrent(current - 1);
      // myStopFunction()
  };

  let nextSlide = () => {
    myStopFunction()
    if (current === BannerData.length - 1) setCurrent(0);
    else setCurrent(current + 1);

    // mySetTimeout()
  };

  let setSlide = (num) => {
    setCurrent(num)
    myStopFunction()

    // mySetTimeout()
  };
  const myTimeout = setTimeout(nextSlide, 5000);

  function myStopFunction() {
    clearTimeout(myTimeout);
  }
  return (
    <div className="overflow-hidden relative w-full min-w-screen h-full flex ">
      <div 
        className={`-z-10 flex transition ease-out duration-40 w-full hidden lg:block  sm:h-full sm:object-fill"`}
        style={{
          transform: `translateX(-${current *100}%)`,
        }}
      >
        {BannerData.map((s,i) => {
          return (
          <>
              <img className="" src={s.img} key={i} />
              {/* <img className="lg:hidden block " src={s.smimg} key={i}/> */}
              
          </>  
          );
        })}
      </div>
    {/* New Banner for SM View */}
    <div 
        className={`-z-10 flex transition ease-out duration-40 w-full block lg:hidden sm:h-full sm:object-fill"`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {BannerData.map((s, i) => (
          <div key={i} className="w-full">
            <img className="" src={s.smimg} alt={`SM Banner ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="absolute top-0 h-full justify-center  flex flex-col text-white px-12 z-10 items-center lg:gap-4 gap-0">
        <div className="min-w-[30%] h-[70%] flex flex-col items-center justify-center lg:gap-6 lg:mx-12 gap-2
        ">
          <h1 className="font-normal md:text-5xl uppercase font-serif
            text-lg
          ">Live Your Dance</h1>
          <div className="w-full flex justify-between items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 4" fill="none"><path d="M0 2H196" stroke="white" strokeWidth="3.1134"/></svg>
            <h2 className="font-normal text-6xl font-[Times-new-roman] italic
              md:text-4xl
            ">Create</h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 4" fill="none"><path d="M0 2H196" stroke="white" strokeWidth="3.1134"/></svg>
          </div>
          <h1 className="font-normal lg:text-7xl uppercase font-serif
            text-3xl
          ">Memories</h1>  
          <Link to="/products">
            <button className="border-2 border-white text-white p-2 text-md lg:text-lg cursor-pointer z-50">Shop Now</button>
            
        </Link>
        </div>
          
      </div>

      {/* <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full z-20">
        {BannerData.map((s, i) => {
          return (
            <div
              onClick={() => {
                setSlide(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-3 h-3 cursor-pointer  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div> */}
    </div>
  );
}