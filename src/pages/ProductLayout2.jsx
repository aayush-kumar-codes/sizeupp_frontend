import { useState, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Filter from '../components/ProductList/Filter'
import ProductList from './ProductList'
import { AuthContext } from '../context/AuthProvider'
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import {Helmet} from 'react-helmet'

const ProductLayout2 = () => {

  const [grid, setGrid] = useState(3)
  const [mgrid, setMGrid] = useState(2)
  const [sgrid, setSGrid] = useState(1)
  const { isFilterActive,productloading, catlist, idToNameMap, setSearch, setIsFilterActive, handleFetchFilterProducts, handlefetchProducts, productcount, search } = useContext(AuthContext)
  const [filterActive, setFilterActive] = useState(false)
  const { filterdata, setfilterdata, category } = useContext(AuthContext)
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  useEffect(() => {
    let category = searchParams.getAll('gender')
    let subcategory = searchParams.getAll('category')
    let fit = searchParams.getAll('fit')
    let sleeve = searchParams.getAll('sleeve')
    let necktype = searchParams.getAll('necktype')
    let color = searchParams.getAll('color')
    let size = searchParams.getAll('size')
    let search = searchParams.get('navsearch')
    let subsubcategory = searchParams.getAll('subcategory')



    if (category || search || subcategory || subsubcategory || fit || sleeve || necktype || color || size) {
      const updatedFilterData = {
        ...filterdata,
        search: search !== null ? search : "",
        subcategory: subsubcategory !== null ? subsubcategory : [],
        gender: category !== null ? category : [],
        color: color !== null ? color : [],
        size: size !== null ? size : [],
        fit: fit !== null ? fit : [],
        sleeve: sleeve !== null ? sleeve : [],
        necktype: necktype !== null ? necktype : [],
        category: subcategory !== null ? subcategory : [],
      };


    
      // Use the callback function of setState to ensure the state is updated before calling the filtering function
      setfilterdata(updatedFilterData);

    } else {
      handlefetchProducts()
    }


  }, [searchParams])

  useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;
    // Check if filterdata is defined before calling handleFetchFilterProducts
    if (filterdata) {
      const fetchData = async () => {
        await handleFetchFilterProducts(filterdata, signal);
      };
  
      fetchData();
    }

    return () => {
      abort.abort()
    }
  }, [filterdata]);


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

    // Use react-router-dom's navigate to update the URL without triggering a page reload
    navigate(`${newUrl}`, { replace: true });
  }

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

  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const [activeSection, setActiveSection] = useState(null);
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  {/*
setIsFilterOpen((prev) => ({
      ...prev,
      [filterFields]: !prev[filterFields] || false,
    }));
*/}

  return (
    <>
      <section className="w-full">
        <div className="mx-auto px-2 py-6 lg:px-10">
          <div className="md:flex md:flex-row md:items-start md:justify-between justify-center">
            <div className="px-12">
              {/* Nav menu- Breadcrumb */}
              <Helmet>
                <title>Products | Sizeupp</title>
                <meta name="description" content="Browse the extensive Sizeupp product catalog. Discover the latest fashion trends and find the perfect clothing and accessories for your style." />
                <meta name="keywords" content="Sizeupp products, fashion catalog, clothing selection, trendy items, online shopping" />
              </Helmet>

              <ol className={`inline-flex items-center  py-4`}>
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
                {filterdata.search && <li>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                    <a href="#" className=" text-md text-c-gray-800 hover:font-bold ml-1">
                      {filterdata.search}
                    </a>
                  </div>
                </li>}
                {!search && filterdata.gender?.length > 0 &&
                  <li>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>

                      <Link to={`/products?gender=${filterdata?.gender.map((el) => el).join('&gender=')}`} className=" text-md text-c-gray-800 hover:font-bold ml-1">
                        {filterdata?.gender.map((el) => idToNameMap[el]).join(', ')}
                      </Link>
                    </div>
                  </li>
                }
                {!search && filterdata.category?.length > 0 &&
                  <li className='hidden md:block'>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>

                      <Link to={`/products?category=${filterdata?.category.map((el) => el).join('&category=')}`} className=" text-md text-c-gray-800 hover:font-bold ml-1">
                        {filterdata.category.map((el) => idToNameMap[el]).join(', ')}
                      </Link>
                    </div>
                  </li>
                }
                {!search && filterdata.subcategory?.length > 0 &&
                  <li>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>

                      <a href={`/products?subcategory=${filterdata?.subcategory.map((el) => el).join('&subcategory=')}`} className=" text-md text-c-gray-800 hover:font-bold ml-1">
                        {filterdata.subcategory.map((el) => idToNameMap[el]).join(', ')}
                      </a>
                    </div>
                  </li>
                }
                {
                  !search && filterdata && category &&
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

              </ol>

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
              <Link to="/products" onClick={() => {
                handleClearFilter();
                setfilterdata({
                  gender: [],
                  color: [],
                  size: [],
                  search: "",
                  category: [],
                })
              }} className='cursor-pointer underline flex justify-end w-full '>Clear Filter</Link>


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
                              handleChangeFilter(item.id, 'gender')
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
                  <button onClick={() => toggleSection('category')}>
                    {activeSection === 'Gender' ? (
                      <MinusIcon className="h-6 w-6 text-gray-800 p-1" />
                    ) : (
                      <PlusIcon className="h-6 w-6 text-gray-800 p-1" />
                    )}
                  </button>
                </div>
                {activeSection === "category" && (
                  <ul className="mt-2">
                    {catlist && catlist.categories?.map((item) => (
                      item.subcategories?.map((subitem) => {
                        if ((filterdata.gender.length > 0 &&  !filterdata.gender?.includes(item.id) && !filterdata.category?.includes(subitem.id))) {
                          return null
                        }
                        return (
                          <li key={subitem.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                              <input
                                id={`${subitem.id}`}
                                name={'category'}
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
                                {item.name + " " +  subitem.name}
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
                {activeSection === "subcategory" && (
                  <ul className="mt-2">
                    {catlist && catlist.categories?.map((item) => (
                      item.subcategories?.map((subitem) => {
                        return (subitem.subsubcategories.map((subsubitem) => {
                          console.warn(subsubitem.name)
                          if ((filterdata.category?.length > 0 || filterdata.gender?.length > 0) && !filterdata.gender?.includes(item.id) && !filterdata.category?.includes(subitem.id) && !filterdata.subcategory?.includes(subsubitem.id)) {
                            return null
                          }


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
                                   {item.name + " " +  subsubitem.name}
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
            <div className=" w-full rounded-lg  px-2 lg:col-span-10 lg:h-full">
              <ProductList setResults={() => { console.log("faker v_172.PL2") }} grid={grid} setGrid={setGrid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} filterActive={filterActive} setFilterActive={setFilterActive} />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default ProductLayout2