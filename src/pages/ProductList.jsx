import { useState,useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomGrid } from '../components/ProductList/ProductGrid'
import Carousel from '../components/Custom/Carousel'
import SideNav from '../components/SideNav'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import ProductSkullCard from '../components/Skeleton/ProductList/ProductCard'
import { AuthContext } from '../context/AuthProvider'

const ProductList = ({
    grid,
    setResults,
    mgrid,
    sgrid,
    filterActive,
    setFilterActive,
}) => {

    const { fetchProducts, fetchProductsAuth, handlefetchFilterProducts, productsbc, setproductcount,productcount, product } = useContext(AuthContext)

   

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
        if (localStorage.token) {
            handlefetchFilterProducts();

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
            fetchProductsAuth()
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
            fetchProductsAuth()
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
            {/* <div>
                {itemsInfinite.map((itemInfinite, index) => (
                    <div key={index}>
                    {itemInfinite}
                    </div>
                ))}
                </div> */}
            <div className='hidden xl:block'>
                {grid ? <CustomGrid gridSize={grid}>
                    {productsbc.length > 0 ? productsbc.map((items, i) => {
                        let imgs = []
                        imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.images)
                        items.images.map((img) => {
                            imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                        })

                        if(items.images.length == 0){
                           
                            return null

                        }


                        return (
                           

                            <div key={i} className="mt-1 rounded-xl">
                                <Carousel id={items.id} isFav={items.wishlist} slides={items.images} handleAddWishlist={handleAddWishlist} handleRemoveWishlist={handleRemoveWishlist} />
                                <div className={`${grid == 5 && "hidden"} p-2 `}>
                                    <p className='truncate text-lg font-normal text-accent'>{items.name}</p>
                                    <div className=' flex flex-wrap justify-between items-center'>
                                        <div className='text-base text-accent flex items-center gap-2'>
                                            <p>&#8377; {items.discounted_price ? items.discount_price : items.mrp}</p>
                                            {items.discount_price && <div className='flex flex-wrap justify-center items-center'>
                                                <p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; {items.mrp}</p>
                                                <p className="text-base font-medium text-[#af0000]">{items.discount_percentage || 0}%</p>
                                            </div>
                                            }
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => { handleAddToCart(items.sqp[0].id, items.id) }}
                                            className="rounded-md my-2 bg-black px-2 py-2 text-xs font-normal text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <>
                        {
                            Array(10).fill().map((_, i) => (
                                <ProductSkullCard key={i} />
                            ))
                        }
                    </>}

                </CustomGrid>
                    : <div>Loading ....</div>
                }
            </div>

            {/* Medium Desktop */}
            <div className='hidden xl:hidden md:block'>
                {mgrid ? <CustomGrid gridSize={mgrid}>
                    {productsbc.length > 0 ? productsbc.map((items, i) => {
                        let imgs = []
                        imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.img)
                        items.images.map((img) => {
                            imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                        })


                        return (
                            <div key={i} className="">
                                <Carousel id={items.id} isFav={false} func={() => { }} slides={items.images} />
                                <div className={` p-2 mt-1 rounded-lg`}>
                                    <div className='truncate text-base text-accent'>{items.name}</div>

                                    <div className=' flex flex-wrap justify-between items-center'>
                                        <div className='text-sm text-accent flex items-center gap-2'><p>&#8377; {items.discount_price ? items.discount_price : items.mrp}</p>
                                            {items.discount_price && <div className='flex flex-wrap justify-center items-center'>
                                                <p className='text-sm font-semibold text-gray-800/80 line-through'>&#8377; {items.mrp}</p>
                                                <p className="text-sm font-medium text-[#af0000]">{items.discount_percentage || 0}%</p>
                                            </div>
                                            }
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => { navigate(`/products/cart`) }}
                                            className="rounded-md my-2 bg-black px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <>
                        {
                            Array(10).fill().map((_, i) => (
                                <ProductSkullCard key={i} />
                            ))
                        }
                    </>}
                </CustomGrid>
                    : <div>Loading ....</div>
                }
            </div>

            {/* Small Desktop */}
            <div className='block md:hidden'>
                {sgrid ? <CustomGrid gridSize={sgrid}>
                    {productsbc.length > 0 ? productsbc.map((items, i) => {
                        let imgs = []
                        imgs.push(`${import.meta.env.VITE_SERVER_URL}` + items.img)
                        items.images.map((img) => {
                            imgs.push(`${import.meta.env.VITE_SERVER_URL}` + img.img)
                        })

                        return (
                            <div key={i} className="">
                                <Carousel id={items.id} isFav={false} func={() => { }} slides={items.images} />
                                <div className={`${sgrid == 3 && 'hidden'} p-2 mt-1 rounded-lg`}>
                                    <p className='truncate text-base text-accent'>{items.name}</p>
                                    <div className='flex flex-wrap justify-between items-center'>
                                        <div className='text-lg text-accent flex items-center gap-2'>
                                            <p>&#8377; {items.mrp}</p>
                                            {items.discount_price && <div className='flex flex-wrap justify-center items-center'>
                                                <p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; {items.mrp}</p>
                                                <p className="text-base font-medium text-[#af0000]">{items.discount_percentage || 0}%</p>
                                            </div>
                                            }
                                        </div>
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
                    }) : <>
                        {
                            Array(10).fill().map((_, i) => (
                                <ProductSkullCard key={i} />
                            ))
                        }
                    </>}
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