import { useState } from "react"
import { filterIcon, gridIcon, sortIcon } from "../../assets/icons"
import { styles } from "../../style"
import Error from "../Alerts/Error"
import PropTypes from 'prop-types'

const Filter = ({
    grid,
    setGrid,
    mgrid,
    setMGrid,
    sgrid,
    setSGrid
}) => {
    const [error,setError] = useState(false)

    const enums = [2,3,4,6]

    const handleSliderForLargeScreen = (e) => {
        const index = parseInt(e.target.value,10)
        console.log(index)
        console.log(enums[index],parseInt(e.target.value))
        setGrid(enums[index])
    }

    return (
        // Filter navbar
        <div className={`${styles.paddingX} flex justify-end items-center`}>
            {/* Grid layout */}
            <img src={gridIcon} alt="grid" className='w-6 h-6 mr-2' />
            <input type="range" className="hidden xl:block w-1/4 h-1 accent-accent mr-2" min={0} max={enums.length-1} value={enums.indexOf(grid)} onChange={handleSliderForLargeScreen} defaultValue={enums.indexOf(grid)} step={1} />
            <input type="range" className="hidden xl:hidden md:block w-1/4 h-1 accent-accent mr-2" min={2} max={4} onChange={(e) => { setMGrid(e.target.value) }} defaultValue={mgrid} step={2} />
            <input type="range" className="block md:hidden w-1/4 h-1 accent-accent mr-2" min={1} max={3} onChange={(e) => { setSGrid(e.target.value) }} defaultValue={sgrid} step={1} />

            <Error display={error} setDisplay={setError} error="Network Error" />

            {/* filter */}
            <div onClick={()=>{setError(!error)}} className="flex mx-4 cursor-pointer">
                <div className="hover:underline uppercase ">Filter</div>
                <img src={filterIcon} alt="filter" className='w-6 h-6 ml-2' />
            </div>

            {/* Sort */}
            <div className="flex mx-4 cursor-pointer">
                <div className="hover:underline uppercase ">Sort</div>
                <img src={sortIcon} alt="filter" className='w-6 h-6 ml-2' />
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
    setSGrid: PropTypes.func
}

export default Filter