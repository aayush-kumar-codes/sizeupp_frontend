import Footer from "../components/Footer/Footer"
import Megamenu from "../components/Megamenu"
import MobileNav from "../components/MobileNav"
import { Navbar } from "../components/Navbar"
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div>
        <Navbar />
        <Megamenu />
        <Outlet />
        <MobileNav/>
        <Footer />
    </div>
  )
}

export default Layout