import { Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import ProductDetail from "./pages/ProductDetail"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Wishlist from "./pages/Wishlist"
import Profile from "./pages/Profile"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App