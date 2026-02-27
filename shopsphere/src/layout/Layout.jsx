import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BackToTop from "../components/BackToTop"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 scroll-smooth">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back To Top Button */}
      <BackToTop />

    </div>
  )
}

export default Layout