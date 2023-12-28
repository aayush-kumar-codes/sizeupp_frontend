import { useRef, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Outlet, Link } from 'react-router-dom';
import { TruckIcon } from "@heroicons/react/24/outline";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { AuthContext } from '../context/AuthProvider';




const Profileview = () => {
  const navigate = useNavigate()

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const {profiledata,fetchProfileData} = useContext(AuthContext)

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const [formdata, setformdata] = useState({
    'address_line_1': 'Plot 1 sv road naryan mandir Nashik ',
    'address_line_2': 'Plot 32 MK road naryan mandir Nashik',
    'city': 'Nashik',
    'state': 'Maharashtra',
    'postal_code': '422001'

  })

  const handleSubmit = async () => {
    console.log(localStorage.token)
    const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/address', {
      method: 'POST',
      headers: {
        'Authorization': `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    })

    const data = await res.json()
    console.log(data)
  }


  const handleAddAddress = async () => {
    try {

      if (!localStorage.token) {
        return navigate('/login')
      }
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/add-to-cart/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({

        })
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      navigate('/products/cart')

    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(()=>{
    fetchProfileData()
  },[])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log(localStorage.getItem("user_verified") == 'false' || localStorage.getItem("user_verified") === 'undefined')


  return (
    <>
      <main className=" flex justify-between flex-col">
        

        <section
          className=" w-full flex-grow border-b py-5 lg:flex lg:flex-row lg:py-10"
        >

          <section className="hidden w-[300px] min-h-[700px] gap-4 flex-shrink-0 px-12 lg:flex flex-col shadow-lg">
            <Link to="/profile">
              <div className="border-b py-5">
                <div className="flex items-center">
                  <img
                    width="40px"
                    height="40px"
                    className="rounded-full object-cover"
                    src="https://cdn2.iconfinder.com/data/icons/web-solid/32/user-512.png"
                    alt="Red woman portrait"
                  />
                  <div className="ml-5">
                    <p className="font-medium text-gray-500">Hello,</p>
                    <p className="font-bold">{profiledata.user_info?.first_name + profiledata.user_info?.last_name}</p>
                  </div>
                </div>
              </div>

            </Link>

            {/* <div className="flex border p-4 rounded-lg hover:bg-gray-200">
              <div className="w-full">
                <div className="flex w-full">
                  <div className="flex flex-col gap-2">
                    <Link to="account-settings">
                      <button
                        className="flex items-center gap-2 font-medium"
                        
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                          />
                        </svg>
                        Account Settings
                      </button>
                    
                    </Link>


                  </div>
                </div>
              </div>
            </div> */}
            
            <div className="flex border p-4 rounded-lg hover:bg-gray-200">
                    <div className="flex w-full">
                      <div className="flex flex-col ">
                        <Link
                          to="manage-address"
                          className="flex items-center gap-2 font-medium active:text-violet-900"
                        >
                         <BuildingOffice2Icon className="h-6 w-6 " />

                          Manage Address
                        </Link>
                      </div>
                    </div>
                  </div>

            <div className="flex border p-4 rounded-lg hover:bg-gray-200">
              <div className="flex w-full">
                <div className="flex flex-col ">

                  <Link
                    to="/profile/my-orders"
                    className="flex items-center gap-2 font-medium active:text-violet-900 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>

                    My Order History
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="flex border p-4 rounded-lg hover:bg-gray-200">
              <div className="flex w-full">
                <div className="flex flex-col ">

                  <Link
                    to="/profile/track-order"
                    className="flex items-center gap-2 font-medium active:text-violet-900 "
                  >
                    <TruckIcon className="h-6 w-6 " />

                    Track Order
                  </Link>
                </div>
              </div>
            </div> */}

            <div className="flex border p-4 rounded-lg hover:bg-gray-200">
              <div className="flex w-full">
                <div className="flex flex-col ">
                  <Link
                    to="contact"
                    className="flex items-center gap-2 font-medium active:text-violet-900"
                  >
                   <PhoneIcon className="h-6 w-6 " />

                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="flex border p-4 rounded-lg hover:bg-gray-200">
              <div className="flex w-full">
                <div className="flex flex-col ">
                  <Link
                    to="/"
                    className="flex items-center gap-2 font-medium active:text-violet-900"
                  >
                    <ArrowsRightLeftIcon className="h-6 w-6 " />

                    Return and Replace
                  </Link>
                </div>
              </div>
            </div> */}

            <div className="flex py-12  ">
              <div className="flex w-full">
                <div className="flex flex-col gap-2 border p-3 rounded-lg px-4 hover:bg-gray-200 hover:scale-x-105">
                  <Link
                    to="/"
                    className="flex items-center gap-2 font-medium active:text-violet-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>

                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- /sidebar  -->

        <!-- option cards  --> */}

          <div className="mb-5 flex items-center justify-between px-5 md:hidden">
            <div className="flex gap-3">
              <div className="py-5">
                <Link to="/profile">
                  <div className="flex items-center">
                    <img
                      width="40px"
                      height="40px"
                      className="rounded-full object-cover"
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Red woman portrait"
                    />
                    <div className="ml-5">
                      <p className="font-medium text-gray-500">Hello,</p>
                      <p className="font-bold">{profiledata.user_info?.first_name + profiledata.user_info?.last_name}</p>
                    </div>
                  </div>

                </Link>
              </div>
            </div>


            <div className="flex lg:hidden">
              <button onClick={handleToggleSidebar}
                className="flex items-center  px-3 py-2 text-blue-600 border border-blue-400 rounded dark:text-gray-400 hover:text-blue-800 hover:border-blue-300 dark:border-gray-400 lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
              {/* Sidebar */}
              {isSidebarOpen && (
                // <div className="fixed left-0 top-0 w-full h-full bg-opacity-50 bg-gray-800">
                // </div>
                
                <div ref={sidebarRef}
                  className="fixed left-0 top-0 transform shadow-md h-full  w-64 bg-white border p-4 z-50 pt-24 translate-x-0 ease-in">
                  {/* Add your sidebar content here */}
                  
                   <div className="flex border p-4 rounded-lg hover:bg-gray-200">
                    <div className="flex w-full">
                      <div className="flex flex-col ">

                        <Link
                          to="account-settings"
                          className="flex items-center gap-2 font-medium active:text-violet-900 "
                        >
                          <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                />
                              </svg>

                          Account Settings
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex border p-4 rounded-lg hover:bg-gray-200">
                    <div className="flex w-full">
                      <div className="flex flex-col ">
                        <Link
                          to="manage-address"
                          className="flex items-center gap-2 font-medium active:text-violet-900"
                        >
                         <BuildingOffice2Icon className="h-6 w-6 " />

                          Manage Address
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex border p-4 rounded-lg hover:bg-gray-200">
                    <div className="flex w-full">
                      <div className="flex flex-col ">

                        <Link
                          to="/profile/my-orders"
                          className="flex items-center gap-2 font-medium active:text-violet-900 "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                              clipRule="evenodd"
                            />
                          </svg>

                          My Order History
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex border p-4 rounded-lg hover:bg-gray-200">
                    <div className="flex w-full">
                      <div className="flex flex-col ">

                        <Link
                          to="/profile/track-order"
                          className="flex items-center gap-2 font-medium active:text-violet-900 "
                        >
                          <TruckIcon className="h-6 w-6 " />

                          Track Order
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex border p-4 rounded-lg hover:bg-gray-200">
                    <div className="flex w-full">
                      <div className="flex flex-col ">
                        <Link
                          to="contact"
                          className="flex items-center gap-2 font-medium active:text-violet-900"
                        >
                          <PhoneIcon className="h-6 w-6 " />

                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex border p-4 rounded-lg hover:bg-gray-200">
                    <div className="flex w-full">
                      <div className="flex flex-col ">
                        <Link
                          to="/"
                          className="flex items-center gap-2 font-medium active:text-violet-900"
                        >
                         <ArrowsRightLeftIcon className="h-6 w-6 " />
                          Return and Replace
                        </Link>
                      </div>
                    </div>
                  </div> */}

                  <div className="flex py-12">
                    <div className="flex w-full">
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/"
                          className="flex items-center gap-2 font-medium active:text-violet-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                            />
                          </svg>

                          Log Out
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>

              )}
            </div>
          </div>
          <div className="w-full bg-gray-50/40">

          <Outlet />
          </div>
        </section>
      </main>
    </>
  )
}

export default Profileview