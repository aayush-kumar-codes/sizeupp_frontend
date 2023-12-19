import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Outlet, Link } from 'react-router-dom';
import { TruckIcon } from "@heroicons/react/24/outline";



const Profileview = () => {
  const navigate = useNavigate()

  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/userprofile`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `token ${localStorage.token}`
      }
    }).then((res) => res.json().then((data) => {
      console.log(data)
    }))
  }, [])

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
        <div>



          <nav className="mx-auto w-full mt-4 max-w-[1200px] px-5">
            <ul className="flex items-center">
              <li className="cursor-pointer">
                <a href="index.html">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"
                    />
                    <path
                      d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <span className="mx-2 text-gray-500">&gt;</span>
              </li>

              <li className="text-gray-500">Account</li>
            </ul>

          </nav>

        </div>

        <section
          className=" w-full flex-grow border-b py-5 lg:flex lg:flex-row lg:py-10"
        >

          <section className="hidden w-[300px] flex-shrink-0 px-12 lg:block rounded-lg border">
            <Link to="/profile">
              <div className="border-b py-5">
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
                    <p className="font-bold">Kushal Bauskar</p>
                  </div>
                </div>
              </div>

            </Link>

            <div className="flex border-b p-4">
              <div className="w-full">
                <div className="flex w-full">
                  <div className="flex flex-col gap-2">
                    <button
                      className="flex items-center gap-2 font-medium"
                      onClick={toggleDropdown}
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
                      Manage account
                    </button>


                  </div>
                </div>
              </div>
            </div>
            <div
              className={`drop-down flex flex-col px-6 gap-2 ${dropdownVisible ? 'visible' : 'hidden'
                } transition ease-in-out duration-300`}
            >
              <Link to="javascript:void(0)"
                className="active:blue-900 text-gray-500 duration-100 hover:text-blue-800"
              >
                Profile information
              </Link>
              <Link to="manage-address.html"
                className="text-gray-500 duration-100 hover:text-blue-800"
              >
                Manage Addresses
              </Link>
              <Link to="change-password.html"
                className="text-gray-500 duration-100 hover:text-blue-800"
              >
                Change password
              </Link>
            </div>
            <div className="flex border-b p-4 rounded-lg hover:bg-blue-300">
              <div className="flex w-full">
                <div className="flex flex-col x">

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
            <div className="flex border-b p-4 rounded-lg hover:bg-blue-300">
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
            <div className="flex border-b p-4 rounded-lg hover:bg-blue-300">
              <div className="flex w-full">
                <div className="flex flex-col ">
                  <Link
                    to="payment-methods.html"
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
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>

                    Payment Methods
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex border-b p-4 rounded-lg hover:bg-blue-300">
              <div className="flex w-full">
                <div className="flex flex-col ">
                  <Link
                    to="/favourite"
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
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>

                    My Wishlist
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex py-5">
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
                      <p className="font-bold">Kushal Bauskar</p>
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
                  <path fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
              {/* Sidebar */}
              {isSidebarOpen && (


                <div ref={sidebarRef}
                  className="fixed transform shadow-md left-0 top-0 h-full w-64 bg-white  border p-4 z-50 pt-24 translate-x-0 ease-in">
                  {/* Add your sidebar content here */}
                  <div className="flex border-b p-4">
                    <div className="w-full">
                      <div className="flex w-full">
                        <div className="flex flex-col gap-2">
                          <button
                            className="flex items-center gap-2 font-medium"
                            onClick={toggleDropdown}
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
                            Manage account
                          </button>


                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`drop-down flex flex-col px-6 gap-2 ${dropdownVisible ? 'visible' : 'hidden'
                      } transition ease-in-out duration-300`}
                  >
                    <Link to="javascript:void(0)"
                      className="active:blue-900 text-gray-500 duration-100 hover:text-blue-800"
                    >
                      Profile information
                    </Link>
                    <Link to="manage-address.html"
                      className="text-gray-500 duration-100 hover:text-blue-800"
                    >
                      Manage Addresses
                    </Link>
                    <Link to="change-password.html"
                      className="text-gray-500 duration-100 hover:text-blue-800"
                    >
                      Change password
                    </Link>
                  </div>
                  <div className="flex border-b p-4 rounded-lg hover:bg-blue-300">
                    <div className="flex w-full">
                      <div className="flex flex-col x">

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
                  <div className="flex border-b p-4 rounded-lg hover:bg-blue-300">
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
                  <div className="flex border-b p-4 rounded-lg hover:bg-blue-300">
                    <div className="flex w-full">
                      <div className="flex flex-col ">
                        <Link
                          to="payment-methods.html"
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
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                            />
                          </svg>

                          Payment Methods
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex border-b p-4 rounded-lg hover:bg-blue-300">
                    <div className="flex w-full">
                      <div className="flex flex-col ">
                        <Link
                          to="/favourite"
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
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>

                          My Wishlist
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex py-5">
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

          <Outlet />
        </section>
      </main>
    </>
  )
}

export default Profileview