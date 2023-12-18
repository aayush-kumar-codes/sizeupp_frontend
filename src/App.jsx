import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import ProductList from "./pages/ProductList"
import ProductOverview from "./pages/ProductOverview"

import Register from "./pages/Register"
import { ProductCart } from "./pages/ProductCart"
import Home from "./pages/Home"
import { ProductFav } from "./pages/ProductFav"
import { ProductBilling } from "./pages/ProductBilling"
import { Login } from "./pages/Login"
import ProtectedRoute from "./utils/ProtectedRoute"
import LayoutAuth from "./layout/LayoutAuth"
import Notfound from "./pages/NotFound"
import Profileview from "./pages/ProfileView"
import Account from "./pages/Account"
import UnderConstruction from "./pages/UnderConstruction"
import Otp from "./pages/OTP"
import ProfileProtect from "./utils/ProfileProtect"
import ResetPassword from "./pages/ResetPassword"
import Forgot from "./pages/Forgot"

const App = () => {
  return (
    <div className={``}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LayoutAuth />} >
            <Route index element={<UnderConstruction />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="otp" element={<Otp />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route path="profile" element={<ProfileProtect><Profileview /></ProfileProtect>} >
              <Route index element={<Account />} />
            </Route>
          </Route >
          <Route path="/products" element={<Layout />} >
            <Route index element={<ProductList />} />
            <Route path=":id" element={<ProductOverview />} />
            <Route path="cart" element={<ProductCart />} />
            <Route path="favourite" element={<ProductFav />} />
            <Route path="billing" element={
              <ProtectedRoute>
                <ProductBilling />
              </ProtectedRoute>
            } />
            
          </Route>
          <Route path="*" element={<Notfound />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App