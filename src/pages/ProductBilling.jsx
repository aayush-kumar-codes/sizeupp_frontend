
import { Link, useNavigate } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { styles } from '../style'
import { useEffect, useState } from 'react'
import { GEGreen1, Maroon1, Wine1 } from '../assets/images/men'
import Swal from 'sweetalert2'

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
    const navigate = useNavigate()

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

    useEffect(() => {
        fetchCart()
    }, [])

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

    const [form, setForm] = useState({
        address: '',
        grand_total: 0,
        sub_total: 0,
        sub_sub_total: 0,
        coupon: '',
        discount: 0,
        discount_amount: 0,
        tax: 0,
        payment_type: 'COD',
        deliverycharges: 0
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handlePaymentType = (e) => {
        
    }

    const handleSubmit = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/create-order`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(form)
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: 'Order placed successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate('/products')
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
                    code: 'H1234'
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
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

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
                                {cart.products?.length > 0 ? cart.products.map((product, index) => {
                                    console.log(product)
                                    let productDetail = product.cart?.product
                                    return (
                                        <li
                                            key={product.id}
                                            className="flex items-stretch justify-between space-x-5 py-7"
                                        >
                                            <div className="flex flex-1 items-stretch">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="h-28 w-28 rounded-lg border border-gray-200 bg-white object-cover"
                                                        src={`${import.meta.env.VITE_SERVER_URL}${productDetail.img}`}
                                                        alt={"dress thumnail"}
                                                    />
                                                </div>
                                                <div className="ml-5 flex flex-col justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold">{productDetail.name}</p>
                                                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                                                            {productDetail.sqp?.length > 0 ? productDetail.sqp.map((sqp,index) => {
                                                                if(product.cart?.size_quantity_price !== sqp.id){
                                                                    return
                                                                }
                                                                return(
                                                                    <span key={index} className="mr-2">Size: {sqp.size}</span>
                                                                )
                                                            }): ''}
                                                        </p>
                                                    </div>
                                                    <p className="mt-4 text-sm font-medium ">x {product.qty}</p>
                                                </div>
                                               
                                            </div>
                                            
                                            <div className="ml-auto flex flex-col items-center justify-between">
                                                <p className="text-right text-sm font-bold text-gray-900">₹ {product.cart?.total_price}</p>
                                                <button
                                                    onClick={() => { handleRemoveCart(productDetail.id) }}
                                                    type="button"
                                                    className="-m-2 inline-flex items-center rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                                >
                                                    <span className="text-xs text-red-500">Remove</span>
                                                    <XMarkIcon className='w-4 text-red-500' />
                                                </button>
                                            </div>
                                        </li>
                                    )
                                }) : <div className="text-center text-lg font-semibold">No products found</div>}
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
                                        onClick={handleApplyCoupon}
                                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                        </form>
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-center justify-between text-gray-600">
                                <p className="text-sm font-semibold">Sub total</p>
                                <p className="text-sm font-medium">₹ {cart.sub_total}</p>
                            </li>
                            <li className="flex items-center justify-between text-gray-900">
                                <p className="text-sm font-semibold ">Total</p>
                                <p className={`font-bold ${cart.coupon == 'active' ? 'text-orange-500 text-lg' : 'text-sm'}`}>₹ {cart.coupon == 'active' ? cart.sub_sub_total : cart.total_price}</p>
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
                                            {/* <div>
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
                                            </div> */}
                                            {/* <hr className="my-8" /> */}
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>

                                                <div className="mt-6 flex gap-2 items-center">
                                                    <input
                                                        id="payment-type"
                                                        name="payment-type"
                                                        type="radio"
                                                        defaultChecked
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <div className="mr-4">
                                                        <label
                                                            htmlFor="payment-type"
                                                            className="text-sm font-semibold text-gray-900"
                                                        >
                                                            Cash on delivery
                                                        </label>
                                                    </div>
                                                    <input
                                                        id="payment-type"
                                                        name="payment-type"
                                                        type="radio"
                                                        defaultChecked
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <div className="mr-2">
                                                        <label
                                                            htmlFor="payment-type"
                                                            className="text-sm font-semibold text-gray-900"
                                                        >
                                                            Credit Card
                                                        </label>
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
                                                                placeholder='Enter Address'
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
                                                                placeholder='Enter city'
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
                                                                placeholder='Enter state'
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
                                                                placeholder='Enter pincode'
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
