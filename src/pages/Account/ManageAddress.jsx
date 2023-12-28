import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';

const NewAddress = () => {
  const [UserAddress, setUserAddress] = useState({})
  const [changeAddress, setChangeAddress] = useState(false)
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  const handleOpenAdrees = () => {
    setAddressModalOpen(true);
    setChangeAddress(true);
  }
  
  const handleCloseAddresses = () => {
    setAddressModalOpen(false);
  }
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

  const { profiledata, fetchProfileData } = useContext(AuthContext)

  useEffect(() => {
    fetchProfileData()
  }, [])
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
      {/* <div className="flex flex-col lg:flex-row w-100 lg:10/12 justify-evenly items-center">
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

      </div> */}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 w-96">
            <h2 className="text-xl font-bold mb-4">New Address Form</h2>
            <form onSubmit={handleSubmit}>
              {/* Add your form fields */}


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

              {/* <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div> */}

              {/* Repeat the above structure for other form fields */}
        
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
            <div className="flex justify-end w-full">
              <button
                onClick={CloseForm}
                className="mt-2 text-gray-100 hover:text-gray-200 bg-red-600 rounded p-2"
              >
                Close
              </button>
              
            </div>
          </div>
        </div>
      )}
      {/* Render addresses */}
      {profiledata.addresses?.length > 0 && profiledata.addresses?.map((address, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row w-full justify-evenly items-center"
        >
          <div className="text-xl font-bold">Address {index + 1}</div>
          <div className="lg:w-2/5 max-w-xl h-auto rounded-lg bg-white border my-6 p-5">

            <div className="flex">
              <span>Address Line 1   :</span>
              <p className="text-base">{address.address_line_1}</p>
            </div>
            <div className="flex">
              <span>Address Line 2   :</span>
              <p>{address.address_line_2}</p>
            </div>
            <div className="flex">
              <span>City   : </span>
              <p>{address.city}</p>
            </div>
            <div className="flex">
              <span>Pin code :</span>
              <p>{address.postal_code}</p>
            </div>
            <div className="flex">
              <span>Country</span>
              <p>{address.country}</p>
            </div>
            <div className="flex justify-end w-full gap-4">
              <button onClick={()=> {OpenForm(); setFormData({
                addressLine1: address.address_line_1,
                addressLine2: address.address_line_2,
                city: address.city,
                pinCode: address.postal_code,
                mobile: address.mobile,
              
              })}} className='bg-blue-500 rounded p-1 px-2 text-white'>Edit</button>
              {/* <button className='bg-red-700 rounded p-1 px-2 text-white'>Delete</button> */}

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

        <NewAddress />
      </div>
    </>
  )
}

export default ManageAddress