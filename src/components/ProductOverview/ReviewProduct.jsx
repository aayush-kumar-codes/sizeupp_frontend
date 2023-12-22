import { StarIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarFillIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const ReviewProduct = ({ id }) => {
    const [reviewData, setReviewData] = useState({
        rating: 0,
        comment: ''
    })

    const handleChangeHeart = (count) => {
        setReviewData({
            ...reviewData,
            rating: count
        })
    }

    const navigate = useNavigate()

    const handleReviewSubmit = async () => {
        try {
            if (!localStorage.token) {
                return navigate('/login')
            }
            console.log(reviewData,id);
            if(reviewData.rating === 0 || reviewData.comment === ''){
                return Swal.fire({
                    title: 'Error!',
                    text: 'Please fill all the fields',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/product/review_post`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: id,
                    rating: reviewData.rating,
                    comment: reviewData.comment
                })
            })
            if (!res.ok) {
                throw new Error(`Please Logged in again: ${res.status}`);
            }
            const data = await res.json()
            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: 'Product Added to Wishlist',
                icon: 'success',
            })
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

    return (
        <section className="flex items-center py-1 font-poppins  ">
            <div className="justify-center flex-1 max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* <div className="p-6 mb-6 bg-gray-50 ">
                        <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 ">
                            Ratings & Reviews</h2>
                        <div className="flex justify-start ">
                            <div
                                className="flex items-center mb-2 space-x-2 text-3xl leading-none text-gray-600 ">
                                <div className="items-center font-bold ">4.0/5</div>
                                <div className="items-center">
                                    <ul className="flex items-center ">
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-orange-500  bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-orange-500  bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-orange-500  bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-orange-500  bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-orange-500  bi bi-star-half"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="mb-6 text-xs ">16 customer reviews</div>
                        <div className="pb-1 mb-6">
                            <div className="flex items-center mb-3">
                                <div className="flex mr-2 text-xs text-black ">
                                    <span className="mr-1">4</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" fill="currentColor"
                                        className="w-3 h-3 text-orange-500  bi bi-star-fill"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                        </path>
                                    </svg>
                                </div>
                                <div className="w-full h-3 mr-2 bg-gray-200 md:w-80 ">
                                    <div className="h-3 bg-orange-500 " style={{ width: "75%" }}></div>
                                </div>
                                <div className="flex justify-end text-xs font-medium ">91% </div>
                            </div>
                            <div className="flex items-center mb-3">
                                <div className="flex mr-2 text-xs text-black ">
                                    <span className="mr-1">3</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" fill="currentColor"
                                        className="w-3 h-3 text-orange-500  bi bi-star-fill"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                        </path>
                                    </svg>
                                </div>
                                <div className="w-full h-3 mr-2 bg-gray-200 md:w-80 ">
                                    <div className="h-3 bg-orange-500 " style={{ width: "45%" }}></div>
                                </div>
                                <div className="flex justify-end text-xs font-medium ">45% </div>
                            </div>
                            <div className="flex items-center mb-3">
                                <div className="flex mr-2 text-xs text-black ">
                                    <span className="mr-1">2</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" fill="currentColor"
                                        className="w-3 h-3 text-orange-500  bi bi-star-fill"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                        </path>
                                    </svg>
                                </div>
                                <div className="w-full h-3 mr-2 bg-gray-200 md:w-80 ">
                                    <div className="h-3 bg-orange-500 " style={{ width: "25%" }}></div>
                                </div>
                                <div className="flex justify-end text-xs font-medium ">25% </div>
                            </div>
                            <div className="flex items-center ">
                                <div className="flex mr-2 text-xs text-black ">
                                    <span className="mr-1">1</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" fill="currentColor"
                                        className="w-3 h-3 text-orange-500  bi bi-star-fill"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                        </path>
                                    </svg>
                                </div>
                                <div className="w-full h-3 mr-2 bg-gray-200 md:w-80 ">
                                    <div className="h-3 bg-orange-500 " style={{ width: "14%" }}></div>
                                </div>
                                <div className="flex justify-end text-xs font-medium ">14% </div>
                            </div>
                        </div>
                        
                    </div> */}
                    <div className="p-6 mb-6 bg-white ">
                        <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 ">
                            Review </h2>
                        <form action="" className="">
                            <div className="mb-6 flex">
                                <p className="text-base  mr-2 font-semibold">Rating: </p>
                                {
                                    [1, 2, 3, 4, 5].map((item, i) => {
                                        return (
                                            <span key={i}>
                                                {
                                                    item <= reviewData.rating ? <StarFillIcon onClick={() => { handleChangeHeart(item) }} className='w-6 h-6 text-orange-500 cursor-pointer' /> : <StarIcon onClick={() => { handleChangeHeart(item) }} className='w-6 h-6 text-orange-500 cursor-pointer' />
                                                }
                                            </span>
                                        )
                                    })
                                }
                            </div>
                            <div className="mb-6 ">
                                <textarea type="message" defaultValue={reviewData.comment} onChange={(e) => { setReviewData({ ...reviewData, comment: e.target.value }) }} placeholder="write a comment" required=""
                                    className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 border rounded  py-7"></textarea>
                            </div>
                            <div className="">
                                <button
                                    onClick={handleReviewSubmit}
                                    type="button"
                                    className="px-4 py-2 rounded-md text-xs font-medium text-gray-100 bg-orange-500 hover:bg-orange-700  ">
                                    Submit comment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ReviewProduct