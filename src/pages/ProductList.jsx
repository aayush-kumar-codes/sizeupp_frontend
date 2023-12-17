import React, { useEffect, useState } from 'react'
import Filter from '../components/ProductList/Filter'
import { styles } from '../style'
import { Link, useNavigate } from 'react-router-dom'
import { products } from '../constants/products'
import { CustomGrid } from '../components/ProductList/ProductGrid'
import Carousel from '../components/Custom/Carousel'
import SideNav from '../components/SideNav'

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
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className={``}>
            {/* Nav menu- Breadcrumb */}

            
            {/* Filter navbar */}
            {/* <Filter setGrid={setGrid} grid={grid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} filterActive={filterActive} setFilterActive={setFilterActive} /> */}
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

                            <div key={i} className="border-2 mt-1 border-black/30 rounded-xl">
                                <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
                                <div className={`${grid == 5 && "hidden"} p-2 `}>
                                    <p className='text-lg font-normal text-accent'>{items.name}</p>
                                    <div className=' flex flex-wrap justify-between items-center'>
                                        <div className='text-lg text-accent flex items-center gap-2'><p>&#8377; {items.price}</p><p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; 2999</p> <p className="text-base font-medium text-[#af0000]">33%</p></div>
                                        <button
                                            type="button"
                                            onClick={() => { navigate(`/products/cart`) }}
                                            className="rounded-md my-2 bg-black px-2 py-2 text-sm font-normal text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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

            {/* Medium Desktop */}
            <div className='hidden xl:hidden md:block'>
                {mgrid ? <CustomGrid gridSize={mgrid}>
                    {Products.map((items, i) => {
                        return (
                            <div key={i} className="">
                                <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
                                <div className={` border-2 border-black/30 p-2 mt-1 rounded-lg`}>
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

            {/* Small Desktop */}
            <div className='block md:hidden'>
                {sgrid ? <CustomGrid gridSize={sgrid}>
                    {Products.map((items, i) => {
                        return (
                            <div key={i} className="">
                                <Carousel id={items.id} isFav={items.isFavorite} func={() => addToFavorite(items.id)} slides={items.images} />
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

ProductList.PropTypes = {
    
}

export default ProductList