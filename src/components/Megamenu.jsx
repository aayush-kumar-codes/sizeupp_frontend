import { styles } from "../style"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"
const Megamenu = () => {

    const [data, setData] = useState([])

    const { setnavsearch,setfilterdata, setnavgender, setcategory } = useContext(AuthContext)

    useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/product/category-details", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(res => res.json().then(data => {
            console.log(JSON.stringify(data))
            setData(data)
            localStorage.setItem("cat_list", JSON.stringify(data))
        }
        ))
    }, [])
    const navigate = useNavigate()

    const [megamenuhide, setMegamenuhide] = useState(false)

    const handleSearch = (id, gender, cat) => {
        setMegamenuhide(true)
        navigate(`/products?gender=${gender}&category=${cat}&subcategory=${id}`)
        setMegamenuhide(false)
    }
    return (
        <div className={`${styles.paddingX} hidden md:block py-4 w-full relative bg-white shadow z-40 `}>
            {/* layout prefixer */}
            <div className={`flex items-center gap-10 max-w-5xl mx-auto`}>
                {/* All Products */}
                <div className="group">

                    <Link to="/products" onClick={()=>{
                        setfilterdata({
                            gender : [],
                            color: [],
                            size : [],
                            search:"",
                            category : ""
                        })
                    }} className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        All Products
                    </Link>
                </div>


                {/* Woman */}
                { <div className="group">

                    <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        Women
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className={`hidden ${megamenuhide ? 'hidden' : 'grid'} group-hover:grid grid-cols-4 gap-10 justify-between absolute p-10 w-fit bg-secondary rounded-md  drop-shadow-md`}>
                        {/* <div className="col-span-1">
                            <p className="text-base font-semibold">Women&apos;s Fashion Era</p>
                            <p className="text-sm text-gray-500">New products</p>
                            < img src={WWhite1} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            <Link to="/products">
                                < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                            </Link>
                            <Link to="/terms-condition">
                                < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                            </Link>
                        </div> */}
                        {data.women_category_data?.length > 0 && data.women_category_data.map((cat) => {
                            return (
                                <div key={cat.id} className="col-span-1 ">
                                    <h2 className="text-base font-semibold mb-2">{cat.name}</h2>
                                    <ul className="grid grid-flow-row gap-4">
                                        {cat.subcategories?.length > 0 && cat.subcategories?.map((items, i) => {
                                            return (
                                                <li onClick={() => handleSearch(items.name, 'Women', cat.name)} key={i} className="text-base text-gray-800/80 font-normal hover:underline cursor-pointer">
                                                    {items.name}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                </div>)
                        })
                        }
                        {/* <div className="col-span-1 ">
                            <ul className="grid grid-flow-row gap-4">
                                {['Festive-Wear', 'Winter-Wear'].map((items, i) => {
                                    return (
                                        <li onClick={()=>handleSearch(items.name)} key={i} className="text-base font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div> */}
                    </div>
                </div>}

                {/* 
                {data.length > 0 && data.map((item, index) => (
                    <div key={index} className="group">
                        <div >
                            <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                                {item.subcategory.category.name}
                                <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                            </p>
                            <div className="hidden group-hover:grid grid-cols-4 gap-10 justify-between absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">
                                <div className="col-span-1">
                                    <p className="text-base font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">New products</p>
                                    <img src={Maroon1} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                                    <button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                                    <p className="text-sm text-gray-500 mt-4">@Terms and conditions apply.</p>
                                </div>
                             
                            </div>
                        </div>
                    </div>
                ))} */}

                {/* Man */}
                <div className="group">

                    <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        Men
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className={`${megamenuhide ? 'hidden' : 'block'}`}>
                        <div className={`hidden focus:hidden group-hover:grid grid-cols-4 gap-10 justify-between absolute p-10 w-fit bg-secondary rounded-md drop-shadow-md`}>
                            {/* <div className="col-span-1">
                            <p className="text-base font-semibold">Men&apos;s Fashion Era</p>
                            <p className="text-sm text-gray-500">New products</p>
                            < img src={Maroon1} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            <Link to="/products">
                                < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                            </Link>
                            <Link to="/terms-condition">
                                < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                            </Link>
                        </div> */}
                            {data.men_category?.length > 0 && data.men_category.map((cat) => {
                                return (
                                    <div key={cat.id} className="col-span-1 ">
                                        <h2 className="text-base font-semibold mb-2">{cat.name}</h2>
                                        <ul className="grid grid-flow-row gap-4">
                                            {cat.subcategories?.length > 0 && cat.subcategories?.map((items, i) => {
                                                return (
                                                    <li onClick={() => handleSearch(items.name, 'Men', cat.name)} key={i} className="text-base text-gray-800/80 font-normal hover:underline cursor-pointer">
                                                        {items.name}
                                                    </li>
                                                )
                                            })
                                            }
                                        </ul>
                                    </div>)
                            })
                            }
                            {/* <div className="col-span-1 ">
                            <ul className="grid grid-flow-row gap-4">
                                {['Ethnic-Wear', 'Evening-Wear', 'Formal-Wear', 'Winter-Wear', 'Accessories'].map((items, i) => {
                                    return (
                                        <li key={i} className="text-base font-semibold hover:underline cursor-pointer">
                                            {items}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div> */}
                        </div>
                    </div>
                </div>

                {/* Festive Offers */}
                {/* <div className="group">

                    <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        Accessories
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:flex flex-col absolute px-6 py-6 w-1/6 bg-secondary rounded-md  drop-shadow-md">
                        <h2 className="text-base font-semibold mb-2">Casual Bottomwear</h2>

                        <div className="text-base text-gray-800/80 font-normal hover:underline cursor-pointer">Boxer</div>
                    </div>
                </div> */}

                {/* Sales */}
                {/* <div className="group">

                    <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                        Sales
                        <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:grid grid-cols-4 absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">
                        <div className="col-span-1">
                            <p className="text-base font-semibold">Online Only</p>
                            <p className="text-sm text-gray-500">Shop online only products</p>
                            < img src={GEGreen5} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            <Link to="/products">
                                < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Now</button>
                            </Link>
                            <Link to="/terms-condition">
                                < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                            </Link>
                        </div>
                        <div>
                            <ul>
                                <li>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Megamenu