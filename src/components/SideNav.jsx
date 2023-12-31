import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useSearchParams, useNavigate } from 'react-router-dom'
const filters = [
  {
    id: 'gender',
    name: 'Gender',
    options: [
      { value: 'Men', label: 'Men' },
      { value: 'Women', label: 'Women' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Casual Topwear', label: 'Casual Topwear' },
      { value: 'Casual Bottomwear', label: 'Casual Bottomwear' },
      { value: 'Women Topwear', label: 'Women Topwear' },
      { value: 'Women Bottomwear', label: 'Women Bottomwear' },
      { value: 'Ethnic Wear', label: 'Ethnic Wear' },
      { value: 'Festive Wear', label: 'Festive Wear' },
      { value: 'Formal Wear', label: 'Formal Wear' },
      { value: 'Winter Wear', label: 'Winter Wear' },
      { value: 'Evening Wear', label: 'Evening Wear' },


    ],
  },
  {
    id: 'size',
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
      { value: 'Black', label: 'Black' },
      { value: 'Blue', label: 'Blue' },
      { value: 'Brown', label: 'Brown' },
      { value: 'Green', label: 'Green' },
      { value: 'Grey', label: 'Grey' },
      { value: 'Orange', label: 'Orange' },
      { value: 'Pink', label: 'Pink' },
      { value: 'Purple', label: 'Purple' },
      { value: 'Red', label: 'Red' },
      { value: 'Multi Color', label: 'Multi Color' },
      { value: 'White', label: 'White' },
      { value: 'Yellow', label: 'Yellow' },
      { value: 'Cream', label: 'Cream' }
    ],
  },
  {
    id: 'fit',
    name: 'Fit',
    options: [
      { value: 'Regular Fit', label: 'Regular Fit' },
      { value: 'Straight Fit', label: 'Straight Fit' },
      { value: 'Slim Fit', label: 'Slim Fit' },
      { value: 'Anti Fit', label: 'Anti Fit' }
    ]
  },
  {
    id: 'sleeve',
    name: 'Sleeve',
    options: [
      { value: 'Full Sleeve', label: 'Full Sleeve' },
      { value: 'Half Sleeve', label: 'Half Sleeve' },
      { value: '3/4Th Sleeve', label: '3/4Th Sleeve' },
      { value: 'Sleeveless', label: 'Sleeveless' }
    ],
  },
  {
    id: 'necktype',
    name: 'Neck Type',
    options: [
      { value: 'Crew Neck', label: 'Crew Neck' },
      { value: 'Cuban Collar', label: 'Cuban Collar' },
      { value: 'Value Open', label: 'Value Open' },
      { value: 'Hoodie Neck', label: 'Hoodie Neck' },
      { value: 'Mandarin Collar', label: 'Mandarin Collar' },
      { value: 'Polo Collar', label: 'Polo Collar' },
      { value: 'Round Neck', label: 'Round Neck' },
      { value: 'V Collar', label: 'V Collar' },
    ]
  }
];
const SideNav = (
  {
    display,
    setDisplay
  }
) => {

  const { filterdata, setfilterdata } = useContext(AuthContext)

  // useEffect(() => {

  //   let category = searchParams.get("category") || null
  //   let subcategory = searchParams.get("subcategory") || 'All'
  //   let gender = searchParams.get('gender') || null
  //   let color = searchParams.get('color') || null
  //   let size = searchParams.get('size') || null
  //   let fit = searchParams.get('fit') || null
  //   let sleeve = searchParams.get('sleeve') || null
  //   let necktype = searchParams.get('necktype') || null


  //   const shouldResetFilters =
  //     searchParams.has('gender') &&
  //     searchParams.has('subcategory') &&
  //     searchParams.has('subsubcategory');

  //   if (shouldResetFilters) {
  //     // Delete all URL parameters
  //     const newSearchParams = new URLSearchParams();
  //     navigate(`?${newSearchParams.toString()}`, { replace: true });
  //   }

  //   if (searchParams.has('navsearch')) {
  //     setSearch(searchParams.get("navsearch") || '')
  //     setfilterdata({
  //       size: [],
  //       search: "",
  //       category: [],
  //       gender: [],
  //       color: [],
  //       fit: [],
  //       sleeve: [],
  //       necktype: []
  //     });
  //     handlefetchProducts()
  //   }

  //   if ((subcategory || category) && !searchParams.has('navsearch')) {
  //     console.error("useLayoutEffect")
  //     console.warn()

  //     setfilterdata({
  //       ...filterdata,
  //       category: category !== null ? [`${category}`] : [],
  //       gender: gender !== null ? [`${gender}`] : [],
  //       search: (subcategory || 'All'),
  //       color: color !== null ? [`${color}`] : [],
  //       size: size !== null ? [`${size}`] : [],
  //       fit: fit !== null ? [`${fit}`] : [],
  //       sleeve: sleeve !== null ? [`${sleeve}`] : [],
  //       necktype: necktype !== null ? [`${necktype}`] : []

  //     });


  //   }
  // }, [searchParams])

  const navigate = useNavigate();


  const filterFields = [
    'gender',
    'size',
    'color',
    'category',
    'fit',
    'sleeve',
    'necktype',
    // Add other filter field names as needed
  ];


  const handleClearFilter = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    // Remove all filters from the URL
    filterFields.forEach((fieldName) => {
      urlSearchParams.delete(fieldName);
    });

    navigate('/products', { replace: true })

    // Clear the filters in the state
    setfilterdata({
      gender: [],
      size: [],
      color: [],
      subcategory: '',
      category: [],
      fit: [],
      sleeve: [],
      necktype: [],
      search: "All"
    });
  };

  return (
    <div className={`${display ? "fixed inset-0 z-50 bg-gray-800/20 w-auto h-screen" : "hidden"}`}>
      <div className=" bg-white px-10 w-fit lg:w-1/3 xl:w-1/5 py-10 h-screen overflow-y-auto">
        <span className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold '>Filter your Feed </h2>
          <XMarkIcon className='w-6 stroke-2 cursor-pointer m-2' onClick={() => setDisplay(false)} />
        </span>
        <div className="space-y-6 divide-y col-span-2 ">
          <div onClick={() => { handleClearFilter() }} className='cursor-pointer underline text-end w-full '>Clear Filter</div>
          {/* {filters.map((filter) => (
            <div key={filter.id}>
              <h3 className="text-lg font-semibold text-gray-900 py-2">{filter.name}</h3>
              <ul className="mt-2">
                {filter.options.map((option) => {

                  return (
                    <li key={option.value} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <input
                          id={`${option.value}`}
                          name={filter.id}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          value={option.value}
                          checked={
                            filter.id === 'gender' ?
                              filterdata.gender?.includes(option.value)
                              :
                              filter.id === 'size' ?
                                filterdata.size?.includes(option.value)
                                :
                                filter.id === 'category' ?
                                  filterdata.category?.includes(option.value)
                                  :
                                  filter.id === 'fit' ?
                                    filterdata.fit?.includes(option.value)
                                    :
                                    filter.id === 'sleeve' ?
                                      filterdata.sleeve?.includes(option.value)
                                      :
                                      filter.id === 'necktype' ?
                                        filterdata.necktype?.includes(option.value)
                                        :
                                        filter.id === 'color' ?
                                          filterdata.color?.includes(option.value)
                                          :
                                          false
                          }
                          onChange={(e) => {
                            handleChangeFilter(e)
                          }}
                        />
                        <label htmlFor={`${option.value}`} className="ml-3 text-sm font-medium text-gray-900">
                          {option.label}
                        </label>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
              ))} */}

        </div>

      </div>
    </div>
  )
}

export default SideNav