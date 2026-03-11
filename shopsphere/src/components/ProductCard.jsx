import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { ToastContext } from "../context/ToastContext"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

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

  // Subtly inject badges on fixed modulo intervals
  const isTrending = product.id % 4 === 0;
  const isBestSeller = product.id % 5 === 0 && !isTrending;
  const isNew = product.id % 7 === 0 && !isTrending && !isBestSeller;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-dark-surface rounded-2xl border border-gray-200/60 dark:border-gray-800 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] transition-all duration-300 transform hover:-translate-y-1 hover:border-indigo-500/30 overflow-hidden">
      
      {/* Wishlist Toggle */}
      <button 
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-dark-background/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-dark-background hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <Heart size={18} className={isWished ? "fill-red-500 text-red-500" : "text-gray-500 dark:text-gray-400"} />
      </button>

      {/* Badges */}
      {isTrending && <span className="absolute top-3 left-3 z-10 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">Trending</span>}
      {isBestSeller && <span className="absolute top-3 left-3 z-10 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">Best Seller</span>}
      {isNew && <span className="absolute top-3 left-3 z-10 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">New</span>}

      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col relative overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-white dark:bg-dark-surface flex items-center justify-center p-6 border-b border-gray-50 dark:border-gray-800/50 group-hover:bg-gray-50/20 dark:group-hover:bg-white/5 transition-colors duration-300">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 drop-shadow-md mix-blend-multiply dark:mix-blend-normal"
          />
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-center bg-gradient-to-t from-white/95 via-white/80 to-transparent">
            <Button onClick={handleAddToCart} size="sm" className="w-full shadow-lg gap-2">
              <ShoppingBag size={16} /> Quick Add
            </Button>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <Badge className="w-max mb-3 dark:bg-white/10 dark:text-gray-300" variant="secondary">{product.category}</Badge>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center text-yellow-500 dark:text-yellow-400 gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(mockRating) ? "fill-current" : "text-gray-300 dark:text-gray-600"} />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({84 + product.id})</span>
          </div>
          
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
              ₹{product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="lg:opacity-0 lg:group-hover:opacity-100 p-2.5 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all transform active:scale-95 z-20"
              aria-label="Add to cart"
            >
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard