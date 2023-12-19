import React, {useState,useEffect} from 'react'
import { Outlet,Link } from 'react-router-dom'
import Filter from '../components/ProductList/Filter'
import { styles } from '../style'
import ProductList from './ProductList'

const ProductLayout2 = () => {

    const [grid, setGrid] = useState(3)
    const [mgrid, setMGrid] = useState(2)
    const [sgrid, setSGrid] = useState(1)
    const [filterActive, setFilterActive] = useState(false)
    const [results,setResults] = useState([])
    
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
                <li>
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
                </li>
            </ol>

            <h2 className={` text-lg font-normal text-gray-800/80 mx-2`}>Showing {results} related results</h2>
      </div>
      <div className="mt-6 flex items-center pt-2 md:mt-0 md:space-x-4 md:pt-0">
          {/* Filter navbar */}
          <Filter setGrid={setGrid} grid={grid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} filterActive={filterActive} setFilterActive={setFilterActive} />
            
       
      </div>
    </div>
    <hr className='my-6'/>
                  
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-4">
      <div className="hidden space-y-6 divide-y lg:col-span-2 lg:block">
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900">Color</h3>
          <ul className="mt-2">
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="color-white" name="color[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="white" />
                <label htmlFor="color-white" className="ml-3 text-sm font-medium text-gray-900"> White </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="color-beige" name="color[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="beige" />
                <label htmlFor="color-beige" className="ml-3 text-sm font-medium text-gray-900"> Beige </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="color-blue" name="color[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="blue" />
                <label htmlFor="color-blue" className="ml-3 text-sm font-medium text-gray-900"> Blue </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="color-brown" name="color[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="brown" />
                <label htmlFor="color-brown" className="ml-3 text-sm font-medium text-gray-900"> Brown </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="color-green" name="color[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="green" />
                <label htmlFor="color-green" className="ml-3 text-sm font-medium text-gray-900"> Green </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="color-purple" name="color[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="purple" />
                <label htmlFor="color-purple" className="ml-3 text-sm font-medium text-gray-900"> Purple </label>
              </div>
            </li>
          </ul>
        </div>
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900">Category</h3>
          <ul className="mt-2">
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="category-new-arrivals" name="category[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="new-arrivals" />
                <label htmlFor="category-new-arrivals" className="ml-3 text-sm font-medium text-gray-900"> All New Arrivals </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="category-tees" name="category[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="tees" />
                <label htmlFor="category-tees" className="ml-3 text-sm font-medium text-gray-900"> Tees </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="category-crewnecks" name="category[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="crewnecks" />
                <label htmlFor="category-crewnecks" className="ml-3 text-sm font-medium text-gray-900"> Crewnecks </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="category-sweatshirts" name="category[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="sweatshirts" />
                <label htmlFor="category-sweatshirts" className="ml-3 text-sm font-medium text-gray-900"> Sweatshirts </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="category-pants-shorts" name="category[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="pants-shorts" />
                <label htmlFor="category-pants-shorts" className="ml-3 text-sm font-medium text-gray-900"> Pants &amp; Shorts </label>
              </div>
            </li>
          </ul>
        </div>
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900">Sizes</h3>
          <ul className="mt-2">
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="sizes-xs" name="sizes[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="xs" />
                <label htmlFor="sizes-xs" className="ml-3 text-sm font-medium text-gray-900"> XS </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="sizes-s" name="sizes[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="s" />
                <label htmlFor="sizes-s" className="ml-3 text-sm font-medium text-gray-900"> S </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="sizes-m" name="sizes[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="m" />
                <label htmlFor="sizes-m" className="ml-3 text-sm font-medium text-gray-900"> M </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="sizes-l" name="sizes[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="l" />
                <label htmlFor="sizes-l" className="ml-3 text-sm font-medium text-gray-900"> L </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="sizes-xl" name="sizes[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="xl" />
                <label htmlFor="sizes-xl" className="ml-3 text-sm font-medium text-gray-900"> XL </label>
              </div>
            </li>
            <li className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input id="sizes-2xl" name="sizes[]" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" value="2xl" />
                <label htmlFor="sizes-2xl" className="ml-3 text-sm font-medium text-gray-900"> 2XL </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    <div className=" w-full rounded-lg border-2 border-dashed px-2 lg:col-span-10 lg:h-full">
        <ProductList setResults={setResults} grid={grid} setGrid={setGrid} mgrid={mgrid} setMGrid={setMGrid} sgrid={sgrid} setSGrid={setSGrid} filterActive={filterActive} setFilterActive={setFilterActive} />                      
      </div>
    </div>
  </div>
</section>

      </>
  )
}

export default ProductLayout2