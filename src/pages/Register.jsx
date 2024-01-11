import { Link, useNavigate } from "react-router-dom"
import Success from "../components/Alerts/Success"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import Swal from 'sweetalert2';
// import { Helmet } from "react-helmet"
const Register = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        newsletter: false
    })

    const { setIsAuth } = useContext(AuthContext)

    const [altcls, setAltcls] = useState(false)

    const [alert, setAlert] = useState({
        alertmsg: "",
        type: true
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    console.log(form);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.first_name === '' || form.last_name === '' || form.email === '' || form.password === '' || form.password_confirmation === '' || form.phone === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields',
                showConfirmButton: false,
                timer: 1200
            });
            setForm({
                email: "",
                password: "",
                last_name: "",
                first_name: "",
                phone: "",
                password_confirmation: "",
                newsletter: false
            });
            return;
        }

        if (!form.email.includes('@') || !form.email.includes('.')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid Email',
                showConfirmButton: false,
                timer: 1200
            });
            setForm({
                email: "",
                password: "",
                last_name: "",
                first_name: "",
                phone: "",
                password_confirmation: "",
                newsletter: false
            });
            return;
        }

        if (form.phone.length !== 10) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mobile number must be 10 digits long',
                showConfirmButton: false,
                timer: 1200
            });
            setForm({
                email: "",
                password: "",
                last_name: "",
                first_name: "",
                phone: "",
                password_confirmation: "",
                newsletter: false
            });
            return;
        }

        if (form.password !== form.password_confirmation) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password and Confirm Password must be same',
                showConfirmButton: false,
                timer: 1200
            });
            setForm({
                email: "",
                password: "",
                last_name: "",
                first_name: "",
                phone: "",
                password_confirmation: "",
                newsletter: false
            });
            return;
        }

        if (form.password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be atleast 8 characters long',
                showConfirmButton: false,
                timer: 1200
            });
            setForm({
                email: "",
                password: "",
                last_name: "",
                first_name: "",
                phone: "",
                password_confirmation: "",
                newsletter: false
            });
            return;
        }
        try {

            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(`${data.message ? data.message : 'Could not register'}`);
            }


            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_verified", data.user_verified);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 1200
                });
                navigate('/profile');
                setForm({
                    email: "",
                    password: "",
                    last_name: "",
                    first_name: "",
                    phone: "",
                    password_confirmation: "",
                    newsletter: false
                });
                setIsAuth(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 1200
                });
                setForm({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            setForm({
                email: "",
                password: "",
                last_name: "",
                first_name: "",
                phone: "",
                password_confirmation: "",
                newsletter: false
            });
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
                showConfirmButton: false,
                timer: 1200
            });
        }
    };


    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    return (

        <section className="bg-gray-50">
            {/* <Helmet >
                <title>SizeUp | Register</title>
                <meta name="description" content="Sizeupp defies fashion norms, celebrating you in all shapes and sizes. We offer trendy, quality clothing that fit you perfectly." />
                <meta name="keywords" content="Sizeupp, Sizeup, sizeup, sizeupp, size up, size upp" />
            </Helmet> */}
            {/* {alert.type === false && <Error display={altcls} setDisplay={setAltcls} error={alert.alertmsg} type={alert.type} />} */}
            {/* {alert.type && <Success display={altcls} setDisplay={setAltcls} message={alert.alertmsg} type={alert.type} />} */}
            <div className="lg:grid  lg:grid-cols-1">
               

                <main
                    className="flex my-6 justify-center px-8 py-6 lg:col-span-7  xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl border bg-white px-6 py-3 rounded-xl shadow-lg">
                     

                        <h1 className="mt-6 text-2xl font-bold text-c-gray-900 sm:text-3xl md:text-4xl">
                            Welcome to Sizeupp
                        </h1>

                       

                        <form action="#" className="mt-2 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="FirstName" className="block text-sm font-medium text-c-gray-700">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    id="FirstName"
                                    placeholder="Enter First Name"
                                    name="first_name"
                                    value={form.first_name}
                                    onChange={handleChange}
                                    className="flex w-full ring-1 ring-link rounded-xl mt-2 bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="LastName" className="block text-sm font-medium text-c-gray-700">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    id="LastName"
                                    placeholder="Your Last Name"
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    className="flex w-full ring-1 ring-link rounded-xl mt-2 bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Email" className="block text-sm font-medium text-c-gray-700"> Email </label>

                                <input
                                    type="email"
                                    placeholder="Enter your Email address"
                                    id="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="flex w-full ring-1 ring-link rounded-xl mt-2 bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />

                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="LastName" className="block text-sm font-medium text-c-gray-700">
                                    Mobile Number
                                </label>

                                <input
                                    type="text"
                                    id="Phone Number"
                                    placeholder="Your Mobile Number"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="flex w-full ring-1 ring-link rounded-xl mt-2 bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-c-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    placeholder="Enter your Password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="mt-1 w-full ring-1 ring-link rounded-xl bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-c-gray-700">
                                    Password Confirmation
                                </label>

                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    placeholder="Confirm your Password"
                                    name="password_confirmation"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    className="mt-1 w-full ring-1 ring-link rounded-xl bg-c-gray-100 px-6 py-3 text-sm placeholder:text-c-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="MarketingAccept" className="flex gap-4">
                                    <input
                                        type="checkbox"
                                        id="MarketingAccept"
                                        name="newsletter"
                                        onChange={handleChange}
                                        className="h-5 w-5 rounded-md border-c-gray-200 bg-white shadow-sm"
                                    />

                                    <span className="text-sm text-c-gray-700">
                                        I want to receive emails about events, product updates and company announcements.
                                    </span>
                                </label>
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-c-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-c-gray-700 underline"> terms and conditions </a>
                                    and
                                    <a href="#" className="text-c-gray-700 underline">privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4 my-4">
                                <button
                                    onClick={handleSubmit}
                                    className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-c-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link to="/login" className="text-c-gray-700 underline">Log in</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default Register