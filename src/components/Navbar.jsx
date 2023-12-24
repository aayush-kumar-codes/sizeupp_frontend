import React, { useState, useEffect, useRef, useContext } from 'react'
import { styles } from '../style'
import { HeartIcon, ShoppingCartIcon, Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { logo } from '../assets/banners'
import AccordionItem from './Custom/AccordionItem'
import { UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthProvider'


export function Navbar() {
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
                    href:'/profile',
                },
                {
                    name: 'My Orders',
                    href: '/profile/my-orders'
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
    // const [isInputFocused, setIsInputFocused] = useState(false);
    const {search,setSearch,handlefetchProducts} = useContext(AuthContext)

    const handleSearch = (e) => {
        setSearch(e.target.value)
        
    }


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

    return (
        // container
        <div className={`${styles.paddingX} inset-0 bg-white w-full sticky z-50 border border-gray-100`}>
            {/* layout prefixer */}
            <div className="flex  items-center justify-between py-2">

                {/* brand title */}
                <Link to="/" className='cursor-pointer'>
                    <img src={logo} alt="logo" className='w-28 object-contain' />
                </Link>

                <div className="flex items-center  gap-4 w-2/5">
                    {/* Search bar */}
                    <div className='hidden lg:block lg:w-2/3 mx-3'>

                        {/* <div className='flex w-full items-center'>
                            <div className='relative w-full'>
                                <input
                                    className="w-full ring-1 ring-link rounded-3xl bg-c-gray-100 px-6 py-3 pl-10 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    defaultValue={search}
                                    onChange={(e) => {setSearch(e.target.value);console.log(search) }}
                                    placeholder="Search on Website"
                                    onFocus={() => setIsInputFocused(true)}
                                    onBlur={() => setIsInputFocused(false)}

                                />
                                <div
                                    className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isInputFocused ? 'hidden' : 'flex'
                                        }`}
                                >
                                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                                </div>
                            </div>

                            <div onClick={()=>{handlefetchFilterProducts();}}  className={`relative right-14 top-0 ${isInputFocused ? 'visible' : 'hidden'}`}>
                                <button className="text-xs m-2 bg-orange-500 p-2 rounded-xl">
                                    <MagnifyingGlassIcon className="h-6 w-6 text-white" />

                                </button>
                            </div>
                            <button onClick={handlefetchFilterProducts}> Submit</button>
                        </div> */}
                        <form className="mx-auto w-full py-1 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                            <input type="text" value={search} onChange={(e)=>{handleSearch(e)}} placeholder="Search anything" className="bg-transparent w-full focus:outline-none pr-4 font-medium border-0 focus:ring-0 px-0 py-0" name="search"/>
                                <button type="button" onClick={()=>{handlefetchProducts()}} className="flex flex-row items-center justify-center px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white border-transparent  h-[38px] -mr-3" >
                                <MagnifyingGlassIcon className="h-4 w-4 text-white "/>
                            </button>
                        </form>
                    </div>

                    {/* Menu */}

                    <div className='hidden lg:block'>
                        <ul className="inline-flex space-x-10">
                            <li className='flex  gap-1 cursor-pointer' onClick={() => { navigate("/products/favourite") }}>
                                <Link to="/products/favourite" className='flex flex-col items-center hover:scale-110 ease-in duration-200'>
                                    <HeartIcon className='w-6 h-6 stroke-2' />
                                    <span className='text-xs font-medium '>Wishlist</span>
                                </Link>
                            </li>
                            <li >
                                <Link to="/products/cart" className='flex flex-col items-center hover:scale-110 ease-in duration-200'>
                                    <div className="relative">
                                    {/* <div className=" absolute -top-2 left-3">
                                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white text-xs">3</p>
                                        </div> */}
                                        <ShoppingCartIcon className='w-6 h-6 stroke-2 ' />

                                    </div>
                                    <span className='text-xs font-medium '>Cart</span>
                                </Link>
                            </li>
                            <li >
                                <div className=' cursor-pointer' ref={profileRef}>
                                    <button className='flex flex-col items-center cursor-pointer hover:scale-110' onClick={toggleProfile}>
                                        <UserIcon className="h-6 w-6 stroke-2 "  />
                                        <span className='text-xs font-medium'>Account</span>

                                    </button>

                                    {isProfileOpen && <div className="absolute right-6 top-16 z-10 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <ul className="py-1" role="none">
                                            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                                            <li className='hover:bg-gray-200/30 pl-2 '>
                                                <Link to="/profile" className="text-gray-700 block px-4 py-2 text-sm">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li className='hover:bg-gray-200/30 pl-2'>
                                                <Link to="*" className="text-gray-700 block px-4 py-2 text-sm">
                                                    My Offers
                                                </Link>
                                            </li>
                                            <li className='hover:bg-gray-200/30 pl-2'>
                                                <Link to="*" className="text-gray-700 block px-4 py-2 text-sm">
                                                    Track order
                                                </Link>
                                            </li>
                                            <li className='hover:bg-gray-200/30 pl-2'>
                                                <Link to="*" className="text-gray-700 block px-4 py-2 text-sm">
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

                </div>

                {/* Mobile/small-Tab Menu */}
                <div className="lg:hidden">
                    <Bars3BottomLeftIcon onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
                </div>

                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
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