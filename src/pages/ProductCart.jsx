import { TrashIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { GEGreen1, Maroon1 as Maroon, White1 as White } from "../assets/images/men"
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthProvider'
// import { State, City } from 'country-state-city';
// import {Helmet} from "react-helmet";


const products = [
    {
        id: 1,
        name: 'Oxford Casual Shirts - Sage Green',
        href: '#',
        price: '₹1,999',
        originalPrice: '₹2,999',
        discount: '5% Off',
        color: 'Sage Green',
        sizes: ['1', '2', '3', '4', '5', '6', '7'],
        imageSrc: GEGreen1,
        activeSize: 0
    },
    {
        id: 2,
        name: 'Oxford Casual Shirts - White',
        href: '#',
        price: '₹1,549',
        originalPrice: '₹2,499',
        discount: '8% off',
        color: 'White',
        leadTime: '3-4 weeks',
        sizes: ['1', '2', '3', '4', '5', '6'],
        imageSrc: White,
        activeSize: 1
    },
    {
        id: 3,
        name: 'Oxford Casual Shirts - Maroon',
        href: '#',
        price: '₹2219',
        originalPrice: '₹2,999',
        discount: '8% off',
        color: 'Light Beige',
        imageSrc: Maroon
    },
]

export function ProductCart() {
    const [qtyCart, setQtyCart] = useState([])
    const { couponcode, setcouponcode, profiledata, fetchCart, cart, setCart, fetchProfileData } = useContext(AuthContext)


    const updateCart = (id, sqpActive, count) => {
        let newCart = cart
        console.log(newCart.products[id]);
        let item = { ...newCart.products[id] }
        console.log(item);
        item.qty = count;
        item.cart.size_quantity_price = sqpActive
        newCart.products[id] = item
        setQtyCart(newCart)
        console.log(cart);
    }

    const increment = (index, size) => {
        updateCart(index, size, cart.products[index].qty + 1)
    };

    const decrement = (index, size) => {
        updateCart(index, size, cart[index].count - 1)
    };
    const navigate = useNavigate()



    //   Fetching data from server




    const handleRemoveCart = async (remid) => {
        console.log(remid)
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/delete_cart/${remid}`, {
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
            fetchCart()
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

    const handleApplyCoupon = async () => {
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
                    code: couponcode
                })
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            setCart(data)

            if (data.coupon_message == "Coupon Already Applied" || data.coupon_message == "Coupon is expired") {
                Swal.fire({
                    title: data.coupon_message,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else if (data.coupon_message == "Successfully Applied") {
                Swal.fire({
                    title: data.coupon_message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                Swal.fire({
                    title: data.coupon_message,
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
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

    useEffect(() => {
        fetchCart()
        fetchProfileData()
        fetchCoupons()

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    }, [])


    const [formData, setFormData] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        stateCode: '',
        is_deafult: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };






    const [changeAdr, setChangeAdr] = useState(false)

    const handleAddAddress = async () => {
        if (!formData.addressLine1 || !formData.city || !formData.state || !formData.zipCode) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all the fields',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/address`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    address_line_1: formData.addressLine1,
                    address_line_2: formData.addressLine2,
                    city: formData.city,
                    postal_code: formData.zipCode,
                    country: formData.country,
                    state: formData.state,
                    is_default: 'on'
                })
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(`${data.message ? data.message : 'HTTP error! status: ' + res.status}`);
            }
            if (localStorage.user_verified == 'undefined' || localStorage.user_verified == 'false') {
                throw new Error(`${data.message ? data.message : 'HTTP error! status: ' + res.status}`);
            }

            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            setFormData({
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zipCode: '',
            })
            setChangeAdr(false)
            fetchProfileData()
            navigate('/products/cart')

        } catch (error) {
            console.error('Fetch error:', error);
            setFormData({
                addressid: "",
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: "",
                zipCode: '',
                mobile: '',
                is_deafult: false
            })
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }


    const handleToggleDefault = async (id) => {
        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/address/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    address_line_1: formData.addressLine1,
                    address_line_2: formData.addressLine2,
                    city: formData.city,
                    postal_code: formData.pinCode,
                    country: formData.country,
                    state: formData.state,
                    is_default: !formData.is_deafult ? 'on' : 'off'
                }),
            });
            const data = await res.json();
            console.log(data);
            setFormData({
                addressid: "",
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: "",
                pinCode: '',
                mobile: '',
                is_deafult: false
            })
            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Address Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                fetchProfileData()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        } catch (error) {
            console.log(error)
            setFormData({
                addressid: "",
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: "",
                pinCode: '',
                mobile: '',
                is_deafult: false
            })
        }
    }


    const handleUpdateCart = async (prodid, status) => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/update-cart/${prodid}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    status: status
                })
            })
            const data = await res.json()
            console.log(data);
            if (!res.ok) {
                throw new Error(`${data.message ? data.message : 'HTTP error! status: ' + res.status}`);
            }
            fetchCart();
        }
        catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                title: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1200
            });
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const [coupons, setCoupons] = useState([]);
    const [isOpenCoupon, setIsCouponOpen] = useState(false)

    const fetchCoupons = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/discount-coupons', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
            setCoupons(data.events);
        } catch (error) {
            console.log(error)
        }
    }



    // const stateData = State.getStatesOfCountry('IN').map(state => ({
    //     name: state.name,
    //     code: state.isoCode,
    // }))
    // const cityData = City.getCitiesOfState('IN', 'MH').map(city => ({
    //     name: city,
    // }))

    // console.log(cityData);
    // ==================================>
    const [stateData, setStateData] = useState([])
    const [cityName, setCityName] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/getstate`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setStateData(data)
            });
    }, []);


    useEffect(() => {
        setCityName("")
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/getcities/${formData.stateCode}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCityName(data)
            });
    }, [formData.stateCode]);
    // ===================================>

    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            {/* <Helmet>
                <title>Cart | Sizeupp</title>
                <meta name="description" content="View and manage items in your Sizeupp shopping cart. Securely proceed to checkout and complete your online shopping experience." />
                <meta name="keywords" content="Sizeupp shopping cart, checkout, online shopping bag, cart items, secure checkout" />
            </Helmet> */}

            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <div className='flex justify-between items-center'>

                    <h1 className="text-base font-bold tracking-tight text-c-gray-900 sm:text-2xl">
                        Shopping Cart
                    </h1>
                    <button onClick={() => { navigate('/products') }} className='animate-pulse rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                        Continue Shopping
                    </button>
                </div>

                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-y-4 lg:gap-x-12 xl:gap-x-16">
                    <section className=' lg:col-span-8'>

                        {(profiledata.addresses?.length > 0 && !changeAdr) ?
                            <div className="py-6 px-6  rounded-md border-b-gray-500 shadow-md mt-2">
                                <label htmlFor="pincode" className="text-base font-medium text-gray-800/80">
                                    Delivery & Services :
                                </label>
                                <div className='text-sm text-gray-800/80 font-semibold'>
                                    {profiledata.addresses?.map((address, index) => {
                                        if (address.is_default != true) {
                                            return null
                                        }
                                        return (
                                            <p key={index} className='text-sm text-gray-800/80 font-semibold'>{address.address_line_1 + ", " + address.address_line_2 + ", " + address.city + ", " + address.state + ", " + address.postal_code}</p>
                                        )
                                    })
                                    }
                                </div>


                                <button
                                    type="button"
                                    onClick={() => { setChangeAdr(true) }}
                                    className="truncate inline-flex md:w-1/4 my-4 items-center justify-center rounded-md bg-black px-3 py-1 text-sm md:font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Add Address
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setIsOpen(true) }}
                                    className="truncate inline-flex ml-2 md:w-1/4 my-4 items-center justify-center rounded-md bg-black px-3 py-1 text-sm md:font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Change Address
                                </button>
                            </div>

                            :
                            <div className="px-4 border rounded-md">
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Address Line 1
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input
                                            type="text"
                                            className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                            placeholder="Enter Address Line 1"
                                            required
                                            name="addressLine1"
                                            value={formData.addressLine1}
                                            onChange={handleInputChange}
                                        />
                                    </dd>
                                </div>

                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Address Line 2
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input type="text"
                                            className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                            placeholder="Enter Address Line 2"
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleInputChange} />
                                    </dd>
                                </div>


                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        State
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {/* <select
                                            className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                            value={formData.state}
                                            onChange={(e) => {
                                                const selectedState = e.target.value;
                                                const selectedStateCode = stateData.find((item) => item.name === selectedState)?.code;
                                                setFormData({ ...formData, state: selectedState, stateCode: selectedStateCode });
                                            }}
                                        >
                                            <option value='' disabled>Select State</option>
                                            {stateData.map((item) => (
                                                <option key={item.name} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select> */}

                                        {/* ====================================================> */}
                                        <select
                                            className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                            value={formData.state}
                                            onChange={(e) => {
                                                const selectedState = e.target.value;
                                                const selectedStateName = stateData.find(obj => Object.values(obj)[0] === selectedState);
                                                const selectedStateCode = selectedStateName ? Object.keys(selectedStateName)[0] : null;

                                                setFormData({
                                                    ...formData,
                                                    state: selectedState,
                                                    stateCode: selectedStateCode,
                                                });
                                            }}
                                        >
                                            <option value="" disabled className="text-gray-500">
                                                Select State
                                            </option>
                                            {stateData.map((state, i) => (
                                                <option key={i} value={state[Object.keys(state)[0]]}>
                                                    {state[Object.keys(state)[0]]}
                                                </option>
                                            ))}
                                        </select>

                                        {/* =======================================================> */}
                                    </dd>
                                </div>



                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        City
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {/* <input type="text"
                                            className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                            placeholder="Enter City"
                                            required
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange} />
                                        <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="form-input py-2 px-2 rounded-md bg-gray-800/10">
                                            <option value='' disabled>Select City</option>
                                            {City.getCitiesOfState('IN', formData.stateCode).map(city => {
                                                return (

                                                    <option key={city.name} value={city.name} >{city.name} </option>

                                                )
                                            })}

                                        </select> */}
                                        {/* ==================================> */}
                                        <select
                                            value={formData.city}
                                            disabled={formData.state == ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, city: e.target.value })
                                            }
                                            className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                        >
                                            <option value="" disabled>
                                                Select City
                                            </option>
                                            {cityName.length > 0 && cityName.map(
                                                (city) => <option key={city} value={city}>{city}</option>
                                            )}
                                        </select>
                                        {/* ========================================> */}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Pin Code
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input type="text"
                                            className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                            placeholder="Enter Zip code"
                                            required
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange} />
                                    </dd>
                                </div>

                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Country
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input type="text"
                                            className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                            placeholder="Enter country"
                                            required
                                            name="country"
                                            disabled
                                            value={'India'}
                                            onChange={handleInputChange} />
                                    </dd>
                                </div>

                                <div className="py-5 grid grid-cols-3 gap-4 px-6">
                                    <button type="button" onClick={handleAddAddress} className="rounded-lg bg-blue-500 text-white px-4 py-2">
                                        Save
                                    </button>
                                    <button type="button" onClick={() => { setChangeAdr(false) }} className="rounded-lg bg-red-500 text-white px-4 py-2">
                                        Close
                                    </button>
                                </div>

                            </div>
                        }


                        {isOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <section className="px-4 bg-white w-11/12  rounded-md md:w-1/2">

                                    <h2 className='text-lg px-2 py-4 tracking-wide underline md:text-lg font-semibold'>Change Default Address</h2>
                                    <div className='max-h-[30rem] overflow-y-auto'>
                                        {
                                            profiledata.addresses?.map((address, index) => {
                                                return (
                                                    <div key={index} className="py-4 px-2  justify-between items-center border-b border-gray-300">
                                                        <h3 className='font-semibold my-4'>Address {index + 1}</h3>
                                                        <div className='flex gap-4'>
                                                            <input type='checkbox' onChange={() => {
                                                                handleToggleDefault(address.id);
                                                                setFormData({
                                                                    addressid: address.id,
                                                                    addressLine1: address.address_line_1,
                                                                    addressLine2: address.address_line_2,
                                                                    city: address.city,
                                                                    zipCode: address.postal_code,
                                                                    mobile: address.mobile,
                                                                    country: address.country,
                                                                    state: address.state,
                                                                    is_deafult: address.is_default
                                                                });
                                                            }} name='address' checked={address.is_default} />
                                                            <div className='text-sm text-gray-800/80 font-semibold'>{address.address_line_1 + ", " + address.address_line_2 + ", " + address.city + ", " + address.state + ", " + address.postal_code}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <button type="button" onClick={() => { setIsOpen(false) }} className="rounded-lg bg-red-500 text-white px-4 py-2 m-4">
                                        Close
                                    </button>
                                </section>
                            </div>
                        )}

                        {isOpenCoupon && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <section className="px-4 bg-white w-11/12  rounded-md md:w-1/2">

                                    <h2 className='text-lg px-2 py-4 tracking-wide underline md:text-lg font-semibold'>All Coupons</h2>
                                    <div className='max-h-[30rem] overflow-y-auto'>
                                        {
                                            coupons?.map((coupon, index) => {
                                                return (
                                                    <div key={index} className="py-4 px-2  justify-between items-center border-b border-gray-300">
                                                        <h3 className='font-semibold my-4'>{coupon.code}</h3>
                                                        <div className='flex gap-4'>
                                                            <div className='text-sm tracking-wider text-gray-800/80 font-semibold'>{`Get flat`} <span className='text-green-800/80 underline'>{coupon.percentage}% OFF</span> on First order</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <button type="button" onClick={() => { setIsCouponOpen(false) }} className="rounded-lg bg-red-500 text-white px-4 py-2 m-4">
                                        Close
                                    </button>
                                </section>
                            </div>
                        )}



                        <section aria-labelledby="cart-heading" className="rounded-lg drop-shadow-md px-2 py-4 bg-white md:mt-10">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            {cart.products?.length > 0 ? cart.products?.map((product, i) => {
                                let info = product.cart

                                return (
                                    <div key={i} className='grid gap-2 py-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-3'>
                                        <div className='col-span-1 justify-center items-center'>
                                            <img
                                                onClick={() => { navigate(`/products/${info.product?.id}`) }}
                                                src={info.product?.images[0]?.img.includes("/media/media") ? import.meta.env.VITE_SERVER_URL + (info.product?.images[0]?.img + "").slice(6) : import.meta.env.VITE_SERVER_URL + (info.product?.images[0]?.img + "")}
                                                alt={info.product?.name}
                                                className="sm:h-38 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                                            />
                                        </div>
                                        <div className='col-span-2 md:col-span-3'>
                                            <div className='grid grid-cols-3 gap-2 justify-center items-center'>
                                                <h3 className="text-base col-span-3 font-semibold">
                                                    <Link to={`/products/${info.product?.id}`} className="text-black">
                                                        {info.product.name}
                                                    </Link>
                                                </h3>

                                                {/* Sizes */}
                                                {
                                                    info.product?.sqp.map((size, index) => {
                                                        if (info.size_quantity_price != size.id) {
                                                            return null
                                                        }
                                                        return (
                                                            <div key={index} className="mt-2 text-sm col-span-1 flex justify-center items-center">
                                                                <p className="text-sm text-c-gray-500 mb-2"> Size: {size.size}</p>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                {/* Price */}
                                                <div className="mt-2 col-span-1 flex justify-center items-center">
                                                    <p className="text-sm font-medium text-c-gray-900">
                                                        ₹ {info.product?.discounted_price ? info.product?.discounted_price : info.product?.mrp}
                                                    </p>

                                                    {info.product?.discounted_price &&
                                                        <div className='flex justify-center items-center flex-wrap'>
                                                            <p className="text-sm ml-2 font-medium text-c-gray-500 line-through">
                                                                ₹ {info.product?.mrp}
                                                            </p>
                                                            <p className="text-sm ml-2 font-medium text-green-500">{info.product?.discount_percentage}%</p>
                                                        </div>}
                                                </div>

                                                {/* stock */}
                                                <div className={`col-span-1 flex justify-center items-center font-normal text-sm py-2`}>
                                                    {
                                                        info.product?.sqp.map((sizes) => (
                                                            sizes.id == info.size_quantity_price && (sizes.quantity < 10 ? <span className="text-red-500">{sizes.quantity == 0 ? 'Out of Stock' : `Only ${sizes.quantity} left in Stock`}</span> : <span className="text-green-500">In Stock</span>)
                                                        )
                                                        )
                                                    }
                                                </div>
                                                {/* Qty Update buttons */}
                                                <div className='col-span-1 flex justify-center items-center'>

                                                    <button onClick={() => handleUpdateCart(info.product.id, 'subtract')} type="button" className="h-7 w-7 border-2 flex items-center justify-center rounded-full">
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="mx-1 h-7 w-9 rounded-md border text-center"
                                                        value={product.qty}
                                                    />
                                                    <button onClick={() => handleUpdateCart(info.product.id, 'add')} type="button" className="flex h-7 w-7 rounded-full border-2 items-center justify-center">
                                                        +
                                                    </button>
                                                </div>
                                                {/* Total Price */}
                                                <div className='col-span-1 flex justify-center items-center'>
                                                    <div className=''>₹ {(info?.total_price)}</div>
                                                </div>

                                                {/* Trash Icon to delete product */}
                                                <div className='col-span-1 flex justify-center items-center'>
                                                    <button onClick={() => handleRemoveCart(info?.id)} type="button" className='text-sm rounded-full p-2 bg-red-300 border-2'>
                                                        <TrashIcon className='w-4' />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                )
                            }) : <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">Please add few products to cart.</div>}



                        </section>
                    </section>



                    {/* Price Detaiks */}
                    <section
                        aria-labelledby="summary-heading"
                        className="bg-white lg:col-span-4 lg:mt-0"
                    >
                        {cart.coupon != 'active' ? <section className='mt-16 lg:col-start-9 rounded-lg drop-shadow-md px-4 py-3 bg-white lg:col-span-4 lg:mt-8'>
                            <form action="#" className="mt-6">
                                <div onClick={() => setIsCouponOpen((prev) => !prev)} className='text-sm text-end cursor-pointer underline font-semibold text-gray-800/80'>View coupons</div>
                                <div className='text-sm font-semibold text-gray-800/80 px-1 py-1'> Enter coupon code for extra discount*</div>
                                <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                                    <div className="flex-grow">
                                        <input
                                            className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            onChange={(e) => { setcouponcode(e.target.value) }}
                                            placeholder="Enter coupon code"
                                        />
                                    </div>
                                    <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Apply Coupon
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section> :
                            <section className='mt-16 lg:col-start-9 rounded-lg drop-shadow-md px-4 py-4 bg-white lg:col-span-4 lg:mt-8'>
                                <div className='text-sm text-gray-800/80 text-center'>Coupon Applied Successfully</div>
                                <div className='text-base text-center font-semibold'>You Saved ₹ {parseInt(cart.cupon_discount)}</div>
                            </section>
                        }
                        <div className="shadow-md rounded-lg mt-8 px-4 py-3">
                            <h2
                                id="summary-heading"
                                className=" border-b border-c-gray-200 px-4 py-3 text-lg font-medium text-c-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-c-gray-800">Price </dt>
                                        <dd className="text-sm font-medium text-c-gray-900">₹ {cart.mrp_price || 0}</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <dt className="flex items-center text-sm text-c-gray-800">
                                            <span>Coupon Discount</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">- ₹ {cart.cupon_discount ? cart.cupon_discount : 0}</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <dt className="flex items-center text-sm text-c-gray-800">
                                            <span>Discount on MRP</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">- ₹ {cart.discount_on_price || 0}</dd>
                                    </div>

                                    <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                        <dt className="text-sm font-medium text-c-gray-900">Sub Total</dt>
                                        <dd className="text-sm font-medium text-c-gray-900">₹ {cart.total_price || 0}</dd>
                                    </div>
                                    {<div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-c-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">FREE</dd>
                                    </div>}

                                    <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                        <dt className="text-sm font-medium text-c-gray-900">Total Price</dt>
                                        <dd className="text-base font-semibold text-c-gray-900">₹ {cart.total_price || 0}</dd>
                                    </div>
                                </dl>
                                {cart.sub_sub_total ? <div className="px-2 pb-4 font-medium text-green-700">
                                    You will save ₹ {parseInt(cart.cupon_discount)} on this order
                                </div> : null}
                                <button
                                    type="button"
                                    onClick={() => {

                                        navigate('/products/billing')

                                    }}
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Proceed
                                </button>


                            </div>
                        </div>

                    </section>


                    {/* Order summary */}


                </form>
            </div>
        </div>
    )
}

ProductCart.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object)
}