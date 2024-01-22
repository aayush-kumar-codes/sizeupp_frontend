import { TopPicks } from "../../constants/Product"
export default function Products() {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-[90%] flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Top Picks</h2>
                <h2 className="text-lg font-normal tracking-tight text-blue-900 ">View More</h2>
            </div>

            <div className="w-[90%] mt-6 flex md:justify-between items-center flex-wrap gap-8 justify-evenly">
                {TopPicks.map((product) =>
                    <div key={product.id} className="w-60">
                        <div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">

                                    <span aria-hidden="true" className=" inset-0" />
                                    {product.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{product.price}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
