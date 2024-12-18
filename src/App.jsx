import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import ProductOverview from "./pages/ProductOverview"

import Register from "./pages/Register"
import { ProductCart } from "./pages/ProductCart"
import { ProductFav } from "./pages/ProductFav"
import { ProductBilling } from "./pages/ProductBilling"
import { Login } from "./pages/Login"
import ProtectedRoute from "./utils/ProtectedRoute"
import LayoutAuth from "./layout/LayoutAuth"
import Notfound from "./pages/NotFound"
import Otp from "./pages/OTP"
import ProfileProtect from "./utils/ProfileProtect"
import ResetPassword from "./pages/ResetPassword"
import Forgot from "./pages/Forgot"
import ProductLayout2 from "./pages/ProductLayout2"
import OrderHistory from "./pages/Account/OrderHistory"
import TrackOrder from "./pages/Account/TrackOrder"
import Invoice from "./pages/Account/Invoice"
import OrderDetail from "./pages/Account/OrderDetail"
import Account from "./pages/Account/Account"
import Profileview from "./pages/ProfileView"
import HomeK from "./pages/HomeK"
import Contact from "./pages/Account/Contact"
import ManageAccount from "./pages/Account/ManageAccount"
import ManageAddress from "./pages/Account/ManageAddress"
import PaymentSuccessfull from "./pages/PaymentSuccessfull"
import PaymentUnsuccess from "./pages/PaymentUnsuccess"
import TermsCondition from "./constants/TermsCondition"
import ReturnPolicy from "./constants/ReturnPolicy"
import PrivacyPolicy from "./constants/PrivacyPolicy"
import AboutUs from "./constants/AboutUs"
import ShippingPolicy from "./constants/ShippingPolicy"
import Faq from "./constants/Faq"
import CancellationPolicy from "./constants/CancellationPolicy"
import { useContext, useEffect } from "react"
import { AuthContext } from "./context/AuthProvider"
import CancellReturnForm from "./pages/Account/CancellReturnForm"


const App = () => {
  const { fetchCategory, handleValidateToken, fetchProfileData } = useContext(AuthContext)
  useEffect(() => {
    fetchCategory()
    handleValidateToken()
    if (localStorage.getItem("cat_list")) {
      localStorage.removeItem("cat_list")
    }
  }
    , []);
  return (
    <div className={` `}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomeK />} />
          <Route path="/" element={<LayoutAuth />} >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="otp" element={<Otp />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route path="payment-success" element={<PaymentSuccessfull />} />
            <Route path="payment-failed" element={<PaymentUnsuccess />} />
            <Route path="terms-condition" element={<TermsCondition />} />
            <Route path="return-policy" element={<ReturnPolicy />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="faq" element={<Faq />} />
            <Route path="cancellation-policy" element={<CancellationPolicy />} />
            <Route path="contact" element={<Contact />} />

            <Route path="profile" element={<ProtectedRoute><ProfileProtect><Profileview /></ProfileProtect></ProtectedRoute>} >
              <Route index element={<Account />} />
              <Route path="my-orders" element={<OrderHistory />} />
              <Route path="track-order/:id" element={<TrackOrder />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="order-details/:id" element={<OrderDetail />} />
              <Route path="cancel-return/:id" element={<CancellReturnForm />} />
              <Route path="contact" element={<Contact />} />
              <Route path="account-settings" element={<ManageAccount />} />
              <Route path="manage-address" element={<ManageAddress />} />

            </Route>
          </Route >
          <Route path="/products" element={<Layout />} >
            <Route index element={<ProductLayout2 />} />
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