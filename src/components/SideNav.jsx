import { XMarkIcon } from '@heroicons/react/24/outline'
const filters = [
    {
        id: 'gender',
        name:'Gender',
        options:[
            { value: 'men', label: 'Men' },
            { value: 'women', label: 'Women' },
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
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
        ],
    },
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
    
]

const SideNav = (
    {
        display = false,
        setDisplay = () => { }
    }
) => {
    return (
        <div className={`${display ? "fixed inset-0 z-50 bg-gray-800/20 w-auto h-screen" : "hidden"}`}>
            <div className=" bg-white px-10 w-fit lg:w-1/3 xl:w-1/5 py-10 h-screen overflow-y-auto">
                <span className='flex justify-between items-center'>
                    <h2 className='text-xl font-semibold '>Filter your Feed </h2>
                    <XMarkIcon className='w-6 stroke-2 cursor-pointer m-2' onClick={() => setDisplay(false)} />
                </span>
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