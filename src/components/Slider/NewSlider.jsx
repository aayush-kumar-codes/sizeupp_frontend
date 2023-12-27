// Import React and necessary styles
import React, { useRef,useState,useEffect } from 'react';

import './New.css';
import { GEGreen1, Wine1, Darknavy3, Maroon1, Navy1 } from '../../assets/images/men';

import { WMustard1, WBlue1 } from '../../assets/images/women';
import { banner1,banner2, banner3,banner4,banner5} from '../../assets/banners';
// Import Font Awesome styles
// import 'font-awesome/css/all.min.css';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";




const SlideShow = () => {

    const slideRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getBannerByIndex = (index) => {
        switch (index) {
          case 0:
            return banner1;
          case 1:
            return banner2;
          case 2:
            return banner3;
          case 3:
            return banner4;
          case 4:
            return banner5;
          default:
            return banner1; // Fallback to the first banner
        }
      };
    
  const handleNextClick = () => {
    const items = slideRef.current.querySelectorAll('.item');
    slideRef.current.appendChild(items[0].cloneNode(true));
    slideRef.current.removeChild(items[0]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrevClick = () => {
    const items = slideRef.current.querySelectorAll('.item');
    slideRef.current.prepend(items[items.length - 1].cloneNode(true));
    slideRef.current.removeChild(items[items.length - 1]);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };
    
  // SNowfall
  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = "https://app.embed.im/snow.js";
  //   script.defer = true;

  //   //   var x = getElementbyClass('container_new');
  //   const containerElement = document.querySelector('.snow_fall');

  //   if (containerElement) {
  //     containerElement.appendChild(script);
  //   }

  //   return () => {
  //     if (containerElement) {
  //       containerElement.removeChild(script);
  //     }
  //   };

  // }, []);

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  const BannerData = [
    {
      id: 1,
      img: banner1,
      title: 'Fashion for Every Body: Your Size, Your Style',
      subtitle: 'Create',
      description: 'Embrace your body, embrace your style. Our plus-size fashion collection caters to every body shape, ensuring you find the perfect fit for your unique silhouette. Explore the latest trends tailored just for you',
    },
    {
      id: 2,
      img: banner2,
      title: 'Confidence Redefined: Plus-Size Glamour',
      subtitle: 'Innovate',
      description: 'Redefine confidence with our glamorous plus-size fashion. From head-turning dresses to versatile everyday wear, our collection empowers you to showcase your style without compromise. Unleash the glamour within – because every body deserves to shine',
    },
    {
      id: 3,
      img: banner3,
      title: 'Style Knows No Size: Curated Plus-Size Chic',
      subtitle: 'Discover',
      description: 'Break free from fashion norms and explore a curated selection of chic plus-size outfits. Our collection is a celebration of diversity, ensuring you find fashion-forward styles that resonate with your unique personality. Shop now and redefine your style journey.',
    },
    {
      id: 4,
      img: banner4,
      title: 'Curves & Confidence Combined',
      subtitle: 'Innovate',
      description: 'Unleash your confidence with our stunning plus-size fashion. From chic dresses to casual essentials, our collection is designed to make you feel fabulous at every moment. Explore the perfect blend of style and comfort in sizes that celebrate your curves',
    },
    {
      id: 5,
      img: banner5,
      title: 'Your Curves with Style',
      subtitle: 'Innovate',
      description: 'ImaginDiscover a world of fashion that celebrates every curve. Our plus-size collection brings you trendy and comfortable styles that empower you to flaunt your unique beauty. Shop now for fashion that embraces your individualityation',
    },
  ];


  return (
    <>
    <div className="container_new top-0 left-0 w-full h-full" >
        {/* <div className="image_overlay"></div> */}
      <div className="slide" ref={slideRef}>
        <div
          className="item"
          style={{ backgroundImage:`url(${banner5})` }}
        >
          <div className="content">
            <div className="name">Curves & Confidence Combined</div>
            <div className="des">
            Discover a world of fashion that celebrates every curve. Our plus-size collection brings you trendy and comfortable styles that empower you to flaunt your unique beauty. Shop now for fashion that embraces your individuality
            </div>
            {/* <button>See More</button> */}
          </div>
        </div>
              {/* Repeat for other items 
              {BannerData.map((banner, index) => ())}
              */}
          {BannerData.map((banner, index) => (
                  <div
                  key={banner.id}
                  className={`item ${currentIndex === index ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${banner.img})` }}
              >
                  <div className="content">
                  <div className="name">{banner.title}</div>
                  <div className="des">{banner.description}</div>
                  {/* <button>See More</button> */}
                  </div>
              </div>
          ))}
              {/* {Array.from(Array(5).keys()).map((index) => (
            <div
                key={index}
                className={`item ${currentIndex === index ? 'active' : ''}`}
                style={{ backgroundImage: `url(${getBannerByIndex(index)})` }}
            >
                <div className="content">
                <div className="name">Slide {index + 1}</div>
                <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                <button>See More</button>
                </div>
            </div>
        ))} */}
        {/* <div className="item "  style={{ backgroundImage:`url(${banner2})` }}>
                <div className="content">
                    <div className="name">Finland</div>
                    <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                    <button>See More</button>
                </div>
            </div>
            <div className="item"  style={{ backgroundImage: `url(${banner3})` }}>
                <div className="content">
                    <div className="name">Iceland</div>
                    <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                    <button>See More</button>
                </div>
            </div>
            <div className="item"  style={{ backgroundImage: `url(${banner4})` }}>
                <div className="content">
                    <div className="name">Australia</div>
                    <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                    <button>See More</button>
                </div>
            </div>
            <div className="item"  style={{ backgroundImage: `url(${Maroon1})` }}>
                <div className="content">
                    <div className="name">Netherland</div>
                    <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                    <button>See More</button>
                </div>
            </div>
            <div className="item"  style={{ backgroundImage: `url(${Darknavy3})` }}>
                <div className="content">
                    <div className="name">Ireland</div>
                    <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                    <button>See More</button>
                </div>
            </div> */}

      </div>

      <div className="button z-20">
        <button className="prev" onClick={handlePrevClick}>
              <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <button className="next" onClick={handleNextClick}>
            <p className="text-md">
              <ChevronRightIcon className="h-6 w-6 text-gray-800" />
        </p>

        </button>
      </div>
    </div>
    <div className="snow_fall flex h-[90vh] w-full bg-gray-600"></div>
    </>
  );
};

export default SlideShow;
