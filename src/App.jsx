import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import ProductList from "./pages/ProductList"
import ProductOverview from "./pages/ProductOverview"

import Register from "./pages/Register"
import { ProductCart } from "./pages/ProductCart"
import Home from "./pages/Home"
import { ProductFav } from "./pages/ProductFav"
import { ProductBilling } from "./pages/ProductBilling"

const App = () => {
  return (
    <div className={``}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Layout />} >
            <Route index element={<ProductList />} />
            <Route path="overview" element={<ProductOverview />} />
            <Route path="cart" element={<ProductCart />} />
            <Route path="favourite" element={<ProductFav />} />
            <Route path="billing" element={<ProductBilling />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App