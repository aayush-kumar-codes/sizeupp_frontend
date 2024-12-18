import { useState, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Filter from '../components/ProductList/Filter'
import ProductList from './ProductList'
import { AuthContext } from '../context/AuthProvider'

const ProductLayout = () => {

    const [grid, setGrid] = useState(3)
    const [mgrid, setMGrid] = useState(2)
    const [sgrid, setSGrid] = useState(1)
    const { isFilterActive, setIsFilterActive, handlefetchProducts, productcount, pagecount, setpagecount } = useContext(AuthContext)
    const [filterActive, setFilterActive] = useState(false)


    const navigate = useNavigate();

    useEffect(() => {
        handlefetchProducts()
    }, [])

    const handlePagecount = (count) => {
        setpagecount(count)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }


    const handleChangeFilter = (event) => {

        const { name, value, checked, type } = event.target;


        setfilterdata((prevFilterData) => {
            let updatedFilterData = { ...prevFilterData };

            if (type === 'checkbox') {
                // Toggle the value in the array based on checkbox state
                updatedFilterData[name] = checked
                    ? [...(updatedFilterData[name] || []), value]
                    : (updatedFilterData[name] || []).filter((item) => item !== value);
            } else {
                // Handle non-checkbox inputs
                updatedFilterData[name] = value;
            }

            // Remove the filter from the URL if it's unchecked or empty
            if (!checked || (Array.isArray(updatedFilterData[name]) && updatedFilterData[name].length === 0)) {
                const urlSearchParams = new URLSearchParams(window.location.search);

                urlSearchParams.delete(name);

                window.history.replaceState({}, '', `${window.location.pathname}?${urlSearchParams}`);
            } else {
                // Update the URL with the new filter
                const urlSearchParams = new URLSearchParams(window.location.search);
                // handle category
                if (name === 'category') {
                    urlSearchParams.delete('subcategory')
                    urlSearchParams.delete('navsearch')
                    urlSearchParams.delete('fit')
                    urlSearchParams.delete('sleeve')
                    urlSearchParams.delete('necktype')
                    urlSearchParams.delete('color')
                    urlSearchParams.delete('size')

                }
                if (name === 'subcategory') {
                    urlSearchParams.delete('navsearch')
                    urlSearchParams.delete('fit')
                    urlSearchParams.delete('sleeve')
                    urlSearchParams.delete('necktype')
                    urlSearchParams.delete('color')
                    urlSearchParams.delete('size')
                }
                if (name === 'gender') {
                    urlSearchParams.delete('subcategory')
                    urlSearchParams.delete('navsearch')
                    urlSearchParams.delete('fit')
                    urlSearchParams.delete('sleeve')
                    urlSearchParams.delete('necktype')
                    urlSearchParams.delete('color')
                    urlSearchParams.delete('size')
                    urlSearchParams.delete('category')

                }

                urlSearchParams.set(name, Array.isArray(updatedFilterData[name]) ? updatedFilterData[name].join(',') : updatedFilterData[name]);
                window.history.replaceState({}, '', `${window.location.pathname}?${urlSearchParams}`);
            }

            return updatedFilterData;
        });
    };


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

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

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

    };


    return (
        <>
            <section className="w-full">
                <div className="mx-auto px-2 py-6 lg:px-10">
                    <div className="md:flex md:flex-row md:items-start md:justify-between justify-center">
                        <div className="px-12">
                            {/* Nav menu- Breadcrumb */}

                            {/* <ol className={`inline-flex items-center  py-4`}>
                <li className="inline-flex items-center">

                  <Link
                    to="/products"
                    className=" inline-flex text-md text-c-gray-800 hover:font-bold "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                    Products
                  </Link>
                </li>
                {search && <li>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                    <a href="#" className=" text-md text-c-gray-800 hover:font-bold ml-1">
                      {search}
                    </a>
                  </div>
                </li>}
                {!search && filterdata.gender?.length > 0 &&
                  <li>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>

                      <a href="#" className=" text-md text-c-gray-800 hover:font-bold ml-1">
                        {filterdata.gender.map((el) => el).join(', ')}
                      </a>
                    </div>
                  </li>
                }
                {!search && filterdata.category?.length > 0 &&
                  <li>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>

                      <a href="#" className=" text-md text-c-gray-800 hover:font-bold ml-1">
                        {filterdata.category.map((el) => el).join(', ')}
                      </a>
                    </div>
                  </li>
                }
                {!search && filterdata.search?.length > 0 &&
                  <li>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>

                      <a href="#" className=" text-md text-c-gray-800 hover:font-bold ml-1">
                        {filterdata.search}
                      </a>
                    </div>
                  </li>
                }
                {
                  !search && filterdata.gender.length === 0 && category.length === 0 &&
                  <li>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>

                      <a href="#" className=" text-md text-c-gray-800 hover:font-bold ml-1">
                        All Products
                      </a>
                    </div>
                  </li>
                }
              
              </ol> */}

                            <h2 className={` text-md font-normal text-gray-800/80 mx-2`}>Showing {productcount} related results</h2>
                        </div>
                        <div className="mt-6 flex items-center pt-2 md:mt-0 md:space-x-4 md:pt-0">
                            {/* Filter navbar */}
                            <Filter setGrid={setGrid} grid={grid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} isFilterActive={isFilterActive} setIsFilterActive={setIsFilterActive} />


                        </div>
                    </div>
                    <hr className='my-3' />

                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-4">
                        <div className="hidden space-y-6 divide-y lg:col-span-2 lg:block">
                            <div onClick={() => { handleClearFilter() }} className='cursor-pointer underline text-end w-full '>Clear Filter</div>
                            {filters.map((filter) => (
                                <div key={filter.id}>
                                    <h3 className="text-lg font-semibold text-gray-900 py-2">{filter.name}</h3>
                                    {/* <ul className="mt-2">
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
                  </ul> */}
                                </div>
                            ))}


                        </div>
                        <div className=" w-full rounded-lg  px-2 lg:col-span-10 lg:h-full">
                            <ProductList setResults={() => { console.log("faker v_172.PL2") }} grid={grid} setGrid={setGrid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} filterActive={filterActive} setFilterActive={setFilterActive} />
                            
                            {/* Pagination UI handler  */}
                            <div className="flex items-center ">
                                <a href="#" className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900">
                                    &larr; Previous
                                </a>
                                <div

                                    onClick={() => handlePagecount(1)}
                                    className="mx-1 cursor-pointer flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                                >
                                    1
                                </div>
                                <div

                                    onClick={() => handlePagecount(2)}
                                    className="mx-1 cursor-pointer flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                                >
                                    2
                                </div>
                                <div

                                    onClick={() => handlePagecount(3)}
                                    className="mx-1 cursor-pointer flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                                >
                                    3
                                </div>
                                <div

                                    onClick={() => handlePagecount(4)}
                                    className="mx-1 cursor-pointer flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                                >
                                    4
                                </div>
                                <div

                                    onClick={() => handlePagecount(5)}
                                    className="mx-1 cursor-pointer flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                                >
                                    5
                                </div>
                                <a href="#" className="mx-2 text-sm font-semibold text-gray-900">
                                    Next &rarr;
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default ProductLayout
