import { Link, useNavigate, useParams } from "react-router-dom"
import { styles } from "../style"
import { useState, useEffect, useRef } from 'react';
import { chevronDownIcon } from "../assets/icons";
import { HeartIcon, ArrowsPointingOutIcon, ShareIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon, TruckIcon, CheckIcon, StarIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { LinkIcon } from "@heroicons/react/20/solid";
import RelatedProducts from "../components/ProductOverview/RelatedProducts";
import ReviewProduct from "../components/ProductOverview/ReviewProduct";
import ProductOverviewCar from "../components/Skeleton/ProductOverview/ProductOverviewCar";
// import { CasualBottom_boxer } from "../assets/sizechart";
import { Images } from "../components/Sizechart/Data";

export const Modal = ({ children, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);
  return ReactDOM.createPortal(
    <div className="fixed overflow-hidden p-10 top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50 bg-gray-900" onClick={handleOverlayClick}>
      <div className=" p-8 rounded-md max-w-screen-sm w-full h-auto overflow-auto">
        {children}
        <button className="absolute top-4 right-6 text-gray-100" onClick={onClose}>
          <XMarkIcon className="h-8 w-8 text-gray-100" />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};


// ------------------------ Image View Component ------------------------
const ProductImageView = ({
  arrayImages = []
}) => {

  const [isZoomPreviewVisible, setZoomPreviewVisible] = useState(false);

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
    setZoomPreviewVisible(true); // Show the zoom preview

    // calculating the ratio
    const x = preview?.offsetWidth / 180;
    const y = preview?.offsetHeight / 180;

    if (preview && preview.style) {
      preview.style.backgroundImage = `url(${import.meta.env.VITE_SERVER_URL + (arrayImages[currentImageIndex]?.img + "").slice(6)})`;
      preview.style.backgroundSize = `${img.width * x}px ${img.height * y}px`;
    }

    const posX = e.nativeEvent?.offsetX;
    const posY = e.nativeEvent?.offsetY;

    preview.style.backgroundPosition = `-${posX * x}px -${posY * y}px`;

  };

  const handleMouseOut = () => {
    const preview = document.querySelector(".zoom-preview2");
    preview.style.backgroundImage = "none";
    setZoomPreviewVisible(false); // Hide the zoom preview

  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const CustomPrevArrow = (props) => (


    <div
      className={props.className}
      style={{}}
      onClick={props.onClick}
    >
      <ChevronLeftIcon className="w-12 h-12 text-black bg-gray-200/70 p-2 rounded-full" />
    </div>
  );

  const CustomNextArrow = (props) => (

    <div
      className={props.className}
      style={{}}
      onClick={props.onClick}
    >
      <ChevronRightIcon className="w-12 h-12 -mx-8 text-black bg-gray-200/70 p-2 rounded-full" />
    </div>
  );


  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,


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
    <>
      <div className="">
        <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
          <div className="w-full xl:flex justify-end xl:flex-row-reverse">
            <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[600px]">
              <div className="flex justify-center mx-auto items-center ">
                {/* Image Current */}
                <img
                  alt={`Product gallery ${currentImageIndex + 1}`}
                  src={import.meta.env.VITE_SERVER_URL + (arrayImages[currentImageIndex]?.img + "").slice(6)}
                  id="magnify-img"
                  width="650"
                  height="590"
                  onClick={handleOpenModal}
                  className="rounded-lg object-cover md:h-[550px] md:w-full lg:h-full cursor-pointer md:cursor-pointer"
                  onMouseMove={handleMouseMove}
                  onMouseOut={handleMouseOut}
                />
              </div>

              {/* Controls */}
              <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                {/* Prev Icon */}
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
                  className=" p-1 mx-2 cursor-pointer"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>

                {/* Next Icon */}
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
                  className=" p-1 mx-2 cursor-pointer"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>

            {/*  Image Thumbnails */}
            <div className="flex gap-2 xl:flex-col m-2 justify-center">
              {arrayImages.map((items, i) => {

                return (
                  <>
                    <div key={i}
                      onClick={() => handleImageClick(i)}
                      className={`border-border-base  flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 ${currentImageIndex === i ? 'border-black border scale-105' : '' // Add border for the selected image
                        }`}
                    >
                      <img
                        alt={`Product ${i + 1}`}
                        src={import.meta.env.VITE_SERVER_URL + (items.img + "").slice(6)}
                        decoding="async"
                        loading="lazy"
                        className="h-20 w-20 object-cover  md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                      />
                    </div>

                  </>
                )
              })}
            </div>

          </div>
        </div>

        {/* Modal */}
        <div className="w-full">
          <div className="flex mx-auto w-64 justify-center items-center">
            {/* <button className="py-2 px-3 bg-black rounded-md flex justify-between items-center text-white hover:scale-105" onClick={handleOpenModal}><ArrowsPointingOutIcon className="w-4 mr-2" /> See Full View</button> */}
            {isModalOpen && (
              <Modal onClose={handleCloseModal}>
                {/* Content of the modal goes here */}
                <div className="w-full h-full flex items-center justify-center">
                  <Slider {...settings} className="w-full h-full">
                    {arrayImages.map((image, index) => (
                      <div key={index} className="w-full h-full">
                        <img
                          src={import.meta.env.VITE_SERVER_URL + (image.img + "").slice(6)}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </Modal>
            )}
          </div>
          <div id="modal-root" className="absolute z-50"></div>

        </div>
        {/*  Zoom Preview */}
        {/* {isZoomPreviewVisible && (
          <div className="zoom-preview2 overflow-hidden absolute top-[50%] right-28 h-[30rem] w-[30rem] z-50"></div>
        )} */}
      </div>
    </>
  )
}

// ------------------------ Accordion Component (Helper) ------------------------
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
        <h2 className="text-heading pr-2 text-xl font-semibold leading-relaxed md:text-base ">
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
const PincodeForm = () => {
  const [pincode, setPincode] = useState('');
  const [isDeliveryValid, setIsDeliveryValid] = useState(false);

  const pincodeData = {
    // Sample pincode data in JSON format
    '12345': true,
    '67890': false,
    '400612': true,
    '421201': true,
    '400084': true,
    '400002': true,
    '401107': true,
  };

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleCheckClick = () => {

    handlePincode()

  };

  const navigate = useNavigate()

  const handleChangeClick = () => {
    // Reset the pincode and delivery status when changing
    setPincode('');
    setIsDeliveryValid(false);
  };

  const [token, setToken] = useState('')


  const handleToken = async () => {
    try {
      const res = await fetch(`https://api.instashipin.com/api/v1/tenancy/authToken`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          "api_key": "6092655223372029e7404dc4"
        })
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      if (data.data.response?.error) {
        Swal.fire({
          title: 'Error!',
          text: data.data.response?.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return
      }
      setToken(data.data?.response.token_id)
      // Swal.fire({
      //   title: 'Success!',
      //   text: 'Pincode Added',
      //   icon: 'success',
      // })
    }
    catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

  }

  const handlePincode = async () => {
    try {
      await handleToken();
      if (pincode.length !== 6) {
        Swal.fire({
          title: 'Error!',
          text: 'Please enter valid pincode',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return
      }
      if (!token) {
        Swal.fire({
          title: 'Error!',
          text: 'Please enter pincode again',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return
      }
      const res = await fetch(`https://api.instashipin.com/api/v1/courier-vendor/check-pincode`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          "token_id": token,
          "pincode": pincode
        })
      })
      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`);
      // }
      const data = await res.json()
      console.log(data);
      if (data.data?.response?.message == 'PINCODE NOT SERVICEABLE') {
        setIsDeliveryValid(false)
        return Swal.fire({
          title: 'Error!',
          text: data.data?.response?.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1200
        });
      }

      setIsDeliveryValid(true)

      Swal.fire({
        title: 'Success!',
        text: data.data?.response?.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      })
    }
    catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1200
      });
    }
  }

  const handleApplyPincode = async () => {
    try {
      if (!localStorage.token) {
        return navigate('/login')
      }
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/validate-pincode/` + pincode, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      Swal.fire({
        title: 'Success!',
        text: 'Pincode Added',
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      })
    }
    catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1200
      });
    }
  }


  return (
    <>
      <form autoComplete="off" className="flex">
        <input
          type="text"
          placeholder="Enter pincode"
          onChange={handlePincodeChange}
          value={pincode}
          className="pincode-code flex w-2/3 ring-1 ring-link rounded-md mt-2 bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
          name="pincode"
          disabled={isDeliveryValid}
        />

        <input
          type="button"
          className="cursor-pointer relative right-14 pt-2 -mx-2 text-orange-500 hover:font-bold"
          value={isDeliveryValid ? 'Change' : 'Check'}
          onClick={() => {
            if (isDeliveryValid) {
              handleChangeClick()
            } else {
              handleCheckClick()
            }
          }}

        />
        {isDeliveryValid && (
          <div className="ok relative right-7 top-10 transform -translate-y-1/2">
            <CheckIcon className="h-6 w-6 relative text-white rounded-full bg-green-600 p-1" />
          </div>
        )}
      </form>
      {isDeliveryValid ? (
        <div className="w-full m-3">
          <ul className="flex flex-col gap-3 font-bold">
            {/* <li>
              <h4>Get it by Thu, Dec 21</h4>
            </li> */}
            <li>
              <h4>Pay on delivery available</h4>
            </li>
            {/* <li>
              <h4>Easy 14 days return &amp; exchange available</h4>
              <span></span>
            </li> */}
          </ul>
        </div>
      ) : (
        <p className="text-xs text-gray-700 pt-2">Please enter PIN code to check delivery time &amp; Pay on Delivery Availability</p>
      )}

    </>
  );
};


// ------------------------ Main Component ------------------------
const ProductOverview = () => {
  const [count, setCount] = useState(1);
  const [overviewloading, setoverviewloading] = useState(true)

  const { id } = useParams()

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsShareMenuOpen(false);
    }
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsShareMenuOpen((prev) => !prev);
  };

  const [demo, setdemo] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [images, setImages] = useState([])
  const navigate = useNavigate()

  const [iconColors, setIconColors] = useState({
    email: '#212121',
    facebook: '#212121',
    instagram: '#212121',
    whatsapp: '#212121',
    twitter: '#212121',
    copyLink: '#212121', // Change this color as needed
  });

  const handleIconHover = (iconName, color) => {
    setIconColors((prevColors) => ({ ...prevColors, [iconName]: color }));
  };

  
    const currentUrl = window.location.href;
  
  const shareFacebook = () => {
      const facebookMessage = encodeURIComponent(`Hey, check out this awesome product from Sizeupp: ${currentUrl}`);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    };
  
    const shareInstagram = () => {
      // Instagram doesn't provide a direct share API, so redirect to Instagram page
      window.open('https://www.instagram.com/', '_blank');
    };

  const shareWhatsApp = () => {
    const whatsappMessage = encodeURIComponent(`Hey, check out this awesome product from Sizeupp: ${currentUrl}`);

    // Check if the device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Construct the WhatsApp share link based on the device
    const whatsappLink = isMobile ? `https://wa.me/?text=${whatsappMessage}` : `https://web.whatsapp.com/send?text=${whatsappMessage}`;
    
    // window.open(`https://web.whatsapp.com/send?text=${whatsappMessage}`, '_blank');
    window.open(whatsappLink, '_blank');

    };
  
  const shareTwitter = () => {
      const twitterMessage = encodeURIComponent(`Hey, check out this awesome product from Sizeupp: ${currentUrl}`);
      window.open(`https://twitter.com/intent/tweet?url=${twitterMessage}`, '_blank');
    };
  
    const copyUrlToClipboard = () => {
      const currentUrl = window.location.href;
  
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('URL copied successfully!');
      }).catch((error) => {
        console.error('Unable to copy URL to clipboard', error);
      });
  };
  
  const shareViaEmail = () => {
    // const currentUrl = window.location.href;
    // const subject = encodeURIComponent('Check out this website!');
    // const body = encodeURIComponent(`I thought you might be interested in this website: ${currentUrl}`);

    // window.location.href = `mailto:?subject=${subject}&body=${body}`;

    const currentUrl = encodeURIComponent(window.location.href);

    // Construct the Gmail share link
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to&su=Check%20out%20this%20website&body=I%20thought%20you%20might%20be%20interested%20in%20this%20website:%20${currentUrl}`;

    // Open Gmail in a new tab
    window.open(gmailLink, '_blank');

  };

  
  //fetch data from server
  const [pincode, setPincode] = useState('')

  const [sqpActive, setSQPActive] = useState('')

  const fetchDataAuth = async (id) => {
    try {
      setoverviewloading(true)
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setdemo(data);
          setRelatedProducts(data.related_products_category)
          let imgs = [`${import.meta.env.VITE_SERVER_URL}/${data.product?.img}`];
          data.product?.images.forEach(img => {
            imgs.push(`${import.meta.env.VITE_SERVER_URL}/${img.img}`);
          });
          setImages(imgs);

          setSQPActive(data.sqp_active?.id)
          console.log(data);
          setoverviewloading(false)
        })
        .catch(error => {
          console.error('Fetch error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          });


        });
    } catch (error) {
      console.log(error)
      setoverviewloading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>'
      });
    }
  }

  const fetchData = async (id) => {
    try {
      setoverviewloading(true)
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setdemo(data);
          setRelatedProducts(data.related_products_category)
          let imgs = [`${import.meta.env.VITE_SERVER_URL}/${data.product?.img}`];
          data.product_images.forEach(img => {
            console.log((img.img + "").slice(6));
            imgs.push(`${import.meta.env.VITE_SERVER_URL} ${(img.img + "").slice(6)}`);
          });
          setImages(imgs);
          setSQPActive(data.sqp_active?.id)
          console.log(data);
          setoverviewloading(false)
        })
        .catch(error => {
          console.error('Fetch error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          });
        });
    }
    catch (error) {
      console.log(error)
      setoverviewloading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>'
      });
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      fetchDataAuth(id)
    } else {
      fetchData(id)
    }

  }, []);


  const handlePincodeChange = (e) => {
    if (e.target.value.length === 6) {
      setPincode(e.target.value)
    }
  }

  const handleAddToCart = async () => {
    try {
      console.log(sqpActive, count);
      if (!localStorage.token) {
        return navigate('/login')
      }
      console.log(localStorage.token);
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/add-to-cart/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          sqp_id: sqpActive,
          selected_color: 'black',
          qty: count
        })
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      if (data.Message == 'Already In Cart') {

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/update-cart/${id}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            status: "add",
            sqp_id: sqpActive,
            selected_color: 'black',
            qty: count
          })
        })
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const datas = await res.json()
        console.log(datas);
        Swal.fire({
          title: 'Success!',
          text: 'Product Updated in Cart',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      }
      console.log(data);

      Swal.fire({
        title: 'Success!',
        text: 'Product Updated in Cart',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })

    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const handleAddWishlist = async () => {
    try {
      if (!localStorage.token) {
        return navigate('/login')
      }
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/add_wishlist/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          product_id: demo.product?.id,
        })
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      fetchDataAuth(id)
      Swal.fire({
        title: 'Success!',
        text: 'Product Added to Wishlist',
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      })
    }
    catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1200
      });
    }
  }

  const handleRemoveWishlist = async () => {
    try {
      if (!localStorage.token) {
        return navigate('/login')
      }
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/remove_wishlist/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        }
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      fetchDataAuth(id)
      Swal.fire({
        title: 'Success!',
        text: 'Product Removed from Wishlist',
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      })
    }
    catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1200
      });
    }
  }

  const handleApplyPincode = async () => {
    try {
      if (!localStorage.token) {
        return navigate('/login')
      }
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/my-cart`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          pincode: pincode
        })
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      Swal.fire({
        title: 'Success!',
        text: 'Pincode Added',
        icon: 'success',
      })
    }
    catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  const current = new Date();

  const [isAsideOpen, setAsideOpen] = useState(false);

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  const closeAside = () => {
    setAsideOpen(false);
  };
  const filteredImages = Images.filter(image => image.name === demo.product?.subsubcategory.name);

  const filterWomen = Images.filter(image => image.name === demo.product?.subcategory.name);



  const [activeButton, setActiveButton] = useState('inches');

  const handletoggleActive = (sizeType) => {
    setActiveButton(sizeType);
  };

  
  return (
    <div className={`${styles.padding}`}>

      <div className="flex items-center">
        {/* Nav menu- Breadcrumb */}
        <ol className={`inline-flex items-center space-x-1 md:space-x-3`}>
          <li className="inline-flex items-center">
            <Link
              to="/products"
              className=" inline-flex text-xs md:text-base text-c-gray-800 hover:underline md:ml-2"
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

              <Link to={`/products?gender=${demo.product?.category.id}`} className="ml-1 text-xs md:text-base text-c-gray-800 hover:underline md:ml-2">
                {demo.product?.category.name}
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>

              <Link to={`/products?category=${demo.product?.subcategory.id}`} className="ml-1 text-xs md:text-base text-c-gray-800 hover:underline md:ml-2">
                {demo.product?.subcategory.name}
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>

              <Link to={`/products?subcategory=${demo.product?.subsubcategory.id}`} className="ml-1 text-xs md:text-base text-c-gray-800 hover:underline md:ml-2">
                {demo.product?.subsubcategory.name}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="ml-1 text-xs md:text-base font-medium text-c-gray-800 md:ml-2">
                {demo.product?.name}
              </span>
            </div>
          </li>
        </ol>
      </div>

      <div className="block grid-cols-9 items-start gap-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        {/* Image Overview */}
        <div className="col-span-5 grid grid-cols-1 gap-2">
          {overviewloading ? <ProductOverviewCar /> : <ProductImageView arrayImages={demo.product?.images} />}
        </div>

        {/* Information Overview */}
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-c-gray-300 pb-2">
            <div className="flex justify-between items-center ">
              <p className=" mb-3.5 font-bold " style={{ fontSize: '1.3rem' }}>
                {demo.product?.name}
              </p>
              <div className="flex items-center gap-3">
                <button className="hover:scale-110">
                  {demo.wishlist ? <HeartIcon onClick={() => { handleRemoveWishlist() }} className="h-8 fill-current text-orange-500 w-8" /> : <HeartIcon onClick={() => handleAddWishlist()} className="h-8 w-8" />}
                </button>
                <div className="relative inline-block text-left">
                  <button
                    className="hover:scale-110 ease-in duration-200 focus:outline-none"
                    onClick={handleButtonClick}
                  >
                    <ShareIcon className="h-7 w-7" />
                  </button>

                  {isShareMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute right-1 z-10 mt-2 w-36 py-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <ul className="list-none">
                          <li className="hover:bg-gray-200/30 pl-2">
                            <button onClick={shareViaEmail} className="hover:scale-110 ease-in duration-200 flex items-center text-gray-700 block px-4 py-2 text-sm"
                              onMouseEnter={() => handleIconHover('email', 'gray')}
                              onMouseLeave={() => handleIconHover('email', '#212121')}
                            >
                              <EnvelopeIcon className="h-6 w-6 text-gray-700" style={{ fill: iconColors.email }} />
                              <span className="px-2 text-xs">
                                Email
                              </span>
                            </button>
                          </li>
                          <li className="hover:bg-gray-200/30 pl-2">
                            <button onClick={shareFacebook} className="hover:scale-110 ease-in duration-200 flex items-center text-gray-700 block px-4 py-2 text-sm"
                              onMouseEnter={() => handleIconHover('facebook', 'darkblue')}
                              onMouseLeave={() => handleIconHover('facebook', '#212121')}
                            >
                              <svg fill={iconColors.facebook} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                              </svg>
                              <span className="px-2 text-xs">
                                Facebook
                              </span>

                            </button>
                          </li>
                          <li className="hover:bg-gray-200/30 pl-2">
                            <button onClick={shareInstagram} className="hover:scale-110 ease-in duration-200 flex items-center text-gray-700 block px-4 py-2 text-sm"
                              onMouseEnter={() => handleIconHover('instagram', '#E91E63')}
                              onMouseLeave={() => handleIconHover('instagram', '#212121')}
                            >
                              <svg fill="white" stroke={iconColors.instagram} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                              </svg>
                              <span className="px-2 text-xs">
                                Instagram
                              </span>

                            </button>
                          </li>
                          <li className="hover:bg-gray-200/30 pl-2">
                            <button onClick={shareWhatsApp} className="hover:scale-110 ease-in duration-200 flex items-center text-gray-700 block px-4 py-2 text-sm"
                              onMouseEnter={() => handleIconHover('whatsapp', 'green')}
                              onMouseLeave={() => handleIconHover('whatsapp', '#212121')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={iconColors.whatsapp} className="bi bi-whatsapp" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                              </svg>
                              <span className="px-2 text-xs">
                                Whatsapp
                              </span>

                            </button>
                          </li>
                          <li className="hover:bg-gray-200/30 pl-2">
                            <button onClick={shareTwitter} className="hover:scale-110 ease-in duration-200 flex items-center text-gray-700 block px-4 py-2 text-sm"
                              onMouseEnter={() => handleIconHover('twitter', '#03A9F4')}
                              onMouseLeave={() => handleIconHover('twitter', '#212121')}
                            >
                              <svg fill={iconColors.twitter} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                              </svg>
                              <span className="px-2 text-xs">
                                Twitter
                              </span>

                            </button>
                          </li>
                          <li className="hover:bg-gray-200/30 pl-2">
                            <button onClick={copyUrlToClipboard} className="hover:scale-110 ease-in duration-200 flex items-center text-gray-700 block px-4 py-2 text-sm"
                              onMouseEnter={() => handleIconHover('copyLink', 'black')}
                              onMouseLeave={() => handleIconHover('copyLink', '#212121')}
                            >
                              <LinkIcon className="h-6 w-6 text-gray-500" style={{ fill: iconColors.copyLink }} />
                              <span className="px-2 text-xs">
                                Copy Link
                              </span>

                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4 ">
              <h3 className="text-heading mb-2.5 text-sm font-semibold capitalize md:text-lg">
                color : {demo.product?.color}
              </h3>
              {demo.product?.model_size}
            </div>
            
            <div className="mt-5 flex items-center pb-2">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                ₹ {demo.product?.discounted_price ? demo.product?.discounted_price : demo.product?.mrp}
              </div>
              {demo.product?.discounted_price && <div className="flex justify-center items-center">
                <span className="font-segoe pl-2 text-sm text-c-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                  ₹ {demo.product?.mrp}
                </span>
                <p className=" md:text-base lg:text-lg xl:text-xl pl-2 font-medium text-[#af0000]">
                  {demo.product?.discount_percentage}%</p>
              </div>}
            </div>

            <div className="text-green-600 font-normal text-lg py-2">
              In Stock
            </div>
          </div>

          <div className="border-b border-c-gray-300 pb-3  ">
            <div className="flex w-full flex-col">
              <div className="mb-4">
                <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                  size
                </h3>

                <ul className="colors -mr-3 flex flex-wrap">
                  {demo.product?.sqp.map((sizes) => (
                    <li
                      key={sizes.id}
                      onClick={() => { setSQPActive(sizes.id) }}
                      className={`text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-c-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out ${sqpActive == sizes.id && 'border-black'} hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm `}
                    >
                      {sizes.size}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-2">
                <div className="relative">
                  <button onClick={toggleAside} className="font-bold hover:scale-105 inline-flex items-center ">Size Chart
                    <ChevronRightIcon className="h-4 w-4 " />
                  </button>

                  {/* Aside bar */}
                  {isAsideOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <button
                        className="absolute top-4 right-0 text-black p-2 rounded-full bg-gray-200 shadow mx-2"
                        onClick={closeAside}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                      <div className="px-3 bg-white rounded-md">
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <h1 className={`${isAsideOpen ? 'text-2xl' : 'text-0 '} font-bold`}>Size Chart in cm and inches</h1>
                        {/* {demo.product?.subsubcategory.name == Images[i].name} 
                        <img src={CasualBottom_boxer} className="w-fit m-2" /> */}
                        {/* {demo.product?.category.name == "Men" ?() :()}  */}
                        {demo.product?.category?.name === 'Men' &&

                          filteredImages.map((image, index) => (
                            <div key={index} className='p-3'>
                              {/* You can customize the img tag based on your requirements */}
                              <img src={image.url} alt={image.name} />
                            </div>
                          ))

                        }
                        {demo.product?.category?.name === 'Women' &&

                          filterWomen.map((image, index) => (
                            <div key={index} className="flex flex-col  lg:gap-5 my-4">
                              <div className="w-full text-center">
                              <button
                                    className={`p-2 rounded-lg border m-2 ${activeButton === 'cms' ? 'bg-gray-800 text-white' : ''}`}
                                    onClick={() => handletoggleActive('cms')}
                                  >
                                    size in cms
                                </button>
                                <button
                                    className={`p-2 rounded-lg border ${activeButton === 'inches' ? 'bg-gray-800 text-white' : ''}`}
                                    onClick={() => handletoggleActive('inches')}
                                  >
                                    size in inches
                                </button>
                              </div>
                              {activeButton === 'cms' && (
                                    <img className=" w-fit mx-auto md:p-6" src={image.url[0]} alt={image.name} />
                                   
                                  )}
                          {activeButton === 'inches' && (
                                
                              image.url[1] && <>
                                  
                                  <img className="w-fit mx-auto md:p-6" src={image.url[1]} alt={image.name} />
                                </>
                                
                                )}

                            </div>
                          ))

                        }


                      </div>
                      </div>
                      </div>

                  )}
                  
                  
                  {/* <aside
                    className={`fixed z-50 right-0 top-0 h-full bg-gray-100 ${isAsideOpen ? 'w-[50vw]' : 'hidden'} shadow-2xl transition-all duration-300 ease-in-out`}
                  >


                    
                   
                  
                  </aside> */}
                </div>
              </div>
            </div>
            
          </div>
          <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-c-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">

            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-c-gray-300 md:h-12">
              <button
                className="text-xl hover:bg-gray-200/30 flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-c-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                onClick={decrement}
              >
                -
              </button>
              <span className="duration-250 text-heading flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24">
                {count}
              </span>
              <button
                className="text-xl hover:bg-gray-200/30 flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-c-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                onClick={increment}
              >
                +
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => { handleAddToCart() }}
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Buy Now
            </button>
            {/* <button
              type="button"
              onClick={() => { navigate("/products/cart") }}
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Proceed to cart
            </button> */}
          </div>
          <div className="py-6 border-b-gray-500">
            <label htmlFor="pincode" className="flex items-center text-lg font-medium  uppercase ">
              <span className="font-bold ">Delivery & Services </span>
              <TruckIcon className="h-7 w-7 text-gray-800/80 ml-1" />
            </label>
            <PincodeForm />
          </div>
          <div>
            <AccordionItem
              title="Product Details"
              content={
                <div className="grid grid-cols-2 gap-x-4">
                  <div className=" col-span-1 grid grid-rows-3 gap-y-6 border-r border-black/60">
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Occasion</h3>
                      <p className="text-[18px]">{demo.product?.occasion != "nan" ? demo.product?.occasion : 'N/A' || "Occasion"}</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Sleeve Type</h3>
                      <p className="text-[18px]">{demo.product?.sleeve != "nan" ? demo.product?.sleeve : "N/A" || "Sleeve"}</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Fit</h3>
                      <p className="text-[18px]">{demo.product?.fit != "nan" ? demo.product?.fit : "N/A" || "Fit"}</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Origin</h3>
                      <p className="text-[18px]">MADE IN INDIA</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold"> </h3>
                      <p className="text-[18px]">{" "}</p>
                    </div>
                  </div>
                  <div className=" col-span-1 grid grid-rows-3 gap-y-6">
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Material</h3>
                      <p className="text-[18px]">{demo.product?.fabric_detail != "nan" ? demo.product?.fabric_detail : "N/A"}</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Design/Surface</h3>
                      <p className="text-[18px]">{demo.product?.design_surface != "nan" ? demo.product?.design_surface : "N/A"}</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Neckline Type</h3>
                      <p className="text-[18px]">{demo.product?.neck_type != "nan" ? demo.product?.neck_type : "N/A"}</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Color Family</h3>
                      <p className="text-[18px]">{demo.product?.cf != "nan" ? demo.product?.cf : "N/A"}</p>
                    </div>
                    <div className="row-span-1 px-2">
                      <h3 className="text-base text-gray-800/80 font-semibold">Style</h3>
                      <p className="text-[18px]">{demo.product?.style != "nan" ? demo.product?.style : "N/A"}</p>
                    </div>
                  </div>
                </div>
              }
            />
            <AccordionItem
              title="Additional Information"
              content={
                <div className="text-base font-semibold text-gray-800/80">

                  <div dangerouslySetInnerHTML={{ __html: demo.product?.Washcare }} />

                </div>
              }
            />
            {/* <AccordionItem
              title="Customer Reviews"
              content={
                <div className="flex flex-col gap-3">
                  <div className="user-review-userReviewWrapper ">
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center p-1 rounded bg-orange-400">
                          <span className="text-base">4</span>
                          <span>
                            <StarIcon className="h-4 w-4 " />
                          </span>
                        </div>
                      </div>
                      <div className="px-3">The product sheds color dye right after first use. It is advisable to wash it alone. The product is thinner but it's worth it if you're paying anything between 300 - 350. Also buy one size more than what is mentioned.</div>
                    </div>
                    <div className="px-3">Rajesh  | {`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`}</div>
                  </div>
                </div>

              }
            /> */}
          </div>

        </div>

        {/* Related Products */}
        <div className="col-span-9">
          <ReviewProduct id={id} />
          <h2 className={`text-2xl font-semibold ${styles.paddingX}`}>You may also like :</h2>
          <RelatedProducts fetchData={fetchData} fetchDataAuth={fetchDataAuth} relatedProducts={relatedProducts} />
        </div>
      </div>


    </div>
  )
}

export default ProductOverview