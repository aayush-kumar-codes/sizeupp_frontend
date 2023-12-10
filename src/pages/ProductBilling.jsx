
import { Link } from 'react-router-dom'
import { XIcon } from '../assets/icons'
import { dress, dress2 } from '../assets/images'
import { styles } from '../style'

const products = [
    {
        id: 1,
        name: 'Vark Embroidered Light Beige Kurta with Palazzos & Dupatta',
        href: '#',
        price: '₹47,199',
        originalPrice: '₹48,900',
        discount: '5% Off',
        color: 'Light Beige',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        imageSrc: dress
    },
    {
        id: 2,
        name: 'Kurta with Palazzos & Dupatta',
        href: '#',
        price: '₹1,549',
        originalPrice: '₹2,499',
        discount: '38% off',
        color: 'Beige',
        leadTime: '3-4 weeks',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        imageSrc: dress2
    },
    {
        id: 3,
        name: 'Vark Embroidered Light Beige Kurta with Palazzos & Dupatta',
        href: '#',
        price: '₹2219 ',
        originalPrice: '₹9999',
        discount: '78% off',
        color: 'Light Beige',
        imageSrc: dress
    },
]
export function ProductBilling() {
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
                                                    className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
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
                                                type="button"
                                                className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                            >
                                                <span className="sr-only">Remove</span>
                                                <img src={XIcon} className='w-5' alt="remove" />
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
                                    <h2 className="text-lg font-semibold">Contact Information</h2>

                                    <form action="#" className="mt-6">
                                        <div className="space-y-5">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <label
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="name"
                                                >
                                                    Full Name
                                                </label>
                                                <input
                                                    className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="text"
                                                    id="name"
                                                    placeholder="Full Name"
                                                />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <label
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="email"
                                                    id="email"
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Get Started
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="py-6">
                                    <h2 className="text-lg font-semibold text-gray-500 cursor-pointer hover:underline">Shipping Information</h2>
                                </div>
                                <div className="py-6">
                                    <h2 className="text-lg font-semibold text-gray-500 cursor-pointer hover:underline">Billing Information</h2>
                                </div>
                                <div className="py-6">
                                    <h2 className="text-lg font-semibold text-gray-500 cursor-pointer hover:underline">Payment Method</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
