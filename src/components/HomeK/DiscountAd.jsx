import { DiscountAdImages } from "../../constants/DsicountAd"


export default function DiscountAd() {
    return (
        <div className='w-full h-[30rem] flex justify-center items-center'>
            <div className='rounded-lg w-[90%] h-full flex justify-evenly bg-secondary-color overflow-hidden'>
                <div className='md:w-[40%] flex flex-col justify-center md:items-start gap-4 w-[100%] items-center text-center'>
                    <h1 className="font-bold text-3xl">Sale! Get everything at flat 15% off.</h1>
                    <span>Offer valid on selected items only.</span>
                    <button className="bg-black w-40 h-12 rounded-full text-white text-lg">View Collection</button>
                </div>
                <div className='relative w-[50%] hidden md:block'>
                    {/* Line One */}
                    <div className='absolute top-[35%] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[0].img} alt="" /></div>
                    <div className='absolute top-[-20%] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[1].img} alt="" /></div>
                    <div className='absolute top-[90%] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[2].img} alt="" /></div>
                    {/* Line Two */}
                    <div className='absolute top-[0%] left-[12rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[3].img} alt="" /></div>
                    <div className='absolute top-[55%] left-[12rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[4].img} alt="" /></div>
                    {/* Line Three */}
                    <div className='absolute top-[-20%] left-[24rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[5].img} alt="" /></div>
                    <div className='absolute top-[35%] left-[24rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[6].img} alt="" /></div>
                    <div className='absolute top-[90%] left-[24rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[7].img} alt="" /></div>
                    {/* Line Four */}
                    <div className='absolute top-[0%] left-[36rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[8].img} alt="" /></div>
                    <div className='absolute top-[55%] left-[36rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[9].img} alt="" /></div>
                    {/* Line Five */}
                    <div className='absolute top-[-20%] left-[48rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[10].img} alt="" /></div>
                    <div className='absolute top-[35%] left-[48rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[11].img} alt="" /></div>
                    <div className='absolute top-[90%] left-[48rem] h-[15rem] w-[11rem] rounded overflow-hidden '><img src={DiscountAdImages[12].img} alt="" /></div>
                </div>
            </div>
        </div>
    )
}
