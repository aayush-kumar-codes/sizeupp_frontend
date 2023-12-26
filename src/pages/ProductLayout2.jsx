import { useState, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useSearchParams ,useNavigate} from 'react-router-dom'
import Filter from '../components/ProductList/Filter'
import ProductList from './ProductList'
import { AuthContext } from '../context/AuthProvider'

const ProductLayout2 = () => {

  const [grid, setGrid] = useState(3)
  const [mgrid, setMGrid] = useState(2)
  const [sgrid, setSGrid] = useState(1)
  const { isFilterActive, setSearch, setIsFilterActive, handlefetchProducts, productcount, search } = useContext(AuthContext)
  const [filterActive, setFilterActive] = useState(false)
  const { filterdata, setfilterdata, category } = useContext(AuthContext)

  let [searchParams, setSearchParams] = useSearchParams();


  const isFirstRun = useRef(true);
  useEffect(() => {

    let category = searchParams.get("category") || ''
    let subcategory = searchParams.get("subcategory") || 'All'

    if (searchParams.has('navsearch')) {
    
      setSearch(searchParams.get("navsearch") || '')
      setfilterdata({
        ...filterdata,
        search: "",
        category: "",
        gender: []
      });
      handlefetchProducts()
    }

    if ((searchParams.has("subcategory") || searchParams.has("category")) && !isFirstRun.current && !searchParams.has('navsearch')) {
      console.error("useLayoutEffect")
      console.warn()

      setfilterdata({
        ...filterdata,
        category: (searchParams.get("category") || '') != 'All' ? (searchParams.get("category") || '') : '',
        gender: [`${(searchParams.get("gender") || '') != 'All' ? (searchParams.get("gender") || '') : ''}`],
        search: (searchParams.get("subcategory") || 'All'),
      });


    } else {
      isFirstRun.current = false;
    }
  }, [searchParams])

  console.log(searchParams.get("gender"));
  console.warn(filterdata)
  const navigate = useNavigate();

  

  const handleChangeFilter = (event) => {

    const { name, value } = event.target;
    // setFilterData(prevState => ({
    //   ...prevState,
    //   [name]: prevState[name].includes(value) ? prevState[name].filter(v => v !== value) : [...prevState[name], value],
    // }));

    navigate(`/products?${name}=${value}`)
    setfilterdata({
      ...filterdata,
      [name]: filterdata[name].includes(value) ? filterdata[name].filter(v => v !== value) : [...filterdata[name], value],
    });
    console.log("-------------------- name,value 31 ----------------------")
    console.log(name, value)

    // if (filterData.gender.length > 0 || filterData.category.length > 0 || filterData.sizes.length > 0 || filterData.color.length > 0) {
    //   handlefetchFilterProducts()
    // } else {
    //   handlefetchProducts()
    // }
    console.log(filterdata);
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
        { value: 'Men Topwear', label: 'Men Topwear' },
        { value: 'Men Bottomwear', label: 'Men Bottomwear' },
        { value: 'Women Topwear', label: 'Women Topwear' },
        { value: 'Women Bottomwear', label: 'Women Bottomwear' },
        { value: 'Accessories', label: 'Accessories' },
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
        {
          "label": "Sage Green", value: "Sage Green"
        },
        {
          "label": "Wine", value: "Wine"
        },
        {
          "label": "Maroon", value: "Maroon"
        },
        {
          "label": "White", value: "White"
        },
        {
          "label": "Sky Blue", value: "Sky Blue"
        },
        {
          "label": "Pistachio Green", value: "Pistachio Green"
        },
        {
          "label": "Natural", value: "Natural"
        },
        {
          "label": "Pink", value: "Pink"
        },
        {
          "label": "Navy", value: "Navy"
        },
        {
          "label": "Black", value: "Black"
        },
        {
          "label": "Brown", value: "Brown"
        },
        {
          "label": "Blue", value: "Blue"
        },
        {
          "label": "Beige", value: "Beige"
        },
        {
          "label": "Peach", value: "Peach"
        },
        {
          "label": "Teal", value: "Teal"
        },
        {
          "label": "Multi Color", value: "Multi Color"
        },
        {
          "label": "Dark Blue", value: "Dark Blue"
        },
        {
          "label": "Dark Navy", value: "Dark Navy"
        },
        {
          "label": "Grey", value: "Grey"
        },
        {
          "label": "Light Blue", value: "Light Blue"
        },
        {
          "label": "Indigo", value: "Indigo"
        },
        {
          "label": "Red", value: "Red"
        },
        {
          "label": "Yellow", value: "Yellow"
        },
        {
          "label": "Ecru", value: "Ecru"
        },
        {
          "label": "Dark Green", value: "Dark Green"
        },
        {
          "label": "Light Yellow", value: "Light Yellow"
        },
        {
          "label": "Purple", value: "Purple"
        },
        {
          "label": "Green", value: "Green"
        },
        {
          "label": "Off White", value: "Off White"
        },
        {
          "label": "Light Green", value: "Light Green"
        },
        {
          "label": "Dark Teal", value: "Dark Teal"
        },
        {
          "label": "Cream", value: "Cream"
        },
        {
          "label": "Rust", value: "Rust"
        },
        {
          "label": "Olive", value: "Olive"
        },
        {
          "label": "Orange", value: "Orange"
        },
        {
          "label": "Bluish Grey", value: "Bluish Grey"
        },
        {
          "label": "Khaki", value: "Khaki"
        },
        {
          "label": "Dark Pink", value: "Dark Pink"
        },
        {
          "label": "Light Pink", value: "Light Pink"
        },
        {
          "label": "Grey Melange", value: "Grey Melange"
        },
        {
          "label": "Ecru Melange", value: "Ecru Melange"
        },
        {
          "label": "Charcoal Melange", value: "Charcoal Melange"
        },
        {
          "label": "Lilac", value: "Lilac"
        },
        {
          "label": "Coral", value: "Coral"
        },
        {
          "label": "Melon", value: "Melon"
        },
        {
          "label": "Anthra", value: "Anthra"
        },
        {
          "label": "Coral & Navy", value: "Coral & Navy"
        },
        {
          "label": "Light Green & White", value: "Light Green & White"
        },
        {
          "label": "Navy & White", value: "Navy & White"
        },
        {
          "label": "Red White & Navy", value: "Red White & Navy"
        },
        {
          "label": "Rust Navy & White", value: "Rust Navy & White"
        },
        {
          "label": "Aqua", value: "Aqua"
        },
        {
          "label": "Lime", value: "Lime"
        },
        {
          "label": "Anthra Melange", value: "Anthra Melange"
        },
        {
          "label": "Pastel Lavender", value: "Pastel Lavender"
        },
        {
          "label": "Cherry Pink", value: "Cherry Pink"
        },
        {
          "label": "Rose Pink", value: "Rose Pink"
        },
        {
          "label": "Mustard", value: "Mustard"
        },
        {
          "label": "White & Green", value: "White & Green"
        },
        {
          "label": "White & Pink", value: "White & Pink"
        },
        {
          "label": "White & Black", value: "White & Black"
        },
        {
          "label": "Dusty Rose", value: "Dusty Rose"
        },
        {
          "label": "Blue Green", value: "Blue Green"
        },
        {
          "label": "Deep Pink", value: "Deep Pink"
        },
        {
          "label": "Sea Green", value: "Sea Green"
        },
        {
          "label": "Bright Pink", value: "Bright Pink"
        },
        {
          "label": "Mustard Yellow", value: "Mustard Yellow"
        },
        {
          "label": "Lime Green", value: "Lime Green"
        },
        {
          "label": "Navy Blue", value: "Navy Blue"
        },
        {
          "label": "Dark Grey", value: "Dark Grey"
        },
        {
          "label": "Pista", value: "Pista"
        },
        {
          "label": "Lavender", value: "Lavender"
        },
        {
          "label": "Teal Green", value: "Teal Green"
        },
        {
          "label": "Teal Blue", value: "Teal Blue"
        },
        {
          "label": "White & Blue", value: "White & Blue"
        },
        {
          "label": "Brick Red", value: "Brick Red"
        },
        {
          "label": "Olive Green", value: "Olive Green"
        },
        {
          "label": "Dusty Pink", value: "Dusty Pink"
        },
        {
          "label": "Ice", value: "Ice"
        },
        {
          "label": "Walnut Brown", value: "Walnut Brown"
        },
        {
          "label": "Slate", value: "Slate"
        },
        {
          "label": "Carbon Blue", value: "Carbon Blue"
        },
        {
          "label": "Light Indigo", value: "Light Indigo"
        },
        {
          "label": "Light Grey", value: "Light Grey"
        },
        {
          "label": "Royal Blue", value: "Royal Blue"
        },
        {
          "label": "Midnight Blue", value: "Midnight Blue"
        },
        {
          "label": "Jet Black", value: "Jet Black"
        },
        {
          "label": "Military Green", value: "Military Green"
        },
        {
          "label": "Indigo Melange", value: "Indigo Melange"
        }
      ],
    },

  ];

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <section className="w-full">
        <div className="mx-auto px-2 py-6 lg:px-10">
          <div className="md:flex md:flex-row md:items-start md:justify-between justify-center">
            <div className="px-12">
              {/* Nav menu- Breadcrumb */}

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
                        {filterdata.gender}
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
                        {filterdata.category}
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
                {/* <li aria-current="page">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span className="ml-1 text-md font-medium text-c-gray-800 hover:font-bold ">
                      Oxford Casual Shirts
                    </span>
                  </div>
                </li> */}
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

              {filters.map((filter) => (
                <div key={filter.id}>
                  <h3 className="text-lg font-semibold text-gray-900 py-2">{filter.name}</h3>
                  <ul className="mt-2">
                    {filter.options.map((option) => (
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
                                (filterdata.gender.find((el) => el == option.value) ? true : false)
                                :
                                filter.id === 'size' ?
                                  (filterdata.size.find((el) => el == option.value) ? true : false)
                                  :
                                  filter.id === 'category' ?
                                    (filterdata.category === option.value)
                                    :
                                    filter.id === 'color' ?
                                      (filterdata.color.find((el) => el == option.value) ? true : false)
                                      :
                                      option.value
                            }
                            onChange={(e) => {
                              if(e.target.id === 'category'){
                                setfilterdata({
                                  ...filterdata,
                                  category: e.target.value,
                                });
                              }else{
                                handleChangeFilter(e)
                              }
                            }}
                          />
                          <label htmlFor={`${option.value}`} className="ml-3 text-sm font-medium text-gray-900">
                            {option.label}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
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