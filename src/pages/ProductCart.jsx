import { trashIcon } from "../assets/icons"
import { useNavigate } from 'react-router-dom'
import { GEGreen1, Maroon1 as Maroon, White1 as White } from "../assets/images/men"
import PropTypes from 'prop-types'

const products = [
    {
        id: 1,
        name: 'Oxford Casual Shirts - Sage Green',
        href: '#',
        price: '₹1,999',
        originalPrice: '₹2,999',
        discount: '5% Off',
        color: 'Sage Green',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        imageSrc: GEGreen1
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
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        imageSrc: White
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
    const navigate = useNavigate()
    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-c-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>
                        <ul role="list" className="divide-y divide-c-gray-200">
                            {products.map((product) => (
                                <div key={product.id} className="">
                                    <li className="flex py-6 sm:py-6 ">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.name}
                                                className="sm:h-38 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-lg">
                                                            <a href={product.href} className=" text-black">
                                                                {product.name}
                                                            </a>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-2 text-sm">
                                                        <p className="text-sm text-c-gray-500 mb-2">{product.color}</p>
                                                        {product.sizes ? (
                                                            <ul className="colors -mr-3 flex flex-wrap">
                                                                {product.sizes.map((size) => (
                                                                    <li
                                                                        key={size}
                                                                        className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-c-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm "
                                                                    >
                                                                        {size}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : null}
                                                    </div>
                                                    <div className="mt-1 flex items-end">
                                                        <p className="text-xs font-medium text-c-gray-500 line-through">
                                                            {product.originalPrice}
                                                        </p>
                                                        <p className="text-sm font-medium text-c-gray-900">
                                                            &nbsp;&nbsp;{product.price}
                                                        </p>
                                                        &nbsp;&nbsp;
                                                        <p className="text-sm font-medium text-green-500">{product.discount}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <div className="mb-2 flex">
                                        <div className="min-w-24 flex">
                                            <button type="button" className="h-7 w-7">
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                                defaultValue={1}
                                            />
                                            <button type="button" className="flex h-7 w-7 items-center justify-center">
                                                +
                                            </button>
                                        </div>
                                        <div className="ml-6 flex text-sm">
                                            <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                <img src={trashIcon} alt="trash Icon" className="w-6" />
                                                <span className="text-xs font-medium text-red-500">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-c-gray-800">Price (3 item)</dt>
                                    <dd className="text-sm font-medium text-c-gray-900">₹ 52,398</dd>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <dt className="flex items-center text-sm text-c-gray-800">
                                        <span>Discount</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">- ₹ 3,431</dd>
                                </div>
                                {/* <div className="flex items-center justify-between py-4">
                                    <dt className="flex text-sm text-c-gray-800">
                                        <span>Delivery Charges</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">Free</dd>
                                </div> */}
                                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                    <dt className="text-base font-medium text-c-gray-900">Total Amount</dt>
                                    <dd className="text-base font-medium text-c-gray-900">₹ 48,967</dd>
                                </div>
                            </dl>
                            <div className="px-2 pb-4 font-medium text-green-700">
                                You will save ₹ 3,431 on this order
                            </div>
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