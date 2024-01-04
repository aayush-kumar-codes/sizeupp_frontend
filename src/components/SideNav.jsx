import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import { useSearchParams, useNavigate } from 'react-router-dom'
const filters = [
  {
    id: 'size',
    name: 'Sizes',
    value: true,
    options: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
    ],
  },
  {
    id: 'fit',
    name: 'Fit',
    value: true,
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
    value: true,
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
    value: true,
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

  const { filterdata, setfilterdata,setSearch,catlist } = useContext(AuthContext)

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

  };

  const [activeSection, setActiveSection] = useState(null);
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  }

  const handleChangeFilter = (filterValue, headName) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('navsearch')) {
      searchParams.delete('navsearch')
      setSearch("")
    }

    // If the head is 'gender', remove all subheaders
    if (headName === 'gender') {
      const subheadersToRemove = ['subcategory', 'category', 'fit', 'size', 'color', 'design'];
      subheadersToRemove.forEach(subheader => searchParams.delete(subheader));
    } else if (headName === 'category') {
      const subheadersToRemove = ['subcategory', 'fit', 'size', 'color', 'design'];
      subheadersToRemove.forEach(subheader => searchParams.delete(subheader));
    } else if (headName === 'subcategory') {
      const subheadersToRemove = ['fit', 'size', 'color', 'design'];
      subheadersToRemove.forEach(subheader => searchParams.delete(subheader));
    }


    const existingValues = searchParams.getAll(headName);

    // Check if the new value already exists, and remove it
    if (existingValues.includes(filterValue)) {
      const updatedValues = existingValues.filter(value => value !== filterValue);
      searchParams.delete(headName);
      updatedValues.forEach(value => searchParams.append(headName, value));
    } else {
      // Append the new value
      searchParams.append(headName, filterValue);
    }

    // Update the URL
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    setDisplay(false)
    // Use react-router-dom's navigate to update the URL without triggering a page reload
    navigate(`${newUrl}`, { replace: true });
  }

  return (
    <div className={`${display ? "fixed inset-0 z-50 bg-gray-800/20 w-auto h-screen" : "hidden"}`}>
      <div className=" bg-white px-10 w-fit lg:w-1/3 xl:w-1/5 py-10 h-screen overflow-y-auto">
        <span className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold '>Filter your Feed </h2>
          <XMarkIcon className='w-6 stroke-2 cursor-pointer m-2' onClick={() => setDisplay(false)} />
        </span>
        <div className="space-y-6 divide-y col-span-2 ">
          <div onClick={() => { handleClearFilter() }} className='cursor-pointer underline text-end w-full '>Clear Filter</div>
          {/* Gender */}
          <div>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-900 py-2">Gender</h3>
              <button onClick={() => toggleSection('Gender')}>
                {activeSection === 'Gender' ? (
                  <MinusIcon className="h-6 w-6 text-gray-800 p-1" />
                ) : (
                  <PlusIcon className="h-6 w-6 text-gray-800 p-1" />
                )}
              </button>
            </div>
            {true && (
              <ul className="mt-2">
                {catlist && catlist.categories?.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <input
                        id={`${item.id}`}
                        name={'gender'}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        value={item.name}
                        checked={
                          filterdata.gender?.includes(item.id)
                        }
                        onChange={() => {
                          handleChangeFilter(item.id, 'gender');
                        }}
                      />
                      <label htmlFor={`${item.id}`} className="ml-3 text-sm font-medium text-gray-900">
                        {item.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>


          {/* Category */}
          <div>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-900 py-2">Category</h3>
              <button onClick={() => toggleSection('Gender')}>
                {activeSection === 'Gender' ? (
                  <MinusIcon className="h-6 w-6 text-gray-800 p-1" />
                ) : (
                  <PlusIcon className="h-6 w-6 text-gray-800 p-1" />
                )}
              </button>
            </div>
            {true && (
              <ul className="mt-2">
                {catlist && catlist.categories?.map((item) => (
                  item.subcategories?.map((subitem) => {
                    // if ((!filterdata.gender?.includes(item.id) && !filterdata.category?.includes(subitem.id))) {
                    //   return null
                    // }
                    return (
                      <li key={subitem.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <input
                            id={`${subitem.id}`}
                            name={'gender'}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            value={subitem.name}
                            checked={
                              filterdata.category?.includes(subitem.id)
                            }
                            onChange={() => {
                              handleChangeFilter(subitem.id, 'category')
                            }}
                          />
                          <label htmlFor={`${subitem.id}`} className="ml-3 text-sm font-medium text-gray-900">
                            {subitem.name}
                          </label>
                        </div>
                      </li>
                    )
                  })
                ))}
              </ul>
            )}
          </div>

          {/* Sub Category */}
          <div>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-900 py-2">Sub Category</h3>
              <button onClick={() => toggleSection('subcategory')}>
                {activeSection === 'subcategory' ? (
                  <MinusIcon className="h-6 w-6 text-gray-800 p-1" />
                ) : (
                  <PlusIcon className="h-6 w-6 text-gray-800 p-1" />
                )}
              </button>
            </div>
            {true && (
              <ul className="mt-2">
                {catlist && catlist.categories?.map((item) => (
                  item.subcategories?.map((subitem) => {
                    return (subitem.subsubcategories.map((subsubitem) => {
                      console.warn(subsubitem.name)
                      // if (!filterdata.category?.includes(subitem.id) && !filterdata.subcategory?.includes(subsubitem.id)) {
                      //   return null
                      // }
                      return (
                        <li key={subsubitem.id} className="flex items-center justify-between py-2">
                          <div className="flex items-center">
                            <input
                              id={`${subsubitem.id}`}
                              name={'subcategory'}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                              value={subsubitem.name}
                              checked={
                                filterdata.subcategory?.includes(subsubitem.id)
                              }
                              onChange={() => {
                                handleChangeFilter(subsubitem.id, 'subcategory')
                              }}
                            />
                            <label htmlFor={`${subsubitem.id}`} className="ml-3 text-sm font-medium text-gray-900">
                              {subsubitem.name}
                            </label>
                          </div>
                        </li>
                      )
                    })
                    )
                  })
                ))}
              </ul>
            )}
          </div>


          {/* Color */}
          <div>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-900 py-2">Color</h3>
              <button onClick={() => toggleSection('Color')}>
                {activeSection === 'Color' ? (
                  <MinusIcon className="h-6 w-6 text-gray-800 p-1" />
                ) : (
                  <PlusIcon className="h-6 w-6 text-gray-800 p-1" />
                )}
              </button>
            </div>
            {activeSection === 'Color' && (
              <ul className="mt-2">
                {catlist && catlist.colorfamily.map((item) => {
                  if (item.name === "nan") {
                    return null
                  }
                  return (
                    <li key={item.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <input
                          id={`${item.id}`}
                          name={'color'}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          value={item.name}
                          checked={
                            filterdata.color?.includes(item.name)
                          }
                          onChange={() => {
                            handleChangeFilter(item.name, 'color')
                          }}
                        />
                        <label htmlFor={`${item.id}`} className="ml-3 text-sm font-medium text-gray-900">
                          {item.name}
                        </label>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>





          {filters.map((filter) => (
            <div key={filter.id}>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-900 py-2">{filter.name}</h3>
                <button onClick={() => toggleSection(filter.name)}>
                  {activeSection === filter.name ?
                    (<MinusIcon className="h-6 w-6 text-gray-800 p-1" />)
                    :
                    (<PlusIcon className="h-6 w-6 text-gray-800 p-1" />)
                  }
                </button>
              </div>
              {activeSection === filter.name && (
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

                              filter.id === 'size' ?
                                filterdata.size?.includes(option.value)
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
                                      false
                            }
                            onChange={(e) => {
                              handleChangeFilter(option.value, filter.id)
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
              )}
            </div>
          ))}


        </div>

      </div>
    </div>
  )
}

export default SideNav