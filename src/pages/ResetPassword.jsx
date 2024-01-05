import { useState } from 'react'
import { logo } from '../assets/banners'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

const ResetPassword = () => {

    const navigate = useNavigate()



    const handleSubmit = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/auth/forgot-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    confirm_password: form.confirm_password,
                    otp: otp
                })

            })
            const data = await res.json()
            if (!data.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data.error
                })
            }
            console.log("data", data)
            Swal.fire({
                icon: "success",
                title: "Success",
                text: data.message,
                showConfirmButton: false,
                timer: 1200
            })

            navigate("/login")

        } catch (error) {
            console.log("error", error)
        }
    }



    const [otp, setOtp] = useState({
        1: "",
        2: "",
        3: "",
        4: "",
    })

    const handeChangeOTP = (e) => {
        setOtp({
            ...otp,
            [e.target.name]: e.target.value
        })

    }


    const [form, setform] = useState({
        email: "",
        password: "",
        confirm_password: ""
    })



    return (
        <>
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <img className="w-40 " src={logo} alt="logo" />

                    </a>
                    <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Change Password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input onChange={(e) => setform({ ...form, email: e.target.value })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                                <input onChange={(e) => setform({ ...form, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  " required="" />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                                <input onChange={(e) => setform({ ...form, confirm_password: e.target.value })} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " required="" />
                            </div>

                            <div>
                                <form action="" method="post">
                                    <div className="flex flex-col space-y-16">
                                        <div className="mx-auto flex w-full max-w-xs flex-row items-center justify-between">
                                            <div className="h-16 w-16">
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
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-5">
                                            <div className="flex flex-row items-center justify-center space-x-1 text-center text-sm font-medium text-gray-500">
                                                <p> Didnt recieve code?</p>
                                                <div onClick={() => navigate('/forgot')} className="cursor-pointer flex flex-row items-center text-blue-600" href="/otp" rel="noopener noreferrer">Resend</div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="newsletter" className="font-light text-gray-500 ">I accept the <a className="font-medium text-blue-600 hover:underline " href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="button" onClick={handleSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Reset passwod</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword