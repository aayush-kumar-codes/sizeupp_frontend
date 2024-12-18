import { useEffect, useState,useRef  } from "react"
import Error from "../components/Alerts/Error"
import Swal from 'sweetalert2'
import { useNavigate,Navigate } from "react-router-dom"

const Otp2 = () => {
    const navigate = useNavigate()


    useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/auth/otp", {
            method: 'GET',
            headers: {
                'Authorization': `token ${localStorage.token}`,
                'Content-type': 'application/json'
            }
        }).then(res => res.json().then((data) => {
            console.log(data)
            localStorage.setItem("user_verified", data.user_verified)
        }))
    }, [])

    const [otp, setOtp] = useState({
        1: "",
        2: "",
        3: "",
        4: "",
    })

    const inputRefs = {
        1: useRef(null),
        2: useRef(null),
        3: useRef(null),
        4: useRef(null)
    };


    const handeChangeOTP = (e) => {
        setOtp({
            ...otp,
            [e.target.name]: e.target.value
        })

    }

    const handleInputChange = (e, currentDigit) => {
        const value = e.target.value;

        setOtp({
            ...otp,
            [currentDigit]: value
        });

        // Move focus to the next input field if a character is entered
        if (value !== '') {
            const nextDigit = (parseInt(currentDigit) % 4) + 1;
            inputRefs[nextDigit].current.focus();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(otp)
        const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/auth/otp", {
            method: 'POST',
            headers: {
                'Authorization': `token ${localStorage.token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ otp })
        })

        const data = await res.json()
        if(!res.ok){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
                confirmButtonText: 'Cool',
                
            })
        }
        if (data.message) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: data.message,
                confirmButtonText: 'Cool',
                
            }).then((result) => {
                if (result.isConfirmed) {
                 navigate('/')
                }
              });

        }
        if (data.user_verified) {
            localStorage.setItem("user_verified", true)
            navigate('/')
        }
        console.log(data)
    }

    console.log(localStorage.user_verified == 'true')
    if(localStorage.user_verified == 'true'){
       
        return <Navigate to='/' replace />
    }


    return (
        <>
            <Error />
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-200/40 py-12">

                <div className="relative mx-auto w-full max-w-lg rounded-2xl bg-white px-6 pt-10 pb-9 shadow-xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <div className="text-3xl font-semibold">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email</p>
                            </div>
                        </div>

                        <div>
                            <form action="" method="post">
                                <div className="flex flex-col space-y-16">
                                    <div className="mx-auto flex w-full max-w-xs flex-row items-center justify-between">
                                        {/* <div className="h-16 w-16">
                                            <input onChange={handeChangeOTP} className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-blue-700 focus:bg-gray-50 focus:ring-1" type="text" inputMode="numeric" maxLength="1" name="1" id="otp-input-0" />
                                        </div>
                                        <div className="h-16 w-16">
                                            <input onChange={handeChangeOTP} className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-blue-700 focus:bg-gray-50 focus:ring-1" type="text" inputMode="numeric" maxLength="1" name="2" id="otp-input-1" />
                                        </div>
                                        <div className="h-16 w-16">
                                            <input onChange={handeChangeOTP} className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-blue-700 focus:bg-gray-50 focus:ring-1" type="text" inputMode="numeric" maxLength="1" name="3" id="otp-input-2" />
                                        </div>
                                        <div className="h-16 w-16">
                                            <input onChange={handeChangeOTP} className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-blue-700 focus:bg-gray-50 focus:ring-1" type="text" inputMode="numeric" maxLength="1" name="4" id="otp-input-3" />
                                        </div> */}
                                         {[1, 2, 3, 4].map((digit) => (
                                            <div key={digit} className="h-16 w-16">
                                                <input
                                                    onChange={(e) => handleInputChange(e, digit)}
                                                    ref={inputRefs[digit]}
                                                    className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none ring-blue-700 focus:bg-gray-50 focus:ring-1"
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength="1"
                                                    name={digit}
                                                    id={`otp-input-${digit - 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button type="submit" onClick={handleSubmit} className="flex w-full flex-row items-center justify-center rounded-xl border border-none bg-blue-700 py-5 text-center text-sm text-white shadow-sm outline-none">Verify Account</button>
                                        </div>



                                        <div className="flex flex-row items-center justify-center space-x-1 text-center text-sm font-medium text-gray-500">
                                            <p> Didnt recieve code?</p>
                                            <a className="flex flex-row items-center text-blue-600" href="/otp" rel="noopener noreferrer">Resend</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Otp2