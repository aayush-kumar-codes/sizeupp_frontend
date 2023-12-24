import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Filter from '../components/ProductList/Filter'
import ProductList from './ProductList'
import { AuthContext } from '../context/AuthProvider'

const ProductLayout2 = () => {

  const [grid, setGrid] = useState(3)
  const [mgrid, setMGrid] = useState(2)
  const [sgrid, setSGrid] = useState(1)
  const { isFilterActive, setIsFilterActive, handlefetchFilterProducts, handlefetchProducts, productcount } = useContext(AuthContext)
  const [filterActive, setFilterActive] = useState(false)

  const [filterData, setFilterData] = useState({
    gender: [],
    category: [],
    sizes: [],
    color: []
  })

  const { filterdata, setfilterdata } = useContext(AuthContext)

  const handleChangeFilter = (event) => {

    const { name, value } = event.target;
    // setFilterData(prevState => ({
    //   ...prevState,
    //   [name]: prevState[name].includes(value) ? prevState[name].filter(v => v !== value) : [...prevState[name], value],
    // }));
    console.log("-------------------- name,value 31 ----------------------")
    console.log(name, value)

    setfilterdata(prevState => ({
      ...prevState,
      [name]: prevState[name].includes(value) ? prevState[name].filter(v => v !== value) : [...prevState[name], value],
    }));

    handlefetchProducts();

    // if (filterData.gender.length > 0 || filterData.category.length > 0 || filterData.sizes.length > 0 || filterData.color.length > 0) {
    //   handlefetchFilterProducts()
    // } else {
    //   handlefetchProducts()
    // }
    console.log(filterdata)
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
        { value: 'new-arrivals', label: 'All New Arrivals' },
        { value: 'tees', label: 'Tees' },
        { value: 'crewnecks', label: 'Crewnecks' },
        { value: 'sweatshirts', label: 'Sweatshirts' },
        { value: 'pants-shorts', label: 'Pants & Shorts' },
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
        { value: 'white', label: 'White' },
        { value: 'beige', label: 'Beige' },
        { value: 'blue', label: 'Blue' },
        { value: 'brown', label: 'Brown' },
        { value: 'green', label: 'Green' },
        { value: 'purple', label: 'Purple' },
      ],
    },

  ];

  return (
    <>
      <section className="w-full">
        <div className="mx-auto px-2 py-10 lg:px-10">
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
                {/* <li>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                    <a href="#" className=" text-md text-c-gray-800 hover:font-bold ml-1">
                      Men
                    </a>
                  </div>
                </li>
                <li aria-current="page">
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

              <h2 className={` text-lg font-normal text-gray-800/80 mx-2`}>Showing {productcount} related results</h2>
            </div>
            <div className="mt-6 flex items-center pt-2 md:mt-0 md:space-x-4 md:pt-0">
              {/* Filter navbar */}
              <Filter setGrid={setGrid} grid={grid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} isFilterActive={isFilterActive} setIsFilterActive={setIsFilterActive} />


            </div>
          </div>
          <hr className='my-6' />

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
                            onChange={handleChangeFilter}
                          />
                          <label htmlFor={`category-${option.value}`} className="ml-3 text-sm font-medium text-gray-900">
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