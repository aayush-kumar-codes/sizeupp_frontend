import React from 'react'

const ProductOverviewCar = () => {
    return (
        <div>
            <div className="animate-pulse">
                <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
                    <div className="w-full xl:flex justify-end xl:flex-row-reverse">
                        <div className="relative bg-gray-400 h-[620px] mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[600px]">
                            <div className="flex justify-center mx-auto items-center ">
                                {/* Image Current */}
                                <div
                                    className="rounded-lg  object-cover md:h-[550px] md:w-full lg:h-full cursor-pointer md:cursor-pointer"
                                  
                                />
                            </div>

                            {/* Controls */}
                            <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                                {/* Prev Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className=" p-1 mx-2 cursor-pointer"
                                >
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>

                                {/* Next Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className=" p-1 mx-2 cursor-pointer"
                                >
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>

                        {/*  Image Thumbnails */}
                        <div className="flex gap-2 xl:flex-col m-2 justify-center">
                            {Array.from({length : 5},(items, i) => {

                                return (
                                    <>
                                        <div key={i}
                                            className={`border-border-base bg-gray-400 flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75
                                                }`}
                                        >
                                            <div
                                                className="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                                            ></div>
                                        </div>

                                    </>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductOverviewCar