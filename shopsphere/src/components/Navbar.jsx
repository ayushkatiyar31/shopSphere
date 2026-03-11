import { Link, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect, useRef } from "react"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { ShoppingBag, Heart, Search, User, X } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import products from "../data/products"

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const { totalItems } = useContext(CartContext)
  const { wishlistItems } = useContext(WishlistContext)
  const navigate = useNavigate()
  
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef()

  // Click outside listener for search suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter products based on search
  const suggestions = searchQuery && searchQuery.trim().length > 0 
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : []

  const handleSuggestionClick = (id) => {
    setShowSuggestions(false)
    if (setSearchQuery) setSearchQuery("")
    navigate(`/product/${id}`)
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-dark-background/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] transition">
              <ShoppingBag size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              ShopSphere
            </span>
          </Link>

          {/* Search Bar with Suggestions */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-lg w-full px-4 mx-auto relative">
            <div className="relative group z-20">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search premium products..."
                value={searchQuery || ""}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                className="block w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700/50 rounded-full text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-dark-surface transition-all shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => {
                    setSearchQuery("")
                    setShowSuggestions(false)
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery && suggestions.length > 0 && (
              <div className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-dark-surface rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-fade-in-up">
                <div className="p-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/30 px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                  Products
                </div>
                <ul className="max-h-80 overflow-y-auto custom-scrollbar">
                  {suggestions.map(s => (
                    <li key={s.id}>
                      <button 
                        onClick={() => handleSuggestionClick(s.id)}
                        className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-indigo-500 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center p-1 overflow-hidden shrink-0">
                          <img src={s.image} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{s.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{s.category}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-300">₹{s.price}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="p-3 bg-gray-50 dark:bg-white/5 text-center border-t border-gray-100 dark:border-gray-800">
                  <Link to="/" onClick={() => setShowSuggestions(false)} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 transition-colors">
                    See all results <Search size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            <ThemeToggle />

            <Link to="/profile" className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 rounded-full transition-colors hidden sm:block">
              <User size={22} />
            </Link>

            <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 rounded-full transition-colors hidden sm:block">
              <Heart size={22} className={wishlistItems.length > 0 ? "fill-red-500 text-red-500 scale-110 transition-transform" : ""} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 h-4 w-4 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-white dark:ring-dark-background animate-fade-in-up">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 group">
              <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 sm:static sm:top-auto sm:right-auto inline-flex items-center justify-center p-1 sm:px-2 sm:py-0.5 h-4 sm:h-5 w-4 sm:w-auto min-w-[16px] text-[10px] sm:text-xs font-bold text-white bg-indigo-600 rounded-full ring-2 sm:ring-0 ring-white dark:ring-dark-background animate-fade-in-up">
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