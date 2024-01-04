import React, { useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';


const TrackOrderPage = () => {

    const [order, setorder] = useState({})
    const { profiledata, setProfileData } = React.useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate();

    const handleFindOrder = () => {
        const order = profiledata.orders.filter((order) => order.id === id)
        console.log(order[0])
        setorder(order[0])
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

    React.useEffect(() => {
        if (id) {
            fetchProfileData(id)
        }
    }, [id])

    const Status = [
        'Order Processing',
        'In Packed',
        'Shipped',
        'In-Transit',
        'Delivered',

    ]

    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Track Your Order</h1>
            </div>

            <div className="bg-white shadow-md rounded-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Order Status</h2>


                <div className=" flex-wrap items-center hidden md:flex">
                    {/* <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0">
                        <div className="absolute hidden top-5 lg:block left-1/2 ">
                            <span
                                className="mb-3 border-b-2 border-r border-blue-600 w-72 md:block left-1/2  inset-px">
                            </span>
                        </div>
                        <div className="relative text-center">
                            <span
                                className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-100 bg-blue-600 rounded-full shadow-md ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="w-6 h-6 bi bi-check-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg>
                            </span>
                            <h2 className="text-lg font-medium  ">Order Processing</h2>
                            <span className="text-sm">{Date(order.created_at).slice(0,16)}</span>
                        </div>
                    </div> */}
                    {Status.map((item, index) => {
                        console.log()
                        return (

                            <div key={index} className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/5 lg:mb-0">
                                <div className="absolute hidden top-5 lg:block left-1/2 ">

                                </div>
                                <section className="relative text-center">
                                    {
                                        <span
                                            className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-100 bg-blue-600 rounded-full shadow-md ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-6 h-6 bi bi-check-lg" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                            </svg>

                                            <span
                                                className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-700 bg-gray-200 rounded-full shadow-md  ">
                                                {index + 1}
                                            </span>
                                        </span>
                                    }

                                    <h2 className="text-lg font-medium ">{item}</h2>
                                    <span className="text-sm"> {order.delivery_status == item ? Date(order.created_at).slice(0, 16) : 'pending'}</span>

                                </section>
                            </div>
                        )
                    })
                    }

                </div>
                <div className="w-full max-w-3xl mx-auto md:hidden block">

                    {/* <!-- Vertical Timeline #2 --> */}
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                        {/* <!-- Item #1 --> */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            {/* <!-- Icon --> */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                                    <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                                </svg>
                            </div>
                            {/* <!-- Card --> */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Order Placed</div>
                                    <time className="font-caveat font-medium text-indigo-500">{Date(order.created_at)}</time>
                                </div>
                                <div className="text-slate-500">Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.</div>
                            </div>
                        </div>

                        {/* <!-- Item #2 --> */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            {/* <!-- Icon --> */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                                    <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                                </svg>
                            </div>
                            {/* <!-- Card --> */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Order Shipped</div>
                                    <time className="font-caveat font-medium text-indigo-500">09/06/2023</time>
                                </div>
                                <div className="text-slate-500">Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.</div>
                            </div>
                        </div>

                        {/* <!-- Item #3 --> */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            {/* <!-- Icon --> */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                                    <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                                </svg>
                            </div>
                            {/* <!-- Card --> */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">In Transit</div>
                                    <time className="font-caveat font-medium text-indigo-500">10/06/2023</time>
                                </div>
                                <div className="text-slate-500">Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.</div>
                            </div>
                        </div>

                        {/* <!-- Item #4 --> */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            {/* <!-- Icon --> */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                                    <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                                </svg>
                            </div>
                            {/* <!-- Card --> */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Out of Delivery</div>
                                    <time className="font-caveat font-medium text-indigo-500">12/06/2023</time>
                                </div>
                                <div className="text-slate-500">Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.</div>
                            </div>
                        </div>

                        {/* <!-- Item #5 --> */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            {/* <!-- Icon --> */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                                    <path d="M12 10v2H7V8.496a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H0V4.496a.5.5 0 0 1 .206-.4l5.5-4a.5.5 0 0 1 .588 0l5.5 4a.5.5 0 0 1 .206.4V10Z" />
                                </svg>
                            </div>
                            {/* <!-- Card --> */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Delivered</div>
                                    <time className="font-caveat font-medium text-amber-500">Exp. 12/08/2023</time>
                                </div>
                                <div className="text-slate-500">Pretium lectus quam id leo. Urna et pharetra aliquam vestibulum morbi blandit cursus risus.</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-md p-6">
                <div className="max-w-4xl mx-auto mb-10">
                    <h2 className="mb-4 text-xl font-medium ">What you ordered:</h2>

                    {order.order_items?.length > 0 && order.order_items?.map((item) => (
                        <div key={item.id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full hidden md:block" src={import.meta.env.VITE_SERVER_URL + (item.product.images[0].img).slice(6)} alt="dress" />
                                <img className="w-full md:hidden" src={import.meta.env.VITE_SERVER_URL + (item.product.images[0].img).slice(6)} alt="dress" />
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
                                    <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">Rs. {item.mrp || 0} </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="max-w-4xl mx-auto ">
                    <h2 className="mb-4 text-xl font-medium  ">Order Details:</h2>
                    <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3">
                        <div
                            className="flex items-center justify-between px-10 py-3 border font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow   font-heading">
                            <span>Shipping</span>
                            <span className="flex items-center">
                                <span className="ml-3 mr-1 text-sm">Rs.</span>
                                <span className="text-xl">0 </span>
                            </span>
                        </div>
                        <div
                            className="relative flex items-center justify-between border px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow  ">
                            <div
                                className="absolute right-0 flex items-center justify-center bg-gray-800 rounded-md w-14 h-14 ">
                                <div
                                    className="flex items-center justify-center text-lg font-bold bg-gray-100 rounded-full   w-11 h-11">
                                    {order.order_items?.length}</div>
                            </div>
                            <span className="mr-16">Products</span>
                        </div>
                        <div
                            className="flex items-center justify-between border px-10 py-3 font-medium leading-8 bg-white rounded-md shadow   font-heading">
                            <span>Total</span>
                            <span className="flex items-center  ">
                                <span className="ml-3 mr-1 text-sm">Rs.</span>
                                <span className="text-xl">{order.payment_amount}</span>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};




const TrackOrder = () => {
    return (
        <>
            <TrackOrderPage />


        </>
    )
}

export default TrackOrder