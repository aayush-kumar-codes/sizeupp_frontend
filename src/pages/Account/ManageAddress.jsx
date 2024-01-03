import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2'
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

  const handleAddAddress = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/address`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          address_line_1: formData.addressLine1,
          address_line_2: formData.addressLine2,
          city: formData.city,
          postal_code: formData.zipCode,
          country: formData.country,
          state: formData.state,
          is_default: 'on'
        })
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      fetchProfileData()
      Swal.fire({
        title: 'Success!',
        text: 'Address Added',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      setFormData({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      })



    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setAddresses([...addresses, formData]);

    if (isEdit) {
      handleUpdateAdddress(formData.addressid)
    } else {
      handleAddAddress()
    }
    // Add your logic to handle the form data, for example, send it to an API or update state.
    console.log('Form data submitted:', formData);

    // Reset form data
    setFormData({
      addressid: "",
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: "",
      country: '',
      pinCode: '',
      mobile: '',
    });

    // Close the modal
    CloseForm();
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/address/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + localStorage.getItem('token')
        }
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Address Deleted Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        fetchProfileData()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      console.log("error", error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const handleUpdateAdddress = async (id) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/address/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          address_line_1: formData.addressLine1,
          address_line_2: formData.addressLine2,
          city: formData.city,
          postal_code: formData.pinCode,
          country: formData.country,
          state: formData.state,
          is_default: true
        }),
      });
      const data = await res.json();
      console.log(data);
      setFormData({
        addressid: "",
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: "",
        country: '',
        pinCode: '',
        mobile: '',
        
      })
      setIsEdit(false)
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Address Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        fetchProfileData()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    } catch (error) {
      console.log("error", error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',

      })
    }
  }


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

  const [isEdit, setIsEdit] = useState(false)
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
          <div className="px-4 bg-white">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Address Line 1
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  className="form-input px-2 py-1"
                  placeholder="Enter Address Line 1"
                  required
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                />
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Address Line 2
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="text"
                  className="form-input px-2 py-1"
                  placeholder="Enter Address Line 2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange} />
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                City
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="text"
                  className="form-input px-2 py-1"
                  placeholder="Enter City"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange} />
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                State
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="text"
                  className="form-input px-2 py-1"
                  placeholder="Enter State"
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange} />
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Zip Code
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="text"
                  className="form-input px-2 py-1"
                  placeholder="Enter Zip code"
                  required
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange} />
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Country
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input type="text"
                  className="form-input px-2 py-1"
                  placeholder="Enter country"
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange} />
              </dd>
            </div>

            {/* Include other fields similarly */}


            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <button type="button" onClick={handleSubmit} className="rounded-lg bg-blue-500 text-white px-4 py-2">
                Save
              </button>
              <button type="button" onClick={() => { setIsOpen(false) }} className="rounded-lg bg-red-500 text-white px-4 py-2">
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
              <button onClick={() => {
                OpenForm(); setIsEdit(true); setFormData({
                  addressid: address.id,
                  addressLine1: address.address_line_1,
                  addressLine2: address.address_line_2,
                  city: address.city,
                  pinCode: address.postal_code,
                  mobile: address.mobile,
                  country: address.country,
                  state: address.state
                })
              }} className='bg-blue-500 rounded p-1 px-2 text-white'>Edit</button>
              <button onClick={() => { handleDeleteAddress(address.id); }} className='bg-red-700 rounded p-1 px-2 text-white'>Delete</button>

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