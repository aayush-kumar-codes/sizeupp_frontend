import React from 'react';
import Img1 from './founder1.png'
import Img2 from './founder2.png'

const AboutUs = () => {
    return (
        <>

            <div className=" p-6 max-w-7xl mx-auto my-8">
                <h2 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    About US
                </h2>
                <div className="text-center w-full p-2 py-3 mx-auto">
                    <h1 className='text-3xl my-3 capitalize font-bold'>Our founders</h1>
                    <img src={Img2} className='w-48 rounded-lg mx-auto' />
                    <h2 className="capitalize text-3xl font-bold">mr. anil saraf</h2>
                    <p className="p-4 mb-8">Mr. Anil Saraf is a seasoned businessman with an impressive three-decade-long career as a garment manufacturer. His illustrious journey includes collaborations with renowned brands such as Pantaloons, Jade Blue and Mufti, solidifying his reputation as a trusted partner. His journey began as a passionate entrepreneur, and today, he stands as a visionary leader in the field. His enduring success stands as a testament to his dedication and vision in the world of fashion.</p>
                    <img src={Img1} className='w-48 rounded-lg mx-auto' />
                    <h2 className="capitalize text-3xl font-bold">mr. vikas singh</h2>
                    <p className="p-4">The ingenious mind of our little unconventional founder brings to you Sizeupp. A sourcing and product specialist with a never-ending hunger for creating beautiful and affordable clothes geared up to make everyone find their right fit!
                        Vikash is a Nift alumni with 16+ years in the trade set out to revolutionise the plus size apparels space. He aspires to create a brand that can provide plus size individuals &apos; clothes for every occasion.</p>

                </div>

                <div className="flex flex-wrap items-center my-20 text-center">
                    <div className="w-full md:w-3/5 lg:w-1/2 px-4">
                        <img src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="gem" className="inline-block rounded shadow-lg border border-merino-400" />
                    </div>
                    <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
                        <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                            Introduction
                        </h3>
                        <p className="sm:text-lg mt-6">
                            The fashion industry is slowly but surely starting to recognize the beauty in all body types. We hear talk about size-inclusive fashion and see plus-size models across ad campaigns. However, this appreciation falls short when it comes to actual shoppable fashion choices in-store. Sizeupp is here to fix just this.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center mt-20 text-center">
                    <div className="w-full md:w-3/5 lg:w-1/2 px-4">
                        <img src="https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="project members" className="inline-block rounded shadow-lg border border-merino-400" />
                    </div>
                    <div className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
                        <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                            Vision and Values
                        </h3>
                        <p className="sm:text-lg mt-6">
                            Sizeupp was founded on the fundamental belief that fashion should not be limited to a specific size range. It should be a welcoming space for all body shapes and sizes. We envision a world where every plus-size individual can easily find trendy, comfortable, and high-quality clothing that not only fits their bodies but also gives them the ability to express themselves through fashion.

                            Our core values are authenticity, inclusivity, and self-expression. Sizeupp is dedicated to celebrating these values through its designs, models, and marketing campaigns, thus ensuring that our customers feel seen and represented.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center mt-20  text-center">
                    <div className="w-full md:w-3/5 lg:w-1/2 px-4">
                        <img src="https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="editor" className="inline-block rounded shadow-lg border border-merino-400" />
                    </div>
                    <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
                        <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                            Product Range

                        </h3>
                        <p className="sm:text-lg mt-6">
                            Whether you are looking for everyday essentials, office wear, or an outfit for a fun night out, Sizeupp`s diverse collection has something for everyone.

                            Our dedicated design team spends an extensive amount of time researching and developing garments that fit perfectly and accentuate the beauty of bigger bodies.


                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center mt-20 text-center">
                    <div className="w-full md:w-3/5 lg:w-1/2 px-4">
                        <img src="https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="bulk editing" className="inline-block rounded shadow-lg border border-merino-400" />
                    </div>
                    <div className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
                        <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                            Empowering Fashion for All

                        </h3>
                        <p className="sm:text-lg mt-6">
                            Fashion is a world of endless possibilities that enables us to express our individuality. We at Sizeupp believe that everyone should have the freedom to dress as they please irrespective of their size and gender.
                            <br />
                            Let Sizeupp inspire you to bring forth your fashion A-game!
                        </p>
                    </div>
                </div>

            </div>

        </>
    );
};

export default AboutUs;
