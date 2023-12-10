import { Link } from "react-router-dom"
import { chevronDownIcon, starIcon } from "../assets/icons"
import { dress } from "../assets/images"
import { styles } from "../style"

export const ProductFav = () => {
    return (
        <section className={`overflow-hidden ${styles.padding}`}>
            {/* Nav menu- Breadcrumb */}
            <ol className={`inline-flex items-center space-x-1 md:space-x-3`}>
                <li className="inline-flex items-center">

                    <Link
                        to="/products"
                        className="ml-1 inline-flex text-lg text-c-gray-800 hover:underline md:ml-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        Home
                    </Link>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="ml-1 text-lg font-medium text-c-gray-800 hover:underline md:ml-2">
                            Favourite
                        </span>
                    </div>
                </li>
            </ol>

            <div className={`${styles.paddingX}`}>
                <h2 className={`my-4 text-4xl font-semibold`}>My Wishlist</h2>
                <div className="mt-8 text-lg text-c-gray">Wishlist is not saved permanently yet. Please <Link to="/register" className="underline text-accent">Register</Link> or <Link to="/login" className="underline text-accent">Login</Link></div>
            </div>

            <div className=" px-4 py-8">
                <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
                    <img
                        alt="dress"
                        className="h-64 w-full rounded object-contain lg:h-96 lg:w-1/2"
                        src={dress}
                    />
                    <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                        <h2 className="my-4 text-3xl font-semibold text-black">Vark Embroidered Light Beige Kurta with Palazzos & Dupatta</h2>
                        <div className="my-4 flex items-center">
                            <span className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <img src={starIcon} alt="star" key={i} className="w-6 text-yellow-500" />
                                ))}
                                <span className="ml-3 inline-block text-xs font-semibold">4 Reviews</span>
                            </span>
                        </div>
                        <p className="leading-relaxed">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur rem amet repudiandae
                            neque adipisci eum enim, natus illo inventore totam?
                        </p>
                        <div className="mb-5 mt-6 flex items-center border-b-2 border-c-gray-100 pb-5">
                            <div className="flex items-center">
                                <span className="mr-3 text-sm font-semibold">Color</span>
                                <button className="h-6 w-6 rounded-full border-2 border-c-gray-300 focus:outline-none"></button>
                                <button className="ml-1 h-6 w-6 rounded-full border-2 border-c-gray-300 bg-c-gray-700 focus:outline-none"></button>
                                <button className="ml-1 h-6 w-6 rounded-full border-2 border-c-gray-300 bg-green-200 focus:outline-none"></button>
                            </div>
                            <div className="ml-auto flex items-center">
                                <span className="mr-3 text-sm font-semibold">Size</span>
                                <div className="relative">
                                    <select className="appearance-none rounded border border-c-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black">
                                        <option>SM</option>
                                        <option>XL</option>
                                        <option>XXL</option>
                                    </select>
                                    <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-c-gray-600">
                                        <img src={chevronDownIcon} alt="chevronDownIcon" className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="title-font text-xl font-bold text-c-gray-900">₹2,999</span>
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
