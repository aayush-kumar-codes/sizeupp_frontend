
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid"
import { FunnelIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline"
import { styles } from "../../style"
import PropTypes from 'prop-types'
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { useNavigate } from "react-router-dom"
const Filter = ({
    grid,
    setGrid,
    mgrid,
    setMGrid,
    sgrid,
    setSGrid,
    setFilterActive
}) => {
    const enums = [2, 3, 4, 5]

    const handleSliderForLargeScreen = (e) => {
        const index = parseInt(e.target.value, 10)
        console.log(index)
        console.log(enums[index], parseInt(e.target.value))
        setGrid(enums[index])
    }

    const { handleFetchFilterProducts, filterdata, setIsFilterActive, setfilterdata } = useContext(AuthContext)



    const handleSort = (e) => {
        if (e === 'price_htl') {
            setfilterdata((prev) => {
                return { ...prev, price_htl: !filterdata.price_htl, price_lth: false }
            })
        } else if (e === 'price_lth') {
            setfilterdata((prev) => {
                return { ...prev, price_htl: false, price_lth: !filterdata.price_lth}
            })
        }
    }




    return (
        // Filter navbar
        <div className={`w-full flex md:justify-end justify-center items-center text-base mt-4`}>
            {/* Grid layout */}
            <div className="group flex items-center mx-2">
                <AdjustmentsHorizontalIcon className='w-6 h-6 mr-2' />
                <label htmlFor="grid" className="my-1 uppercase hidden md:block group-hover:underline">Grid</label>
                <input id='grid' type="range" className="hidden xl:block w-full h-1 accent-accent ml-2" min={0} max={enums.length - 1} value={enums.indexOf(grid)} onChange={handleSliderForLargeScreen} step={1} />
                <input id='mgrid' type="range" className="hidden xl:hidden md:block w-full h-1 accent-accent ml-2" min={2} max={4} onChange={(e) => { setMGrid(e.target.value) }} defaultValue={mgrid} step={2} />
                <input id='sgrid' type="range" className="block md:hidden w-full h-1 accent-accent ml-2" min={1} max={2} onChange={(e) => { setSGrid(e.target.value) }} defaultValue={sgrid} step={1} />
            </div>

            <div className="flex items-center">



                {/* Sort */}
                <div className="group">
                    <div className="flex items-center mx-4 cursor-pointer">
                        <div className="hover:underline ">Sort</div>
                        <ArrowsUpDownIcon className='w-5 h-5 m-1' />
                    </div>
                    <div className="hidden z-50 group-hover:flex flex-col absolute right-8 px-6 py-6 w-fit bg-secondary rounded-md  drop-shadow-md">
                        <h2 className="text-base font-semibold mb-2">Sort by : </h2>
                        {/* <div onClick={()=>handleSort('')} className="hover:bg-slate-800/10 rounded-lg px-2 py-1 flex items-center justify-between gap-2 my-1">
                            <label htmlFor="popular" className="cursor-pointer text-base">Popularity: High to Low</label>
                            <input onChange={()=>handleSort('')} type="radio"  name="sort" id="popular" className="cursor-pointer  w-4 h-4" />
                        </div> */}
                        <div className="hover:bg-slate-800/10 rounded-lg px-2 py-1 flex items-center justify-between gap-2 my-1">
                            <label htmlFor="plth" className=" text-base">Price: Low to High</label>
                            <input checked={filterdata.price_lth == true} onChange={() => handleSort('price_lth')} type="radio" name="sort" id="plth" className="cursor-pointer  w-4 h-4" />
                        </div>
                        <div className="hover:bg-slate-800/10 rounded-lg px-2 py-1 flex items-center justify-between gap-2 my-1">
                            <label htmlFor="phtl" className=" text-base">Price: High to Low</label>
                            <input checked={filterdata.price_htl == true} onChange={() => handleSort('price_htl')} type="radio" name="sort" id="phtl" className="cursor-pointer  w-4 h-4" />
                        </div>

                    </div>
                </div>

                {/* filter */}
                <div onClick={() => { setIsFilterActive(prev => !prev) }} className="lg:hidden flex mx-4 items-center cursor-pointer">
                    <div className="hover:underline ">Filter</div>
                    <FunnelIcon className='w-5 h-5 m-1' />
                </div>
            </div>
        </div>

    )
}

Filter.propTypes = {
    grid: PropTypes.number,
    setGrid: PropTypes.func,
    mgrid: PropTypes.number,
    setMGrid: PropTypes.func,
    sgrid: PropTypes.number,
    setSGrid: PropTypes.func,
    filterActive: PropTypes.bool,
    setFilterActive: PropTypes.func
}

export default Filter