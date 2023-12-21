import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") ? true : false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [isVerified, setIsVerified] = useState(localStorage.getItem("user_verified") ? localStorage.isverified : false);
    const [search, setSearch] = useState("");
    const [isFuncCall, setIsFuncCall] = useState(false);


    //products 
    const [productsbc, setproductsbc] = useState([]);
    const [productcount, setproductcount] = useState(0)

    // functions for products
    const fetchFilterProducts = async () => {
        try {
            setproductsbc([])
            setproductcount(0)
            const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/filter', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json' // corrected typo here
                },
                body: JSON.stringify({
                    search: search
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                // setProducts(data);
                setproductsbc(data);
                setproductcount(data.length)
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchFilterAuthProducts = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/filter', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    search: search
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                // setProducts(data);
                setproductsbc(data);
                setproductcount(data.length)
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
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
                console.log(data);
                // setProducts(data);
                setproductsbc(data);
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
                console.log(data);
                // setProducts(data);
                setproductsbc(data);
                setproductcount(data.length)
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
                setproductcount
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