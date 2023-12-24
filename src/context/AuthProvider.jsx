import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") ? true : false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [isVerified, setIsVerified] = useState(localStorage.getItem("user_verified") ? localStorage.isverified : false);
    const [search, setSearch] = useState("");
    const [isFuncCall, setIsFuncCall] = useState(false);

    // sort 
    const [sort, setSort] = useState({
        phtl: false,
        plth: false,
        dhtl: false,
    })


    //products 
    const [products, setProducts] = useState([]); // [products, setProducts]
    const [productsbc, setproductsbc] = useState([]);
    const [productloading, setproductloading] = useState(false)
    const [productcount, setproductcount] = useState(0)

    // set coupon code 
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
        search: "",
        megamenu:""
    })

    // Function to filter data based on multiple criteria
    const funcFilter = (products, filter) => {
        return products.filter((product) => {
            // Check gender filter
            const isGenderMatch = filter.gender.length === 0 || filter.gender?.includes(product.gender?.toLowerCase());

            // Check size filter
            const isSizeMatch = filter.size.length === 0 || product.sqp.some((size) => filter.size.includes(size.size));

            // Check color filter
            const isColorMatch = filter.color.length === 0 || filter.color?.includes(product.color?.toLowerCase());

            // Check search filter
            const isSearchMatch = filter.search.length === 0 ||
                product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                product.fit?.toLowerCase().includes(filter.search.toLowerCase()) ||
                product.gender?.toLowerCase().includes(filter.search.toLowerCase()) ||
                product.color?.toLowerCase().includes(filter.search.toLowerCase());

            

            // Return true only if all criteria match
            return isGenderMatch && isSizeMatch && isColorMatch && isSearchMatch;
        });
    };


    const fetchProducts = async () => {
        try {

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
                setProducts(data)
                localStorage.setItem("products", data)
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
                if (filterdata.search !== "" || filterdata.color.length > 0 || filterdata.size.length > 0 || filterdata.gender.length >0) {
                    console.table(filterdata)
                    const filteredProducts = funcFilter(products, filterdata)

                    setproductsbc(filteredProducts)
                    setproductcount(filteredProducts.length)
                    setproductloading(false)


                } else {
                    setproductsbc(data);
                    setproductcount(data.length)
                    setproductloading(false)

                }

            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsAuth = async () => {
        try {
            setproductloading(true)
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
                setProducts(data)
                localStorage.setItem("products", data)
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
                if (filterdata.search !== "" || filterdata.color.length > 0 || filterdata.size.length > 0 || filterdata.gender.length >0) {
                    console.table(filterdata)
                    const filteredProducts = funcFilter(products, filterdata)
                    

                    setproductsbc(filteredProducts)
                    setproductcount(filteredProducts.length)
                    setproductloading(false)


                } else {
                    setproductsbc(data);
                    setproductcount(data.length)
                    setproductloading(false)

                }

            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    console.log(productsbc);

    //handling auth functions 
    const handlefetchFilterProducts = async () => {
        if (localStorage.token) {
            fetchFilterAuthProducts()
        } else {
            fetchFilterProducts()
        }
    }

    const handlefetchProducts = async () => {
        if (localStorage.token) {
            fetchProductsAuth()
        } else {
            fetchProducts()
        }
    }

    const handleMegaMenu =()=>{

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

    useEffect(() => {
        if (localStorage.token) {
            console.log(import.meta.env.VITE_SERVER_URL, localStorage.token, isVerified)
        }
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
                setSearch,
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
                setfilterdata
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