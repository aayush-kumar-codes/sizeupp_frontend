import React, { useContext, useState, useEffect, useRef } from 'react'
import { styles } from '../style'
import { HeartIcon, ShoppingCartIcon, Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import { logo } from '../assets/banners'
import { func } from 'prop-types'
import AccordionItem from './Custom/AccordionItem'
import { UserIcon } from "@heroicons/react/24/outline";



export function Navbar() {
    const noAuthMenuItems = [
        { name: "Sign in", href: "/login" },
        { name: "Sign up", href: "/register" },
    ]

    const menuItems = [
        {
            name: "Logout",
            href: "/login",
            func: (name, href) => {
                handleLogout(name, href)
            }
        },
        {
            name: "Profile",
            href: "/profile",
            func: () => {
                console.log("Profile")
            }
        }
    ]

    const mobileMenuItems = [
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

    const { isAuth, setIsAuth } = useContext(AuthContext)
    console.log(isAuth)

    const handleLogout = (name, href) => {
        console.log(name, href)
        console.log("Logout")
        if (name === 'Logout') {
            console.log("Logout")
            localStorage.removeItem('token');
            setIsAuth(false);
            navigate(href);
        }
    }

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
    return (
        // container
        <div className={`${styles.paddingX} inset-0 w-full bg-white sticky z-50 `}>
            {/* layout prefixer */}
            <div className="flex items-center justify-between  ">

                {/* brand title */}
                <Link to="/" className='cursor-pointer'>
                    <img src={logo} alt="logo" className='w-24 h-24 object-contain' />
                </Link>

                <div className="flex items-center gap-4 w-2/5">
                    {/* Search bar */}
                    <div className='hidden lg:block lg:w-2/3 mx-3'>
                        <input
                            className="w-full ring-1 ring-link rounded-3xl bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Serach on Website"
                        />
                    </div>

                    {/* Menu */}

                    <div className='hidden lg:block'>
                        <ul className="inline-flex space-x-10">
                            <li className='flex  gap-1 cursor-pointer' onClick={() => { navigate("/products/favourite") }}>
                                <Link to="/products/favourite" className='flex flex-col items-center '>
                                    <HeartIcon className='w-6 h-6 stroke-2 hover:scale-110' />
                                    <span className='text-xs font-medium '>Wishlist</span>
                                </Link>
                            </li>
                            <li >
                                <Link to="/products/cart" className='flex flex-col items-center '>
                                    <ShoppingCartIcon className='w-6 h-6 stroke-2 hover:scale-110' />
                                    <span className='text-xs font-medium '>Cart</span>
                                </Link>
                            </li>
                            <li >
                                <div className='group flex flex-col items-center cursor-pointer' ref={profileRef}>
                                    <UserIcon className="h-6 w-6 stroke-2 hover:scale-110" onClick={toggleProfile} />
                                    <span className='text-xs font-medium '>Account</span>
                                    
                                        <div className="group-hover:flex hidden absolute right-6 top-16 z-10 mt-2 w-36 py-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <div className="py-1" role="none">
                                                {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                                                <li className='hover:bg-gray-200/30 pl-2 '>
                                                    <Link to="*" className="text-gray-700 block px-4 py-2 text-sm">
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
                                                {!isAuth && noAuthMenuItems.map((item) => (
                                                    <li key={item.name} className='hover:bg-gray-200/30 pl-2'>
                                                        <Link to={item.href} className="text-gray-700 block px-4 py-2 text-sm">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {isAuth && menuItems.map((item) => (
                                                    <li onClick={() => {
                                                        item.name == 'Logout' && item.func(item.name, item.href)
                                                    }} key={item.name} className='flex justify-center cursor-pointer item-center'>
                                                        <Link to={item.name == 'Logout' ? '' : item.href} className="text-gray-700 block px-4 py-2 text-sm">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}

                                            </div>
                                        </div>

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

                                        <span className="font-bold">Sizeupp</span>
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
                                <button
                                    type="button"
                                    className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Button text
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}