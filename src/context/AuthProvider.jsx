import { createContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") ? true : false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [isVerified, setIsVerified] = useState(localStorage.getItem("user_verified") ? localStorage.isverified : false);
    const [search, setSearch] = useState("");
    const [category, setcategory] = useState("")
    const [isFuncCall, setIsFuncCall] = useState(false);

    // sort 
    const [sort, setSort] = useState({
        phtl: false,
        plth: false,
        dhtl: false,
    })

    const [navsearch, setnavsearch] = useState("")
    const [navgender, setnavgender] = useState("")


    //profiledata
    const [profiledata, setProfileData] = useState([])

    const fetchProfileData = async () => {
        try {
            if (localStorage.token) {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/userprofile`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `token ${localStorage.token}`
                    }
                })
                const data = await response.json()
                setProfileData(data)
            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        fetchProfileData()
    }, [])

    //products 
    const [products, setProducts] = useState([]); // [products, setProducts]
    const [productsbc, setproductsbc] = useState([]);
    const [productloading, setproductloading] = useState(false)
    const [productcount, setproductcount] = useState(0)

    const [couponcode, setcouponcode] = useState("")


    // Assuming your product data is stored in the 'products' array
    const [filterdata, setfilterdata] = useState({
        gender: [],
        size: [],
        color: [],
        category: [],
        fit: [],
        subcategory: [],
        sleeve: [],
        necktype: [],
        search: []
    })
    // Function to filter data based on multiple criteria
    // const funcFilter = (products, filter) => {

    //     return products.filter((product) => {
    //         const urlsearch = (filter.search === "All" || filter.search === "") ? "" : filter.search.toLowerCase();

    //         return (
    //             (urlsearch === "" ||
    //                 product.subsubcategory?.name.toLowerCase() === (urlsearch) ||
    //                 product.name.toLowerCase() === (urlsearch) ||
    //                 product.gender?.toLowerCase() === (urlsearch) ||
    //                 product.cf.toLowerCase() === (urlsearch) ||
    //                 product.category?.name.toLowerCase() === (urlsearch) ||
    //                 product.subcategory?.name.toLowerCase() === (urlsearch)) &&
    //             (filter.gender.length === 0 || filter.gender.includes(product.category.name)) &&
    //             (filter.size.length === 0 || product.sqp.some((productsize) => filter.size.includes(productsize.size))) &&
    //             (filter.color.length === 0 || filter.color.includes(product.cf)) &&
    //             (filter.category.length === 0 || filter.category.includes(product.subcategory.name)) &&
    //             (filter.fit.length === 0 || filter.fit.includes(product.fit)) &&
    //             (filter.necktype.length === 0 || filter.necktype.includes(product.neck_type)) &&
    //             (filter.sleeve.length === 0 || filter.sleeve.includes(product.sleeve)) &&
    //             (filter.subcategory === "" || product.subsubcategory?.name.toLowerCase() === (filter.subcategory.toLowerCase()))
    //         );
    //     });
    // };

    const [pagecount, setpagecount] = useState(1)


    const fetchProducts = async () => {
        try {
            setproductloading(true)
            setproductsbc([])
            const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/all-products', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json' // corrected typo here
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                setProducts(data);
                // localStorage.setItem("products", data);
                // setProducts(data);
                // if (sort.phtl === true) {
                //     const sortedProducts = data.sort((a, b) => {
                //         return b.mrp - a.mrp;
                //     }
                //     );
                //     setproductsbc(sortedProducts)
                //     setproductcount(sortedProducts.length)
                //     setproductloading(false)

                // }
                // else if (sort.plth === true) {
                //     const sortedProducts = data.sort((a, b) => {
                //         return a.mrp - b.mrp;
                //     }
                //     );
                //     setproductsbc(sortedProducts)
                //     setproductcount(sortedProducts.length)
                //     setproductloading(false)


                // }
                // else if (sort.dhtl === true) {
                //     const sortedProducts = data.sort((a, b) => {
                //         return b.discounted_price - a.discounted_price;
                //     }
                //     );
                //     setproductsbc(sortedProducts)
                //     setproductcount(sortedProducts.length)
                //     setproductloading(false)


                // }


                // if (filterdata.search !== "" || search !== "" || filterdata.color.length > 0 || filterdata.size.length > 0 || filterdata.gender.length > 0) {
                //     console.table(filterdata)
                //     const filteredProducts = funcFilter(data, filterdata)

                //     setproductsbc(filteredProducts)
                //     setproductcount(filteredProducts.length)
                //     setproductloading(false)


                // } else {
                setproductsbc(data);
                setproductcount(data.length)
                setproductloading(false)

                // }

            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsAuth = async () => {
        try {
            console.log("fetching products - auth")
            setproductloading(true)
            setproductsbc([])
            const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/all-products', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json', // corrected typo here,
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                setProducts(data);
                // localStorage.setItem("products", data);
                // setProducts(data);
                // if (sort.phtl === true) {
                //     const sortedProducts = data.sort((a, b) => {
                //         return b.mrp - a.mrp;
                //     }
                //     );
                //     setproductsbc(sortedProducts);
                //     setproductcount(sortedProducts.length);
                //     setproductloading(false);

                // }
                // else if (sort.plth === true) {
                //     const sortedProducts = data.sort((a, b) => {
                //         return a.mrp - b.mrp;
                //     }
                //     );
                //     setproductsbc(sortedProducts);
                //     setproductcount(sortedProducts.length);
                //     setproductloading(false);


                // }
                // else if (sort.dhtl === true) {
                //     const sortedProducts = data.sort((a, b) => {
                //         return b.discounted_price - a.discounted_price;
                //     }
                //     );
                //     setproductsbc(sortedProducts);
                //     setproductcount(sortedProducts.length);
                //     setproductloading(false);


                // }
                // if (filterdata.gender.length > 0 || filterdata.size.length > 0 || filterdata.color.length > 0 || filterdata.search !== "" || search !== "" || category.length > 0 || navsearch !== "" || navgender !== "") {
                //     console.table(filterdata);
                //     const filteredProducts = funcFilter(data, filterdata);


                //     setproductsbc(filteredProducts);
                //     setproductcount(filteredProducts.length);
                //     setproductloading(false);


                // } else {
                setproductsbc(data);
                setproductcount(data.length);
                setproductloading(false);


                // }

            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    const handlefetchProducts = async () => {

        if (localStorage.token) {
            fetchProductsAuth()
            localStorage.setItem("count", localStorage.count + 1);
        } else {
            fetchProducts()
            localStorage.setItem("count", localStorage.count + 1);

        }
    }



    // filter sub handlers
    const handleFetchFilterProducts = async (filterData) => {
        try {
            setproductloading(true)
            console.warn("fetching filter products", filterData)
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/filter', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    search: filterData.search,
                    category: filterData.gender,
                    size: filterData.size,
                    color: filterData.color,
                    sub_category: filterData.category,
                    fit: filterData.fit,
                    sub_sub_category: filterData.subcategory,
                    sleeve: filterData.sleeve,
                    necktype: filterData.necktype
                })
            })
            const data = await res.json()
            console.warn(data)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            setproductloading(false)
            setproductsbc(data.products)
            setproductcount(data.length)

        } catch (error) {
            setproductloading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        // effect
        const token = localStorage.getItem("token");
        const verified = localStorage.getItem("user_verified");
        if (token) {
            setIsAuth(true);
            setIsVerified(verified);
        }
    }, []);


    // fetch cart and set count 
    const [cart, setCart] = useState([])
    const fetchCart = async () => {
        try {
            if (!localStorage.getItem('token')) {
                return
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/my-cart`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            setCart(data)

        }
        catch (error) {
            console.log('Fetch error:', error);

        }
    }


    useEffect(() => {
        fetchCart()
    }, [])


    function mapIdsToNames(data) {
        const idToNameMap = {};

        function mapCategory(category) {
            idToNameMap[category.id] = category.name;

            if (category.subcategories) {
                category.subcategories.forEach((subcategory) => {
                    idToNameMap[subcategory.id] = subcategory.name;

                    if (subcategory.subsubcategories) {
                        subcategory.subsubcategories.forEach((subsubcategory) => {
                            idToNameMap[subsubcategory.id] = subsubcategory.name;
                        });
                    }
                });
            }
        }

        if (data.categories) {
            data.categories.forEach(mapCategory);
        }

        if (data.colorfamily) {
            data.colorfamily.forEach((color) => {
                idToNameMap[color.id] = color.name;
            });
        }

        return idToNameMap;
    }

    const idToNameMap = mapIdsToNames(JSON.parse(localStorage.cat_list));




    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isVerified,
                setIsVerified,
                isFilterActive,
                setIsFilterActive,


                search,
                navsearch,
                navgender,
                category,
                setSearch,
                setnavgender,
                setnavsearch,
                setcategory,


                isFuncCall,
                setIsFuncCall,


                fetchProductsAuth,
                fetchProducts,
                handlefetchProducts,

                productsbc,
                productloading,
                productcount,
                setproductsbc,
                setproductcount,
                setproductloading,

                couponcode,
                setcouponcode,


                sort,
                setSort,
                filterdata,
                setfilterdata,

                profiledata,
                setProfileData,
                fetchProfileData,

                cart,
                setCart,
                fetchCart,


                pagecount,
                setpagecount,
                handleFetchFilterProducts,


                idToNameMap
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { AuthContext, AuthProvider };