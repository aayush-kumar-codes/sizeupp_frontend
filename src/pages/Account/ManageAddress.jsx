import React,{useState} from 'react'

const NewAddress = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      pinCode: '',
      mobile: '',
    });
    const [addresses, setAddresses] = useState([]);
  
    const OpenForm = () => {
      setIsOpen(true);
    };
  
    const CloseForm = () => {
      setIsOpen(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      setAddresses([...addresses, formData]);
    
  
      // Add your logic to handle the form data, for example, send it to an API or update state.
      console.log('Form data submitted:', formData);
  
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        pinCode: '',
        mobile: '',
      });
  
      // Close the modal
      CloseForm();
    };


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    return (
        <div>
            <div className="px-10 flex justify-between items-center border-b">
                <h2 className="text-2xl font-semibold pb-4">Saved address</h2>
                    <button
                    onClick={OpenForm}
                    className="p-2 bg-gray-900 text-white rounded px-3 hover:scale-105"
                    >
                    Add new address
                    </button>
            
            </div>
            {/* current address */}
            <div  className="flex flex-col lg:flex-row w-100 lg:10/12 justify-evenly items-center">
                        <div className="text-xl font-bold">
                            Current Address 1
                        </div>
                        <div className='lg:w-2/5 w-100 h-auto rounded-lg bg-white border my-6 p-5'>
                            <p className='text-md font-bold'>Pratik Dhumal</p>
                            <div className='flex'>
                                <span>Address Line 1   :</span>
                                <p className='text-base'>1304/17, Shree Shashwat building</p> 
                            </div>
                            <div className='flex'>
                                <span>Address Line 2   :</span>
                                <p>Mira Road</p> 
                            </div>
                            <div className='flex'>
                                <span>City   : </span>
                                <p>Thane</p> 
                            </div>
                            <div className='flex'>
                                <span>Pin code :</span>
                                <p>401107</p> 
                            </div>
                            <div className='flex'>
                                <span>Phone</span>
                                <p>983397</p> 
                            </div>
                        </div>
                        
            </div>
            
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 w-96">
              <h2 className="text-xl font-bold mb-4">New Address Form</h2>
              <form onSubmit={handleSubmit}>
                {/* Add your form fields */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>            
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div> 
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div> 
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div> 
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Pin code</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div> 

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div> 
                            
                {/* Repeat the above structure for other form fields */}
  
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
  
              <button
                onClick={CloseForm}
                className="mt-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
            )}
            {/* Render addresses */}
                {addresses.map((address, index) => (
                    <div
                    key={index}
                    className="flex flex-col lg:flex-row w-full lg:w-10/12 justify-evenly items-center"
                    >
                    <div className="text-xl font-bold">Address {index + 2}</div>
                    <div className="lg:w-2/5 w-full h-auto rounded-lg bg-white border my-6 p-5">
                        <p className="text-md font-bold">
                        {address.firstName} {address.lastName}
                        </p>
                        <div className="flex">
                        <span>Address Line 1   :</span>
                        <p className="text-base">{address.addressLine1}</p>
                        </div>
                        <div className="flex">
                        <span>Address Line 2   :</span>
                        <p>{address.addressLine2}</p>
                        </div>
                        <div className="flex">
                        <span>City   : </span>
                        <p>{address.city}</p>
                        </div>
                        <div className="flex">
                        <span>Pin code :</span>
                        <p>{address.pinCode}</p>
                        </div>
                        <div className="flex">
                        <span>Phone</span>
                        <p>{address.mobile}</p>
                        </div>
                    </div>
                    </div>
                ))}
        </div>
    );
  };
  

const ManageAddress = () => {

  

    
    

  return (
      <>
          <div className="w-full">
              
              
                  
                  
              
              
                  
                
              
                
              
            <NewAddress/>
        </div>
      </>
  )
}

export default ManageAddress