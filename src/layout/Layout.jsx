import Megamenu from "../components/Megamenu"
import { Navbar } from "../components/Navbar"
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div>
        <Navbar />
        <Megamenu />
        <Outlet />
    </div>
  )
}

export default Layout