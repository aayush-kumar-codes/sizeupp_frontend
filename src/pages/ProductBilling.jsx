
import { Link, useNavigate } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { styles } from '../style'
import { useEffect, useState } from 'react'
import { GEGreen1, Maroon1, Wine1 } from '../assets/images/men'
import Swal from 'sweetalert2'

const products = [
    {
        id: 1,
        name: 'Oxford Casual Shirts - Sage Green',
        href: '#',
        price: '₹2,199',
        originalPrice: '₹2,900',
        discount: '5% Off',
        color: 'Sage Green',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        imageSrc: GEGreen1
    },
    {
        id: 2,
        name: 'Oxford Casual Shirts - Maroon',
        href: '#',
        price: '₹1,549',
        originalPrice: '₹2,499',
        discount: '38% off',
        color: 'Maroon',
        leadTime: '3-4 weeks',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        imageSrc: Maroon1
    },
    {
        id: 3,
        name: 'Oxford Casual Shirts - Wine',
        href: '#',
        price: '₹2,219 ',
        originalPrice: '₹2999',
        discount: '78% off',
        color: 'Wine',
        imageSrc: Wine1
    },
]

export function ProductBilling() {
    const [cart, setCart] = useState([])
    const [qtyCart, setQtyCart] = useState([])
    const [profile, setProfile] = useState({})
    const [applyCoupon, setApplyCoupon] = useState("")
    const [pincode, setPincode] = useState('')
    const [changeAddress, setChangeAddress] = useState(false)

    const [formData, setFormData] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const navigate = useNavigate()

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
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            console.log({
                address: profile.addresses[0].id,
                sub_total: cart.sub_total,
                coupon: 'H1234',
                sub_sub_total: cart.sub_sub_total || 0,
                deliverycharges: cart.delivery_charges,
                total_price: cart.total_price,
                discount_percentage: 0,
                discount_amount: 0,
                mrp_price: cart.mrp_price,
                discount_on_price: cart.discout_on_price,
                tax: 0,
                payment_type: 'PPD'
            })
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/order", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    address: profile.addresses[0].id,
                    sub_total: cart.sub_total,
                    coupon: applyCoupon,
                    sub_sub_total: cart.sub_sub_total || 0,
                    deliverycharges: cart.delivery_charges,
                    total_price: cart.total_price,
                    discount_percentage: 0,
                    discount_amount: 0,
                    mrp_price: cart.mrp_price,
                    discount_on_price: cart.discout_on_price,
                    tax: 0,
                    payment_type: 'PPD'
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: 'Order Placed Successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/products/billing')
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

    useEffect(() => {
        fetchCart()
    }, [])

    const [form, setForm] = useState({
        address: '',
        grand_total: 0,
        sub_total: 0,
        sub_sub_total: 0,
        coupon: '',
        discount: 0,
        discount_amount: 0,
        tax: 0,
        payment_type: 'COD',
        deliverycharges: 0
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
                confirmButtonText: 'OK'
            });
        }
    }

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className={`${styles.padding} mx-10 my-6`}>
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
            <div className="overflow-hidden  rounded-xl shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Product List */}
                    <section aria-labelledby="cart-heading" className="rounded-lg px-2 py-4 bg-white md:mt-10">


                        {cart.products?.length > 0 ? cart.products?.map((product, i) => {
                            let info = product.cart
                            return (
                                <div key={i} className='grid gap-2 py-4 drop-shadow-md lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
                                    <div className='col-span-1'>
                                        <img
                                            src={import.meta.env.VITE_SERVER_URL + info.product?.img}
                                            alt={info.product?.name}
                                            className="sm:h-38 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <div className='flex flex-col'>
                                            <h3 className="text-base font-semibold">
                                                <Link to={`/products/${info.product?.id}`} className="text-black">
                                                    {info.product.name}
                                                </Link>
                                            </h3>
                                            {
                                                info.product?.sqp.map((size, index) => {
                                                    if (info.size_quantity_price != size.id) {
                                                        return null
                                                    }
                                                    return (
                                                        <div key={index} className="mt-2 text-sm">
                                                            <p className="text-sm text-c-gray-500 mb-2"> Size: {size.size}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="mt-1 flex items-end">
                                                <p className="text-sm font-medium text-c-gray-900">
                                                    ₹ {info?.discount_price}
                                                </p>
                                                <p className="text-sm ml-2 font-medium text-c-gray-500 line-through">
                                                    ₹ {info?.price}
                                                </p>
                                                <p className="text-sm ml-2 font-medium text-green-500">{info?.discount_percentage}%</p>
                                            </div>
                                            <div className={`${i == 2 ? 'text-red-600' : 'text-green-600'} font-normal text-base py-2`}>
                                                {i == 2 ? "Out of Stock" : "In Stock"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex justify-center items-center'>

                                        <input
                                            type="text"
                                            className="mx-1 h-7 w-9 rounded-md border text-center"
                                            defaultValue={0}
                                        />
                                    </div>
                                    <div className='col-span-1 flex justify-center items-center'>
                                        <div className=''>₹ {parseInt(info.total_price)}</div>
                                    </div>

                                </div>
                            )
                        }) : <div className="ml-4 md:ml-10 text-base bg-red-300 px-8 py-4 w-fit rounded-lg">Cart Empty.</div>}

                    </section>



                    {/* Contact Info */}
                    <div className="px-5 py-6 text-gray-900 md:px-8">
                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="py-6">
                                    <form>
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">

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
                                                            <dd className="text-sm font-medium text-green-700">- ₹ {cart.sub_sub_total ? parseInt(cart.sub_total - cart.sub_sub_total) : 0}</dd>
                                                        </div>
                                                        <div className="flex items-center justify-between pt-4">
                                                            <dt className="flex items-center text-sm text-c-gray-800">
                                                                <span>Discount MRP</span>
                                                            </dt>
                                                            <dd className="text-sm font-medium text-green-700">- ₹ {cart.discount_on_price || 0}</dd>
                                                        </div>

                                                        <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                                            <dt className="text-sm font-medium text-c-gray-900">Sub Total</dt>
                                                            <dd className="text-sm font-medium text-c-gray-900">₹ {cart.coupon == 'active' ? cart.sub_sub_total : cart.sub_total}</dd>
                                                        </div>
                                                        {cart.delivery_charges && <div className="flex items-center justify-between py-4">
                                                            <dt className="flex text-sm text-c-gray-800">
                                                                <span>Delivery Charges</span>
                                                            </dt>
                                                            <dd className="text-sm font-medium text-red-700">+ ₹ {cart.delivery_charges}</dd>
                                                        </div>}

                                                        <div className="flex items-center justify-between border-b border-dashed py-4 ">
                                                            <dt className="text-sm font-medium text-c-gray-900">Total Price</dt>
                                                            <dd className="text-sm font-medium text-c-gray-900">₹ {cart.total_price}</dd>
                                                        </div>
                                                    </dl>
                                                    {cart.sub_sub_total ? <div className="px-2 pb-4 font-medium text-green-700">
                                                        You will save ₹ {parseInt(cart.sub_total - cart.sub_sub_total)} on this order
                                                    </div> : null}

                                                </div>

                                            </section>


                                            <section className='rounded-lg drop-shadow-md bg-white lg:col-span-4 mt-2 pt-2' aria-labelledby="dilvery_address">
                                                {profile.addresses?.length > 0 && changeAddress === false ?
                                                    <div className="py-6 px-6  rounded-md border-b-gray-500 shadow-md mt-2">
                                                        <h2
                                                            id="delivery-heading"
                                                            className=" border-b border-c-gray-200 px-4 py-3 text-lg font-medium text-c-gray-900 sm:p-4"
                                                        >
                                                            Delivery And Services
                                                        </h2>
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
                                                            className="inline-flex w-1/4 my-4 items-center justify-center rounded-md bg-black px-3 py-1 text-sm font-semibold leading-7 text-white hover:bg-black/80"
                                                        >
                                                            Change Address
                                                        </button>
                                                    </div>

                                                    :
                                                    <div className="px-4 mt-2 rounded-md border-b-gray-500 shadow-md">
                                                        <h2
                                                            id="delivery-heading"
                                                            className=" border-b border-c-gray-200 px-4 py-3 text-lg font-medium text-c-gray-900 sm:p-4"
                                                        >
                                                            Delivery And Services
                                                        </h2>
                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm  text-c-gray-900">
                                                                Address Line 1
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input
                                                                    type="text"
                                                                    className="form-input border rounded-md px-2 py-1"
                                                                    placeholder="Enter Address Line 1"
                                                                    required
                                                                    name="addressLine1"
                                                                    defaultValue={formData.addressLine1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm  text-c-gray-900">
                                                                Address Line 2
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input border rounded-md px-2 py-1"
                                                                    placeholder="Enter Address Line 2"
                                                                    name="addressLine2"
                                                                    defaultValue={formData.addressLine2}
                                                                    onChange={handleInputChange} />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm  text-c-gray-900">
                                                                City
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input border rounded-md px-2 py-1"
                                                                    placeholder="Enter City"
                                                                    required
                                                                    name="city"
                                                                    defaultValue={formData.city}
                                                                    onChange={handleInputChange} />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm  text-c-gray-900">
                                                                State
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input border rounded-md px-2 py-1"
                                                                    placeholder="Enter State"
                                                                    required
                                                                    name="state"
                                                                    defaultValue={formData.state}
                                                                    onChange={handleInputChange} />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm  text-c-gray-900">
                                                                Zip Code
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input border rounded-md px-2 py-1"
                                                                    placeholder="Enter Zip code"
                                                                    required
                                                                    name="zipCode"
                                                                    defaultValue={formData.zipCode}
                                                                    onChange={handleInputChange} />
                                                            </dd>
                                                        </div>

                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm  text-c-gray-900">
                                                                Country
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <input type="text"
                                                                    className="form-input border rounded-md px-2 py-1"
                                                                    placeholder="Enter country"
                                                                    required
                                                                    name="country"
                                                                    defaultValue={formData.country}
                                                                    onChange={handleInputChange} />
                                                            </dd>
                                                        </div>

                                                        {/* Include other fields similarly */}


                                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <button type="button" onClick={handleAddAddress} className="rounded-lg bg-blue-500 text-white px-4 py-2">
                                                                Save
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
                                                        defaultChecked
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
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="mt-10">
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
                                                    onClick={handlePlaceOrder}
                                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Make payment
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
