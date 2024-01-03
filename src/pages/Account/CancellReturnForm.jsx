import React,{useState,useEffect} from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';

const CancellReturnForm = () => {

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
    
  return (
      <>
          
              <form >
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-auto  w-full md:w-3/5">
                <div className="sm:col-span-3">
                <label htmlFor="orderid" className="block text-sm font-medium leading-6 text-gray-900">Order Id</label>
                <div className="mt-2">
                    <input type="text" name="order-id"  value={order.id || ''} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" disabled/>
                </div>
                  </div>
                  {/*  select option*/}
                  {/* Feedback dropdown */}
                    <div className="sm:col-span-3">
                        <label htmlFor="items" className="block text-sm font-medium leading-6 text-gray-900">Items</label>
                      <div className="mt-2">
                              
                            <select  id="feedback" name="feedback" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          {order.order_items?.length > 0 && order.order_items?.map((item) => (
                              <>
                                <option value={item.product.id}>{ item.product.name || ''}</option>
                                
                              </>
                                ))}
                          </select>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Select Order item to return</p>
                    </div>
                <div className="col-span-full">
                <label htmlFor="issue" className="block text-sm font-medium leading-6 text-gray-900">Feedback</label>
                <div className="mt-2">
                    <textarea id="about" name="about" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a feedback.</p>
                </div>
            <div className="col-span-full">
                <label htmlFor="issue" className="block text-sm font-medium leading-6 text-gray-900">Issue</label>
                <div className="mt-2">
                    <textarea id="about" name="about" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Any issues.</p>
                  </div>
                  <div className="col-span-full">
                    <button type="submit" className='text-md p-2 bg-blue-400 text-white rounded-md'>Cancel / Return Order</button>
                      
                  </div>
                
            </div>
              </form>
              
          
      </>
  )
}

export default CancellReturnForm