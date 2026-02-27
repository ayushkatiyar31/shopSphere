import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Navbar({ searchQuery, setSearchQuery }) {
  const { totalItems } = useContext(CartContext)

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 md:px-12 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      
      <h2 className="text-2xl font-bold tracking-wide text-indigo-400 hover:text-indigo-300 transition">
        ShopSphere
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-80 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      <div className="flex gap-8 items-center">
        
        <Link
          to="/"
          className="font-semibold text-lg hover:text-indigo-400 transition duration-300"
        >
          Home
        </Link>

        <Link
          to="/cart"
          className="relative font-semibold text-lg hover:text-indigo-400 transition duration-300"
        >
          Cart

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  )
}

export default Navbar