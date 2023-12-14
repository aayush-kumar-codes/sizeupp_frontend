import React, { useEffect, useState } from 'react'
import Filter from '../components/ProductList/Filter'
import { styles } from '../style'
import { Link, useNavigate } from 'react-router-dom'
import { products } from '../constants/products'
import { CustomGrid } from '../components/ProductList/ProductGrid'
import Carousel from '../components/Custom/Carousel'
import SideNav from '../components/SideNav'

const ProductList = () => {
    const [grid, setGrid] = useState(3)
    const [mgrid, setMGrid] = useState(2)
    const [sgrid, setSGrid] = useState(2)

    const [Products, setProducts] = useState(products)

    const [filterActive, setFilterActive] = useState(false)

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

    useEffect(() => {
        console.log("Refresh Grid", grid)
    }, [grid])

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return (
        <div className={``}>
            {/* Nav menu- Breadcrumb */}

            <ol className={`inline-flex items-center space-x-1 md:space-x-3 ${styles.paddingX} py-4`}>
                <li className="inline-flex items-center">

                    <Link
                        to="/products"
                        className="ml-1 inline-flex text-lg text-c-gray-800 hover:underline md:ml-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        Products
                    </Link>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                        <a href="#" className="ml-1 text-lg text-c-gray-800 hover:underline md:ml-2">
                            Men
                        </a>
                    </div>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="ml-1 text-lg font-medium text-c-gray-800 hover:underline md:ml-2">
                            Oxford Casual Shirts
                        </span>
                    </div>
                </li>
            </ol>

            {/* Filter navbar */}
            <Filter setGrid={setGrid} grid={grid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} filterActive={filterActive} setFilterActive={setFilterActive} />
            <SideNav display={filterActive} setDisplay={setFilterActive} />
            {/* Large Desktop */}
            <div className='hidden xl:block'>
                {grid ? <CustomGrid gridSize={grid}>
                    {Products.map((items, i) => {
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

                            <div key={i} className="rounded-lg">
                                <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
                                <div className={`${grid == 6 && "hidden"} border-2 mt-1 border-black/30 p-2 rounded-lg`}>
                                    <div className='text-lg font-semibold text-accent'>{items.name}</div>
                                    <div className='text-lg text-accent flex items-center gap-2'><p>&#8377; {items.price}</p><p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; 2999</p> <p className="text-base font-medium text-[#af0000]">33%</p></div>
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

            {/* Medium Desktop */}
            <div className='hidden xl:hidden md:block'>
                {mgrid ? <CustomGrid gridSize={mgrid}>
                    {Products.map((items, i) => {
                        return (
                            <div key={i} className="">
                                <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
                                <div className={` border-2 border-black/30 p-2 mt-1 rounded-lg`}>
                                    <div className='text-lg font-semibold text-accent'>{items.name}</div>
                                    <div className='text-lg text-accent flex items-center gap-2'><p>&#8377; {items.price}</p><p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; 2999</p> <p className="text-base font-medium text-green-500">33%</p></div>
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
                    {Products.map((items, i) => {
                        return (
                            <div key={i} className="">
                                <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
                                <div className={` border-2 border-black/30 p-2 mt-1 rounded-lg`}>
                                    <div className='text-lg font-semibold text-accent'>{items.name}</div>
                                    <div className='text-lg text-accent flex items-center gap-2'><p>&#8377; {items.price}</p><p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; 2999</p> <p className="text-base font-medium text-green-500">33%</p></div>
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
        </div>
    )
}

export default ProductList