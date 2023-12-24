import React from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


const PaymentUnsuccess = () => {
  return (
      <>
       <section className="flex items-center h-screen bg-white font-[poppins]  ">
                <div className="justify-center flex-1 px-6 py-16 mx-auto lg:py-16 md:px-7">
                    <div
                        className="max-w-xl p-8 mx-auto border shadow rounded-lg bg-gradient-to-r from-blue-50 to-gray-50 ">
                        <p className="mb-8 text-lg font-medium text-gray-700 ">Transaction Failed: #09182762611</p>
                        <div className="flex flex-wrap mb-6 w-full justify-center">
                            <div className="p-6 rounded-full bg-red-400 ">
                            <XMarkIcon className="h-6 w-6 text-white" />


                            </div>
                        </div>
                        <h2 className="mb-4 text-4xl font-extrabold tracking-wide da">Order Unsuccessful
                        </h2>
                        <p className="mb-6 text-lg font-medium text-gray-500 ">
                            Please Try again
                        </p>
                        <Link to="/profile/cart" className="text-blue-500 hover:underline hover:text-blue-700">
                            Go back to cart
                        </Link>
                    </div>
                </div>
            </section>

      </>
  )
}

export default PaymentUnsuccess