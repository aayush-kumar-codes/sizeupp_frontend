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
                <div className="text-center w-full p-2 py-3 mx-auto ">
                    <h1 className='text-3xl my-3 capitalize font-bold'>Our founders</h1>
                    <div className='lg:flex block items-center p-2'>
                        <div>
                            <img src={Img2} className='w-48 rounded-lg mx-auto' />
                            <h2 className="capitalize text-3xl font-bold">mr. anil saraf</h2>
                            <p className="p-4 mb-8">Mr. Anil Saraf is a seasoned businessman with an impressive three-decade-long career in the garment manufacturing industry. His illustrious journey encompasses collaborations with distinguished brands like Pantaloons, Jade Blue, and Mufti, solidifying his reputation as a trusted partner. Originating as a passionate entrepreneur, he has evolved to become a visionary leader in the field. His enduring success serves as a testament to his unwavering dedication and foresight in the dynamic world of fashion.</p>

                        </div>
                        <div>

                            <img src={Img1} className='w-48 rounded-lg mx-auto' />
                            <h2 className="capitalize text-3xl font-bold">mr. Vikash singh</h2>
                            <p className="p-4">The ingenious mind of our promising unconventional founder brings to you Sizeupp. A sourcing and product specialist with an appetite for creating beautiful and affordable clothes, geared up to make everyone find their right fit. Vikas, a NIFT alumnus with 16+ years in the trade, set out to revolutionise the plus-size apparel space. He aspires to forge a brand that provides an unrivalled range of quality plus-size clothes for every occasion.
                                </p>
                        </div>

                    </div>


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
                        Welcome to Sizeupp, where style meets inclusivity in every stitch. At Sizeupp , we redefine fashion by embracing the beauty of all body shapes and sizes. Our curated collection of plus-size apparel is a celebration of diversity, designed to empower individuals to express their authentic selves with confidence. Immerse yourself in a world where trendsetting designs, premium fabrics, and meticulous craftsmanship converge to create a wardrobe that transcends limitations. From casual chic to statement pieces, Sizeupp is your destination for fashion that fits and flatters, because we believe that everybody deserves to feel fabulous. Join us as we redefine the fashion landscape with a commitment to inclusivity and style beyond measure.

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
                            Sizeupp was founded on the fundamental belief that fashion should not be limited to a specific size range but should be an inclusive celebration of all body shapes. The company envisions a world where every individual can find trendy, comfortable, and high-quality clothing that not only fits their bodies but also resonates with their personal style and empowers them to feel confident in their skin.

                            At the core of Sizeupp values lies authenticity, diversity, and self-expression. The brand embraces authenticity by fostering a genuine connection with its customers, listening to their needs, and incorporating their feedback into every product they create. Furthermore, Sizeupp is dedicated to celebrating diversity in its designs, models, and marketing campaigns, ensuring that all individuals feel seen and represented.

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
                            Sizeupp offers a diverse range of clothing options for plus-size individuals, spanning from casual wear to formal attire. From stylish everyday essentials to statement pieces, each garment is thoughtfully designed with an emphasis on flattering cuts, comfortable fabrics, and contemporary trends. The brand has invested in extensive research and development to create garments that fit perfectly, accentuating curves and highlighting unique features. Sizeupp clothing line is designed to accommodate various body shapes, acknowledging that no two bodies are the same. The brand takes pride in offering plus-size individuals a wide selection of choices, allowing them to express their personalities through fashion without limitations.


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
