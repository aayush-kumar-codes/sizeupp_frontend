import React, { useEffect, useState } from 'react'
import Filter from '../components/ProductList/Filter'
import { styles } from '../style'
import { Link, useNavigate } from 'react-router-dom'
import { products } from '../constants/products'
import { CustomGrid } from '../components/ProductList/ProductGrid'
import Carousel from '../components/Custom/Carousel'
import SideNav from '../components/SideNav'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const ProductList = ({
    grid,
    setGrid,
    mgrid,
    setMGrid,
    sgrid,
    setSGrid,
    filterActive,
    setFilterActive
}) => {


    const [Products, setProducts] = useState(products)
    const [demo, setdemo] = useState([])

    const navigate = useNavigate()

    const addToFavorite = (id) => {
        Products.map((items) => {
            if (items.id === id) {
                items.isFavorite = !items.isFavorite
            }
        }
        )
        setProducts([...Products])
    }


    const fetchProducts = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/all-products', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json' // corrected typo here
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                // setProducts(data);
                setdemo(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsAuth = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/all-products', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json', // corrected typo here,
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                // setProducts(data);
                setdemo(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        if (localStorage.token) {
            fetchProductsAuth();
        } else {
            fetchProducts();
        }
    }, []);


    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);



    const handleAddToCart = async (sqp_active, id) => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            console.log(localStorage.token);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/add-to-cart/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    sqp_id: sqp_active,
                    selected_color: 'black',
                    qty: 1
                })
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            if (data.Message == 'Already In Cart') {

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/update-cart/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `token ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        sqp_id: sqp_active,
                        selected_color: 'black',
                        qty: 1
                    })
                })
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const datas = await res.json()
                console.log(datas);
                Swal.fire({
                    title: 'Success!',
                    text: 'Product Updated in Cart',
                    icon: 'success',
                })
            }
            console.log(data);

            Swal.fire({
                title: 'Success!',
                text: 'Product Updated in Cart',
                icon: 'success',
            })

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
            //   fetchDataAuth()
            Swal.fire({
                title: 'Success!',
                text: 'Product Added to Wishlist',
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
            //   fetchDataAuth()
            Swal.fire({
                title: 'Success!',
                text: 'Product Removed from Wishlist',
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



    return (
        <div className={``}>
            {/* Nav menu- Breadcrumb */}


            {/* Filter navbar */}
            {/* <Filter setGrid={setGrid} grid={grid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} filterActive={filterActive} setFilterActive={setFilterActive} /> */}
            <SideNav display={filterActive} setDisplay={setFilterActive} />

            {/* Large Desktop */}
            <div className='hidden xl:block'>
                {grid ? <CustomGrid gridSize={grid}>
                    {demo ? demo.map((items, i) => {
                        let imgs = []
                        imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.img)
                        items.images.map((img) => {
                            imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                        })

                        console.log(imgs)

                        return (
                            // <div key={i} className="group relative" >
                            //     <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
                            //     <div className={`${grid == 6 && "hidden"} hidden group-hover:block group-hover:absolute bottom-12 p-4 w-full bg-white/80 `}>
                            //         <div className='text-lg font-semibold text-accent'>{items.name}</div>
                            //         <div className='text-lg text-accent flex flex-wrap items-center gap-2'><p className='font-semibold'>&#8377; {items.price}</p><p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; 2999</p> <p className="text-base font-medium text-green-500">33%</p></div>
                            //         {/* <button
                            //             type="button"
                            //             onClick={() => { navigate(`/products/cart`) }}
                            //             className="rounded-md my-2 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            //         >
                            //             Add to Cart
                            //         </button> */}
                            //     </div>
                            // </div>

                            // <div key={i} className="" >
                            //     <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
                            //     <div className={`${grid == 6 && "hidden"} `}>
                            //         <div className='text-lg font-semibold text-accent'>{items.name}</div>
                            //         <div className='text-lg text-accent flex flex-wrap items-center gap-2'><p>&#8377; {items.price}</p><p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; 2999</p> <p className="text-base font-medium text-green-500">33%</p></div>
                            //         {/* <button
                            //             type="button"
                            //             onClick={() => { navigate(`/products/cart`) }}
                            //             className="rounded-md my-2 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            //         >
                            //             Add to Cart
                            //         </button> */}
                            //     </div>
                            // </div>

                            <div key={i} className="border-2 mt-1 border-black/30 rounded-xl">
                                <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
                                <div className={`${grid == 6 && "hidden"} p-2 `}>
                                    <p className='text-lg font-normal text-accent'>{items.name}</p>
                                    <div className=' flex flex-wrap justify-between items-center'>
                                        <div className='text-lg text-accent flex items-center gap-2'><p>&#8377; {items.price}</p><p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; {items.discounted_price}</p> <p className="text-base font-medium text-[#af0000]">{items.discount_percentage}%</p></div>
                                        <button
                                            type="button"
                                            onClick={() => { handleAddToCart(items.sqp[0].id, items.id) }}
                                            className="rounded-md my-2 bg-black px-2 py-2 text-sm font-normal text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <div>Loading ....</div>}
                </CustomGrid>
                    : <div>Loading ....</div>
                }
            </div>

            {/* Medium Desktop */}
            <div className='hidden xl:hidden md:block'>
                {mgrid ? <CustomGrid gridSize={mgrid}>
                    {demo.length > 0 && demo.map((items, i) => {
                        let imgs = []
                        imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.img)
                        items.images.map((img) => {
                            imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                        })

                        console.log(imgs)

                        return (
                            <div key={i} className="">
                                <Carousel id={items.id} isFav={false} func={() => addToFavorite(items.id)} slides={imgs} />
                                <div className={` border-2 border-black/30 p-2 mt-1 rounded-lg`}>
                                    <div className='text-lg font-semibold text-accent'>{items.name}</div>
                                    <div className='text-lg text-accent flex items-center gap-2'><p>&#8377; {items.price}</p><p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; {items.discounted_price}</p> <p className="text-base font-medium text-[#af0000]">
                                        {items.discount_percentage}%</p></div>
                                    <button
                                        type="button"
                                        onClick={() => { navigate(`/products/cart`) }}
                                        className="rounded-md my-2 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </CustomGrid>
                    : <div>Loading ....</div>
                }
            </div>

            {/* Small Desktop */}
            <div className='block md:hidden'>
                {sgrid ? <CustomGrid gridSize={sgrid}>
                    {demo && demo.map((items, i) => {
                        let imgs = []
                        imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.img)
                        items.images.map((img) => {
                            imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                        })

                        console.log(imgs)
                        return (
                            <div key={i} className="">
                                <Carousel id={items.id} isFav={items.whishlist} func={() => addToFavorite(items.id)} slides={items.images} />
                                <div className={`${sgrid == 3 && 'hidden'} border-2 border-black/30 p-2 mt-1 rounded-lg`}>
                                    <p className='text-base font-semibold text-accent'>{items.name}</p>
                                    <div className='flex flex-wrap justify-between items-center'>
                                        <div className='text-base text-accent flex items-center gap-2'><p>&#8377; {items.price}</p><p className='text-sm font-semibold text-gray-800/80 line-through'>&#8377; 2999</p> <p className="text-sm font-medium text-[#af0000]">33%</p></div>
                                        <button
                                            type="button"
                                            onClick={() => { navigate(`/products/cart`) }}
                                            className="rounded-md my-2 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </CustomGrid>

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