import { Link, useNavigate } from "react-router-dom"
import { ChevronDownIcon, StarIcon } from "@heroicons/react/24/outline"
import { styles } from "../style"
import { GEGreen1 } from "../assets/images/men"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import Swal from "sweetalert2"

export const ProductFav = () => {
    const [favData, setFavData] = useState([])

    const { isAuth, fetchWishlist, fetchCart } = useContext(AuthContext);

    // fetch data from server
    const fetchData = async () => {
        try {
            setFavData([])
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
            setFavData(data.wishlist)
            console.log(data.wishlist);

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
            fetchWishlist()
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
                showConfirmButton: false,
                timer: 1200
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
            fetchWishlist()
        }

    }, [])


    const [isModalCart, setIsModalCart] = useState(false)
    const [modalSizes, setModalSizes] = useState([])
    const [modalForm, setModalForm] = useState({
        name: '',
        color: '',
        product_id: '',
        size: '',
        qty: 1
    })

    const increment = () => {
        setModalForm((prev) => ({ ...prev, qty: prev.qty + 1 }))
    };

    const decrement = () => {
        if (modalForm.qty > 1) {
            setModalForm((prev) => ({ ...prev, qty: prev.qty - 1 }))
        }
    };

    const handleAddToCart = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            console.log(localStorage.token);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/add-to-cart/${modalForm.product_id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    sqp_id: modalForm.size,
                    selected_color: 'black',
                    qty: modalForm.qty
                })
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(`${data.message ? "Default Size is " + data.message : 'HTTP error! status: ' + res.status}`);
            }
            if (data.Message == 'Already In Cart') {

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/update-cart/${modalForm.product_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `token ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        sqp_id: modalForm.size,
                        selected_color: 'black',
                        qty: 1
                    })
                })
                const datas = await res.json()
                console.log(datas);
                if (!res.ok) {
                    throw new Error(`${datas.message ? "Default Size is " + datas.message : 'HTTP error! status: ' + res.status}`);
                }
                setModalForm({
                    name: '',
                    color: '',
                    product_id: '',
                    size: '',
                    qty: 1
                })

                return Swal.fire({
                    title: 'Success!',
                    text: 'Product Updated in Cart',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
            console.log(data);
            fetchCart()
            Swal.fire({
                title: 'Success!',
                text: 'Product Added in Cart',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200
            })
            setModalForm({
                name: '',
                color: '',
                product_id: '',
                size: '',
                qty: 1
            })
            setIsModalCart(false)
        } catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <section className={`overflow-hidden ${styles.padding}`}>

            {isModalCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <section className="px-4 bg-white w-11/12  rounded-md md:w-1/3">

                        <h2 className='text-lg px-2 py-4 tracking-wide underline md:text-lg font-semibold'>Add To Cart</h2>
                        <p className='my-4 text-base px-2'><span className='underline font-semibold'>Product</span> : {modalForm.name}</p>
                        <p className='my-4 text-base px-2'><span className='underline font-semibold'>Color</span> : {modalForm.color}</p>

                        <div className='max-h-[30rem] overflow-y-auto'>
                            <div className='px-2'>
                                <div className='text-base'>Size :</div>
                                <select onChange={(e) => { setModalForm({ ...modalForm, size: e.target.value }) }} value={modalForm.size} className='text-sm py-2 w-fit mt-2 mx-4 px-4 rounded-md bg-gray-800/10'>
                                    <option value="" disabled>Select Size</option>
                                    {
                                        modalSizes.map((size, i) => {
                                            if (size.quantity == 0) {
                                                return (
                                                    <option key={i} className='line-through' value={size.id} disabled>{size.size}</option>
                                                )
                                            }
                                            return (
                                                <option key={i} value={size.id}>{size.size}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div className={`flex items-center font-normal px-4 text-base py-2`}>
                                    {
                                        modalSizes.map((sizes) => (
                                            sizes.id == modalForm.size && (sizes.quantity < 10 ? <span className="text-red-500">{sizes.quantity == 0 ? 'Out of Stock' : `Only ${sizes.quantity} left in Stock`}</span> : <span className="text-green-500">In Stock</span>)
                                        )
                                        )
                                    }
                                </div>
                            </div>
                            <div className='mt-4  px-2'>
                                <div className='text-base '>Quantity :</div>
                                <div className="group w-fit mt-2 mx-2 flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-c-gray-300 md:h-12">
                                    <button
                                        disabled={!modalForm.size}
                                        className="text-xl hover:bg-gray-200/30 flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-c-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                                        onClick={() => { decrement() }}
                                    >
                                        -
                                    </button>
                                    <span className="duration-250 text-heading flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24">
                                        {modalForm.qty}
                                    </span>
                                    <button
                                        disabled={!modalForm.size}
                                        className="text-xl hover:bg-gray-200/30 flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-c-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                                        onClick={() => { increment() }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className='grid grid-cols-2 gap-4 pr-6 mt-8'>
                            <button type="button" disabled={!modalForm.size || !modalForm.qty} onClick={() => { handleAddToCart() }} className="rounded-lg bg-black text-white w-full px-4 py-2 m-4">
                                Add
                            </button>
                            <button type="button" onClick={() => { setIsModalCart(false) }} className="rounded-lg bg-red-500 text-white w-full px-4 py-2 m-4">
                                Cancel
                            </button>
                        </div>
                    </section>
                </div>
            )}

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
                        favData?.map((item, index) => {
                            if (item.id == favData[index - 1]?.id) {
                                return null
                            }
                            let img = item.product?.images[0]
                            return (
                                <div key={index} className="my-2 grid grid-cols-2 gap-x-4 lg:gap-x-0 items-center ">
                                    <div className="aspect-[4/5] col-span-1 lg:aspect-[3/1]">
                                        <img
                                            alt="dress"
                                            className=" h-full w-full rounded-md object-contain"
                                            src={import.meta.env.VITE_SERVER_URL + (img.img).slice(6)}
                                        />
                                    </div>
                                    <div className="col-span-1 flex flex-col w-full h-full lg:mt-0 lg:w-1/2">
                                        {/* <div className="text-orange-600 font-normal text-lg">
                                            Only 4 left in stock -Order soon
                                        </div> */}
                                        <h2 className="my-4 text-md lg:text-2xl font-semibold text-black">{item.product.name}</h2>
                                        {/* <div className="my-4 flex items-center">
                                            <span className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className="w-6 text-yellow-500" />
                                                ))}
                                                <span className="ml-3 inline-block text-xs font-semibold">4 Reviews</span>
                                            </span>
                                        </div> */}
                                        <p className="leading-relaxed">
                                            {item.product.care_instructions}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-4 items-center justify-between">
                                            <span className="title-font text-xl font-semibold md:font-bold text-c-gray-900">₹ {item.product.mrp}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => { setIsModalCart(true); setModalSizes(item.product?.sqp); setModalForm((prev) => ({ ...prev, product_id: item.product.id, size: item.product?.sqp[0].id, color: item.product?.color_family.name, name: item.product?.name })) }}
                                                    className="rounded-md bg-black px-3 py-2 truncate text-sm md:font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => { handleRemoveWishlist(item.product.id) }}
                                                    className="rounded-md bg-red-500 px-3 py-2 text-sm md:font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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