import React, { useState, useContext } from 'react';
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { AuthContext } from '../../context/AuthProvider';

// import {Helmet} from "react-helmet";


const Modal = ({ children, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-white rounded-md shadow-lg">
            {/* Content */}
            <div className="relative flex flex-col w-full outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-lg font-semibold">Edit Profile</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">{children}</div>
            </div>
          </div>
        </div>
      )}
      <div className={`${isOpen ? 'fixed' : 'hidden'} inset-0 z-40 bg-black opacity-50`} onClick={onClose}></div>
    </>
  );
};



const ProfileForm = ({ firstName, lastName, email, mobile, onSave }) => {


  const { profiledata, fetchProfileData } = useContext(AuthContext)
  console.log(profiledata.user_info);
  React.useEffect(() => {
    fetchProfileData()
  }, [])

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profiledata.user_info?.first_name || '',
    lastName: profiledata.user_info?.last_name || '',
    email: profiledata.user_info?.email || '',
    mobile: profiledata.user_info?.phone || '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full mx-16  mt-8">

      {/* <Helmet>
          <title>Profile Settings</title>
          <meta name="description" content="Profile Settings" />
          <meta name="keywords" content="Profile Settings" />
        </Helmet> */}
      <h2 className="text-2xl font-semibold mb-4 mx-8 border-b pb-4">Profile Settings</h2>

      <div className="max-w-lg  p-6 bg-white rounded-md border shadow">

        <div className="mb-4">
          <label className="block text-gray-700 text-md font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full border border-gray-300 p-2 rounded-lg ${isEditing ? '' : 'bg-gray-100'
              }`}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-md font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full border border-gray-300 p-2 rounded-lg ${isEditing ? '' : 'bg-gray-100'
              }`}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-md font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full border border-gray-300 p-2 rounded-lg ${isEditing ? '' : 'bg-gray-100'
              }`}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-md font-bold mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className={`w-full border border-gray-300 p-2 rounded-lg ${isEditing ? '' : 'bg-gray-100'
              }`}
            disabled={!isEditing}
          />
        </div>
        <div className="flex justify-end">
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

const AccountSetting = () => {

  const { profiledata, fetchProfileData } = useContext(AuthContext)
  console.log(profiledata.user_info);


  const [isPasswordModalOpen, setisPasswordModalOpen] = useState(false);
  const [email, setEmail] = useState(profiledata.user_info?.email || ''); // Default email
  const [password, setPassword] = useState('Defaults'); // Default password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prev) => !prev);
  }

  const handlePasswordChange = () => {
    setisPasswordModalOpen(true);
  };

  const handleModalClose = () => {
    setisPasswordModalOpen(false);
  };

  const handlePasswordSave = (newEmail) => {
    setEmail(newEmail);
    handleModalClose();
  };

  return (
    <>
      <div className=" w-full mx-6">
        <h2 className="text-2xl font-semibold mb-4 mx-8 border-b pb-4">Account Settings</h2>
        <div className="max-w-md mx-8 mt-2 h-72 p-6 bg-white border shadow rounded-md">

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="text"
              value={email}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />

          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                disabled
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {isPasswordVisible ? (
                  <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <EyeIcon className="h-6 w-6 text-gray-500" />
                )}
              </span>

            </div>
            <button
              onClick={handlePasswordChange}
              className="mt-2 text-blue-500 hover:underline focus:outline-none"
            >
              Change Password
            </button>
          </div>

          {/* Email Change Modal */}
          {isPasswordModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
              <div className="z-10 bg-white p-6 rounded-md shadow border w-1/3">
                <div className="mb-6 leading-normal ">
                  <h1 className="mb-2 text-lg font-bold text-gray-700 text-center ">This content is
                    password protected.</h1>
                  <p className="mb-6 text-sm font-medium text-gray-400 text-center "></p>
                  <label htmlFor='current-pass' className='text-md font-bold '>Current password</label>
                  <div className="relative">
                    <input
                      className="w-full p-3 text-sm font-medium bg-gray-100 border rounded-md focus:border-blue "
                      name="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Current password"
                      value="default"
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {isPasswordVisible ? (
                        <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-gray-500" />
                      )}
                    </span>
                  </div>

                  <label htmlFor='current-pass' className='text-md font-bold '>New password</label>
                  <div className="relative">
                    <input
                      className="w-full p-3 text-sm font-medium bg-gray-100 border rounded-md focus:border-blue "
                      name="password" type="password"
                      type={isNewPasswordVisible ? 'text' : 'password'}
                      placeholder="Current password" />
                    <span
                      onClick={toggleNewPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {isNewPasswordVisible ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </span>

                  </div>
                  <label htmlFor='confirm-pass' className='text-md font-bold '>Confirm password</label>
                  <div className="relative">
                    <input
                      className="w-full p-3 text-sm font-medium bg-gray-100 border rounded-md focus:border-blue "
                      name="new-password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="New password"
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {isPasswordVisible ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </span>
                  </div>
                </div>

                <span className="justify-center block gap-3 rounded-md shadow-sm md:flex">
                  <button onClick={handleModalClose}
                    className="inline-flex justify-center w-full px-4 py-2 mb-4 text-blue-500 border border-blue-500 rounded-md md:mb-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:text-gray-100 hover:bg-blue-600">
                    Cancel
                  </button>
                  <button onClick={handlePasswordSave}
                    className="inline-flex justify-center w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-blue-600 hover:bg-blue-600">
                    Submit
                  </button>
                </span>
              </div>

            </div>
          )}
        </div>
      </div>

    </>
  );
};


const ManageAccount = () => {


  return (
    <>
      <div className="flex flex-col w-full overflow-hidden">
        <AccountSetting />
        <ProfileForm />
      </div>

    </>
  );
};


export default ManageAccount