import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaSquareWhatsapp } from "react-icons/fa6";

const Contact = () => {
    const [profiledata, setprofiledata] = useState()
    const fetchProfileData = async () => {
        try {
            if (localStorage.token) {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/userprofile`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `token ${localStorage.token}`
                    }
                })
                const data = await response.json()
                console.log(data)
            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        fetchProfileData()
    }, [])

    const [form, setform] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        issue: '',
        textarea: ''
    })


    const handleContact = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/contactus`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.token}`
                },
                body: JSON.stringify({
                    first_name: form.firstname,
                    last_name: form.lastname,
                    email: form.email,
                    phone_number: form.phone,
                    issue: form.issue,
                    message: form.textarea
                })
            })
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            console.log(data)
            setform({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                issue: '',
                textarea: ''
            })

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your query has been submitted successfully',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }
    return (
        <>

            <section className="bg-gray-50" id="contact">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                            <p className="text-base font-semibold uppercase tracking-wide text-blue-600">
                                Support Ticket
                            </p>
                            <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl">
                                Get in Touch
                            </h2>
                            <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600">connect with us for any query</p>
                        </div>
                    </div>
                    <div className="flex items-stretch justify-center">
                        <div className="grid md:grid-cols-2">

                            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                                <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
                                <form id="contactForm">
                                    <div className="mb-6">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="firstname" className="pb-1 text-xs uppercase tracking-wider"></label><input
                                                    onChange={(e) => { setform({ ...form, firstname: e.target.value }) }}
                                                    type="text"
                                                    id="firstname" autoComplete="given-name" placeholder="Your first name"
                                                    className="mb-2 w-full rounded-md border border-gray-200 py-2 pl-2 pr-4  sm:mb- focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                                    name="firstname" />
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="lastname" className="pb-1 text-xs uppercase tracking-wider"></label><input type="text"
                                                    onChange={(e) => { setform({ ...form, lastname: e.target.value }) }}
                                                    id="lastname" autoComplete="given-name" placeholder="Your last name"
                                                    className="mb-2 w-full rounded-md border border-gray-200 py-2 pl-2 pr-4  sm:mb- focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                                    name="lastname" />
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label><input type="email"
                                                    onChange={(e) => { setform({ ...form, email: e.target.value }) }}
                                                    id="email" autoComplete="email" placeholder="Your email address"
                                                    className="mb-2 w-full rounded-md border border-gray-200 py-2 pl-2 pr-4  sm:mb-0 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                                    name="email" />
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="phone" className="pb-1 text-xs uppercase tracking-wider"></label><input type="text"
                                                    onChange={(e) => { setform({ ...form, phone: e.target.value }) }}
                                                    id="phone" autoComplete="given-phone" placeholder="Phone Number"
                                                    className="mb-2 w-full rounded-md border border-gray-200 py-2 pl-2 pr-4  sm:mb-0 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                                    name="name" />
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="issues" className="pb-1 text-xs uppercase tracking-wider"></label><input type="text"
                                                    onChange={(e) => { setform({ ...form, issue: e.target.value }) }}
                                                    id="issue" autoComplete="issue" placeholder="Enter Issue"
                                                    className="mb-2 w-full rounded-md border border-gray-200 py-2 pl-2 pr-4  sm:mb-0 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                                    name="issue" />
                                            </div>
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label><textarea
                                                onChange={(e) => { setform({ ...form, textarea: e.target.value }) }}
                                                id="textarea" name="textarea" cols="30" rows="5" placeholder="Write your message..."
                                                className="mb-2 w-full rounded-md border border-gray-200 py-2 pl-2 pr-4 sm:mb-0 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="button" onClick={handleContact}
                                            className="w-full bg-[#FFAE00] text-white px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                                    </div>
                                </form>



                            </div>


                            <div className="h-full pr-6">
                                <p className="mt-3 mb-12 text-lg text-gray-600">
                                    If you have any questions/comments please feel free to contact us
                                </p>
                                <ul className="mb-6 md:mb-0">
                                    <li className="flex">
                                        <div className="flex h-10 w-12 items-center justify-center rounded bg-[#FFAE00] text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="h-6 w-6">
                                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">Our Address</h3>
                                            <p className="text-gray-600">Sizeupp, F-434, Solaris 1 Indl Estate, Opp L & T Gate No.6, Saki Vihar Rd, Powai,</p>
                                            <p className="text-gray-600"> Andheri-East, Mumbai-400 072 India</p>
                                        </div>
                                    </li>

                                    <li className="flex">
                                        <div className="flex h-10 w-12 items-center justify-center rounded bg-[#FFAE00] text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="h-6 w-6">
                                                <path
                                                    d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                                </path>
                                                <path d="M15 7a2 2 0 0 1 2 2"></path>
                                                <path d="M15 3a6 6 0 0 1 6 6"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">Contact</h3>
                                            <p className="text-gray-600">Mobile: +91-8655255488</p>
                                            <p className="text-gray-600 flex gap-5"><span style={{color:"#24cc63"}}><FaSquareWhatsapp size={24}/></span>: +91-8655255488</p>
                                            <p className="text-gray-600">Mail: customercare@sizeupp.com</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-12 items-center justify-center rounded bg-[#FFAE00] text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="h-6 w-6">
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                                <path d="M12 7v5l3 3"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">Working hours</h3>
                                            <p className="text-gray-600">Monday - Friday: 10:30 - 6:30</p>
                                            <p className="text-gray-600">Weekends - Off</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Contact;