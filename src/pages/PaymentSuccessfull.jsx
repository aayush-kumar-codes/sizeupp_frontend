import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


const PaymentSuccessfull = () => {
    return (
        <>
            <section className="flex items-center h-screen bg-white font-[poppins]  ">
                <div className="justify-center flex-1 px-6 py-16 mx-auto lg:py-16 md:px-7">
                    <div
                        className="max-w-xl p-8 mx-auto border shadow rounded-lg bg-gradient-to-r from-blue-50 to-gray-50 ">
                        <p className="mb-8 text-lg font-medium text-gray-700 ">Order Number: #09182762611</p>
                        <div className="flex flex-wrap mb-6 w-full justify-center">
                            <div className="p-6 rounded-full bg-green-400 ">
                                <CheckIcon className="h-10 w-10 text-white" />

                            </div>
                        </div>
                        <h2 className="mb-4 text-4xl font-extrabold tracking-wide da">Thank you for your order !
                        </h2>
                        <p className="mb-6 text-lg font-medium text-gray-500 ">
                            Your order will be delivered within 7 days
                        </p>
                        <Link to="/profile/track-order" className="text-blue-500 hover:underline hover:text-blue-700">
                            View Order
                        </Link>
                    </div>
                </div>
            </section>

        </>
    );
};

export default PaymentSuccessfull;