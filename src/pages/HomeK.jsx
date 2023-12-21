import React from 'react'
import Carousel from '../components/HomeK/Carousel'
import Products from '../components/HomeK/Products'
import DiscountAd from '../components/HomeK/DiscountAd'
import ShopCategoryWise from '../components/HomeK/ShopCategory'
import Newsletter from '../components/HomeK/Newsletter'
import Megamenu from '../components/Megamenu'

const HomeK = () => {
    return (
        <>
            <Megamenu />
            <Carousel />
            <div className='mt-16 mb-16'></div>
            <Products />
            <div className='mt-16 mb-16'></div>
            <DiscountAd />
            <div className='mt-16 mb-16'></div>
            <ShopCategoryWise />
            <div className='mt-16 mb-16'></div>
            {/* <Newsletter /> */}
        </>
    )
}

export default HomeK