import { TrashIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { GEGreen1, Maroon1 as Maroon, White1 as White } from "../assets/images/men"
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

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
    const [cart, setCart] = useState([])
    const [qtyCart, setQtyCart] = useState([])
    const [profile, setProfile] = useState({})
    const [applyCoupon, setApplyCoupon] = useState("")
    const [pincode, setPincode] = useState('')

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

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    //   Fetching data from server
    const fetchUserProfile = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/userprofile`, {
                method: 'GET',
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
            setProfile(data)
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

    const fetchCart = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/my-cart`, {
                method: 'GET',
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
            setCart(data)
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

    const handleRemoveCart = async (id) => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/delete_cart/${id}`, {
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
                confirmButtonText: 'OK'
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
                    code: applyCoupon
                })
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            setCart(data)
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

    useEffect(() => {
        fetchCart()
        fetchUserProfile()
    }, [])

    const handlePlaceOrder = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            console.log({
                address: profile.addresses[0].id,
                sub_total: cart.sub_total,
                coupon: 'H1234',
                sub_sub_total: cart.sub_sub_total || 0,
                deliverycharges: cart.delivery_charges,
                total_price: cart.total_price,
                discount_percentage: 0,
                discount_amount: 0,
                mrp_price: cart.mrp_price,
                discount_on_price: cart.discout_on_price,
                tax: 0,
                payment_type: 'PPD'
            })
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/order", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    address: profile.addresses[0].id,
                    sub_total: cart.sub_total,
                    coupon: applyCoupon,
                    sub_sub_total: cart.sub_sub_total || 0,
                    deliverycharges: cart.delivery_charges,
                    total_price: cart.total_price,
                    discount_percentage: 0,
                    discount_amount: 0,
                    mrp_price: cart.mrp_price,
                    discount_on_price: cart.discout_on_price,
                    tax: 0,
                    payment_type: 'PPD'
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: 'Order Placed Successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/products/billing')
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

    const [formData, setFormData] = useState({
        addressLine1: '123 Main St',
        addressLine2: '',
        city: 'Anytown',
        state: 'USA',
        zipCode: '12345',
        country: 'USA',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddAddress = async () => {
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
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: 'Address Added',
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
                country: '',
            })
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


    const handleUpdateAddress = async (addressid) => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/address/${addressid}`, {
                method: 'PUT',
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
                    is_default: formData.is_default
                })
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: 'Address Updated',
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
                country: '',
            })
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


    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <h1 className="text-base font-bold tracking-tight text-c-gray-900 sm:text-2xl">
                    Shopping Cart
                </h1>

                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-y-4 lg:gap-x-12 xl:gap-x-16">
                    <section className=' lg:col-span-8'>
                        {profile.addresses?.length > 0 ?
                            <div className="py-6 px-6  rounded-md border-b-gray-500 shadow-md mt-2">
                                <label htmlFor="pincode" className="text-base font-medium text-gray-800/80">
                                    Delivery & Services :
                                </label>
                                <div className='text-sm text-gray-800/80 font-semibold'>
                                    {profile.addresses?.map((address, index) => {
                                        if (address.is_default != true) {
                                            return null
                                        }
                                        return (
                                            <p key={index} className='text-sm text-gray-800/80 font-semibold'>{address.address_line_1 + ", " + address.address_line_2 + ", " + address.city + ", " + address.state + ", " + address.postal_code}</p>
                                        )
                                    })
                                    }
                                </div>

                                {/* <input
                        type="text"
                        id="pincode"
                        placeholder="Enter PinCode"
                        name="pincode"
                        defaultValue={pincode}
                        onChange={(e) => { handlePincodeChange(e) }}
                        className="flex w-2/3 ring-1 ring-link rounded-xl mt-2 bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    /> */}
                                <button
                                    type="button"
                                    onClick={() => { handleApplyPincode() }}
                                    className="inline-flex w-1/4 my-4 items-center justify-center rounded-md bg-black px-3 py-1 text-sm font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Apply
                                </button>
                            </div>

                            :
                            <div className="px-4 ">
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Address Line 1
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input
                                            type="text"
                                            className="form-input"
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
                                            className="form-input"
                                            placeholder="Enter Address Line 2"
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleInputChange} />
                                    </dd>
                                </div>

                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        City
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input type="text"
                                            className="form-input"
                                            placeholder="Enter City"
                                            required
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange} />
                                    </dd>
                                </div>

                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        State
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input type="text"
                                            className="form-input"
                                            placeholder="Enter State"
                                            required
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange} />
                                    </dd>
                                </div>

                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Zip Code
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input type="text"
                                            className="form-input"
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
                                            className="form-input"
                                            placeholder="Enter country"
                                            required
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange} />
                                    </dd>
                                </div>

                                {/* Include other fields similarly */}


                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <button type="button" onClick={handleAddAddress} className="rounded-lg bg-blue-500 text-white px-4 py-2">
                                        Save
                                    </button>
                                </div>

                            </div>
                        }


                        <section aria-labelledby="cart-heading" className="rounded-lg drop-shadow-md px-2 py-4 bg-white md:mt-10">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            {cart.products?.length > 0 ? cart.products?.map((product, i) => {
                                let info = product.cart
                                return (
                                    <div key={i} className='grid gap-2 py-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
                                        <div className='col-span-1'>
                                            <img
                                                src={import.meta.env.VITE_SERVER_URL + info.product?.img}
                                                alt={info.product?.name}
                                                className="sm:h-38 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                                            />
                                        </div>
                                        <div className='col-span-2'>
                                            <div className='flex flex-col'>
                                                <h3 className="text-base font-semibold">
                                                    <Link to={`/products/${info.product?.id}`} className="text-black">
                                                        {info.product.name}
                                                    </Link>
                                                </h3>
                                                {
                                                    info.product?.sqp.map((size, index) => {
                                                        if (info.size_quantity_price != size.id) {
                                                            return null
                                                        }
                                                        return (
                                                            <div key={index} className="mt-2 text-sm">
                                                                <p className="text-sm text-c-gray-500 mb-2"> Size: {size.size}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="mt-1 flex items-end">
                                                    <p className="text-sm font-medium text-c-gray-900">
                                                        ₹ {info?.discount_price}
                                                    </p>
                                                    <p className="text-sm ml-2 font-medium text-c-gray-500 line-through">
                                                        ₹ {info?.price}
                                                    </p>
                                                    <p className="text-sm ml-2 font-medium text-green-500">{info?.discount_percentage}%</p>
                                                </div>
                                                <div className={`${i == 2 ? 'text-red-600' : 'text-green-600'} font-normal text-base py-2`}>
                                                    {i == 2 ? "Out of Stock" : "In Stock"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-1 flex justify-center items-center'>

                                            <button onClick={() => decrement(i, info.size_quantity_price)} type="button" className="h-7 w-7 border-2 flex items-center justify-center rounded-full">
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                                defaultValue={qtyCart.products?.length > 0 ? qtyCart.products[i].qty : product.qty}
                                            />
                                            <button onClick={() => increment(i, info.size_quantity_price)} type="button" className="flex h-7 w-7 rounded-full border-2 items-center justify-center">
                                                +
                                            </button>
                                        </div>
                                        <div className='col-span-1 flex justify-center items-center'>
                                            <div className=''>₹ {parseInt(info.total_price)}</div>
                                        </div>
                                        <div className='col-span-1 flex justify-center items-center'>
                                            <button onClick={() => handleRemoveCart(info.product?.id)} type="button" className='text-sm rounded-full p-2 bg-red-300 border-2'>
                                                <TrashIcon className='w-4' />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }) : <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">Please add few products to cart.</div>}


                            {/* <ul role="list" className="divide-y divide-c-gray-200">
                            {cart.products?.length > 0 ? cart.products?.map((product, i) => {
                                let info = product.cart
                                return (
                                    <div key={info?.id} className="">
                                        <li className="flex py-6 sm:py-6 ">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={import.meta.env.VITE_SERVER_URL + info.product?.img}
                                                    alt={info.product?.name}
                                                    className="sm:h-38 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                                                />
                                            </div>


                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0">
                                                    <div className=''>
                                                        <div className="flex justify-between ">
                                                            <h3 className="text-base font-semibold">
                                                                <Link to={`/products/${info.product?.id}`} className="text-black">
                                                                    {info.product.name}
                                                                </Link>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-2 text-sm">
                                                            <p className="text-sm text-c-gray-500 mb-2">{product.color}</p>
                                                            {info.product?.sqp ? (
                                                                <ul className="colors -mr-3 flex flex-wrap">
                                                                    {info.product.sqp.map((size, index) => (
                                                                        <li
                                                                            key={size.id}
                                                                            onClick={() => { updateCart(i, size.id, info.quantity) }}
                                                                            className={`text-heading ${info.size_quantity_price == size?.id && 'border-black'} mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-c-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-8 md:w-8 md:text-sm`}
                                                                        >
                                                                            {size.size}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : null}
                                                        </div>
                                                        <div className="mt-1 flex items-end">
                                                            <p className="text-xs font-medium text-c-gray-500 line-through">
                                                                ₹ {info?.price}
                                                            </p>
                                                            <p className="text-sm font-medium text-c-gray-900">
                                                                &nbsp;&nbsp; ₹ {info?.discount_price}
                                                            </p>
                                                            &nbsp;&nbsp;
                                                            <p className="text-sm font-medium text-green-500">{info?.discount_percentage}%</p>
                                                        </div>
                                                        <div className={`${i == 2 ? 'text-red-600' : 'text-green-600'} font-normal text-base py-2`}>
                                                            {i == 2 ? "Out of Stock" : "In Stock"}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="mb-2 flex-col justify-between flex">
                                                    <div className="min-w-24 flex">
                                                        <button onClick={() => decrement(i, info.size_quantity_price)} type="button" className="h-7 w-7">
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="mx-1 h-7 w-9 rounded-md border text-center"
                                                            defaultValue={product.qty}
                                                        />
                                                        <button onClick={() => increment(i, info.size_quantity_price)} type="button" className="flex h-7 w-7 items-center justify-center">
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="ml-6 flex text-sm">
                                                        <button onClick={() => handleRemoveCart(info.product?.id)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                            <TrashIcon className='w-6' />
                                                            <span className="text-xs font-medium text-red-500">Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </div>
                                )
                            }) : <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">Please add few products to cart.</div>}
                        </ul> */}
                        </section>
                    </section>


                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg drop-shadow-md px-4 py-3 bg-white lg:col-span-4 lg:mt-0"
                    >
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
                                    <dd className="text-sm font-medium text-green-700">- ₹ {cart.sub_sub_total ? parseInt(cart.sub_total - cart.sub_sub_total) : 0}</dd>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <dt className="flex items-center text-sm text-c-gray-800">
                                        <span>Discount MRP</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">- ₹ {cart.discount_on_price || 0}</dd>
                                </div>

                                <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                    <dt className="text-sm font-medium text-c-gray-900">Sub Total</dt>
                                    <dd className="text-sm font-medium text-c-gray-900">₹ {(cart.coupon == 'active' ? cart.sub_sub_total : cart.sub_total) || 0}</dd>
                                </div>
                                {cart.delivery_charges && <div className="flex items-center justify-between py-4">
                                    <dt className="flex text-sm text-c-gray-800">
                                        <span>Delivery Charges</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-red-700">+ ₹ {cart.delivery_charges || 0}</dd>
                                </div>}

                                <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                    <dt className="text-sm font-medium text-c-gray-900">Total Price</dt>
                                    <dd className="text-sm font-medium text-c-gray-900">₹ {cart.total_price || 0}</dd>
                                </div>
                            </dl>
                            {cart.sub_sub_total ? <div className="px-2 pb-4 font-medium text-green-700">
                                You will save ₹ {parseInt(cart.sub_total - cart.sub_sub_total)} on this order
                            </div> : null}
                            <button
                                type="button"
                                onClick={() => { navigate('/products/billing') }}
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Proceed
                            </button>


                        </div>

                    </section>


                    {/* Order summary */}



                    {cart.coupon != 'active' ? <section className='mt-16 lg:col-start-9 rounded-lg drop-shadow-md px-4 py-3 bg-white lg:col-span-4 lg:mt-8'>
                        <form action="#" className="mt-6">
                            <div className='text-sm font-semibold text-gray-800/80 px-1 py-1'> Enter coupon code for extra discount*</div>
                            <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                                <div className="flex-grow">
                                    <input
                                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        onChange={(e) => { setApplyCoupon(e.target.value) }}
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
                            <div className='text-base text-center font-semibold'>You Saved ₹ {parseInt(cart.sub_total - cart.sub_sub_total)}</div>
                        </section>
                    }
                </form>
            </div>
        </div>
    )
}

ProductCart.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object)
}