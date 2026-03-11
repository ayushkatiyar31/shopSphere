import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { ShoppingBag, Heart, Search, User } from "lucide-react"

function Navbar({ searchQuery, setSearchQuery }) {
  const { totalItems } = useContext(CartContext)
  const { wishlistItems } = useContext(WishlistContext)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:bg-indigo-500 transition">
              <ShoppingBag size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition">
              ShopSphere
            </span>
          </Link>

          {/* Search Bar - visually appealing, fallback logic for props */}
          <div className="hidden md:block flex-1 max-w-lg w-full px-4 mx-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search premium products..."
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-3">
            
            <Link to="/profile" className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors hidden sm:block">
              <User size={22} />
            </Link>

            <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors hidden sm:block">
              <Heart size={22} className={wishlistItems.length > 0 ? "fill-red-500 text-red-500 scale-110 transition-transform" : ""} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 h-4 w-4 text-[10px] font-bold text-white bg-indigo-600 rounded-full ring-2 ring-white animate-fade-in-up">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors flex items-center gap-2 group">
              <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 sm:static sm:top-auto sm:right-auto inline-flex items-center justify-center p-1 sm:px-2 sm:py-0.5 h-4 sm:h-5 w-4 sm:w-auto min-w-[16px] text-[10px] sm:text-xs font-bold text-white bg-indigo-600 rounded-full ring-2 sm:ring-0 ring-white animate-fade-in-up">
                  {totalItems} <span className="hidden sm:inline-block ml-1">items</span>
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar