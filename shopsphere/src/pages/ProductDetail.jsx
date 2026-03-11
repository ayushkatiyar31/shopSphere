import { useParams, Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import products from "../data/products"
import { CartContext } from "../context/CartContext"
import { ToastContext } from "../context/ToastContext"
import { WishlistContext } from "../context/WishlistContext"
import { ShoppingBag, Heart, Star, ShieldCheck, Truck, RotateCcw, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import ReviewsList from "../components/ReviewsList"
import RelatedProducts from "../components/RelatedProducts"
import RecentlyViewed from "../components/RecentlyViewed"

function ProductDetail() {
  const { id } = useParams()
  const productId = parseInt(id)
  
  const { addToCart } = useContext(CartContext)
  const { addToast } = useContext(ToastContext)
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext)

  const product = products.find((item) => item.id === productId)
  const isWished = product ? isInWishlist(product.id) : false

  // Store in recently viewed
  useEffect(() => {
    if (product) {
      const saved = localStorage.getItem("recentlyViewed")
      let recentlyViewed = saved ? JSON.parse(saved) : []
      // Remove if it exists
      recentlyViewed = recentlyViewed.filter(itemId => itemId !== productId)
      // Unshift to the start
      recentlyViewed.unshift(productId)
      // Keep only last 10
      recentlyViewed = recentlyViewed.slice(0, 10)
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))
    }
  }, [productId, product])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  const handleAddToCart = () => {
    addToCart(product)
    addToast({
      title: "Added to Cart",
      description: `${product.title} was added to your cart.`,
      type: "success"
    })
  }
  
  const handleWishlist = () => {
    toggleWishlist(product)
    addToast({
      title: isWished ? "Removed from Wishlist" : "Added to Wishlist",
      description: product.title,
      type: "info"
    })
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const mockRating = (4 + (product.id % 10) * 0.1).toFixed(1)
  const reviewCount = 84 + (product.id * 13) % 150

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Core Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Image Gallery Mock */}
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="w-full aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden group">
              <button 
                onClick={handleWishlist}
                className="absolute top-4 right-4 z-10 p-3 bg-white/80 backdrop-blur-md rounded-full shadow hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Heart size={24} className={isWished ? "fill-red-500 text-red-500" : "text-gray-500"} />
              </button>
              
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-xl mix-blend-multiply"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className={`aspect-square rounded-lg border ${idx === 1 ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-200'} bg-gray-50 p-2 cursor-pointer hover:border-indigo-400 transition-colors`}>
                  <img src={product.image} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col h-full animate-fade-in-up">
            <Badge className="w-max mb-4" variant="secondary">{product.category}</Badge>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(mockRating) ? "fill-current" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-indigo-600 font-semibold text-sm">{mockRating} Rating</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 text-sm hover:underline cursor-pointer">{reviewCount} Reviews</span>
            </div>

            <p className="text-4xl font-bold text-gray-900 mb-6">
              ₹{product.price}
              <span className="block text-sm font-normal text-gray-500 mt-1">Inclusive of all taxes</span>
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Experience the pinnacle of {" "} {product.category.toLowerCase()} design with the {product.title}. 
              Crafted from premium materials, it ensures unparalleled durability and performance for everyday use.
            </p>

            <div className="flex gap-4 pb-8 mb-8 border-b border-gray-200">
              <Button size="lg" className="flex-1 text-base gap-2" onClick={handleAddToCart}>
                <ShoppingBag size={20} /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="px-8 flex-none border-indigo-200 text-indigo-700 hover:bg-indigo-50" onClick={handleWishlist}>
                <Heart size={20} className={isWished ? "fill-current" : ""} />
              </Button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm text-gray-600">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                  <ShieldCheck size={24} />
                </div>
                <span className="font-medium">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                  <Truck size={24} />
                </div>
                <span className="font-medium">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                  <RotateCcw size={24} />
                </div>
                <span className="font-medium">10 Days Return</span>
              </div>
            </div>

          </div>
        </div>

        {/* Extensions */}
        <ReviewsList />
        <RelatedProducts currentProduct={product} />
        <RecentlyViewed currentProductId={productId} />

      </div>
    </div>
  )
}

export default ProductDetail