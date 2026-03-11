import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { ToastContext } from "../context/ToastContext"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "./ui/Button"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext)
  const { addToast } = useContext(ToastContext)

  const isWished = isInWishlist(product.id)

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    addToast({
      title: isWished ? "Removed from Wishlist" : "Added to Wishlist",
      description: product.title,
      type: "info"
    })
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    addToast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
      type: "success"
    })
  }

  // Generate a mock rating between 4.0 and 5.0 based on product ID
  const mockRating = (4 + (product.id % 10) * 0.1).toFixed(1)

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      
      {/* Wishlist Toggle */}
      <button 
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <Heart size={18} className={isWished ? "fill-red-500 text-red-500" : "text-gray-500"} />
      </button>

      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col relative overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-6 border-b border-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
            loading="lazy"
          />
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-center bg-gradient-to-t from-white/95 via-white/80 to-transparent">
            <Button onClick={handleAddToCart} size="sm" className="w-full shadow-lg gap-2">
              <ShoppingBag size={16} /> Quick Add
            </Button>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between bg-gray-50/50">
          <div>
            <div className="flex items-center gap-1 mb-2 text-yellow-500">
              <Star size={14} className="fill-current" />
              <span className="text-xs font-semibold text-gray-700">{mockRating}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
              {product.title}
            </h3>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard