
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { styles } from '../style'
import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthProvider'


export function ProductBilling() {
    const [qtyCart, setQtyCart] = useState([])
    const [profile, setProfile] = useState({})
    const [pincode, setPincode] = useState('')
    const [changeAddress, setChangeAddress] = useState(false)
    const { couponcode, setcouponcode, fetchCart, cart, setCart } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const [form, setForm] = useState({
        address_id: "",
        mrp_price: 0,
        sub_total: 0,
        cupon_discount: 0,
        coupon: "",
        total_price: 0,
        payment_type: "COD"
    })

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
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
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

    // const fetchCart = async () => {
    //     try {
    //         if (!localStorage.token) {
    //             return navigate('/login')
    //         }
    //         const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/my-cart`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 'Authorization': `token ${localStorage.getItem('token')}`
    //             }
    //         })
    //         if (!res.ok) {
    //             throw new Error(`HTTP error! status: ${res.status}`);
    //         }
    //         const data = await res.json()
    //         console.log(data);
    //         setCart(data)
    //         let fors = {
    //             address_id: form.address_id,
    //             mrp_price: data.mrp_price,
    //             sub_total: data.sub_total,
    //             cupon_discount: data.cupon_discount,
    //             coupon: data.coupon,
    //             total_price: data.total_price
    //         }
    //         setForm(fors)

    //     }
    //     catch (error) {
    //         console.error('Fetch error:', error);
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'Fetch error: ' + error,
    //             icon: 'error',
    //             confirmButtonText: 'OK'
    //         });
    //     }
    // }


    const handlePlaceOrder = async () => {
        setPayload(true)
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            if (cart.products?.length === 0) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Cart Empty',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
                return navigate('/products/cart')
            }

            if (localStorage.address_id === "") {
                Swal.fire({
                    title: 'Error!',
                    text: 'Address Not Selected',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
                return navigate('/products/cart')
            }
            console.log({
                mrp_price: form.mrp_price,
                sub_total: form.sub_total,
                cupon_discount: form.cupon_discount,
                coupon: couponcode,
                total_price: form.total_price,
                payment_type: "COD"
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
                    payment_type: "COD"
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
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
            navigate('/products')
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
        setPayload(false)
        fetchCoupon()
        fetchUserProfile()
    }, [])



    console.log(form)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

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


    return (
        <div className={`my-10 lg:mx-6 mx-2`}>
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
                    <section aria-labelledby="cart-heading" className="rounded-lg px-2 py-4 bg-white md:mt-10">


                        {cart.products?.length > 0 ? cart.products?.map((product, i) => {
                            let info = product.cart
                            return (
                                <div key={i} className='grid gap-2 py-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-3'>
                                    <div className='col-span-1 justify-center items-center'>
                                        <img
                                            onClick={() => { navigate(`/products/${info.product?.id}`) }}
                                            src={import.meta.env.VITE_SERVER_URL + (info.product?.images[0]?.img + "").slice(6)}
                                            alt={info.product?.name}
                                            className="sm:h-38 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                                        />
                                    </div>
                                    <div className='col-span-2 md:col-span-3'>
                                        <div className='grid grid-cols-3 gap-2 justify-center items-center'>
                                            <h3 className="text-base col-span-3 font-semibold">
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
                                                className="mt-16 rounded-lg drop-shadow-md px-4 py-3 bg-white lg:col-span-4 lg:mt-0"
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
                                                            <dd className="text-sm font-medium text-c-gray-900">₹ {cart.sub_total || 0}</dd>
                                                        </div>
                                                        {cart.delivery_charges && <div className="flex items-center justify-between py-4">
                                                            <dt className="flex text-sm text-c-gray-800">
                                                                <span>Delivery Charges</span>
                                                            </dt>
                                                            <dd className="text-sm font-medium text-green-700">FREE</dd>
                                                        </div>}

                                                        <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                                            <dt className="text-sm font-medium text-c-gray-900">Total Price</dt>
                                                            <dd className="text-sm font-medium text-c-gray-900">₹ {cart.total_price}</dd>
                                                        </div>
                                                    </dl>
                                                    {couponcode ? <div className="px-2 pb-4 font-medium text-green-700">
                                                        You will save ₹ {parseInt(cart.cupon_discount)} on this order
                                                    </div> : null}

                                                </div>

                                            </section>


                                            <section className='rounded-lg drop-shadow-md bg-white lg:col-span-4 mt-2 pt-2' aria-labelledby="dilvery_address">
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
                                                                City
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    placeholder="Enter City"
                                                                    required
                                                                    name="city"
                                                                    value={formData.city}
                                                                    onChange={handleInputChange} />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">
                                                                State
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input py-2 px-2 rounded-md bg-gray-800/10"
                                                                    placeholder="Enter State"
                                                                    required
                                                                    name="state"
                                                                    value={formData.state}
                                                                    onChange={handleInputChange} />
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
                                                        checked
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
                                                    {/* <input
                                                        id="payment-type"
                                                        name="payment-type"
                                                        type="radio"
                                                        defaultChecked
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <div className="mr-2">
                                                        <label
                                                            htmlFor="payment-type"
                                                            className="text-sm font-semibold text-gray-900"
                                                        >
                                                            Credit Card
                                                        </label>
                                                    </div> */}
                                                </div>
                                            </div>
                                            {/* 
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Address
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                placeholder='Enter Address'
                                                                onChange={handleChange}
                                                                name="address"
                                                                autoComplete="street-address"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="city"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            City
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="city"
                                                                placeholder='Enter city'
                                                                onChange={handleChange}
                                                                name="city"
                                                                autoComplete="address-level2"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="state"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            State / Province
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="state"
                                                                placeholder='Enter state'
                                                                onChange={handleChange}
                                                                name="state"
                                                                autoComplete="address-level1"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="pincode"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Postal code
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="pincode"
                                                                placeholder='Enter pincode'
                                                                onChange={handleChange}
                                                                name="pincode"
                                                                autoComplete="pincode"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>

                                                <div className="mt-6 flex items-center">
                                                    <input
                                                        id="same-as-shipping"
                                                        name="same-as-shipping"
                                                        type="checkbox"
                                                        defaultChecked
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <div className="ml-2">
                                                        <label
                                                            htmlFor="same-as-shipping"
                                                            className="text-sm font-medium text-gray-900"
                                                        >
                                                            Same as shipping information
                                                        </label>
                                                    </div>
                                                </div>
                                            </div> */}



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
