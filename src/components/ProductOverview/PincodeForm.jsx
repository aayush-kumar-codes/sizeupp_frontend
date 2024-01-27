import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"
import { CheckIcon } from "@heroicons/react/24/outline";

const PincodeForm = () => {
  const [pincode, setPincode] = useState('');
  const [isDeliveryValid, setIsDeliveryValid] = useState(false);

  const pincodeData = {
    // Sample pincode data in JSON format
    '12345': true,
    '67890': false,
    '400612': true,
    '421201': true,
    '400084': true,
    '400002': true,
    '401107': true,
  };

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleCheckClick = () => {
    handlePincode()

  };

  const navigate = useNavigate()

  const handleChangeClick = (e) => {
    e.preventDefault()
    // Reset the pincode and delivery status when changing
    setPincode('');
    setIsDeliveryValid(false);
  };

  const [token, setToken] = useState('')


  const handleToken = async () => {
    try {
      const res = await fetch(`https://api.instashipin.com/api/v1/tenancy/authToken`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          "api_key": "6092655223372029e7404dc4"
        })
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      if (data.data.response?.error) {
        Swal.fire({
          title: 'Error!',
          text: data.data.response?.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return
      }
      setToken(data.data?.response.token_id)
      // Swal.fire({
      //   title: 'Success!',
      //   text: 'Pincode Added',
      //   icon: 'success',
      // })
    }
    catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

  }

  const handlePincode = async () => {
    try {
      await handleToken();
      if (pincode.length !== 6) {
        Swal.fire({
          title: 'Error!',
          text: 'Please enter valid pincode',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return
      }
      if (!token) {
        Swal.fire({
          title: 'Error!',
          text: 'Please enter pincode again',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return
      }
      const res = await fetch(`https://api.instashipin.com/api/v1/courier-vendor/check-pincode`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          "token_id": token,
          "pincode": pincode
        })
      })
      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`);
      // }
      const data = await res.json()
      console.log(data);
      if (data.data?.response?.message == 'PINCODE NOT SERVICEABLE') {
        setIsDeliveryValid(false)
        return Swal.fire({
          title: 'Error!',
          text: data.data?.response?.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1200
        });
      }

      setIsDeliveryValid(true)

      Swal.fire({
        title: 'Success!',
        text: data.data?.response?.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      })
    }
    catch (error) {
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

  const [payload, setpayload] = useState(false)

  const handleApplyPincode = async (e) => {
    e.preventDefault()
    if (payload) {
      return
    }
    try {
      setpayload(true)
      if (pincode.length !== 6) {
        Swal.fire({
          title: 'Error!',
          text: 'Please enter valid pincode',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        return
      }
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/validate-pincode/` + pincode, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      console.log(data);
      if (data.message == 'PINCODE NOT SERVICEABLE') {
        setIsDeliveryValid(false)
        setpayload(false)
        return Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
      setIsDeliveryValid(true)
      setpayload(false)
      Swal.fire({
        title: 'Success!',
        text: data.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    }
    catch (error) {
      console.error('Fetch error:', error);
      setpayload(false)
      Swal.fire({
        title: 'Error!',
        text: 'Fetch error: ' + error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


  return (
    <>
      <form onSubmit={(e) => {
        if (isDeliveryValid) {
          handleChangeClick(e)
        } else {
          handleApplyPincode(e)
        }
      }} autoComplete="off" className="flex">
        <input
          type="text"
          placeholder="Enter pincode"
          onChange={handlePincodeChange}
          value={pincode}
          className="pincode-code flex w-2/3 ring-1 ring-link rounded-md mt-2 bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
          name="pincode"
          disabled={isDeliveryValid}
        />

        <button
          type="submit"
          className="cursor-pointer relative right-14 pt-2 -mx-2 text-orange-500 hover:font-bold"
          value={isDeliveryValid ? 'Change' : 'Check'}
          onClick={() => {
            if (isDeliveryValid) {
              handleChangeClick()
            } else {
              handleApplyPincode()
            }
          }}

        >
          {isDeliveryValid ? 'Change' : 'Check'}
        </button>
        {isDeliveryValid && (
          <div className="ok relative right-7 top-10 transform -translate-y-1/2">
            <CheckIcon className="h-6 w-6 relative text-white rounded-full bg-green-600 p-1" />
          </div>
        )}
      </form>
      {isDeliveryValid ? (
        <div className="w-full m-3">
          <ul className="flex flex-col gap-3 font-bold">
            {/* <li>
              <h4>Get it by Thu, Dec 21</h4>
            </li> */}
            <li>
              <h4>Pay on delivery available</h4>
            </li>
            {/* <li>
              <h4>Easy 14 days return &amp; exchange available</h4>
              <span></span>
            </li> */}
          </ul>
        </div>
      ) : (
        <p className="text-xs text-gray-700 pt-2">Please enter PIN code to check delivery time &amp; Pay on Delivery Availability</p>
      )}

    </>
  );
};

export default PincodeForm