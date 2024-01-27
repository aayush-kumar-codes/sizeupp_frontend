import { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomGrid } from '../components/ProductList/ProductGrid'
import Carousel from '../components/Custom/Carousel'
import SideNav from '../components/SideNav'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import ProductSkullCard from '../components/Skeleton/ProductList/ProductCard'
import { AuthContext } from '../context/AuthProvider'
import { HeartIcon } from '@heroicons/react/24/outline'

const ProductList = ({
    grid,
    setResults,
    mgrid,
    sgrid,
    filterActive,
    setFilterActive,
}) => {

    const { wishlist, handleFetchFilterProducts, filterdata, fetchCart, fetchWishlist, isFilterActive, setIsFilterActive, productsbc, productcount, productloading, paginationdata, handlePagination } = useContext(AuthContext)


    const [itemsInfinite, setItemsInfinite] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(productcount)

    useEffect(() => {
        fetchData(page)
    }, [page])

    const fetchData = (page) => {
        const newItemsInfinite = []

        for (let i = 0; i < 20; i++) {
            newItemsInfinite.push(i)
        }

        if (page === 20) {
            setHasMore(false)
        }

        setItemsInfinite([...itemsInfinite, ...newItemsInfinite])
    }

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [itemsInfinite])


    const navigate = useNavigate()




    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);



    const handleAddToCart = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
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
            setModalForm({
                name: '',
                color: '',
                product_id: '',
                size: '',
                qty: 1
            })
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const handleAddWishlist = async (e, id) => {
        e.preventDefault()
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

            fetchWishlist()
            handleFetchFilterProducts(filterdata)

            Swal.fire({
                title: 'Success!',
                text: 'Product Added to Wishlist',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200
            })
        }
        catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                title: error,
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1200
            });
        }
    }

    const handleRemoveWishlist = async (e, id) => {
        e.preventDefault()
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
            handleFetchFilterProducts(filterdata)
            Swal.fire({
                title: 'Success!',
                text: 'Product Removed from Wishlist',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200
            })
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

    return (
        <div className={``}>
            {/* Nav menu- Breadcrumb */}
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


            {/* Filter navbar */}
            {/* <Filter setGrid={setGrid} grid={grid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} filterActive={filterActive} setFilterActive={setFilterActive} /> */}
            <SideNav display={isFilterActive} setDisplay={setIsFilterActive} />

            {/* Large Desktop */}
            {/* <div>
                {itemsInfinite.map((itemInfinite, index) => (
                    <div key={index}>
                    {itemInfinite}
                    </div>
                ))}
                </div> */}
            <div className='hidden xl:block'>
                {grid ? (
                    <div>
                        <div className="flex justify-center space-x-2 ">
                            <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.previous ? 'hidden' : 'block'}`} disabled={!paginationdata.previous} onClick={() => {
                                handlePagination(filterdata, paginationdata.previous)
                            }}>&lt; Prev</button>
                            <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.next ? 'hidden' : 'block'}`} disabled={!paginationdata.next} onClick={() => {
                                handlePagination(filterdata, paginationdata.next)
                            }}>Next &gt;</button>
                        </div>
                        <CustomGrid gridSize={grid}>
                            {!productloading ? (
                                productsbc.length > 0 ? productsbc.map((items, i) => {
                                    // let imgs = []
                                    // imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.images)
                                    // items.images.map((img) => {
                                    //     imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                                    // })

                                    // if (items.images.length == 0) {
                                    //     // setproductcount(prev => prev - 1)
                                    //     return null
                                    // }
                                    // console.log(imgs, "!!!!!!!!!!!1");
                                    return (
                                        <div key={i} className="mt-1 rounded-xl">
                                            <Carousel id={items.id} isFav={items.wishlist} slides={items.images} handleAddWishlist={handleAddWishlist} handleRemoveWishlist={handleRemoveWishlist} />
                                            <div className={`${grid == 5 && "hidden"} p-2 `}>
                                                <p className='truncate text-lg font-normal text-accent'>{items.name}</p>
                                                <div className=' flex flex-wrap justify-between items-center'>
                                                    <div className='text-base text-accent flex items-center gap-2'>
                                                        <p>&#8377; {items.discounted_price ? items.discounted_price : items.mrp}</p>
                                                        {items.discounted_price && <div className='flex flex-wrap justify-center items-center'>
                                                            <p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; {items.mrp}</p>
                                                            <p className="text-base font-medium text-[#af0000]">{items.discount_percentage || 0}%</p>
                                                        </div>
                                                        }
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setModalSizes(items.sqp); setModalForm({ ...modalForm, size: items.sqp[0]?.id, product_id: items.id, name: items.name, color: items.color_family.name }); setIsModalCart(true); }}
                                                        className="rounded-md my-2 bg-black px-2 py-2 text-xs font-normal text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">
                                        No products in this category
                                    </div>
                                )
                            ) : (
                                <>
                                    {Array(10).fill().map((_, i) => (
                                        <ProductSkullCard key={i} />
                                    ))}
                                </>
                            )}

                        </CustomGrid>

                        <div className="flex justify-center space-x-2 ">
                            <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.previous ? 'hidden' : 'block'}`} disabled={!paginationdata.previous} onClick={() => {
                                handlePagination(filterdata, paginationdata.previous)
                            }}>&lt; Prev</button>
                            <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.next ? 'hidden' : 'block'}`} disabled={!paginationdata.next} onClick={() => {
                                handlePagination(filterdata, paginationdata.next)
                            }}>Next &gt;</button>
                        </div>
                    </div>
                ) : <div>Loading ....</div>
                }
            </div>

            {/* Medium Desktop */}
            <div className='hidden xl:hidden md:block'>
                {mgrid ? (
                    <div>
                        <div className="flex justify-center space-x-2 ">
                            <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.previous ? 'hidden' : 'block'}`} disabled={!paginationdata.previous} onClick={() => {
                                handlePagination(filterdata, paginationdata.previous)
                            }}>&lt; Prev</button>
                            <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.next ? 'hidden' : 'block'}`} disabled={!paginationdata.next} onClick={() => {
                                handlePagination(filterdata, paginationdata.next)
                            }}>Next &gt;</button>
                        </div>
                        <CustomGrid gridSize={mgrid}>
                            {!productloading ? (productsbc.length > 0 ? productsbc.map((items, i) => {
                                // let imgs = []
                                // imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.img)
                                // items.images.map((img) => {
                                //     imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                                // })

                                // if (items.images.length == 0) {
                                //     // setproductcount(prev => prev - 1)
                                //     return null

                                // }

                                return (
                                    <div key={i} className="">
                                        <Carousel id={items.id} isFav={false} func={() => { }} slides={items.images} />
                                        <div className={` p-2 mt-1 rounded-lg`}>
                                            <div className='truncate text-base text-accent'>{items.name}</div>

                                            <div className=' flex flex-wrap justify-between items-center'>
                                                <div className='text-sm text-accent flex items-center gap-2'>
                                                    <p>&#8377; {items.discounted_price ? items.discounted_price : items.mrp}</p>
                                                    {items.discounted_price && <div className='flex flex-wrap justify-center items-center'>
                                                        <p className='text-sm font-semibold text-gray-800/80 line-through'>&#8377; {items.mrp}</p>
                                                        <p className="text-sm font-medium text-[#af0000]">{items.discount_percentage || 0}%</p>
                                                    </div>
                                                    }
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => { setModalSizes(items.sqp); setModalForm({ ...modalForm, size: items.sqp[0]?.id, product_id: items.id, name: items.name, color: items.color_family.name }); setIsModalCart(true); }}
                                                    className="rounded-md my-2 bg-black px-2 py-2 text-xs font-normal text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">No products in this category</div>) : <>
                                {
                                    Array(10).fill().map((_, i) => (
                                        <ProductSkullCard key={i} />
                                    ))
                                }
                            </>}
                        </CustomGrid>
                        <div className="flex justify-center space-x-2 ">
                            <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.previous ? 'hidden' : 'block'}`} disabled={!paginationdata.previous} onClick={() => {
                                handlePagination(filterdata, paginationdata.previous)
                            }}>&lt; Prev</button>
                            <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.next ? 'hidden' : 'block'}`} disabled={!paginationdata.next} onClick={() => {
                                handlePagination(filterdata, paginationdata.next)
                            }}>Next &gt;</button>
                        </div>
                    </div>)
                    : <div>Loading ....</div>
                }
            </div>

            {/* Small Desktop */}
            <div className='block md:hidden'>
                {sgrid ? (<div>
                    <div className="flex justify-center space-x-2 ">
                        <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.previous ? 'hidden' : 'block'}`} disabled={!paginationdata.previous} onClick={() => {
                            handlePagination(filterdata, paginationdata.previous)
                        }}>&lt; Prev</button>
                        <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.next ? 'hidden' : 'block'}`} disabled={!paginationdata.next} onClick={() => {
                            handlePagination(filterdata, paginationdata.next)
                        }}>Next &gt;</button>
                    </div>
                    <CustomGrid gridSize={sgrid}>
                        {!productloading ? (
                            productsbc.length > 0 ? productsbc.map((items, i) => {
                                // let imgs = []
                                // imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.img)
                                // items.images.map((img) => {
                                //     imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                                // })

                                // if (items.images.length == 0) {
                                //     // setproductcount(prev => prev - 1)
                                //     return null

                                // }

                                return (
                                    <div key={i} className="">
                                        <Carousel id={items.id} isFav={false} func={() => { }} slides={items.images} />
                                        <div className={`${sgrid == 3 && 'hidden'} p-2 mt-1 rounded-lg`}>
                                            <p className=' text-base text-accent'>{items.name}</p>
                                            <div className='flex flex-wrap justify-between items-center'>
                                                <div className='text-lg text-accent flex items-center gap-2'>
                                                    <p>&#8377; {items.discounted_price ? items.discounted_price : items.mrp}</p>
                                                    {items.discounted_price && <div className='flex flex-wrap justify-center items-center'>
                                                        <p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; {items.mrp}</p>
                                                        <p className="text-base font-medium text-[#af0000]">{items.discount_percentage || 0}%</p>
                                                    </div>
                                                    }
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => { setModalSizes(items.sqp); setModalForm({ ...modalForm, size: items.sqp[0]?.id, product_id: items.id, name: items.name, color: items.color_family.name }); setIsModalCart(true); }}
                                                    className="rounded-md my-2 bg-black px-2 py-2 text-xs font-normal text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">No products in this category</div>) : <>
                            {
                                Array(10).fill().map((_, i) => (
                                    <ProductSkullCard key={i} />
                                ))
                            }
                        </>}
                    </CustomGrid>
                    <div className="flex justify-center space-x-2 ">
                        <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.previous ? 'hidden' : 'block'}`} disabled={!paginationdata.previous} onClick={() => {
                            handlePagination(filterdata, paginationdata.previous)
                        }}>&lt; Prev</button>
                        <button className={`bg-gray-400 rounded-xl textr-white px-5 py-2 ${!paginationdata.next ? 'hidden' : 'block'}`} disabled={!paginationdata.next} onClick={() => {
                            handlePagination(filterdata, paginationdata.next)
                        }}>Next &gt;</button>
                    </div>
                </div>)
                    : <div>Loading ....</div>
                }
            </div>
        </div>
    )
}

ProductList.propTypes = {
    grid: PropTypes.number,
    setGrid: PropTypes.func,
    mgrid: PropTypes.number,
    setMGrid: PropTypes.func,
    sgrid: PropTypes.number,
    setSGrid: PropTypes.func,
    filterActive: PropTypes.bool,
    setFilterActive: PropTypes.func
}

export default ProductList