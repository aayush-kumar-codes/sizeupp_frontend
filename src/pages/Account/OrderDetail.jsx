import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import {Helmet} from 'react-helmet'
import { AuthContext } from '../../context/AuthProvider';

const OrderDetail = () => {

    const navigate = useNavigate();

    const handleTracking = () => {
        navigate('/profile/track-order/' + id);
    }
    const handleInvoice = () => {
        window.location.href = "https://dashboard.sizeupp.com/invoice/" + id
    }

    const [order, setorder] = useState({})

    const { id } = useParams()

    const handleFindOrder = () => {
        const order = profiledata.orders.filter((order) => order.id === id)
        setorder(order[0])
    }

    const { profiledata, fetchProfileData } = React.useContext(AuthContext)
    console.log(profiledata.orders)

    React.useEffect(() => {

        fetchProfileData()
        if (profiledata.orders) {
            handleFindOrder()
        }
        else {
            navigate(-1);
        }
    }, [])

    const formattedDate = (dateString) => new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    }).format(new Date(dateString));

    console.log(order);
    // console.log(formattedDate('2023-12-27T16:53:27.661136Z'))

    return (
        <>

            {/* <Helmet>
                <title>Order Detail | Sizeupp</title>
                <meta name="description" content="Get comprehensive details about your Sizeupp orders. Review product specifics, pricing, and shipment information in the Order Details section" />
                <meta name="keywords" content="Sizeupp order details, order information, product specifics, pricing details, shipment information" />

        </Helmet> */}

            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order # {order.id || ''}</h1>
                    <p className="text-base  font-medium leading-6 text-gray-600">{order.created_at || ''}</p>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start shadow bg-white rounded-lg border px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Your Orders</p>
                            {order.order_items?.length > 0 && order.order_items?.map((item) => (
                                <div key={item.id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                    <div className="pb-4 md:pb-8 w-full md:w-40">
                                        <img className="w-full hidden md:block" src={item.product.images[0].img.includes("/media/media") ? import.meta.env.VITE_SERVER_URL + (item.product.images[0].img + "").slice(6) : import.meta.env.VITE_SERVER_URL + (item.product.images[0].img + "")} alt="dress" />
                                        <img className="w-full md:hidden" src={item.product.images[0].img.includes("/media/media") ? import.meta.env.VITE_SERVER_URL + (item.product.images[0].img).slice(6) : import.meta.env.VITE_SERVER_URL + (item.product.images[0].img + "")} alt="dress" />
                                    </div>
                                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">{item.product.name || ''}</h3>
                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-sm  leading-none text-gray-800"><span className="text-gray-400 ">Style: </span>{item.product.subsubcategory.name || ''}</p>
                                                <p className="text-sm  leading-none text-gray-800"><span className="text-gray-400 ">Size: </span> {item.size || ''}</p>
                                                <p className="text-sm  leading-none text-gray-800"><span className="text-gray-400 ">Color: </span> {item.color || ''}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start w-full">
                                            <p className="text-base  xl:text-lg leading-6">Rs. {item.mrp || 0} </p>
                                            <p className="text-base  xl:text-lg leading-6 text-gray-800">{item.quantity}</p>
                                            <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">Rs. {item.sub_total || 0} </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 border rounded-xl space-y-6">
                                <h3 className="text-xl  font-semibold leading-5 text-gray-800">Summary</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                        <p className="text-base  leading-4 text-gray-800">Subtotal</p>
                                        <p className="text-base  leading-4 text-gray-600">Rs. {order.sub_total}</p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base  leading-4 text-gray-800">Discount </p>
                                        <p className="text-base  leading-4 text-gray-600">-Rs. {order.discount_percentage == null ? 0 : order.discount_percentage}</p>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-base  leading-4 text-gray-800">Shipping</p>
                                        <p className="text-base text-gray-800 leading-4">Rs. {order.deliveryCharges == null ? 0 : order.deliveryCharges}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <h3 className="text-xl  font-semibold leading-5 text-gray-800">Total</h3>
                                    <p className="text-xl  font-semibold leading-5 text-gray-600">Rs. {order.payment_amount}</p>
                                </div>
                                <button onClick={handleTracking} className="w-full bg-black py-2 text-base font-semibold text-white shadow-md hover:opacity-80 transition duration-300">Track your Order</button>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-4 ">
                            <button
                                className="w-full px-6 py-3 text-yellow-500 border border-yellow-500 rounded-md md:w-auto hover:text-gray-100 hover:bg-yellow-600   ">
                                Go back shopping
                            </button>

                            <button onClick={handleInvoice}
                                className="w-full px-6 py-3  bg-yellow-500 rounded-md md:w-auto hover:scale-105 hover:text-white">
                                Download Invoice
                            </button>


                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default OrderDetail