import { styles } from "../style"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { dress } from "../assets/images"
import { Link } from "react-router-dom"
import { GEGreen2, GEGreen5, Maroon1 } from "../assets/images/men"
import { WWhite1 } from "../assets/images/women"
const Megamenu = () => {
    return (
        <div className={`${styles.paddingX} hidden md:block py-4 w-full relative bg-white shadow z-40 `}>
            {/* layout prefixer */}
            <div className={`flex items-center gap-10 max-w-5xl mx-auto`}>
                {/* All Products */}
                <div className="group">
                    <Link to="/products" className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        All Products
                    </Link>
                </div>
                {/* Online Only */}
                <div className="group">
                    <p className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        Sales
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:grid grid-cols-4 absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">
                        <div className="col-span-1">
                            <p className="text-lg font-semibold">Online Only</p>
                            <p className="text-sm text-gray-500">Shop online only products</p>
                            < img src={GEGreen5} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Online Only</button>
                            < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                        </div>
                        <div>
                            <ul>
                                <li>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Woman */}
                <div className="group">
                    <p className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        Women
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:grid grid-cols-4 gap-10 justify-between absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">
                        <div className="col-span-1">
                            <p className="text-lg font-semibold">Women&apos;s Fashion Era</p>
                            <p className="text-sm text-gray-500">New products</p>
                            < img src={WWhite1} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                            < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                        </div>
                        <div className="col-span-1 ">
                            <h2 className="text-lg font-semibold mb-2">Casual-Wear Topwear</h2>
                            <ul className="grid grid-flow-row gap-4">
                                {['Co-ord-Set', 'Core-Tee', 'Dress', 'Kurta', 'Kurta-and-Pants', 'Shirts', 'Sweat-Shirts', 'Top', 'T-Shirts', 'Tunic'].map((items, i) => {
                                    return (
                                        <li key={i} className="text-base text-gray-800/80 font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="col-span-1 ">
                            <h2 className="text-lg font-semibold mb-2">Casual-Wear Bottom-Wear</h2>
                            <ul className="grid grid-flow-row gap-4">
                                {['Jeggigns', 'Leggings', 'Pants', 'Trousers'].map((items, i) => {
                                    return (
                                        <li key={i} className="text-base text-gray-800/80 font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="col-span-1 ">
                            <ul className="grid grid-flow-row gap-4">
                                {['Festive-Wear', 'Winter-Wear'].map((items, i) => {
                                    return (
                                        <li key={i} className="text-lg font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Man */}
                <div className="group">
                    <p className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        Men
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:grid grid-cols-4 gap-10 justify-between absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">
                        <div className="col-span-1">
                            <p className="text-lg font-semibold">Men&apos;s Fashion Era</p>
                            <p className="text-sm text-gray-500">New products</p>
                            < img src={Maroon1} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                            < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                        </div>
                        <div className="col-span-1 ">
                            <h2 className="text-lg font-semibold mb-2">Casual Topwear</h2>
                            <ul className="grid grid-flow-row gap-4">
                                {['Casual-Shirts', 'Core-Tee', 'Formal-Shirts', 'Kurta', 'Polo-Tshirts', 'T-Shirts'].map((items, i) => {
                                    return (
                                        <li key={i} className="text-base text-gray-800/80 font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="col-span-1 ">
                            <h2 className="text-lg font-semibold mb-2">Casual Bottomwear</h2>
                            <ul className="grid grid-flow-row gap-4">
                                {['Chino', 'Denim', 'Joggers', 'Pyjama', 'Track-Pants'].map((items, i) => {
                                    return (
                                        <li key={i} className="text-base text-gray-800/80 font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="col-span-1 ">
                            <ul className="grid grid-flow-row gap-4">
                                {['Ethnic-Wear', 'Evening-Wear', 'Formal-Wear', 'Winter-Wear'].map((items, i) => {
                                    return (
                                        <li key={i} className="text-lg font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Kids */}
                <div className="group">
                    <p className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        Accessories
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:flex flex-col absolute px-6 py-6 w-1/6 bg-secondary rounded-md  drop-shadow-md">
                        <h2 className="text-lg font-semibold mb-2">Casual Bottomwear</h2>

                        <div className="text-base text-gray-800/80 font-semibold hover:underline cursor-pointer">Boxer</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Megamenu