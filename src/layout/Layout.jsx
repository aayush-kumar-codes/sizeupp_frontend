import Footer from "../components/Footer/Footer"
import Megamenu from "../components/Megamenu"
import MobileNav from "../components/MobileNav"
import { Navbar } from "../components/Navbar"
import { Outlet } from "react-router-dom"
import AdvertisementCarousel from "../components/Slider/AdvertisementCarousel"

const Layout = () => {
  return (
    <div>
      <AdvertisementCarousel />
      <Navbar />
      <Megamenu />
      <Outlet />
      <MobileNav />
      <Footer />
    </div>
  )
}

export default Layout