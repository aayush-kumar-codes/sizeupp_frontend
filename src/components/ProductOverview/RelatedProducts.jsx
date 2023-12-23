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
            {relatedProducts.length > 0 ? (
                <>
                    {(() => {
                    const itemsToDisplay = [];
                    for (let i = 0; i < 9 && i < relatedProducts.length; i++) {
                        const item = relatedProducts[i];
                        if (item.id === id) continue;

                        itemsToDisplay.push(
                        <div key={i} className="relative aspect-[16/9] w-auto rounded-md md:aspect-auto md:h-[400px] group overflow-hidden cursor-pointer">
                            <img
                            src={`${import.meta.env.VITE_SERVER_URL}/${item.images}`}
                            alt='one'
                            className="z-0 h-full w-full rounded-md object-cover transition-transform transform scale-100 group-hover:scale-110 ease-in delay-200"
                            />
                            <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-4 left-4 text-left opacity-0 group-hover:opacity-100 transition-opacity p-3">
                                    <h1 className="text-lg font-semibold text-white">{item.name}</h1>
                                    <p className="text-xs text-gray-300">{item.color}</p>
                            <p className="mt-2 text-sm text-gray-300">
                                <span className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl ">
                                ₹ {item.mrp}
                                </span>
                                {/* <span className="font-segoe pl-2 text-sm text-c-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                                ₹ {item.price}
                                </span>
                                <span className=" md:text-base lg:text-lg xl:text-xl pl-2 font-medium text-[#00ffd5]">
                                {item.discount_percentage}%
                                </span> */}
                            </p>
                            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                                Shop Now &rarr;
                            </button>
                            </div>
                        </div>
                        );
                    }
                    return itemsToDisplay;
                    })()}
                </>
                )  : <div className="text-center text-lg font-semibold">No related products found</div>}
        </div>

    )
}

RelatedProducts.propTypes = {
    relatedProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchData: PropTypes.func.isRequired,
    fetchDataAuth: PropTypes.func.isRequired
}

export default RelatedProducts