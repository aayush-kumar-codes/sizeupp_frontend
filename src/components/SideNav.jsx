import { XMarkIcon } from '@heroicons/react/24/outline'
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White' },
            { value: 'beige', label: 'Beige' },
            { value: 'blue', label: 'Blue' },
            { value: 'brown', label: 'Brown' },
            { value: 'green', label: 'Green' },
            { value: 'purple', label: 'Purple' },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'All New Arrivals' },
            { value: 'tees', label: 'Tees' },
            { value: 'crewnecks', label: 'Crewnecks' },
            { value: 'sweatshirts', label: 'Sweatshirts' },
            { value: 'pants-shorts', label: 'Pants & Shorts' },
        ],
    },
    {
        id: 'sizes',
        name: 'Sizes',
        options: [
            { value: 'xs', label: 'XS' },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL' },
            { value: '2xl', label: '2XL' },
        ],
    },
]

const SideNav = (
    {
        display = false,
        setDisplay = () => { }
    }
) => {
    return (
        <div className={`${display ? "fixed inset-0 z-50 bg-gray-800/20 w-auto h-screen" : "hidden"}`}>
            <div className=" bg-white px-10 lg:w-1/3 xl:w-1/5 py-10 h-screen overflow-y-auto">
                <h2 className='text-2xl font-semibold flex justify-between items-center'>Filter your Feed <XMarkIcon className='w-6 stroke-2 cursor-pointer' onClick={() => setDisplay(false)} /></h2>
                <div className="w-full">
                    {filters.map((filter) => (
                        <div key={filter.id} className="pt-6">
                            <h3 className="text-lg font-semibold text-gray-900">{filter.name}</h3>
                            <ul className="mt-2">
                                {filter.options.map((option) => (
                                    <li key={option.value} className="flex items-center justify-between py-2">
                                        <div className="flex items-center">
                                            <input
                                                id={`${filter.id}-${option.value}`}
                                                name={`${filter.id}[]`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                            />
                                            <label
                                                htmlFor={`${filter.id}-${option.value}`}
                                                className="ml-3 text-sm font-medium text-gray-900"
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default SideNav