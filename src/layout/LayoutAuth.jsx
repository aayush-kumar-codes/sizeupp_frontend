import Footer from "../components/Footer/Footer"
import { Navbar } from "../components/Navbar"
import {Outlet} from "react-router-dom"

const LayoutAuth = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default LayoutAuth