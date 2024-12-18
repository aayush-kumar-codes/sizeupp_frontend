import { useContext, useEffect, useState } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Error from "../components/Alerts/Error";
import { Link, useNavigate } from "react-router-dom";
import Success from "../components/Alerts/Success";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
// import { Helmet } from "react-helmet";
export function Login() {

    const { isAuth, setIsVerified, setIsAuth,fetchCart,fetchWishlist } = useContext(AuthContext)
    const [loading, setloading] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [altcls, setAltcls] = useState(false)

    const [alert, setAlert] = useState({
        alertmsg: "",
        type: true,
        onClose: () => { }
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        localStorage.clear()
        if (formData.email === "" || formData.password === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields',
                showConfirmButton: false,
                timer: 1200
            });
            setloading(false);
        } else {
            try {
                const res = await fetch(import.meta.env.VITE_SERVER_URL + '/api/auth/signin', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();

                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_verified", JSON.stringify(data.user_verified));
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: data.message,
                        showConfirmButton: false,
                        timer: 1200
                    });
                    navigate("/products");
                    setFormData({
                        email: "",
                        password: ""
                    });
                    setIsAuth(true);
                    fetchCart()
                    fetchWishlist()
                    setIsVerified(data.user_verified);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,
                        showConfirmButton: false,
                        timer: 1200
                    });
                    setFormData({
                        email: "",
                        password: ""
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email and password does not match',
                    showConfirmButton: false,
                    timer: 1200
                });
            } finally {
                setloading(false);
            }
        }
    };

    
    

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    return (
        <section className="">
            {/* <Helmet>
                <title>Login | Sizeupp</title>
                <meta name="description" content="Login to your Sizeupp account securely. Access your user account to manage orders, track shipments, and explore our latest fashion items." />
            </Helmet> */}

            {!alert.type && <Error display={altcls} setDisplay={setAltcls} error={alert.alertmsg} type={alert.type} onClose={alert.onClose} />}
            {alert.type && <Success display={altcls} setDisplay={setAltcls} message={alert.alertmsg} type={alert.type} onClose={alert.onClose} />}
            <div className="grid grid-cols-1  h-full bg-gray-50">
                
                <div className="flex items-center justify-center px-3 py-10 my-6 lg:px-8 lg:py-24 ">
                    <div className="mx-auto w-full xl:max-w-sm 2xl:max-w-md border rounded-xl shadow-lg p-6 bg-white">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl p-2">Sign in</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/register"
                                className="font-semibold text-black transition-all duration-200 hover:underline"
                            >
                                Create a free account
                            </Link>
                        </p>
                        <form className="mt-8" onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <Link
                                            to="/forgot"
                                            title=""
                                            className="text-sm font-semibold text-black hover:underline"
                                        >
                                            {' '}
                                            Forgot password?{' '}
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={handleChange}
                                            

                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        // onClick={handleSubmit}
                                        disabled={loading ? true : false}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 my-6 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Get started {
                                            loading ?
                                                <svg className="animate-spin ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg> :
                                                <ArrowLongRightIcon className="w-6 ml-2" />
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* <div className="mt-3 space-y-3">
                            <button
                                type="button"
                                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            >
                                <span className="mr-2 inline-block">
                                    <svg
                                        className="h-6 w-6 text-rose-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                    </svg>
                                </span>
                                Sign in with Google
                            </button>

                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
