import { useState } from "react"
import { filterIcon, sortIcon } from "../../assets/icons"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid"
import { FunnelIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline"
import { styles } from "../../style"
import Error from "../Alerts/Error"
import PropTypes from 'prop-types'

const Filter = ({
    grid,
    setGrid,
    mgrid,
    setMGrid,
    sgrid,
    setSGrid,
    setFilterActive
}) => {
    const [error, setError] = useState(false)

    const enums = [2, 3, 4, 6]

    const handleSliderForLargeScreen = (e) => {
        const index = parseInt(e.target.value, 10)
        console.log(index)
        console.log(enums[index], parseInt(e.target.value))
        setGrid(enums[index])
    }

    return (
        // Filter navbar
        <div className={`${styles.paddingX} flex justify-between items-center mt-4`}>
            {/* Grid layout */}
            <div className="group flex items-center w-1/2 mx-2">
                <AdjustmentsHorizontalIcon className='w-6 h-6 mr-2' />
                <label htmlFor="grid" className="my-1 uppercase hidden md:block group-hover:underline">Grid</label>
                <input id='grid' type="range" className="hidden xl:block w-1/2 h-1 accent-accent ml-2" min={0} max={enums.length - 1} value={enums.indexOf(grid)} onChange={handleSliderForLargeScreen} step={1} />
                <input id='grid' type="range" className="hidden xl:hidden md:block w-1/2 h-1 accent-accent ml-2" min={2} max={4} onChange={(e) => { setMGrid(e.target.value) }} defaultValue={mgrid} step={2} />
                <input id='grid' type="range" className="block md:hidden w-full h-1 accent-accent ml-2" min={1} max={3} onChange={(e) => { setSGrid(e.target.value) }} defaultValue={sgrid} step={1} />
            </div>

            <Error display={error} setDisplay={setError} error="Network Error" />

            <div className="flex items-center">
                {/* filter */}
                <div onClick={() => { setFilterActive(true) }} className="flex mx-4 cursor-pointer">
                    <div className="hover:underline uppercase ">Filter</div>
                    <FunnelIcon className='w-6 h-6 ml-2' />
                </div>

                {/* Sort */}
                <div className="group">
                    <div className="flex mx-4 cursor-pointer">
                        <div className="hover:underline uppercase ">Sort</div>
                        <ArrowsUpDownIcon className='w-6 h-6 ml-2' />
                    </div>
                    <div className="hidden z-50 group-hover:flex flex-col absolute right-8 px-6 py-6 w-1/6 bg-secondary rounded-md  drop-shadow-md">
                        <h2 className="text-lg font-semibold mb-2">Sort by : </h2>

                        <div className="hover:bg-slate-800/10 rounded-lg p-2 flex items-center justify-between gap-2 my-2">
                            <label htmlFor="pricelth" className="cursor-pointer text-lg">Price: Low to High</label>
                            <input type="radio" name="sort" id="pricelth" className="cursor-pointer  w-4 h-4" />
                        </div>
                        <div className="hover:bg-slate-800/10 rounded-lg p-2 flex items-center justify-between gap-2 my-2">
                            <label htmlFor="pricehtl" className="cursor-pointer text-lg">Price: High to Low</label>
                            <input type="radio" name="sort" id="pricehtl" className="cursor-pointer  w-4 h-4" />
                        </div>
                        <div className="hover:bg-slate-800/10 rounded-lg p-2 flex items-center justify-between gap-2 my-2">
                            <label htmlFor="pricena" className="cursor-pointer text-lg">New Arrivals</label>
                            <input type="radio" name="sort" id="pricena" className="cursor-pointer w-4 h-4" />
                        </div>
                        <div className="hover:bg-slate-800/10 rounded-lg p-2 flex items-center justify-between gap-2 my-2">
                            <label htmlFor="pricedhtl" className="cursor-pointer text-lg">Discount: High to Low</label>
                            <input type="radio" name="sort" id="pricedhtl" className="cursor-pointer  w-4 h-4 text-orange-500" />
                        </div>

                    </div>
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