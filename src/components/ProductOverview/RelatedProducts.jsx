import PropTypes from 'prop-types'
import { useNavigate,useParams } from 'react-router-dom'

const RelatedProducts = ({
    relatedProducts,
    fetchData,
    fetchDataAuth
}) => {
    const {id} = useParams()
    console.log(relatedProducts,id)
    const navigate = useNavigate()

    const handleNavigate = (prod) => {
        if(localStorage.token) {
            fetchDataAuth(prod)
        }else{
            fetchData(prod)
        }
        navigate(`/products/${prod}`)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    return (

        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            {relatedProducts.length > 0 ? relatedProducts.map((item, i) => {
                if(item.id === id) return null
                return (
                    <div
                        key={i}
                        className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]"
                    >
                        <img
                            src={`${import.meta.env.VITE_SERVER_URL}/${item.img}`}
                            alt="AirMax Pro"
                            className="z-0 h-full w-full rounded-md object-cover"
                        />
                        <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-left">
                            <h1 className="text-lg font-semibold text-white">{item.name}</h1>
                            <p className="mt-2 text-sm text-gray-300">
                                <span className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl ">
                                    ₹ {item.discounted_price}
                                </span>
                                <span className="font-segoe pl-2 text-sm text-c-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                                    ₹ {item.price}
                                </span>
                                <span className=" md:text-base lg:text-lg xl:text-xl pl-2 font-medium text-[#00ffd5]">
                                    {item.discount_percentage}%</span>
                            </p>
                            <button onClick={()=>{handleNavigate(item.id)}} className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                                Shop Now &rarr;
                            </button>
                        </div>
                    </div>
                )
            }
            ) : <div className="text-center text-lg font-semibold">No related products found</div>}
        </div>

    )
}

RelatedProducts.propTypes = {
    relatedProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchData: PropTypes.func.isRequired,
    fetchDataAuth: PropTypes.func.isRequired
}

export default RelatedProducts