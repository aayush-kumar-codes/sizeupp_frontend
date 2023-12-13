
import { Link } from 'react-router-dom'
import {XMarkIcon} from '@heroicons/react/24/outline'
import { styles } from '../style'
import { useState } from 'react'
import { GEGreen1, Maroon1, Wine1 } from '../assets/images/men'

const products = [
    {
        id: 1,
        name: 'Oxford Casual Shirts - Sage Green',
        href: '#',
        price: '₹2,199',
        originalPrice: '₹2,900',
        discount: '5% Off',
        color: 'Sage Green',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        imageSrc: GEGreen1
    },
    {
        id: 2,
        name: 'Oxford Casual Shirts - Maroon',
        href: '#',
        price: '₹1,549',
        originalPrice: '₹2,499',
        discount: '38% off',
        color: 'Maroon',
        leadTime: '3-4 weeks',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        imageSrc: Maroon1
    },
    {
        id: 3,
        name: 'Oxford Casual Shirts - Wine',
        href: '#',
        price: '₹2,219 ',
        originalPrice: '₹2999',
        discount: '78% off',
        color: 'Wine',
        imageSrc: Wine1
    },
]

export function ProductBilling() {
    const [cart, setCart] = useState([])

    // const handleRemove = async(id) => {
    //     const data = await fetch('',{
    //         method : 'POST',
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         },
    //         body : JSON.stringify({
    //             id
    //         })
    //     })
    //     const res = await data.json()	
    //     console.log(res)
    // }

    const [form, setForm] = useState({
        fullname: '',
        email: '',
        address: '',
        coupon: '',
        pincode: '',
        city: '',
        state: '',
        cardno: "",
        cvc: "",
        expirationdate: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        // const data = await fetch('',{
        //     method : 'POST',
        //     headers : {
        //         'Content-Type' : 'application/json'
        //     },
        //     body : JSON.stringify({
        //         form
        //     })
        // })
        // const res = await data.json()	
        // console.log(res)
    }

    const validateCoupon = async (e) => {
        e.preventDefault()
        console.log(form)
        // const data = await fetch('',{
        //     method : 'POST',
        //     headers : {
        //         'Content-Type' : 'application/json'
        //     },
        //     body : JSON.stringify({
        //         form
        //     })
        // })
        // const res = await data.json()
        // console.log(res)
    }

    const handleApplyCoupon = async (e) => {
        e.preventDefault()
        console.log(form)
        // validateCoupon()
        // const data = await fetch('',{
        //     method : 'POST',
        //     headers : {
        //         'Content-Type' : 'application/json'
        //     },
        //     body : JSON.stringify({
        //         form
        //     })
        // })
        // const res = await data.json()	
        // console.log(res)
    }

    return (
        <div className={`${styles.padding} mx-10 my-6`}>
            {/* Nav menu- Breadcrumb */}
            <ol className={`inline-flex items-center space-x-1 md:space-x-3 mb-6`}>
                <li className="inline-flex items-center">

                    <Link
                        to="/products"
                        className="ml-1 inline-flex text-lg text-gray-800 hover:underline md:ml-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        Products
                    </Link>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="ml-1 text-lg font-medium text-gray-800 hover:underline md:ml-2">
                            Billing
                        </span>
                    </div>
                </li>
            </ol>
            <div className="overflow-hidden  rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Product List */}
                    <div className="bg-gray-200 px-5 py-6 md:px-8">
                        <div className="flow-root">
                            <ul className="-my-7 divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li
                                        key={product.id}
                                        className="flex items-stretch justify-between space-x-5 py-7"
                                    >
                                        <div className="flex flex-1 items-stretch">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover"
                                                    src={product.imageSrc}
                                                    alt={product.imageSrc}
                                                />
                                            </div>
                                            <div className="ml-5 flex flex-col justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold">{product.name}</p>
                                                    <p className="mt-1.5 text-sm font-medium text-gray-500">
                                                        {product.color}
                                                    </p>
                                                </div>
                                                <p className="mt-4 text-xs font-medium ">x 1</p>
                                            </div>
                                        </div>
                                        <div className="ml-auto flex flex-col items-end justify-between">
                                            <p className="text-right text-sm font-bold text-gray-900">{product.price}</p>
                                            <button
                                                onClick={handleApplyCoupon}
                                                type="button"
                                                className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                            >
                                                <span className="sr-only">Remove</span>
                                                <XMarkIcon className='w-5' />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <hr className="mt-6 border-gray-200" />
                        <form action="#" className="mt-6">
                            <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                                <div className="flex-grow">
                                    <input
                                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Enter coupon code"
                                    />
                                </div>
                                <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                                    <button
                                        type="button"
                                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                        </form>
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-center justify-between text-gray-600">
                                <p className="text-sm font-medium">Sub total</p>
                                <p className="text-sm font-medium">₹14,399</p>
                            </li>
                            <li className="flex items-center justify-between text-gray-900">
                                <p className="text-sm font-medium ">Total</p>
                                <p className="text-sm font-bold ">₹14,399</p>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="px-5 py-6 text-gray-900 md:px-8">
                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="py-6">
                                    <form>
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                            <div>
                                                <h3
                                                    id="contact-info-heading"
                                                    className="text-lg font-semibold text-gray-900"
                                                >
                                                    Contact information
                                                </h3>

                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        name="fullname"
                                                        onChange={handleChange}
                                                        placeholder="Enter your name"
                                                        id="name"
                                                    ></input>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Payment details</h3>

                                                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                                    <div className="col-span-3 sm:col-span-4">
                                                        <label
                                                            htmlFor="cardNum"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Card number
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="text"
                                                                name="cardno"
                                                                onChange={handleChange}
                                                                placeholder="4242 4242 4242 4242"
                                                                id="cardNum"
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2 sm:col-span-3">
                                                        <label
                                                            htmlFor="expiration-date"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Expiration date (MM/YY)
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="date"
                                                                name="expirationdate"
                                                                onChange={handleChange}
                                                                id="expirationdate"
                                                                autoComplete="cc-exp"
                                                                className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            CVC
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                name="cvc"
                                                                onChange={handleChange}
                                                                id="cvc"
                                                                autoComplete="csc"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Address
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                onChange={handleChange}
                                                                name="address"
                                                                autoComplete="street-address"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="city"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            City
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="city"
                                                                onChange={handleChange}
                                                                name="city"
                                                                autoComplete="address-level2"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="state"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            State / Province
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="state"
                                                                onChange={handleChange}
                                                                name="state"
                                                                autoComplete="address-level1"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="pincode"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Postal code
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="pincode"
                                                                onChange={handleChange}
                                                                name="pincode"
                                                                autoComplete="pincode"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>

                                                <div className="mt-6 flex items-center">
                                                    <input
                                                        id="same-as-shipping"
                                                        name="same-as-shipping"
                                                        type="checkbox"
                                                        defaultChecked
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <div className="ml-2">
                                                        <label
                                                            htmlFor="same-as-shipping"
                                                            className="text-sm font-medium text-gray-900"
                                                        >
                                                            Same as shipping information
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                                <button
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Make payment
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
