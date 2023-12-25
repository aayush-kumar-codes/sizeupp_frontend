import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';


const BillingAddress = () => {
    const [editBillingMode, setEditBillingMode] = useState(false);
    const [billingFormData, setBillingFormData] = useState({
        billingAddressLine1: 'MK road, Sia Ram Soc.',
        billingAddressLine2: 'Palava City',
        billingCity: 'Dombivali',
        billingState: 'Maharashtra',
        billingZipCode: '421202',
        billingCountry: 'India',
    });

    const handleBillingEditClick = () => {
        setEditBillingMode(true);
    };

    const handleBillingInputChange = (e) => {
        const { name, value } = e.target;
        setBillingFormData({
            ...billingFormData,
            [name]: value,
        });
    };



    const handleBillingSubmit = (e) => {
        e.preventDefault();
        // Add logic to update the values in your application state or API
        setEditBillingMode(false);
        alert('Billing address changes made successfully');
    };

    return (
        <div className="mx-16 mt-8">
            <div className="border py-5 shadow-md rounded-xl">
                <div className="flex justify-between px-4 pb-5">
                    <p className="font-bold text-lg">Billing Address</p>
                    <button
                        className="text-sm text-violet-900"
                        onClick={handleBillingEditClick}
                        disabled={editBillingMode}
                    >
                        Edit
                    </button>
                </div>

                <form onSubmit={handleBillingSubmit}>
                    {editBillingMode && (
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                                Save
                            </button>
                        </div>
                    )}

                    <div className="px-4">
                        {Object.entries(billingFormData).map(([key, value]) => (
                            <div key={key} className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder={`Enter ${key}`}
                                        required={editBillingMode && key !== 'billingAddressLine2'}
                                        disabled={!editBillingMode}
                                        name={key}
                                        value={value}
                                        onChange={handleBillingInputChange}
                                    />
                                </dd>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
};


const Account = () => {

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        addressLine1: '123 Main St',
        addressLine2: '',
        city: 'Anytown',
        state: 'USA',
        zipCode: '12345',
        country: 'USA',
    });

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to update the values in your application state or API
        setEditMode(false);
        alert('Changes made successfully');

    };

    const { profiledata, fetchProfileData } = useContext(AuthContext)


    console.log(profiledata)
    useEffect(() => {
        fetchProfileData()
    }, [])

    return (
        <>

            <div
                className="grid w-full  grid-cols-1 gap-3 px-5 pb-10 "
            >
                <div className="mx-16">
                    <div className="bg-white overflow-hidden shadow rounded-lg border">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                User Profile
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                This is some information about the user.
                            </p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Full name
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {profiledata.user_info?.first_name + ' ' + profiledata.user_info?.last_name || 'Failed to fetch Name'}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Email address
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {profiledata.user_info?.email || 'Failed to fetch Email'}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Phone number
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {profiledata.user_info?.phone || 'Failed to fetch Phone Number'}
                                    </dd>
                                </div>

                            </dl>
                        </div>
                    </div>
                </div>

                <div className="mx-16">
                    <div className="border py-5 shadow-md rounded-xl">
                        {profiledata.addresses?.length > 0 && profiledata.addresses?.map((adrs, i) => {
                            if (!adrs.is_default) return null
                            return (
                                <div key={adrs.id} className='px-4'>
                                    <div className="flex justify-between px-4 pb-5">
                                        <p className="font-bold text-lg">Default Shipping Address </p>
                                        <button
                                            className="text-sm text-violet-900"
                                            onClick={handleEditClick}
                                            disabled={editMode}
                                        >
                                            Edit
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="px-4">
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Address Line 1
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="Enter Address Line 1"
                                                        required
                                                        disabled={!editMode}
                                                        name="addressLine1"
                                                        value={adrs.address_line_1}
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
                                                        className="form-input"
                                                        placeholder="Enter Address Line 1"
                                                        disabled={!editMode}
                                                        name="addressLine1"
                                                        value={adrs.address_line_2}
                                                        onChange={handleInputChange} />
                                                </dd>
                                            </div>

                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    City
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <input type="text"
                                                        className="form-input"
                                                        placeholder="Enter City"
                                                        required
                                                        disabled={!editMode}
                                                        name="city"
                                                        value={adrs.city}
                                                        onChange={handleInputChange} />
                                                </dd>
                                            </div>

                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    State
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <input type="text"
                                                        className="form-input"
                                                        placeholder="Enter State"
                                                        required
                                                        disabled={!editMode}
                                                        name="state"
                                                        value={adrs.state}
                                                        onChange={handleInputChange} />
                                                </dd>
                                            </div>

                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Zip Code
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <input type="text"
                                                        className="form-input"
                                                        placeholder="Enter Zip code"
                                                        required
                                                        disabled={!editMode}
                                                        name="zipCode"
                                                        value={adrs.postal_code}
                                                        onChange={handleInputChange} />
                                                </dd>
                                            </div>

                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Country
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <input type="text"
                                                        className="form-input"
                                                        placeholder="Enter country"
                                                        required
                                                        disabled={!editMode}
                                                        name="country"
                                                        value={adrs.country}
                                                        onChange={handleInputChange} />
                                                </dd>
                                            </div>

                                            {/* Include other fields similarly */}

                                            {editMode && (
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <button type="submit" className="rounded-lg bg-blue-500 text-white px-4 py-2">
                                                        Save
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            )
                        })}
                    </div>
                </div>



                <BillingAddress />
            </div>
        </>
    )
}

export default Account