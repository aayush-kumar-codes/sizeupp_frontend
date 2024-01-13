import React, { useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
// import { Helmet } from 'react-helmet'

const CancellReturnForm = () => {

    const [order, setorder] = useState({})
    const { profiledata, setProfileData } = React.useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate();


    const [formdata, setformdata] = useState({
        id: id,
        products: [],
        issue: '',
        feedback: ''

    })


    console.log(formdata)

    const [loading, setloading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        if (formdata.issue === '' && formdata.feedback === '') {
            Swal.fire({
                icon: 'error',
                title: 'Cancel/Return Failed',
                text: 'Please fill all the fields!',
                showConfirmButton: false,
                timer: 1500
            })
            setloading(false)
            return
        }
        if (formdata.products.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Please select atleast one product',
                showConfirmButton: false,
                timer: 1500
            })
            setloading(false)
            return
        }
        try {

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/return-product`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.token}`
                },
                body: JSON.stringify(formdata)
            })
            const data = await response.json()
            console.log(data)
            Swal.fire({
                icon: 'success',
                title: 'Cancel/Return Successful',
                text: 'Your request has been submitted successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setloading(false)
            navigate('/profile/my-orders')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Cancel/Return Failed',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            })
            setloading(false)
        }
    }

    const fetchProfileData = async (id) => {
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
                const order = data.orders.filter((order) => order.id === id)
                console.log(order[0])
                setorder(order[0])
            }
        } catch (error) {
            console.log(error)

        }
    }



    const toggleCheckbox = (productId) => {
        setformdata((prevFormData) => {
            const isSelected = prevFormData.products.some((product) => product.id === productId);

            if (isSelected) {
                // If the product is already selected, remove it
                const updatedProducts = prevFormData.products.filter((product) => product.id !== productId);

                return {
                    ...prevFormData,
                    products: updatedProducts
                };
            } else {
                // If the product is not selected, add the entire product object
                const selectedProduct = order.order_items.find((item) => item.product.id === productId);

                return {
                    ...prevFormData,
                    products: [...prevFormData.products, selectedProduct.product]
                };
            }
        });
    };


    React.useEffect(() => {
        if (id) {
            fetchProfileData(id)
        }
    }, [id])

    return (
        <>
            {/* <Helmet>
                <title>Cancel/Return | Sizeupp</title>
                <meta name="description" content="Fill out the Sizeupp Cancel/Return Form to initiate the cancellation or return process. Our team will guide you through the steps for a hassle-free experience." />
                <meta name="keywords" content="Order cancellation, return form, Sizeupp cancelation, return process, cancellation request" />
        </Helmet> */}
            <div className='w-full text-center text-xl my-8'>
                <h1>Cancel Return Form</h1>
                <p className='text-xs text-gray-500'>Please check <a href="/cancellation-policy" className='text-blue-400'>cancellation</a> and <a href="/return-policy" className='text-blue-400'>return</a> policies before submitting form</p>

            </div>

            <form onSubmit={handleSubmit}>

                <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-auto  w-10/12 md:w-3/5">
                    <div className="sm:col-span-3">
                        <label htmlFor="orderid" className="block text-lg font-medium leading-6 text-gray-900">Order Id</label>
                        <div className="mt-2">
                            <input type="text" name="order-id" value={order.id || ''} className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" disabled />
                        </div>
                    </div>
                    {/*  select option*/}
                    {/* Feedback dropdown */}
                    {order.delivery_status == "Delivered" && <div className="col-span-full">
                        <label htmlFor="items" className="block text-lg font-medium leading-6 text-gray-900">Products</label>
                        <div className="mt-2">
                        </div>
                        <div className="grid grid-cols-1 justify-center items-center mb-4">
                            {order.order_items?.length > 0 && order.order_items?.map((item, i) => {
                                {
                                    let info = item.product

                                    return (
                                        <div key={i} className={`grid gap-2 py-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 `}>

                                            <div className='flex col-span-1 justify-center items-center'>
                                                <img
                                                    onClick={() => { navigate(`/products/${info?.id}`) }}
                                                    src={import.meta.env.VITE_SERVER_URL + (info.images[0]?.img + "").slice(6)}
                                                    alt={info?.name}
                                                    className="sm:h-38 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                                                />
                                            </div>
                                            <div className='col-span-2 md:col-span-3'>
                                                <div className='grid grid-cols-3 md:grid-cols-4 gap-2 justify-center items-center'>
                                                    <h3 className="text-base sm:text-sm col-span-3 md:col-span-4 mx-4 font-semibold">
                                                        <Link to={`/products/${info?.id}`} className="text-black">
                                                            {info.name}
                                                        </Link>
                                                    </h3>

                                                    {/* Sizes */}
                                                    {
                                                        info?.sqp.map((size, index) => {
                                                            if (item.sqp_code != size.id) {
                                                                return null
                                                            }
                                                            return (
                                                                <div key={index} className="mt-2 col-span-1 flex justify-center items-center">
                                                                    <p className="text-c-gray-500 mb-2"> Size: {size.size}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                    {/* Quantity */}
                                                    <div className='col-span-1 flex justify-center items-center'>
                                                        <div className=''>Qty: {(item?.quantity)}</div>
                                                    </div>

                                                    {/* Total Price */}
                                                    <div className='col-span-1 flex justify-center items-center'>
                                                        <div className=''>₹ {(item?.sub_total)}</div>
                                                    </div>



                                                    <div className='flex justify-center items-center col-span-1'>
                                                        <button onClick={() => toggleCheckbox(info.id)} type="button" className="text-md p-2 bg-red-600 text-white rounded-md">{formdata.products.some((product) => product.id === info.id) ? "Remove" : "Select"}</button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <p className="mt-3 text-md leading-6 text-gray-600">Select Order item to return</p>
                    </div>}
                    <div className="col-span-full">
                        <label htmlFor="issue" className="block text-lg font-medium leading-6 text-gray-900">Issue</label>
                        <div className="mt-2">
                            <textarea id="about" onChange={(e) => { setformdata({ ...formdata, issue: e.target.value }) }} name="about" rows="3" className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Any issues.</p>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="issue" className="block text-lg font-medium leading-6 text-gray-900">Feedback</label>
                        <div className="mt-2">
                            <textarea id="about" name="about" onChange={(e) => { setformdata({ ...formdata, feedback: e.target.value }) }} rows="3" className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a feedback.</p>
                    </div>

                    <div className="col-span-full">
                        {order.delivery_status != "Delivered" && <button disabled={loading} type="submit" className='text-md p-2 bg-blue-600 text-white rounded-md'>{loading ? "Cancelling Order" : "Cancel Order"}</button>}
                        {order.delivery_status === "Delivered" && <button disabled={loading} type="submit" className='text-md p-2 bg-blue-600 text-white rounded-md'>{loading ? "Returning Order" : "Return Order"}</button>}

                    </div>

                </section>
            </form>


        </>
    )
}

export default CancellReturnForm