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

    //products  // [products, setProducts]
    const [productsbc, setproductsbc] = useState([]);
    const [productloading, setproductloading] = useState(true)
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
        price_lth: false,
        price_htl: false,
        search: ""
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
            setproductcount(0)
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

                setproductsbc(data);
                for (const product of data.products) {
                    // Check if the 'images' key is present and not empty
                    if ('images' in product && product.images.length > 0) {
                        setproductcount((prev) => prev + 1)
                    }
                }
                setproductloading(false)
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
            setproductcount(0)
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

                setproductsbc(data);
                for (const product of data.products) {
                    // Check if the 'images' key is present and not empty
                    if ('images' in product && product.images.length > 0) {
                        setproductcount((prev) => prev + 1)
                    }
                }
                setproductloading(false)
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleValidateToken = async () => {
        if (localStorage.token) {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/validate-token', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })

            if (!res.ok) {
                localStorage.clear()
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data)
        }
    }


    const handlefetchProducts = async () => {
        setproductloading(true)
        if (localStorage.token) {

            fetchProductsAuth()
        } else {
            fetchProducts()

        }
    }



    // filter sub handlers
    const handleFetchFilterProducts = async (filterData, signal) => {
        try {
            setproductloading(true)
            setproductsbc([])
            setproductcount(0)
            console.warn("fetching filter products", filterData)
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/filter', {
                signal: signal,
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
            if (filterdata.price_htl === true) {
                const sortedProducts = data.products.sort((a, b) => {
                    return b.mrp - a.mrp;
                }
                );
                setproductsbc(sortedProducts);

            }
            else if (filterdata.price_lth === true) {
                const sortedProducts = data.products.sort((a, b) => {
                    return a.mrp - b.mrp;
                }
                );
                setproductsbc(sortedProducts);
            } else {
                setproductsbc(data.products)
            }

            for (const product of data.products) {
                // Check if the 'images' key is present and not empty
                if ('images' in product && product.images.length > 0) {
                    setproductcount((prev) => prev + 1)
                }
            }

            setproductloading(false)


        } catch (error) {
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


    // fetch wishlist and set count 
    const [wishlist, setWishlist] = useState([])
    const fetchWishlist = async () => {
        try {
            setWishlist([])
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/wishlist', {
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
            setWishlist(data.wishlist)
            console.log(data.wishlist);

        }
        catch (error) {
            console.error('Fetch error:', error);
            
        }
    }

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
        fetchWishlist()
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

        if (data && data.categories) {
            data.categories.forEach(mapCategory);
        }

        if (data && data.colorfamily) {
            data.colorfamily.forEach((color) => {
                idToNameMap[color.id] = color.name;
            });
        }

        return idToNameMap;
    }

    const catListFromLocalStorage = localStorage.getItem('cat_list');
    const parsedCatList = catListFromLocalStorage ? JSON.parse(catListFromLocalStorage) : null;
    const idToNameMap = mapIdsToNames(parsedCatList);

    const [catlist, setcatlist] = useState([])


    const fetchCategory = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/product/category-details', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            localStorage.setItem('cat_list', JSON.stringify(data))
            setcatlist(data)

        } catch (err) {
            console.log(err)
        }
    }



    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isVerified,
                setIsVerified,
                isFilterActive,
                setIsFilterActive,

                handleValidateToken,

                search,
                catlist,
                navsearch,
                navgender,
                category,
                setSearch,
                setnavgender,
                setnavsearch,
                setcategory,


                isFuncCall,
                setIsFuncCall,
                fetchCategory,


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

                wishlist,
                setWishlist,
                fetchWishlist,

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