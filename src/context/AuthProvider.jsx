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
    const [productsbc, setproductsbc] = useState([]);
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
        search: ""
    })

    // Function to filter data based on multiple criteria



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
                console.log(data);
                // setProducts(data);
                if (sort.phtl === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return b.mrp - a.mrp;
                    }
                    );
                    setproductsbc(sortedProducts)
                }
                else if (sort.plth === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return a.mrp - b.mrp;
                    }
                    );
                    setproductsbc(sortedProducts)
                }
                else if (sort.dhtl === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return b.discounted_price - a.discounted_price;
                    }
                    );
                    setproductsbc(sortedProducts)
                }
                else if (filterdata.search !== "" || filterdata.color.length > 0 || filterdata.size.length > 0) {
                    const filteredProducts = productsbc.filter(product => {
                        const { gender, color, sqp, name, fit, design_surface, fabric_detail } = product;

                        return (
                            (filterdata.color.length === 0 || filterdata.color.includes(color)) &&
                            (
                                name.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                                gender.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                                color.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                                fit.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                                design_surface.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                                fabric_detail.toLowerCase().includes(filterdata.search.toLowerCase())
                            ) &&
                            (
                                sqp.length > 0 && sqp.some(({ size }) => filterdata.size.includes(size))
                            )
                        );
                    });
                    console.log(filteredProducts)

                    setproductsbc(filteredProducts)
                }
                else {
                    setproductsbc(data);
                }
                setproductcount(data.length)
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsAuth = async () => {
        try {
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
                localStorage.setItem("products", data)
                // setProducts(data);
                if (sort.phtl === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return b.mrp - a.mrp;
                    }
                    );
                    setproductsbc(sortedProducts)
                }
                else if (sort.plth === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return a.mrp - b.mrp;
                    }
                    );
                    setproductsbc(sortedProducts)
                }
                else if (sort.dhtl === true) {
                    const sortedProducts = data.sort((a, b) => {
                        return b.discounted_price - a.discounted_price;
                    }
                    );
                    setproductsbc(sortedProducts)
                }
                else if (filterdata.search  || filterdata.color.length > 0 || filterdata.size.length > 0) {
                    console.table(filterdata)
                    const filteredProducts = productsbc.filter(product => {
                        const { gender, color, sqp, name, fit, design_surface, fabric_detail } = product;
                        console.log("----- fig 208 ----------")
                        console.log()
                        console.log((color.toLowerCase()).includes(filterdata.search.toLowerCase()))
                        return (
                            // (
                            //     filterdata.color.length === 0 || filterdata.color.toLowerCase().includes(color.toLowerCase())
                            // ) ||
                            // (
                            //     name.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                            //     gender.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                            (color.toLowerCase()).includes(filterdata.search.toLowerCase())
                            // ||
                            //     fit.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                            //     design_surface.toLowerCase().includes(filterdata.search.toLowerCase()) ||
                            //     fabric_detail.toLowerCase().includes(filterdata.search.toLowerCase())
                            // ) ||
                            // (
                            //     sqp.length > 0 && sqp.some(({ size }) => filterdata.size.includes(size))
                            // )
                        );
                    });
                    console.log(filteredProducts)

                    setproductsbc(filteredProducts)
                } else {
                    setproductsbc(data);
                }


                setproductcount(data.length)
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
                productcount,
                setproductsbc,
                setproductcount,

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