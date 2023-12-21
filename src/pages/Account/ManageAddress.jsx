import React,{useState} from 'react'

const ManageAddress = () => {

    const [openModaladdress, SetOpenModalAddress] = useState(false);
    const [addressData, SetAddressData] = useState({
        firstName:'Kushal',
      lastName:'King',
      email:'example@gmail.com',
        address1: '',
      address2:'',
      mobile:6726382392,
    })

    const OpenForm = () => {
        SetOpenModalAddress(true);
    }

    const handleModalClose = () => {
        SetOpenModalAddress(false);
      };

      const handleSaveAddress = () => {
        // Perform any validation or processing logic here before updating the addressData
        // For simplicity, let's assume the data is valid and directly update addressData
        SetAddressData((prevData) => ({
          ...prevData,
          address1: addressData.address1,
          address2: addressData.address2,
        }));
    
        // Close the modal after saving
        SetOpenModalAddress(false);
      };
    
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        SetAddressData((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = {
            ...updatedData[index],
            [name]: value,
          };
          return updatedData;
        });
      };
    
    
    

  return (
      <>
          <div className="w-full">
              <div className="px-10 flex justify-between items-center border-b">
                <h2 className="text-2xl font-semibold pb-4">Saved address</h2>
                  <button onClick={OpenForm} className="p-2 bg-gray-900 text-white rounded px-3 hover:scale-105">
                      Add new address
                  </button>
                  {
                      openModaladdress && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                              <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                              <div className="relative w-96 max-w-xl p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
                                  {/* Modal Form */}
                                  {addressData.map((address, index) => (
                                      <>
                                      
                                        <form>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Address Line 1
                                            </label>
                                            <input
                                            type="text"
                                            name="address1"
                                            value={addressData.address1}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="w-full border border-gray-300 p-2"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Address Line 2
                                            </label>
                                            <input
                                            type="text"
                                            name="address2"
                                            value={addressData.address2}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="w-full border border-gray-300 p-2"
                                            />
                                        </div>
                                        
                                        <button
                                            type="button"
                                            onClick={() => handleSaveAddress(index)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                                        >
                                            Save
                                        </button>
                                        </form>
                                      </>
                                  ))}
                            
                              <button
                                    onClick={handleModalClose}
                                    className="mt-2 rounded-lg p-2 text-white bg-blue-500 hover:underline focus:outline-none"
                                >
                                    close
                                </button>
                                  </div>
                              </div>
                      )
                  }
              </div>
              
                    <div  className="flex flex-col lg:flex-row w-100 lg:10/12 justify-evenly items-center">
                        <div className="text-xl font-bold">
                            Address 1
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
                  
              
              
                  
                <div className="flex flex-col mx-6 lg:flex-row w-full lg:w-10/12 justify-evenly items-center">
                      <div className="text-xl font-bold">Address 2</div>
                        <div className="lg:w-2/5 w-full h-auto rounded-lg bg-white border my-6 p-5">
                        <p className="text-md font-bold">{`${addressData.firstName} ${addressData.lastName}`}</p>
                        <div className="flex">
                            <span>Address Line 1 :</span>
                            <p className="text-base">{addressData.address1}</p>
                        </div>
                        <div className="flex">
                            <span>Address Line 2 :</span>
                            <p>{addressData.address2}</p>
                        </div>
                        <div className="flex">
                            <span>City :</span>
                            <p>{/* Include City Data Here */}</p>
                        </div>
                        <div className="flex">
                            <span>Pin code :</span>
                            <p>{/* Include Pin Code Data Here */}</p>
                        </div>
                        <div className="flex">
                            <span>Phone :</span>
                            <p>{addressData.mobile}</p>
                        </div>
                        </div>
                    </div>

              
                
              
              <div className='max-w-lg mx-auto h-32 rounded-lg bg-white border my-6'>
                      
                </div>
        </div>
      </>
  )
}

export default ManageAddress