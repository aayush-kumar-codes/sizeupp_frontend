import { useEffect, useState } from "react"

const AdvertisementCarousel = () => {
    const [discountAd, setDiscountAd] = useState("")

    useEffect(() => {
        const scrollData = async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/text-scrolling`, {
                method: "GET"
            })
            const data = await response.json()
            setDiscountAd(data.text)
        }
        scrollData();
    }, [])
    return (
        <>
            {discountAd && (
                <div className="text-container bg-[#fff] text-[#000]">
                    <div className="side-animation flex items-center">
                        <p className="font-semibold capitalize md:tracking-widest">{discountAd}</p>
                    </div>
                </div>
            )}
        </>

    )
}

export default AdvertisementCarousel
