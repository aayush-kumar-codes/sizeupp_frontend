import { filterIcon, gridIcon, sortIcon } from "../../assets/icons"
import { styles } from "../../style"

const Filter = ({
    grid,
    setGrid,
    mgrid,
    setMGrid,
    sgrid,
    setSGrid
}) => {
    return (
        // Filter navbar
        <div className={`${styles.paddingX} flex justify-end items-center`}>
            {/* Grid layout */}
            <img src={gridIcon} alt="grid" className='w-6 h-6 mr-2' />
            <input type="range" className="hidden xl:block w-1/4 h-1 accent-accent mr-2" min={2} max={6} onChange={(e) => { setGrid(e.target.value) }} defaultValue={grid} step={2} />
            <input type="range" className="hidden xl:hidden md:block w-1/4 h-1 accent-accent mr-2" min={2} max={4} onChange={(e) => { setMGrid(e.target.value) }} defaultValue={mgrid} step={2} />
            <input type="range" className="block md:hidden w-1/4 h-1 accent-accent mr-2" min={1} max={3} onChange={(e) => { setSGrid(e.target.value) }} defaultValue={sgrid} step={1} />



            {/* filter */}
            <div className="flex mx-4 cursor-pointer">
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

export default Filter