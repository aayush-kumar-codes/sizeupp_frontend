import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GEGreen1, Maroon1, Navy1 } from '../../assets/images/men';
import {Helmet} from 'react-helmet'
import { AuthContext } from '../../context/AuthProvider';


const DeliveryHistoryTable = () => {
    const navigate = useNavigate();
    const deliveryHistoryData = [
        {
            id: 1,
            image: GEGreen1,
            orderName: 'Order #12345',
            date: '2023-12-19',
            total: 'Rs. 1790.00',
            status: 'Delivered',
        },
        {
            id: 2,
            image: Maroon1,
            orderName: 'Order #67890',
            date: '2023-12-20',
            total: 'Rs 1999.00',
            status: 'Progress',
        },
        {
            id: 3,
            image: Navy1,
            orderName: 'Order #34567',
            date: '2023-12-20',
            total: 'Rs 1790.00',
            status: 'Shipped',
        },
        {
            id: 4,
            image: GEGreen1,
            orderName: 'Order #89012',
            date: '2023-12-21',
            total: 'Rs 1890.00',
            status: 'Cancelled',
        }
        // Add more delivery history data as needed
    ];

    const getStatusBadge = (status, id) => {
        let colorClass = '';
        switch (status.toLowerCase()) {
            case 'delivered':
                colorClass = 'green';
                break;
            case 'Order Processing':
                colorClass = 'blue';
                break;
            case 'cancelled':
                colorClass = 'red';
                break;
            case 'shipped':
                colorClass = 'yellow';
                break;
            default:
                colorClass = 'gray';
        }
        const handletrack = () => {
            navigate('/profile/track-order/' + id)
        }
        return (
            <div onClick={handletrack} className={`border border-${colorClass}-500 px-2 py-1 text-${colorClass}-500 rounded-full text-md cursor-pointer`}>
                {status}
            </div>
        );
    };


    const { profiledata, fetchProfileData } = React.useContext(AuthContext)

    React.useEffect(() => {
        fetchProfileData()
    }, [])


    console.log(profiledata)
    return (
        <>
            <Helmet>
                <title>Order History | SizeUpp</title>
                <meta name="description" content="Access your complete order history with Sizeupp. Track past purchases, view details, and stay organized with our convenient Order History feature." />
                <meta name="keywords" content=" Sizeupp order history, past purchases, track orders, order tracking, purchase history" />
            </Helmet>
            <div>
                <h1 className="font-semibold text-xl p-4">Order History List</h1>
                <div className="overflow-x-auto mx-4 rounded-lg hidden lg:block">
                    <div className="w-fit bg-white border rounded-lg mx-auto">
                        <thead className="h-16 bg-neutral-100">
                            <tr>
                                <th className="px-6 py-3 text-left">Order Id</th>
                                <th className="px-6 py-3 text-left">Products</th>
                                <th className="px-6 py-3 text-left">Price</th>
                                <th className="px-6 py-3 text-left">Payment</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">ACTION</th>
                                <th className="px-6 py-3 text-left">Cancel / Reurn</th>


                            </tr>
                        </thead>
                        <tbody>
                            {profiledata.orders?.length > 0 && profiledata.orders.map((item) => (
                                <tr key={item.id} className="border-b-gray-500">
                                    <td className="px-6 py-4 ">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4">{item.order_items?.length || 0}</td>
                                    <td className="px-6 py-4">{item.mrp_price || 0}</td>
                                    <td className="px-6 py-4">{(item.payment_status + ' (' + item.payment_type + ')') || "Ship deight"}</td>
                                    <td className="px-6 py-4 text-center">{getStatusBadge(item.delivery_status, item.id)}</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/profile/order-details/${item.id}`}>
                                            <button className="text-blue-500 text-md hover:scale-110 hover:text-blue-800 ease-in-out">View</button>
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4">
                                        {
                                            (item.order_return || item.order_cancel) ?
                                                <div className='text-md bg-black text-white p-2 px-3 hover:scale-105 rounded-md'>{item.order_cancel ? 'Cancelled Order' : 'Returning Order'}</div>

                                                :
                                                <Link to={`/profile/cancel-return/${item.id}`}>
                                                    <button className="text-md bg-black text-white p-2 px-3 hover:scale-105 rounded-md">Cancel / Return</button>
                                                </Link>
                                        }
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </div>
                </div>

                {/* Mobile view */}
                <section className="container mx-auto my-3 flex flex-col gap-3 p-4 md:hidden">
                    {/* Order Cards */}
                    {profiledata.orders?.length > 0 && profiledata.orders?.map((order) => (
                        <div key={order.id} className="flex w-full border px-4 py-4 rounded-lg">
                            <div className="ml-3 flex w-full flex-col justify-center">
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-bold">{order.id}</p>
                                    <div className={`border px-2 py-1 rounded ${order.status === 'Delivered' ? 'border-green-500 text-green-500' : order.status === 'Order Processing' ? 'border-orange-500 text-orange-500' : order.status === 'Cancelled' ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-500'}`}>
                                        {order.delivery_status}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">{(order.payment_status + ' (' + order.payment_type + ')') || "Ship deight"}</p>
                                <p className="py-3 text-xl font-bold text-violet-900">Rs. {order.mrp_price || 0}</p>
                                <div className="mt-2 flex w-full items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <Link to={`/profile/order-details/${order.id}`} className="flex items-center justify-center bg-amber-500 px-2 py-2 active:ring-gray-500 rounded cursor-pointer">
                                            View order
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

            </div>
        </>
    );
};

const OrderHistory = () => {
    return (
        <>


            {/* <!-- /Mobile order table  --> */}

            {/* <!-- Order table  --> */}
            <DeliveryHistoryTable />

        </>
    )
}

export default OrderHistory