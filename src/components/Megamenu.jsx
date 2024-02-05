import { styles } from "../style"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"


const Megamenu = () => {
    const [data, setData] = useState([])
    const { setfilterdata, handleFetchFilterProducts } = useContext(AuthContext)

    useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/product/category-details", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(res => res.json().then(data => {
            setData(data)
        }
        ))
    }, [])
    const navigate = useNavigate()

    const [megamenuhide, setMegamenuhide] = useState(false)

    const handleSearch = (id, gender, cat) => {
        setMegamenuhide(true)
        navigate(`/products?gender=${gender}&category=${cat}&subcategory=${id}`)
        setMegamenuhide(false)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    return (
        <>
            <div className={`${styles.paddingX} hidden md:block py-2 w-full sticky top-16 bg-white shadow z-40 `}>
                {/* layout prefixer */}
                <div className={`flex items-center gap-10 max-w-5xl mx-auto`}>
                    {/* All Products */}
                    <div className="group">

                        <Link to="/products" onClick={() => {
                            setfilterdata({
                                gender: [],
                                color: [],
                                size: [],
                                search: "",
                                category: [],
                            })
                        }} className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                            All Products
                        </Link>
                    </div>

                    {data.categories && data.categories.map((gender, index) => {
                        return (
                            <div key={index} className="group">

                                <p className='text-md font-normal tracking-wide cursor-pointer flex items-center justify-center'>
                                    {gender.name}
                                    <ChevronDownIcon className=" ml-2 w-4 font-bold" />
                                </p>
                                <div className={`${megamenuhide ? 'hidden' : 'block'}`}>
                                    <div className={`hidden focus:hidden group-hover:grid grid-cols-${gender.subcategories.length == 3 ? '2' : gender.subcategories.length / 2} gap-10 justify-between absolute p-6 w-fit border bg-secondary rounded-md drop-shadow-md`}>

                                        {gender.subcategories && gender?.subcategories.map((cat) => {
                                            return (
                                                <div key={cat.id} className="col-span-1 ">
                                                    <h2 className="text-base font-semibold mb-2">{cat.name}</h2>
                                                    <ul className="grid grid-flow-row gap-2">
                                                        {cat.subsubcategories?.length > 0 && cat.subsubcategories?.map((subsubcat, i) => {
                                                            return (
                                                                <li onClick={() => handleSearch(subsubcat.id, gender.id, cat.id)} key={i} className="text-sm text-gray-800/80  hover:underline cursor-pointer">
                                                                    {subsubcat.name}
                                                                </li>
                                                            )
                                                        })
                                                        }
                                                    </ul>
                                                </div>)
                                        })
                                        }

                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div >
        </>

    )
}

export default Megamenu