import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

const DeliveryHistoryTable = () => {
  const navigate = useNavigate();
  const deliveryHistoryData = [
      {
          id: 1,
          image: 'https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          orderName: 'Order #12345',
          date: '2023-01-15',
          total: '$150.00',
          status: 'Delivered',
      },
      {
          id: 2,
          image: 'https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1s',
          orderName: 'Order #67890',
          date: '2023-02-20',
          total: '$200.00',
          status: 'Progress',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      orderName: 'Order #34567',
      date: '2023-03-10',
      total: '$120.00',
      status: 'Shipped',
  },
  {
      id: 4,
      image: 'https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      orderName: 'Order #89012',
      date: '2023-04-05',
      total: '$180.00',
      status: 'Cancelled',
  },
  {
      id: 5,
      image: 'https://images.pexels.com/photos/2577368/pexels-photo-2577368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      orderName: 'Order #56789',
      date: '2023-05-22',
      total: '$250.00',
      status: 'Delivered',
  },
      // Add more delivery history data as needed
  ];

  const getStatusBadge = (status) => {
    let colorClass = '';
    switch (status.toLowerCase()) {
        case 'delivered':
            colorClass = 'green';
            break;
        case 'progress':
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
      navigate('/profile/track-order')
    }
    return (
      <div onClick={handletrack} className={`border border-${colorClass}-500 px-2 py-1 text-${colorClass}-500 rounded-full text-md cursor-pointer`}>
          {status}
      </div>
  );
};



  return (
    <>
        <div className="overflow-x-auto mx-4 rounded-lg hidden lg:block">
            <div className="min-w-full bg-white  border rounded-lg">
                <thead className="h-16 bg-neutral-100">
                    <tr>
                        <th className="px-6 py-3 text-left">Product</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">DATE</th>
                        <th className="px-6 py-3 text-left">TOTAL</th>
                        <th className="px-6 py-3 text-left">STATUS</th>
                        <th className="px-6 py-3 text-left">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveryHistoryData.map((item) => (
                        <tr key={item.id} className="border-b-gray-500">
                            <td className="px-6 py-4 ">
                                <img
                                    src={item.image}
                                    alt={`Order #${item.id}`}
                                    className="w-60 object-cover rounded"
                                />
                            </td>
                            <td className="px-6 py-4">{item.orderName}</td>
                            <td className="px-6 py-4">{item.date}</td>
                            <td className="px-6 py-4">{item.total}</td>
                            <td className="px-6 py-4 text-center">{getStatusBadge(item.status)}</td>
                            <td className="px-6 py-4">
                              <Link to="/profile/order-details">
                                <button className="text-blue-500 text-md hover:scale-110 hover:text-blue-800 ease-in-out">View </button>
                              </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </div>
      </div>
      
      {/* Mobile view */}
        <section className="container mx-auto my-3 flex flex-col gap-3 p-4 md:hidden">
          {/* Order Cards */}
          {deliveryHistoryData.map((order) => (
              <div key={order.id} className="flex w-full border px-4 py-4 rounded-lg">
                  <div className="ml-3 flex w-full flex-col justify-center">
                      <div className="flex items-center justify-between">
                          <p className="text-xl font-bold">{order.orderName}</p>
                          <div className={`border px-2 py-1 rounded ${order.status === 'Delivered' ? 'border-green-500 text-green-500' : order.status === 'In Progress' ? 'border-orange-500 text-orange-500' : order.status === 'Cancelled' ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-500'}`}>
                              {order.status}
                          </div>
                      </div>
                      <p className="text-sm text-gray-400">{order.date}</p>
                      <p className="py-3 text-xl font-bold text-violet-900">{order.total}</p>
                      <div className="mt-2 flex w-full items-center justify-between">
                          <div className="flex items-center justify-center">
                              <a href={`order-overview.html?id=${order.id}`} className="flex items-center justify-center bg-amber-500 px-2 py-2 active:ring-gray-500 rounded cursor-pointer">
                                  View order
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </section>             
    </>
  );
};

const OrderHistory = () => {
  return (
      <>
          
       
        {/* <!-- /Mobile order table  --> */}

          {/* <!-- Order table  --> */}
          <DeliveryHistoryTable/>

      </>
  )
}

export default OrderHistory