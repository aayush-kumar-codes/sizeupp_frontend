
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { styles } from '../style'
import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthProvider'
// import {Helmet} from "react-helmet";
// import { State, City } from 'country-state-city';

export function ProductBilling() {
    const [profile, setProfile] = useState({})
    const [pincode, setPincode] = useState('')
    const [changeAddress, setChangeAddress] = useState(false)
    const { couponcode, cart, setCart } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        stateCode: '',
        is_deafult: false
    });

    const [form, setForm] = useState({
        address_id: localStorage.address_id,
        mrp_price: 0,
        sub_total: 0,
        cupon_discount: 0,
        coupon: "",
        total_price: 0,
        payment_type: "PPD"
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };





    const navigate = useNavigate()

    const fetchCoupon = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/my-cart`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    code: couponcode
                })
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            if (data.message == "Empty Cart") {
                Swal.fire({
                    title: 'Error!',
                    text: 'Cart Empty',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
                return navigate('/products/cart')
            }
            console.log(data);
            setCart(data)
            setForm({
                ...form,
                mrp_price: data.mrp_price,
                sub_total: data.sub_total,
                cupon_discount: data.cupon_discount,
                coupon: data.coupon,
                total_price: data.total_price
            })
        }
        catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Fetch error: ' + error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1200
            });
        }
    }

    const fetchUserProfile = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/userprofile`, {
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
            setProfile(data)

            let adressid = ""
            data.addresses?.map((address, index) => {
                if (address.is_default === true) {
                    console.log("logged")
                    adressid = address.id
                }
            })
            localStorage.setItem("address_id", adressid)
            setPincode(adressid)
        }
        catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Fetch error: ' + error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1200
            });
        }
    }

    console.log(localStorage.address_id)

    const fetchCart = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
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
            console.log(data);
            setCart(data)
            let fors = {
                address_id: form.address_id,
                mrp_price: data.mrp_price,
                sub_total: data.sub_total,
                cupon_discount: data.cupon_discount,
                coupon: data.coupon,
                total_price: data.total_price
            }
            setForm(fors)

        }
        catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Fetch error: ' + error,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }


    const handlePlaceOrder = async () => {
        setPayload(true)
        if (localStorage.address_id === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please Add Address',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            setPayload(false)
            return navigate('/products/cart')
        }
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            console.log(form.total_price == undefined && localStorage.address_id === "" && cart.products?.length == 0)
            if (form.total_price == undefined && cart.products?.length == 0) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Cart Empty',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
                setPayload(false)
                return navigate('/products/cart')
            }

            console.log({
                mrp_price: form.mrp_price,
                sub_total: form.sub_total,
                cupon_discount: form.cupon_discount,
                coupon: couponcode,
                total_price: form.total_price,
                payment_type: form.payment_type
            })
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/order", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    address_id: localStorage.address_id,
                    mrp_price: form.mrp_price,
                    sub_total: form.sub_total,
                    cupon_discount: form.cupon_discount,
                    coupon: couponcode,
                    total_price: form.total_price,
                    payment_type: form.payment_type
                })
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(`${data.message ? data.message : 'HTTP error! status: ' + res.status}`);
            }
            console.log(data);

            if (form.payment_type == 'COD') {
                fetchCart()
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                Swal.fire({
                    title: 'Success!',
                    text: 'Order Placed Successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                setPayload(false)
                navigate('/profile/my-orders')
            }

            if (form.payment_type == "PPD") {
                console.log("redirect_url", data.redirect_url)
                setPayload(false)
                setTimeout(() => {
                    window.open(data.redirect_url);
                }, 1000);
            }
        }
        catch (error) {
            console.error('Fetch error:', error);
            setPayload(false)
            Swal.fire({
                title: 'Error!',
                text: 'Fetch error: ' + error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1200
            });
        }
    }

    useEffect(() => {
        fetchCoupon()
        fetchUserProfile()

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])



    console.log(form)



    const [payload, setPayload] = useState(false)

    const handleAddAddress = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/address`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    address_line_1: formData.addressLine1,
                    address_line_2: formData.addressLine2,
                    city: formData.city,
                    postal_code: formData.zipCode,
                    country: formData.country,
                    state: formData.state,
                    is_default: 'on'
                })
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: 'Address Added',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            setFormData({
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            })



            navigate('/products/cart')

        } catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Fetch error: ' + error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1200
            });
        }
    }


    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDefault = async (id) => {
        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/address/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    address_line_1: formData.addressLine1,
                    address_line_2: formData.addressLine2,
                    city: formData.city,
                    postal_code: formData.pinCode,
                    country: formData.country,
                    state: formData.state,
                    is_default: !formData.is_deafult ? 'on' : 'off'
                }),
            });
            const data = await res.json();
            console.log(data);
            setFormData({
                addressid: "",
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: "",
                country: 'India',
                pinCode: '',
                mobile: '',
                is_deafult: false
            })
            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Address Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                fetchUserProfile()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    // const stateData = State.getStatesOfCountry('IN').map(state => ({
    //     name: state.name,
    //     code: state.isoCode,
    // }))
    // const cityData = City.getCitiesOfState('IN', 'MH').map(city => ({
    //     name: city,
    // }))

    // console.log(cityData);


    // ==================================>
    const [stateData, setStateData] = useState([])
    const [cityName, setCityName] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/getstate`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setStateData(data)
            });
    }, []);


    useEffect(() => {
        setCityName("")
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/getcities/${formData.stateCode}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCityName(data)
            });
    }, [formData.stateCode]);
    // ===================================>

    return (
        <div className={`my-10 lg:mx-6 mx-2`}>
            {/* <Helmet>
                <title>Checkout | Sizeupp</title>
                <meta name="description" content="Experience secure billing and payment processing on Sizeupp. Complete your purchase with confidence, and explore our convenient and reliable payment options." />
                <meta name="keywords" content="Sizeupp billing, secure payment, checkout process, online payment, purchase completion" />
            </Helmet> */}
            {/* Nav menu- Breadcrumb */}
            <ol className={`inline-flex items-center space-x-1 md:space-x-3 mb-6`}>
                <li className="inline-flex items-center">

                    <Link
                        to="/products"
                        className="ml-1 inline-flex text-lg text-gray-800 hover:underline md:ml-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        Products
                    </Link>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="ml-1 text-lg font-medium text-gray-800 hover:underline md:ml-2">
                            Billing
                        </span>
                    </div>
                </li>
            </ol>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <section className="px-4 bg-white w-11/12 absolute rounded-md md:w-1/2">

                        <h2 className='text-lg px-2 py-4 tracking-wide underline md:text-lg font-semibold'>Change Default Address</h2>
                        <div className='max-h-[30rem] overflow-y-auto'>
                            {
                                profile.addresses?.map((address, index) => {
                                    return (
                                        <div key={index} className="py-4 px-2  justify-between items-center border-b border-gray-300">
                                            <h3 className='font-semibold my-4'>Address {index + 1}</h3>
                                            <div className='flex gap-4'>
                                                <input type='checkbox' onChange={(e) => {
                                                    handleToggleDefault(address.id);
                                                    setFormData({
                                                        addressid: address.id,
                                                        addressLine1: address.address_line_1,
                                                        addressLine2: address.address_line_2,
                                                        city: address.city,
                                                        zipCode: address.postal_code,
                                                        mobile: address.mobile,
                                                        country: address.country,
                                                        state: address.state,
                                                        is_deafult: address.is_default
                                                    });
                                                }} name='address' checked={address.is_default} />
                                                <div className='text-sm text-gray-800/80 font-semibold'>{address.address_line_1 + ", " + address.address_line_2 + ", " + address.city + ", " + address.state + ", " + address.postal_code}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <button type="button" onClick={() => { setIsOpen(false) }} className="rounded-lg bg-red-500 text-white px-4 py-2 m-4">
                            Close
                        </button>
                    </section>
                </div>
            )}
            <div className="overflow-hidden  rounded-xl shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Product List */}
                    <section aria-labelledby="cart-heading" className="rounded-lg mx-5 py-4 bg-white md:mt-10 border ">


                        {cart.products?.length > 0 ? cart.products?.map((product, i) => {
                            let info = product.cart
                            return (
                                <div key={i} className='grid gap-2 py-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 '>
                                    <div className='col-span-1 justify-center items-center '>
                                        <img
                                            onClick={() => { navigate(`/products/${info.product?.id}`) }}
                                            src={import.meta.env.VITE_SERVER_URL + (info.product?.images[0]?.img + "").slice(6)}
                                            alt={info.product?.name}
                                            className="sm:h-38 sm:w-38 h-32 w-32 rounded-lg object-contain object-center cursor-pointer"
                                        />
                                    </div>
                                    <div className='col-span-2 md:col-span-3'>
                                        <div className='grid grid-cols-3 gap-2 justify-center items-center'>
                                            <h3 className="text-base col-span-3 font-semibold px-3">
                                                <Link to={`/products/${info.product?.id}`} className="text-black">
                                                    {info.product.name}
                                                </Link>
                                            </h3>

                                            {/* Sizes */}
                                            {
                                                info.product?.sqp.map((size, index) => {
                                                    if (info.size_quantity_price != size.id) {
                                                        return null
                                                    }
                                                    return (
                                                        <div key={index} className="mt-2 text-sm col-span-1 flex justify-center items-center">
                                                            <p className="text-sm text-c-gray-500 mb-2"> Size: {size.size}</p>
                                                        </div>
                                                    )
                                                })
                                            }

                                            {/* Price */}
                                            <div className="mt-2 col-span-1 flex justify-center items-center">
                                                <p className="text-sm font-medium text-c-gray-900">
                                                    ₹ {info.product?.discounted_price ? info.product?.discounted_price : info.product?.mrp}
                                                </p>

                                                {info.product?.discounted_price &&
                                                    <div className='flex justify-center items-center flex-wrap'>
                                                        <p className="text-sm ml-2 font-medium text-c-gray-500 line-through">
                                                            ₹ {info.product?.mrp}
                                                        </p>
                                                        <p className="text-sm ml-2 font-medium text-green-500">{info.product?.discount_percentage}%</p>
                                                    </div>}
                                            </div>

                                            {/* stock */}
                                            <div className={`${info.product?.sqp.map((size, index) => {
                                                if (info.size_quantity_price != size.id) {
                                                    return null
                                                }

                                                return (parseInt(size.quantity) > (parseInt(size.quantity) - parseInt(product.qty)) ? 'text-red-600' : 'text-green-600')
                                            })} col-span-1 flex justify-center items-center font-normal text-sm py-2`}>
                                                {
                                                    info.product?.sqp.map((size, index) => {
                                                        if (info.size_quantity_price != size.id) {
                                                            return null
                                                        }

                                                        return (
                                                            parseInt(size.quantity) > (parseInt(size.quantity) - parseInt(product.qty)) ? "In Stock" : "Out of Stock"
                                                        )
                                                    })
                                                }
                                            </div>
                                            {/* Qty Update buttons */}
                                            <div className='col-span-1 flex justify-center items-center'>

                                                <input
                                                    type="text"
                                                    className="mx-1 h-7 w-9 rounded-md border text-center"
                                                    disabled
                                                    value={product.qty}
                                                />
                                            </div>
                                            {/* Total Price */}
                                            <div className='col-span-1 flex justify-center items-center'>
                                                <div className=''>₹ {(info?.total_price)}</div>
                                            </div>


                                        </div>
                                    </div>


                                </div>
                            )
                        }) : <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">Cart Empty.</div>
                        }

                    </section>



                    {/* Contact Info */}
                    <div className="px-5 py-6 text-gray-900 md:px-8">
                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="py-6">
                                    <form>
                                        <div className="md:mx-auto md:max-w-2xl px-4 lg:max-w-none lg:px-0">

                                            <section
                                                aria-labelledby="summary-heading"
                                                className="mt-16 rounded-lg drop-shadow-md px-4 py-3 bg-white lg:col-span-4 lg:mt-0 border"
                                            >
                                                <h2
                                                    id="summary-heading"
                                                    className=" border-b border-c-gray-200 px-4 py-3 text-lg font-medium text-c-gray-900 sm:p-4"
                                                >
                                                    Price Details
                                                </h2>
                                                <div>
                                                    <dl className=" space-y-1 px-2 py-4">
                                                        <div className="flex items-center justify-between">
                                                            <dt className="text-sm text-c-gray-800">Price </dt>
                                                            <dd className="text-sm font-medium text-c-gray-900">₹ {cart.mrp_price}</dd>
                                                        </div>
                                                        <div className="flex items-center justify-between pt-4">
                                                            <dt className="flex items-center text-sm text-c-gray-800">
                                                                <span>Coupon Discount</span>
                                                            </dt>
                                                            <dd className="text-sm font-medium text-green-700">- ₹ {cart.cupon_discount || 0}</dd>
                                                        </div>
                                                        <div className="flex items-center justify-between pt-4">
                                                            <dt className="flex items-center text-sm text-c-gray-800">
                                                                <span>Discount on MRP</span>
                                                            </dt>
                                                            <dd className="text-sm font-medium text-green-700">- ₹ {cart.discount_on_price || 0}</dd>
                                                        </div>

                                                        <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                                            <dt className="text-sm font-medium text-c-gray-900">Sub Total</dt>
                                                            <dd className="text-sm font-medium text-c-gray-900">₹ {cart.total_price || 0}</dd>
                                                        </div>
                                                        {cart.delivery_charges && <div className="flex items-center justify-between py-4">
                                                            <dt className="flex text-sm text-c-gray-800">
                                                                <span>Delivery Charges</span>
                                                            </dt>
                                                            <dd className="text-sm font-medium text-green-700">FREE</dd>
                                                        </div>}

                                                        <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                                            <dt className="text-sm font-medium text-c-gray-900">Total Price</dt>
                                                            <dd className="text-sm font-medium text-c-gray-900">₹ {cart.total_price || 0}</dd>
                                                        </div>
                                                    </dl>
                                                    {couponcode ? <div className="px-2 pb-4 font-medium text-green-700">
                                                        You will save ₹ {parseInt(cart.cupon_discount)} on this order
                                                    </div> : null}

                                                </div>

                                            </section>


                                            <section className='rounded-lg shadow-sm bg-white lg:col-span-4 mt-2 pt-2 border' aria-labelledby="dilvery_address">
                                                {(profile.addresses?.length > 0 && !changeAddress) ?
                                                    <div className="py-6 px-6  rounded-md border-b-gray-500 shadow-md mt-2">
                                                        <label htmlFor="pincode" className="text-base font-medium text-gray-800/80">
                                                            Delivery & Services :
                                                        </label>
                                                        <div className='text-sm text-gray-800/80 font-semibold'>
                                                            {profile.addresses?.map((address, index) => {
                                                                if (address.is_default != true) {
                                                                    return null
                                                                }
                                                                return (
                                                                    <p key={index} className='text-sm text-gray-800/80 font-semibold'>{address.address_line_1 + ", " + address.address_line_2 + ", " + address.city + ", " + address.state + ", " + address.postal_code}</p>
                                                                )
                                                            })
                                                            }
                                                        </div>


                                                        <button
                                                            type="button"
                                                            onClick={() => { setChangeAddress(true) }}
                                                            className="truncate inline-flex md:w-1/4 my-4 items-center justify-center rounded-md bg-black px-3 py-1 text-sm md:font-semibold leading-7 text-white hover:bg-black/80"
                                                        >
                                                            Add Address
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => { setIsOpen(true) }}
                                                            className="truncate inline-flex ml-2 md:w-1/4 my-4 items-center justify-center rounded-md bg-black px-3 py-1 text-sm md:font-semibold leading-7 text-white hover:bg-black/80"
                                                        >
                                                            Change Address
                                                        </button>
                                                    </div>

                                                    :
                                                    <div className="px-4 border rounded-md">
                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">
                                                                Address Line 1
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="text"
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    placeholder="Enter Address Line 1"
                                                                    required
                                                                    name="addressLine1"
                                                                    value={formData.addressLine1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">
                                                                Address Line 2
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    placeholder="Enter Address Line 2"
                                                                    name="addressLine2"
                                                                    value={formData.addressLine2}
                                                                    onChange={handleInputChange} />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">
                                                                State
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                {/* <select
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    value={formData.state}
                                                                    onChange={(e) => {
                                                                        const selectedState = e.target.value;
                                                                        const selectedStateCode = stateData.find((item) => item.name === selectedState)?.code;
                                                                        setFormData({ ...formData, state: selectedState, stateCode: selectedStateCode });
                                                                    }}
                                                                >
                                                                    <option value='' disabled>Select State</option>
                                                                    {stateData.map((item) => (
                                                                        <option key={item.name} value={item.name}>
                                                                            {item.name}
                                                                        </option>
                                                                    ))}
                                                                </select> */}

                                                                {/* ====================================================> */}
                                                                <select
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    value={formData.state}
                                                                    onChange={(e) => {
                                                                        const selectedState = e.target.value;
                                                                        const selectedStateName = stateData.find(obj => Object.values(obj)[0] === selectedState);
                                                                        const selectedStateCode = selectedStateName ? Object.keys(selectedStateName)[0] : null;

                                                                        setFormData({
                                                                            ...formData,
                                                                            state: selectedState,
                                                                            stateCode: selectedStateCode,
                                                                        });
                                                                    }}
                                                                >
                                                                    <option value="" disabled className="text-gray-500">
                                                                        Select State
                                                                    </option>
                                                                    {stateData.map((state, i) => (
                                                                        <option key={i} value={state[Object.keys(state)[0]]}>
                                                                            {state[Object.keys(state)[0]]}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                                {/* =======================================================> */}
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">
                                                                City
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                {/* <input type="text"
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    placeholder="Enter City"
                                                                    required
                                                                    name="city"
                                                                    value={formData.city}
                                                                    onChange={handleInputChange} /> */}
                                                                {/* <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="form-input py-2 px-2 rounded-md bg-gray-800/10">
                                                                    <option value='' disabled>Select City</option>
                                                                    {City.getCitiesOfState('IN', formData.stateCode).map(city => {
                                                                        return (

                                                                            <option key={city.name} value={city.name} >{city.name} </option>

                                                                        )
                                                                    })}
                                                                </select> */}

                                                                {/* ==================================> */}
                                                                <select
                                                                    value={formData.city}
                                                                    disabled={formData.state == ""}
                                                                    onChange={(e) =>
                                                                        setFormData({ ...formData, city: e.target.value })
                                                                    }
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                >
                                                                    <option value="" disabled>
                                                                        Select City
                                                                    </option>
                                                                    {cityName.length > 0 && cityName.map(
                                                                        (city) => <option key={city} value={city}>{city}</option>
                                                                    )}
                                                                </select>
                                                                {/* ========================================> */}
                                                            </dd>
                                                        </div>



                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">
                                                                Pin Code
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    placeholder="Enter Zip code"
                                                                    required
                                                                    name="zipCode"
                                                                    value={formData.zipCode}
                                                                    onChange={handleInputChange} />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">
                                                                Country
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    placeholder="Enter country"
                                                                    required
                                                                    name="country"
                                                                    disabled
                                                                    value={'India'} />
                                                            </dd>
                                                        </div>

                                                        <div className="py-5 grid grid-cols-3 gap-4 px-6">
                                                            <button type="button" onClick={handleAddAddress} className="rounded-lg bg-blue-500 text-white px-4 py-2">
                                                                Save
                                                            </button>
                                                            <button type="button" onClick={() => { setChangeAddress(false) }} className="rounded-lg bg-red-500 text-white px-4 py-2">
                                                                Close
                                                            </button>
                                                        </div>

                                                    </div>
                                                }




                                            </section>

                                            {/* <hr className="my-8" /> */}
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>

                                                <div className="mt-6 flex gap-2 items-center">
                                                    <input
                                                        id="payment-type"
                                                        name="payment-type"
                                                        type="radio"
                                                        value="COD"
                                                        checked={form.payment_type == "COD"}
                                                        onChange={(e) => { setForm({ ...form, payment_type: e.target.value }) }}
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <div className="mr-4">
                                                        <label
                                                            htmlFor="payment-type"
                                                            className="text-sm font-semibold text-gray-900"
                                                        >
                                                            Cash on delivery
                                                        </label>
                                                    </div>
                                                    <input
                                                        id="payment-type"
                                                        name="payment-type"
                                                        type="radio"
                                                        value="PPD"
                                                        checked={form.payment_type == "PPD"}
                                                        onChange={(e) => { setForm({ ...form, payment_type: e.target.value }) }}
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <div className="mr-2">
                                                        <label
                                                            htmlFor="payment-type"
                                                            className="text-sm font-semibold text-gray-900"
                                                        >
                                                            Online Payment
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>




                                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                                <button
                                                    type="button"
                                                    disabled={payload}
                                                    onClick={handlePlaceOrder}
                                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    {!payload ? "Make payment" : "Processing .."}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
