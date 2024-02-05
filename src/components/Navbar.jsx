import React, { useState, useEffect, useRef, useContext } from 'react'
import { styles } from '../style'
import { HeartIcon, ShoppingCartIcon, Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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

    const [data, setData] = useState([])


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
            name: 'All Products',
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
                    name: 'Casual Topwear',
                    href: '/products?gender=Men&category=Casual Topwear'

                },
                {
                    name: 'Casual Bottomwear',
                    href: '/products?gender=Men&category=Casual Bottomwear'

                },
                {
                    name: 'Ethnic Wear',
                    href: "/products?gender=Men&category=Ethnic Wear"

                },
                {
                    name: 'Evening Wear',
                    href: '/products?gender=Men&category=Evening Wear'
                },
                {
                    name: 'Formal Wear',
                    href: '/products?gender=Men&category=Formal Wear'
                },
                {
                    name: 'Winter Wear',
                    href: '/products?gender=Men&category=Winter Wear'
                }
            ],
        },
        {
            dropdown: true,
            name: 'Women',
            category: [
                {
                    href: '/products?gender=Women&category=Women Topwear',
                    name: 'Women Topwear',

                },
                {
                    name: 'Women Bottomwear',
                    href: "/products?gender=Women&category=Women Bottomwear",

                },
                {
                    name: 'Festive Wear',
                    href: '/products?gender=Women&category=Festive Wear',
                },
                {
                    name: 'Winter Wear',
                    href: '/products?gender=Women&category=Winter Wear',
                }
            ]
        }
    ]

    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    // const [isInputFocused, setIsInputFocused] = useState(false);
    const { search, setSearch, catlist, setfilterdata, filterdata, handlefetchProducts, cart, wishlist } = useContext(AuthContext)

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.has('gender')) {
            console.log(searchParams.get('gender'))
        }
        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

        fetch(import.meta.env.VITE_SERVER_URL + "/api/product/category-details", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(res => res.json().then(data => {
            setData(data)
        }
        ))
    }, [])


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

    const { profiledata } = useContext(AuthContext)



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

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/products?navsearch=${search}`)
    }




    return (
        // container
        <div className={`${styles.paddingX} py-1 inset-0 bg-white w-full sticky z-50 border border-gray-100`}>
            {/* layout prefixer */}
            <div className="flex  items-center justify-between py-2">

                {/* brand title */}
                <Link to="/" className='cursor-pointer'>
                    <img src={logo} alt="logo" className='w-28 object-contain' />
                </Link>

                <div className="flex items-center  gap-4 w-2/5">
                    {/* Search bar */}
                    <div className='hidden lg:block lg:w-2/3 mx-3'>


                    </div>

                    {/* Menu */}

                    <div className='hidden lg:block'>
                        <ul className="inline-flex space-x-10">

                            <li >
                                <Link to="/products/favourite" className='flex flex-col items-center hover:scale-110 ease-in duration-200'>

                                    {wishlist?.length > 0 ?
                                        <div className="relative">
                                            <div className=" absolute -top-2 left-3">
                                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{wishlist?.length}</p>
                                            </div>
                                            <HeartIcon className='w-6 h-6 stroke-2 ' />

                                        </div>
                                        : <HeartIcon className='w-6 h-6 stroke-2 ' />
                                    }
                                    <span className='text-xs font-medium '>Wishlist</span>
                                </Link>
                            </li>
                            <li >
                                <Link to="/products/cart" className='flex flex-col items-center hover:scale-110 ease-in duration-200'>

                                    {cart.products?.length > 0 ?
                                        <div className="relative">
                                            <div className=" absolute -top-2 left-3">
                                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{cart.products?.length}</p>
                                            </div>
                                            <ShoppingCartIcon className='w-6 h-6 stroke-2 ' />

                                        </div>
                                        : <ShoppingCartIcon className='w-6 h-6 stroke-2 ' />
                                    }
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
                    <div className="absolute inset-x-0 top-0 z-50 h-[44rem] overflow-y-auto origin-top-right transform p-2 transition lg:hidden">
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

                                        <Link to="/products" onClick={() => { setIsMenuOpen(false) }} className='text-sm border-t border-c-gray-300 py-5 font-semibold'>All Products</Link>
                                        {
                                            data.categories && data.categories?.map((cat) => {
                                                return <AccordionItem
                                                    key={cat.name}
                                                    title={cat.name}
                                                    content={
                                                        <div className='grid grid-cols-1 gap-y-2 pl-4'>
                                                            {cat.subcategories && cat.subcategories?.map((subcat) => {
                                                                return (
                                                                    <AccordionItem
                                                                        key={subcat.name}
                                                                        title={subcat.name}
                                                                        content={
                                                                            <div className='grid grid-cols-1 gap-y-2'>
                                                                                {
                                                                                    subcat.subsubcategories.map((subsubcat) => {
                                                                                        return (
                                                                                            <Link onClick={() => setIsMenuOpen(false)} className='col-span-1 text-sm font-normal' key={subsubcat.id} to={`/products?gender=${cat.id}&category=${subcat.id}&subcategory=${subsubcat.id}`}>
                                                                                                {subsubcat.name}
                                                                                            </Link>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        }
                                                                    />
                                                                )
                                                            })}
                                                        </div>

                                                    }
                                                />
                                            }
                                            )
                                        }

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