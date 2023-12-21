import React from 'react'

export default function Newsletter() {
    return (
        <div className='w-full min-h-80 bg-secondary-color flex flex-col justify-center items-center text-center gap-6 py-10'>
            <h1 className='font-bold text-4xl'>Want product updates and latest discounts?</h1>
            <span className='font-semibold text-xl'>Sign up for our newsletter.</span>
            <div className='flex justify-center items-center gap-4 sm:flex-wrap'>
                <input type="text" placeholder='Enter your email' className='block max-w-[50rem] h-10 rounded-lg border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ' />
                <button className='border-[1px] bg-accent-color text-accent-complementary w-[10rem] h-10 rounded-lg '>Subscribe</button>
            </div>
        </div>
    )
}
