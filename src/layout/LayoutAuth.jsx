import Footer from "../components/Footer/Footer"
import MobileNav from "../components/MobileNav"
import { Navbar } from "../components/Navbar"
import {Outlet} from "react-router-dom"

const LayoutAuth = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <MobileNav/>
        <Footer />
    </div>
  )
}

export default LayoutAuth