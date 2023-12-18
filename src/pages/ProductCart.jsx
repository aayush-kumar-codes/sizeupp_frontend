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
    const [count, setCount] = useState(1);
    const [cart, setCart] = useState([])

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1);
        }
    };
    const navigate = useNavigate()

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    //   Fetching data from server
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

    const handleAddToCart = async (sqpActive, count) => {
        try {
            console.log(sqpActive, count);
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/add-to-cart/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    sqp_id: sqpActive,
                    qty: count
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

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <h1 className="text-lg font-bold tracking-tight text-c-gray-900 sm:text-2xl">
                    Shopping Cart
                </h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>
                        <ul role="list" className="divide-y divide-c-gray-200">
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
                                                                    {info.product.sqp.map((size, i) => (
                                                                        <li
                                                                            key={size.id}
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
                                            </div>
                                        </li>
                                        <div className="mb-2 flex">
                                            <div className="min-w-24 flex">
                                                <button onClick={decrement} type="button" className="h-7 w-7">
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    className="mx-1 h-7 w-9 rounded-md border text-center"
                                                    value={info?.quantity}
                                                />
                                                <button onClick={increment} type="button" className="flex h-7 w-7 items-center justify-center">
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
                                )
                            }) : <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">Please add few products to cart.</div>}
                        </ul>
                    </section>
                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                    >
                        <h2
                            id="summary-heading"
                            className=" border-b border-c-gray-200 px-4 py-3 text-lg font-medium text-c-gray-900 sm:p-4"
                        >
                            Price Details
                        </h2>
                        <div>
                            <dl className=" space-y-1 px-2 py-4">
                                {/* <div className="flex items-center justify-between">
                                    <dt className="text-sm text-c-gray-800">Price </dt>
                                    <dd className="text-sm font-medium text-c-gray-900">₹ {cart.sub_total}</dd>
                                </div> */}
                                {/* <div className="flex items-center justify-between pt-4">
                                    <dt className="flex items-center text-sm text-c-gray-800">
                                        <span>Discount</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">- ₹ 431</dd>
                                </div> */}
                                {/* <div className="flex items-center justify-between py-4">
                                    <dt className="flex text-sm text-c-gray-800">
                                        <span>Delivery Charges</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">Free</dd>
                                </div> */}
                                <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                    <dt className="text-base font-medium text-c-gray-900">Total Amount</dt>
                                    <dd className="text-base font-medium text-c-gray-900">₹ {cart.total_price}</dd>
                                </div>
                            </dl>
                            {/* <div className="px-2 pb-4 font-medium text-green-700">
                                You will save ₹ 431 on this order
                            </div> */}
                            <button
                                type="button"
                                onClick={() => { navigate("/products/billing") }}
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Buy Now
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}

ProductCart.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object)
}