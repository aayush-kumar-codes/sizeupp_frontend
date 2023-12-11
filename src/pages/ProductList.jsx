import React, { useEffect } from 'react'
import Filter from '../components/ProductList/Filter'
import { styles } from '../style'
import { Link, useNavigate } from 'react-router-dom'
import { heartFillIcon, heartIcon } from '../assets/icons'
import { products } from '../constants/products'
import { CustomGrid } from '../components/ProductList/ProductGrid'

const ProductList = () => {
    const [grid, setGrid] = React.useState(4)
    const [mgrid, setMGrid] = React.useState(2)
    const [sgrid, setSGrid] = React.useState(2)

    const [Products, setProducts] = React.useState(products)

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
    return (
        <div>
            {/* Nav menu- Breadcrumb */}
            <ol className={`inline-flex items-center space-x-1 md:space-x-3 ${styles.padding}`}>
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
                            Woman
                        </a>
                    </div>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="ml-1 text-lg font-medium text-c-gray-800 hover:underline md:ml-2">
                            Western Wear
                        </span>
                    </div>
                </li>
            </ol>

            {/* Filter navbar */}
            <Filter setGrid={setGrid} grid={grid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} />

            {/* Large Desktop */}
            <div className='hidden xl:block'>
                {grid ? <CustomGrid gridSize={grid}>
                    {Products.map((items, i) => {
                        return (
                            <div key={i} className="aspect-[3/4] relative">
                                <div onClick={() => { addToFavorite(items.id); }} className={`w-1/12 cursor-pointer absolute top-4 right-4 `}><img src={items.isFavorite ? heartFillIcon : heartIcon} alt="heart" /></div>
                                <img onClick={() => { navigate("overview") }} className="object-cover w-full h-full rounded-lg cursor-pointer" src={items.image} alt="dress" />
                                <div className={`${grid == 6 && "hidden"}`}>
                                    <div className='text-lg text-accent'>{items.name}</div>
                                    <div className='text-lg text-accent'>&#8377; {items.price}</div>
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
                            <div key={i} className="aspect-[3/4] relative">
                                <div onClick={() => { addToFavorite(items.id); }} className={`w-1/12 cursor-pointer absolute top-4 right-4 `}><img src={items.isFavorite ? heartFillIcon : heartIcon} alt="heart" /></div>
                                <img onClick={() => { navigate("overview") }} className="object-cover w-full h-full cursor-pointer" src={items.image} alt="dress" />
                                <div className=''>
                                    <div className='text-lg font-medium text-c-gray-800'>{items.name}</div>
                                    <div className='text-sm text-c-gray-500'>{items.price}</div>
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
                            <div key={i} className="aspect-[3/4] relative">
                                <div onClick={() => { addToFavorite(items.id); }} className={`w-1/12 cursor-pointer absolute top-4 right-4 `}><img src={items.isFavorite ? heartFillIcon : heartIcon} alt="heart" /></div>
                                <img onClick={() => { navigate("overview") }} className="object-cover w-full h-full cursor-pointer" src={items.image} alt="dress" />
                                <div className=''>
                                    <div className='text-lg font-medium text-c-gray-800'>{items.name}</div>
                                    <div className='text-sm text-c-gray-500'>{items.price}</div>
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