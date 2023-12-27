import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import { GEGreen1 } from '../../assets/images/men';
import { AuthContext } from '../../context/AuthProvider';

const OrderDetail = () => {

    const navigate = useNavigate();

    const handleTracking = () => {
        navigate('/profile/track-order');
    }
    const handleInvoice = () => {
        navigate('/profile/invoice');
    }

    const [order,setorder] = useState({})

    const {id} = useParams()

    const handleFindOrder = () => {
        const order = profiledata.orders.filter((order) => order.id === id)
        console.log(order[0])
        setorder(order[0])
    }

    const {profiledata,fetchProfileData} = React.useContext(AuthContext)
    React.useEffect(() => {
        fetchProfileData()
        if(profiledata.orders){
            handleFindOrder()
        }
    }, [])
    
    
    return (
        <>

            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #13432</h1>
                    <p className="text-base  font-medium leading-6 text-gray-600">21st Dec 2023 at 10:34 PM</p>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start shadow bg-white rounded-lg border px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Your Cart</p>
                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full hidden md:block" src={GEGreen1} alt="dress" />
                                    <img className="w-full md:hidden" src={GEGreen1} alt="dress" />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">Oxford Casual Shirts - Sage Green</h3>
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-sm  leading-none text-gray-800"><span className="text-gray-400 ">Style: </span>Casual Shirts</p>
                                            <p className="text-sm  leading-none text-gray-800"><span className="text-gray-400 ">Size: </span> 2</p>
                                            <p className="text-sm  leading-none text-gray-800"><span className="text-gray-400 ">Color: </span> Sage Green</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base  xl:text-lg leading-6">Rs. 1790.00 <span className="text-red-300 line-through"> Rs. 1999.00</span></p>
                                        <p className="text-base  xl:text-lg leading-6 text-gray-800">01</p>
                                        <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">Rs. 1790.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 border rounded-xl space-y-6">
                                <h3 className="text-xl  font-semibold leading-5 text-gray-800">Summary</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                        <p className="text-base  leading-4 text-gray-800">Subtotal</p>
                                        <p className="text-base  leading-4 text-gray-600">Rs. 1790.00</p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base  leading-4 text-gray-800">Discount <span className="bg-gray-200 p-1 text-xs font-medium text-gray-800">STUDENT</span></p>
                                        <p className="text-base  leading-4 text-gray-600">-Rs. 80.00</p>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-base  leading-4 text-gray-800">Shipping</p>
                                        <p className="text-base text-gray-800 leading-4">Rs. 41</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <h3 className="text-xl  font-semibold leading-5 text-gray-800">Total</h3>
                                    <p className="text-xl  font-semibold leading-5 text-gray-600">Rs. 1751</p>
                                </div>
                                <button onClick={handleTracking} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-2 text-base font-semibold text-white shadow-md hover:opacity-80 transition duration-300">Track your Order</button>
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