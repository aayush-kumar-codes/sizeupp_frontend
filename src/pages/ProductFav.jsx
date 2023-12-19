import { Link, useNavigate } from "react-router-dom"
import { ChevronDownIcon, StarIcon } from "@heroicons/react/24/outline"
import { styles } from "../style"
import { GEGreen1 } from "../assets/images/men"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import Swal from "sweetalert2"

export const ProductFav = () => {
    const [favData, setFavData] = useState([])

    const { isAuth } = useContext(AuthContext);

    // fetch data from server
    const fetchData = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/wishlist', {
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
            setFavData(data.wishlist)

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

    const handleRemoveWishlist = async (id) => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/remove_wishlist/${id}`, {
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
            if (data.wishlist) {
                setFavData(data.wishlist)
            }

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


    const handleAddWishlist = async (id) => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/add_wishlist/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    product_id: id,
                })
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
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

    const navigate = useNavigate()
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (localStorage.token) {
            fetchData()
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: 'Please login to view your wishlist.',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }, [])

    return (
        <section className={`overflow-hidden ${styles.padding}`}>
            {/* Nav menu- Breadcrumb */}
            <ol className={`inline-flex items-center space-x-1 md:space-x-3`}>
                <li className="inline-flex items-center">

                    <Link
                        to="/products"
                        className="ml-1 inline-flex text-base text-c-gray-800 hover:underline md:ml-2"
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
                        <span className="ml-1 text-base font-medium text-c-gray-800 hover:underline md:ml-2">
                            Favourite
                        </span>
                    </div>
                </li>
            </ol>

            <div className={`${styles.paddingX}`}>
                <h2 className={`my-4 text-4xl font-semibold`}>My Wishlist</h2>
                {!isAuth && <div className="mt-8 text-lg text-c-gray">Wishlist is not saved permanently yet. Please <Link to="/register" className="underline text-accent">Register</Link> or <Link to="/login" className="underline text-accent">Login</Link></div>}
            </div>

            <div className="px-4 py-8">
                {
                    favData.length > 0 ?
                        favData.map((item, index) => {
                            return (
                                <div key={index} className="mx-auto my-2 flex flex-wrap items-center lg:w-4/5">
                                    <img
                                        alt="dress"
                                        className="h-64 w-full rounded-md object-contain lg:h-96 lg:w-1/2"
                                        src={import.meta.env.VITE_SERVER_URL + item.img}
                                    />
                                    <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                                        {/* <div className="text-orange-600 font-normal text-lg">
                                            Only 4 left in stock -Order soon
                                        </div> */}
                                        <h2 className="my-4 text-3xl font-semibold text-black">{item.name}</h2>
                                        <div className="my-4 flex items-center">
                                            <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className="w-6 text-yellow-500" />
                                                ))}
                                                <span className="ml-3 inline-block text-xs font-semibold">4 Reviews</span>
                                            </span>
                                        </div>
                                        <p className="leading-relaxed">
                                            {item.care_instructions}
                                        </p>
                                        {/* <div className="mt-2 text-sm">
                                            <p className="text-sm text-c-gray-500 mb-2">{item?.color}</p>
                                            {item?.sqp ? (
                                                <ul className="colors -mr-3 flex flex-wrap">
                                                    {item.sqp.map((size, i) => (
                                                        <li
                                                            key={size.id}
                                                            className={`text-heading ${item.size_quantity_price == size?.id && 'border-black'} mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-c-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-8 md:w-8 md:text-sm`}
                                                        >
                                                            {size.size}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                        </div> */}
                                        <div className="flex mt-4 items-center justify-between">
                                            <span className="title-font text-xl font-bold text-c-gray-900">₹ {item.price}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => navigate("/products/" + item.id)}
                                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    View More
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => { handleRemoveWishlist(item.id) }}
                                                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">Please add few products to wishlist.</div>
                }
            </div>
        </section>
    )
}
