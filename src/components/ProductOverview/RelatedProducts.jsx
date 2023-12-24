import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'

const RelatedProducts = ({
    relatedProducts,
    fetchData,
    fetchDataAuth
}) => {
    const { id } = useParams()
    console.log(relatedProducts, id)
    const navigate = useNavigate()

    const handleNavigate = (prod) => {
        if (localStorage.token) {
            fetchDataAuth(prod)
        } else {
            fetchData(prod)
        }
        navigate(`/products/${prod}`)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    return (

        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            {relatedProducts.length > 0 ? relatedProducts.slice(0, 10).map((item, i) => {
                if (item.id === id) return null
                if (item.images.length === 0) return null
                return (
                    <>

                        <div key={i} className="mt-1 rounded-xl">
                            <div className="overflow-hidden relative">
                                <div
                                    className="flex transition-transform cursor-pointer ease-out duration-500 z-50 aspect-[3/4]"
                                >

                                    <img
                                            key={i}
                                            onClick={() => { navigate(`/products/${id}`) }}
                                            className="object-cover w-full h-full cursor-pointer rounded-lg"
                                            src={import.meta.env.VITE_SERVER_URL + (item.images[0].img).slice(6)}
                                            alt="dress"
                                        />
                                    
                                </div>
                                </div>

                                <div className={`p-2 `}>
                                    <p className='truncate text-lg font-normal text-accent'>{item.name}</p>
                                    <div className=' flex flex-wrap justify-between items-center'>
                                        <div className='text-base text-accent flex items-center gap-2'>
                                            <p>&#8377; {item.discounted_price ? item.discount_price : item.mrp}</p>
                                            {item.discount_price && <div className='flex flex-wrap justify-center items-center'>
                                                <p className='text-base font-semibold text-gray-800/80 line-through'>&#8377; {item.mrp}</p>
                                                <p className="text-base font-medium text-[#af0000]">{item.discount_percentage || 0}%</p>
                                            </div>
                                            }
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => { handleNavigate(item.id) }}
                                            className="rounded-md my-2 bg-black px-2 py-2 text-xs font-normal text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                        )
            }
                        ) : <div className="text-center text-lg font-semibold">No related products found</div>}
                    </div >

    )
}

            RelatedProducts.propTypes = {
                relatedProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
            fetchData: PropTypes.func.isRequired,
            fetchDataAuth: PropTypes.func.isRequired
}

            export default RelatedProducts