import React from 'react'
import Carousel from '../components/HomeK/Carousel'
import ShopCategoryWise from '../components/HomeK/ShopCategoryWise'

import ShopNow from '../components/HomeK/ShopNow'
import { MagnifyingGlassIcon} from "@heroicons/react/24/outline";


import { useState, useEffect, useRef, useContext } from 'react'
import { styles } from '../style'
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate,useSearchParams } from 'react-router-dom'
import { logo } from '../assets/banners'
import AccordionItem from '../components/Custom/AccordionItem'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthProvider'


import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Footer from '../components/Footer/Footer'
import Slider from '../components/Slider/Slider'


const Megamenu = () => {

    const [data, setData] = useState([])
    const { setfilterdata, setnavsearch, setnavgender, setcategory } = useContext(AuthContext)

    const [megamenuhide, setMegamenuhide] = useState(false)

    const handleSearch = (id, gender, cat) => {
        setMegamenuhide(true)
        navigate(`/products?gender=${gender}&category=${cat}&subcategory=${id}`)
        setMegamenuhide(false)
    }

    const navigate = useNavigate()

    useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/product/category-details", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(res => res.json().then(data => {
            console.log(JSON.stringify(data))
            setData(data)
            localStorage.setItem("cat_list", JSON.stringify(data))
        }
        ))
    }, [])

    return (
        <div className={`${styles.paddingX} hidden md:block py-4 w-full relative bg-inherit z-40 `}>
            {/* layout prefixer */}
            <div className={`flex items-center gap-10 justify-end mx-auto max-w-xl`}>
                {/* All Products */}
                <div className="group">

                    <Link to="/products"
                        onClick={() => {
                            setfilterdata({
                                gender: [],
                                color: [],
                                size: [],
                                search: "",
                                category: ""
                            })
                        }} className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        All Products
                    </Link>
                </div>


                {/* Woman */}
                { <div className="group">

                    <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        Women
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className={`hidden ${megamenuhide ? 'hidden' : 'grid'} group-hover:grid grid-cols-${data.women_category_data?.length} gap-4 justify-between absolute right-4 p-6 w-[30vw] bg-secondary rounded-md  drop-shadow-md`}>
                        {/* <div className="col-span-1">
                            <p className="text-base font-semibold">Women&apos;s Fashion Era</p>
                            <p className="text-sm text-gray-500">New products</p>
                            < img src={WWhite1} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            <Link to="/products">
                                < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                            </Link>
                            <Link to="/terms-condition">
                                < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                            </Link>
                        </div> */}
                        { data.women_category_data && data.women_category_data[0]?.subcategories.map((cat) => {
                            return (
                                <div key={cat.id} className="col-span-1 ">
                                    <h2 className="text-base font-semibold mb-2">{cat.name}</h2>
                                    <ul className="grid grid-flow-row gap-2">
                                        {cat.subsubcategories?.length > 0 && cat.subsubcategories?.map((items, i) => {
                                            return (
                                                <li onClick={() => handleSearch(items.name, 'Women', cat.name)} key={i} className="text-sm text-gray-800/80 font-normal hover:underline cursor-pointer">
                                                    {items.name}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                </div>)
                        })
                        }
                        {/* <div className="col-span-1 ">
                            <ul className="grid grid-flow-row gap-4">
                                {['Festive-Wear', 'Winter-Wear'].map((items, i) => {
                                    return (
                                        <li onClick={()=>handleSearch(items.name)} key={i} className="text-base font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div> */}
                    </div>
                </div>}

                {/* 
                {data.length > 0 && data.map((item, index) => (
                    <div key={index} className="group">
                        <div >
                            <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                                {item.subcategory.category.name}
                                <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                            </p>
                            <div className="hidden group-hover:grid grid-cols-4 gap-10 justify-between absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">
                                <div className="col-span-1">
                                    <p className="text-base font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">New products</p>
                                    <img src={Maroon1} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                                    <button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                                    <p className="text-sm text-gray-500 mt-4">@Terms and conditions apply.</p>
                                </div>
                             
                            </div>
                        </div>
                    </div>
                ))} */}

                {/* Man */}
                <div className="group">

                    <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        Men
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className={`${megamenuhide ? 'hidden' : 'block'}`}>
                        <div className={`hidden focus:hidden group-hover:grid grid-cols-${data.men_category?.length} gap-4 justify-between absolute right-4 p-6 w-[25vw] bg-secondary rounded-md drop-shadow-md`}>
                            {/* <div className="col-span-1">
                            <p className="text-base font-semibold">Men&apos;s Fashion Era</p>
                            <p className="text-sm text-gray-500">New products</p>
                            < img src={Maroon1} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            <Link to="/products">
                                < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                            </Link>
                            <Link to="/terms-condition">
                                < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                            </Link>
                        </div> */}
                            {data.men_category && data.men_category[0]?.subcategories.map((cat) => {
                                return (
                                    <div key={cat.id} className="col-span-1 ">
                                        <h2 className="text-base font-semibold mb-2">{cat.name}</h2>
                                        <ul className="grid grid-flow-row gap-2">
                                            {cat.subsubcategories?.length > 0 && cat.subsubcategories?.map((items, i) => {
                                                return (
                                                    <li onClick={() => handleSearch(items.name, 'Men', cat.name)} key={i} className="text-sm text-gray-800/80  hover:underline cursor-pointer">
                                                        {items.name}
                                                    </li>
                                                )
                                            })
                                            }
                                        </ul>
                                    </div>)
                            })
                            }
                            {/* <div className="col-span-1 ">
                            <ul className="grid grid-flow-row gap-4">
                                {['Ethnic-Wear', 'Evening-Wear', 'Formal-Wear', 'Winter-Wear', 'Accessories'].map((items, i) => {
                                    return (
                                        <li key={i} className="text-base font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div> */}
                        </div>
                    </div>
                </div>

                {/* Festive Offers */}
                {/* <div className="group">

                    <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        Accessories
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:flex flex-col absolute px-6 py-6 w-1/6 bg-secondary rounded-md  drop-shadow-md">
                        <h2 className="text-base font-semibold mb-2">Casual Bottomwear</h2>

                        <div className="text-base text-gray-800/80 font-normal hover:underline cursor-pointer">Boxer</div>
                    </div>
                </div> */}

                {/* Sales */}
                {/* <div className="group">

                    <p className='text-md  font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        Sales
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:grid grid-cols-4 absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">
                        <div className="col-span-1">
                            <p className="text-base text-black font-semibold">Online Only</p>
                            <p className="text-sm text-gray-500">Shop online only products</p>
                            < img src={GEGreen5} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            <Link to="/products">
                                < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                            </Link>
                            <Link to="/terms-condition">
                                < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                            </Link>
                        </div>
                        <div>
                            <ul>
                                <li>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </div >
    )
};

function Navbar() {
    const noAuthMenuItems = [
        { name: "Log in", href: "/login" },
        { name: "Sign up", href: "/register" },
    ]

    const menuItems = [
        {
            name: "Logout",
            href: "/login",
            func: (name, href) => {
                handleLogout(name, href)
            }
        }
    ]

    const mobileMenuItems = [
        {
            dropdown: true,
            name: 'Account',
            category: [
                {
                    name: 'Profile',
                    href: '/profile',
                },
                {
                    name: 'My Orders',
                    href: '/profile/my-orders'
                },
                {
                    name: 'Wishlist',
                    href: '/products/favourite'
                },
                {
                    name: 'Cart',
                    href: '/products/cart'
                },
            ]
        },
        {
            dropdown: true,
            name: 'Men',
            category: [
                {
                    dropdown: true,
                    name: 'Casual Topwear',
                    category: [
                        {
                            name: 'Casual Shirts',
                            href: '/products'
                        },
                        {
                            name: 'Core Tee',
                            href: '/products'
                        },
                        {
                            name: 'Formal Shirts',
                            href: '/products'
                        },
                        {
                            name: 'Kurta',
                            href: '/products'
                        },
                        {
                            name: 'Polo Tshirts',
                            href: '/products'
                        }
                    ]
                },
                {
                    dropdown: true,
                    name: 'Casual Bottomwear',
                    category: [
                        {
                            name: 'Chino',
                            href: '/products'
                        },
                        {
                            name: 'Denim',
                            href: '/products'
                        },
                        {
                            name: 'Joggers',
                            href: '/products'
                        },
                        {
                            name: 'Pyjama',
                            href: '/products'
                        },
                        {
                            name: 'Track Pants',
                            href: '/products'
                        }
                    ]
                },
                {
                    dropdown: true,
                    name: 'Ethnic Wear',
                    category: [
                        {
                            name: 'Kurta',
                            href: '/products'
                        },
                        {
                            name: 'Waist Coat',
                            href: '/products'
                        }
                    ]
                },
                {
                    name: 'Evening Wear',
                    href: '/products'
                },
                {
                    name: 'Formal Wear',
                    href: '/products'
                },
                {
                    name: 'Winter Wear',
                    href: '/products'
                }
            ],
        },
        {
            dropdown: true,
            name: 'Women',
            category: [
                {
                    dropdown: true,
                    name: 'Casual Topwear',
                    category: [
                        {
                            name: 'Co Ord Set',
                            href: '/products'
                        },
                        {
                            name: 'Core Tee',
                            href: '/products'
                        },
                        {
                            name: 'Dress',
                            href: '/products'
                        },
                        {
                            name: 'Kurta',
                            href: '/products'
                        },
                        {
                            name: 'Kurta and Pants',
                            href: '/products'
                        },
                        {
                            name: 'Shirts',
                            href: '/products'
                        },
                        {
                            name: 'Sweat Shirts',
                            href: '/products'
                        },
                        {
                            name: 'Top',
                            href: '/products'
                        },
                        {
                            name: 'T Shirts',
                            href: '/products'
                        },
                        {
                            name: 'Tunic',
                            href: '/products'
                        }
                    ]
                },
                {
                    name: 'Casual Bottomwear',
                    dropdown: true,
                    category: [
                        {
                            name: 'Jeggings',
                            href: '/products'
                        },
                        {
                            name: 'Leggings',
                            href: '/products'
                        },
                        {
                            name: 'Pants',
                            href: '/products'
                        },
                        {
                            name: 'Trousers',
                            href: '/products'
                        }
                    ]
                },
                {
                    name: 'Festive Wear',
                    href: '/products'
                },
                {
                    name: 'Winter Wear',
                    href: '/products'
                }
            ]
        }
    ]

    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navigate = useNavigate()

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    }
    const profileRef = useRef(null);

    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            // Clicked outside the account icon, close the menu
            setIsProfileOpen(false);
        }
    };

    useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // fetch from server
    const handleLogout = async () => {
        try {
            if (!localStorage.token) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You are not logged in!',
                    footer: '<a href="/login">Login</a>'
                })
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.token}`
                }
            })

            if (!res.ok) {
                throw new Error('HTTP Error! status: ' + res.status)
            }
            const data = await res.json()
            console.log(data)
            Swal.fire({
                icon: 'success',
                title: 'Logged out successfully!',
                showConfirmButton: false,
                timer: 1200
            })
            localStorage.clear()
            navigate('/')
        } catch (error) {
            console.log('Fetch Error :', error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="/login">Login</a>'
            })
        }
    }

    const [colorNav, SetColorNav] = useState(false);

    const ChangeColornav = () => {
        if (window.scrollY >= 70) {
            SetColorNav(true);
        }
        else {
            SetColorNav(false);
        }
    }
    window.addEventListener('scroll', ChangeColornav);

    const {search,setSearch,handlefetchProducts} = useContext(AuthContext)

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const [searchParams,setSearchParams] = useSearchParams()

    useEffect(()=>{ 
        if(searchParams.has('gender')){
            console.log(searchParams.get('gender'))
        }
    },[])


    return (
        // container
        <div className={colorNav ? `px-10 text-white w-full sticky top-0 z-50` : `px-10 text-white w-full absolute top-0 z-50`}>
            {/* layout prefixer */}
            <div className="flex  items-center justify-between py-2">
                <div className="flex">
                    
                    {/* brand title */}
                    <Link to="/" className='cursor-pointer'>
                        <img src={logo} alt="logo" className='w-28 object-contain' />
                    </Link>
            </div>
                
                <div className="lg:flex hidden justify-end items-end w-2/5">
                            <div className="flex rounded-full border focus-within:border-gray-300 px-6">
                                <input type="text" value={search} onChange={(e)=>{handleSearch(e)}} placeholder="Search " className="bg-transparent w-full  focus:outline-none pr-4 font-medium border-0 focus:ring-0 px-0 py-2" name="search"/>
                                    <button type="button" onClick={()=>{handlefetchProducts(); navigate(`/products?navsearch=${search}`)}} className="flex flex-row items-center justify-center px-2 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white border-transparent my-1 h-[30px] -mr-3" >
                                    <MagnifyingGlassIcon className="h-4 w-4 text-white "/>
                                </button>

                            </div>
                    </div>
                    
                
                <div className="flex items-center ">
                    <Megamenu />
                    <div className='lg:flex hidden cursor-pointer' ref={profileRef}>
                                        <button className='flex flex-col items-center cursor-pointer hover:scale-110' onClick={toggleProfile}>
                                            <Bars3BottomLeftIcon className="h-6 w-6 stroke-2 " />
                                            <span className='text-xs font-medium'>Account</span>

                                        </button>

                                        {isProfileOpen && <div className="absolute right-6 top-16 z-10 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <ul className="py-1" role="none">
                                                {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                                               {localStorage.token && <><li className='hover:bg-gray-200/30 pl-2 '>
                                                    <Link to="/profile" className="text-gray-700 block px-4 py-1 text-sm">
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li className='hover:bg-gray-200/30 pl-2 '>
                                                    <Link to="/products/favourite" className="text-gray-700 block px-4 py-1.5 text-sm">
                                                        Wishlist
                                                    </Link>
                                                </li>
                                                <li className='hover:bg-gray-200/30 pl-2 '>
                                                    <Link to="/products/cart" className="text-gray-700 block px-4 py-1.5 text-sm">
                                                        Cart
                                                    </Link>
                                                </li>
                                                <li className='hover:bg-gray-200/30 pl-2'>
                                                    <Link to="/profile/my-orders" className="text-gray-700 block px-4 py-1.5 text-sm">
                                                        My Orders
                                                    </Link>
                                                </li>
                                                </>}
                                                {!localStorage.token && noAuthMenuItems.map((item) => (
                                                    <li key={item.name} className='hover:bg-gray-200/30 pl-2'>
                                                        <Link to={item.href} className="text-gray-700 block px-4 py-1.5 text-sm">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {localStorage.token && menuItems.map((item) => (
                                                    <li onClick={() => {
                                                        item.name == 'Logout' && item.func(item.name, item.href)
                                                    }} key={item.name} className='hover:bg-gray-200/30 pl-2'>
                                                        <Link to={item.name == 'Logout' ? '' : item.href} className="text-gray-700 block px-4 py-1.5 text-sm">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>}

                                    </div>
                   {/* <div className="flex items-center  gap-4 w-1/5">
                        
                        
                         <div className='hidden lg:block '>
                            <ul className="inline-flex space-x-10">

                                <li className='flex  gap-1 cursor-pointer' onClick={() => { navigate("/products/favourite") }}>
                                    <Link to="/products/favourite" className='flex flex-col items-center hover:scale-110 ease-in duration-200'>
                                        <HeartIcon className='w-6 h-6 stroke-2' />
                                        <span className='text-xs font-medium '>Wishlist</span>
                                    </Link>
                                </li>
                                <li >
                                    <Link to="/products/cart" className='flex flex-col items-center hover:scale-110 ease-in duration-200'>
                                        <ShoppingCartIcon className='w-6 h-6 stroke-2 ' />
                                        <span className='text-xs font-medium '>Cart</span>
                                    </Link>
                                </li>
                                <li >
                                    <div className=' cursor-pointer' ref={profileRef}>
                                        <button className='flex flex-col items-center cursor-pointer hover:scale-110' onClick={toggleProfile}>
                                            <UserIcon className="h-6 w-6 stroke-2 " />
                                            <span className='text-xs font-medium'>Account</span>

                                        </button>

                                        {isProfileOpen && <div className="absolute right-6 top-16 z-10 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <ul className="py-1" role="none">
                                                
                                                <li className='hover:bg-gray-200/30 pl-2 '>
                                                    <Link to="/profile" className="text-gray-700 block px-4 py-2 text-sm">
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li className='hover:bg-gray-200/30 pl-2'>
                                                    <Link to="/profile/my-orders" className="text-gray-700 block px-4 py-2 text-sm">
                                                        My Offers
                                                    </Link>
                                                </li>
                                                <li className='hover:bg-gray-200/30 pl-2'>
                                                    <Link to="/profile/track-orders" className="text-gray-700 block px-4 py-2 text-sm">
                                                        Track order
                                                    </Link>
                                                </li>
                                                <li className='hover:bg-gray-200/30 pl-2'>
                                                    <Link to="/profile/account-settings" className="text-gray-700 block px-4 py-2 text-sm">
                                                        Settings
                                                    </Link>
                                                </li>
                                                {!localStorage.token && noAuthMenuItems.map((item) => (
                                                    <li key={item.name} className='hover:bg-gray-200/30 pl-2'>
                                                        <Link to={item.href} className="text-gray-700 block px-4 py-2 text-sm">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {localStorage.token && menuItems.map((item) => (
                                                    <li onClick={() => {
                                                        item.name == 'Logout' && item.func(item.name, item.href)
                                                    }} key={item.name} className='hover:bg-gray-200/30 pl-2'>
                                                        <Link to={item.name == 'Logout' ? '' : item.href} className="text-gray-700 block px-4 py-2 text-sm">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>}

                                    </div>
                                </li>




                            </ul>
                        </div> 

                    </div>*/}

                </div>

                {/* Mobile/small-Tab Menu */}
                <div className="lg:hidden">
                    <Bars3BottomLeftIcon onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
                </div>

                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden text-black">
                        <div className="divide-y-2 divide-c-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5">
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center space-x-2">

                                        <Link to="/" className="">
                                            <img src={logo} className="w-32" />
                                        </Link>
                                    </div>
                                    <div className="-mr-2">
                                        <XMarkIcon
                                            onClick={toggleMenu}
                                            className="cursor-pointer inline-flex w-6 stroke-2"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-4">
                                        {mobileMenuItems.map((item) => {
                                            return (
                                                <>
                                                    {item.dropdown ?
                                                        <AccordionItem
                                                            key={item.name}
                                                            title={item.name}
                                                            content={
                                                                item.category.map((subitem) => {
                                                                    return (
                                                                        subitem.dropdown ?
                                                                            <div className='px-4'>
                                                                                <AccordionItem
                                                                                    key={subitem.name}
                                                                                    title={subitem.name}
                                                                                    content={
                                                                                        subitem.category.map((subsubitem) => {
                                                                                            return (
                                                                                                <Link
                                                                                                    key={subsubitem.name}
                                                                                                    to={subsubitem.href}
                                                                                                    onClick={toggleMenu}
                                                                                                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                                                                >
                                                                                                    {subsubitem.name}
                                                                                                </Link>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                />

                                                                            </div>
                                                                            :
                                                                            <Link
                                                                                key={subitem.name}
                                                                                to={subitem.href}
                                                                                onClick={toggleMenu}
                                                                                className="py-3 px-4 font-bold flex items-center rounded-md hover:bg-gray-50"
                                                                            >
                                                                                {subitem.name}
                                                                            </Link>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                        :
                                                        <Link
                                                            key={item.name}
                                                            to={item.href}
                                                            onClick={toggleMenu}
                                                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    }
                                                </>
                                            )
                                        })}

                                    </nav>
                                </div>

                                {!localStorage.token && noAuthMenuItems.map((item) => (
                                    <div key={item.name} className=''>
                                        <Link to={item.href} className="">
                                            <button
                                                type="button"
                                                className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            >
                                                {item.name}
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                                {localStorage.token && menuItems.map((item) => (
                                    <div onClick={() => {
                                        item.name == 'Logout' && item.func(item.name, item.href)
                                    }} key={item.name} className=''>
                                        <Link to={item.name == 'Logout' ? '' : item.href} className="">
                                            <button
                                                type="button"
                                                className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            >
                                                {item.name}
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


const HomeK = () => {
    return (
        <>
            <Navbar />
            <Carousel />
            {/* <SlideShow/> */}
            {/* <BannerCarousel /> */}
            <Slider />
            <ShopCategoryWise />
            <ShopNow />
            
            <Footer />
            {/* <Newsletter /> */}
        </>
    )
}

export default HomeK