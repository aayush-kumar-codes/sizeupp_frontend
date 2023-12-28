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
    console.log(profiledata)

    //products 
    const [products, setProducts] = useState([]); // [products, setProducts]
    const [productsbc, setproductsbc] = useState([]);
    const [productloading, setproductloading] = useState(false)
    const [productcount, setproductcount] = useState(0)


    // set coupon code 
    console.log(productsbc)
    const [couponcode, setcouponcode] = useState("")

    // functions for products
    const fetchFilterProducts = async () => {
        // try {
        //     setproductsbc([])
        //     setproductcount(0)
        //     const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/filter', {
        //         method: 'GET',
        //         headers: {
        //             'Content-type': 'application/json' // corrected typo here
        //         },
        //         body: JSON.stringify({
        //             search: search
        //         })
        //     });

        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     } else {
        //         const data = await response.json();
        //         console.log(data);
        //         // setProducts(data);
        //         setproductsbc(data);
        //         setproductcount(data.length)
        //     }
        // } catch (error) {
        //     console.error('Error fetching products:', error);
        // }
    };

    const fetchFilterAuthProducts = async () => {
        // try {
        //     const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/filter', {
        //         method: 'GET',
        //         headers: {
        //             'Content-type': 'application/json',
        //             'Authorization': `token ${localStorage.getItem('token')}`
        //         },
        //         body: JSON.stringify({
        //             search: search
        //         })
        //     });

        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     } else {
        //         const data = await response.json();
        //         console.log(data);
        //         // setProducts(data);
        //         setproductsbc(data);
        //         setproductcount(data.length)
        //     }
        // } catch (error) {
        //     console.error('Error fetching products:', error);
        // }
    };

    // Assuming your product data is stored in the 'products' array
    const [filterdata, setfilterdata] = useState({
        gender: [],
        size: [],
        color: [],
        category: '',
        fit: "",
        sleeve: "",
        necktype: "",
        search: "All"
    })
    // Function to filter data based on multiple criteria
    const funcFilter = (products, filter) => {

        return products.filter((product) => {
            let urlsearch = filter.search
            if (filter.search === "All" || filter.search === "") {
                urlsearch = ""
            }
            return (
                search.length === 0 ||
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.gender?.toLowerCase().includes(search.toLowerCase()) ||
                product.cf?.toLowerCase().includes(search.toLowerCase()) ||
                product.category?.name.toLowerCase().includes(search.toLowerCase()) ||
                product.subcategory?.name.toLowerCase().includes(search.toLowerCase())
            ) &&
                (
                    filter.gender?.length === 0 || filter.gender.includes(product.category.name)
                ) &&
                (
                    filter.size?.length === 0 || product.sqp.some((productsize) => filter.size.includes(productsize.size))
                ) &&
                (
                    filter.color?.length === 0 || filter.color.includes(product.cf)
                ) &&
                (
                    category?.length === 0 || category.includes(product.category.name)
                ) &&
                (
                    filter.category?.length === 0 || filter.category.includes(product.subcategory.name)
                ) &&
                (
                    filter.fit?.length === 0 || filter.fit.includes(product.fit)
                ) &&
                (
                    filter.necktype?.length === 0 || filter.necktype.includes(product.neck_type)
                ) &&
                (
                    filter.sleeve?.length === 0 || filter.sleeve.includes(product.sleeve)
                ) &&
                (
                    urlsearch.length === 0 || product.subsubcategory?.name.toLowerCase().includes(urlsearch.toLowerCase())
                )
                &&
                (
                    (navsearch.length === 0 || navgender.length === 0) ||
                    product.subcategory?.name.toLowerCase().includes(navsearch.toLowerCase()) &&
                    product.gender?.toLowerCase().includes(navgender.toLowerCase())
                )
        })
    };


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
                localStorage.setItem("products", data);
                // setProducts(data);
                if (sort.phtl === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return b.mrp - a.mrp;
                    }
                    );
                    setproductsbc(sortedProducts)
                    setproductcount(sortedProducts.length)
                    setproductloading(false)

                }
                else if (sort.plth === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return a.mrp - b.mrp;
                    }
                    );
                    setproductsbc(sortedProducts)
                    setproductcount(sortedProducts.length)
                    setproductloading(false)


                }
                else if (sort.dhtl === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return b.discounted_price - a.discounted_price;
                    }
                    );
                    setproductsbc(sortedProducts)
                    setproductcount(sortedProducts.length)
                    setproductloading(false)


                }


                if (filterdata.search !== "" || search !== "" || filterdata.color.length > 0 || filterdata.size.length > 0 || filterdata.gender.length > 0) {
                    console.table(filterdata)
                    const filteredProducts = funcFilter(data, filterdata)

                    setproductsbc(filteredProducts)
                    setproductcount(filteredProducts.length)
                    setproductloading(false)


                } else {
                    setproductsbc(data);
                    setproductcount(data.length)
                    setproductloading(false)
                    console.log(productsbc);

                }

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
                localStorage.setItem("products", data);
                // setProducts(data);
                if (sort.phtl === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return b.mrp - a.mrp;
                    }
                    );
                    setproductsbc(sortedProducts);
                    setproductcount(sortedProducts.length);
                    setproductloading(false);

                }
                else if (sort.plth === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return a.mrp - b.mrp;
                    }
                    );
                    setproductsbc(sortedProducts);
                    setproductcount(sortedProducts.length);
                    setproductloading(false);


                }
                else if (sort.dhtl === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return b.discounted_price - a.discounted_price;
                    }
                    );
                    setproductsbc(sortedProducts);
                    setproductcount(sortedProducts.length);
                    setproductloading(false);


                }
                if (filterdata.gender.length > 0 || filterdata.size.length > 0 || filterdata.color.length > 0 || filterdata.search !== "" || search !== "" || category.length > 0 || navsearch !== "" || navgender !== "") {
                    console.table(filterdata);
                    const filteredProducts = funcFilter(data, filterdata);


                    setproductsbc(filteredProducts);
                    setproductcount(filteredProducts.length);
                    setproductloading(false);


                } else {
                    setproductsbc(data);
                    setproductcount(data.length);
                    setproductloading(false);


                }

            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    //handling auth functions 
    const handlefetchFilterProducts = async () => {
        if (localStorage.token) {
            fetchFilterAuthProducts()
        } else {
            fetchFilterProducts()
        }
    }

    const handlefetchProducts = async () => {
        console.log("handle fetch products", localStorage.token)

        if (localStorage.token) {
            fetchProductsAuth()
            localStorage.setItem("count", localStorage.count + 1);
        } else {
            fetchProducts()
            localStorage.setItem("count", localStorage.count + 1);

        }
    }

    const firstRun = useRef(true);
    useEffect(() => {
        handlefetchProducts()
    }, [filterdata])

    useEffect(() => {
        // effect
        const token = localStorage.getItem("token");
        const verified = localStorage.getItem("user_verified");
        if (token) {
            setIsAuth(true);
            setIsVerified(verified);
        }
    }, []);

    useEffect(() => {
        if (localStorage.token) {
            console.log(import.meta.env.VITE_SERVER_URL, localStorage.token, isVerified)
        }
    }, [])


    // fetch cart and set count 
    const [cart, setCart] = useState([])
    const fetchCart = async () => {
        try {
            
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
            console.log(data);
            setCart(data)

        }
        catch (error) {
            console.error('Fetch error:', error);
            
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])


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
                fetchFilterProducts,
                fetchFilterAuthProducts,

                handlefetchFilterProducts,
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
                fetchCart
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