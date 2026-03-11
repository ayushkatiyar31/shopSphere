import { useContext } from "react"
import { Link } from "react-router-dom"
import { WishlistContext } from "../context/WishlistContext"
import ProductCard from "../components/ProductCard"
import { Button } from "../components/ui/Button"
import { Heart, ArrowRight } from "lucide-react"

function Wishlist() {
  const { wishlistItems } = useContext(WishlistContext)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <Heart size={32} className="text-red-500 fill-red-50 dark:fill-red-500/20" /> Your Wishlist
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0 font-medium">{wishlistItems.length} saved items</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-16 text-center shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center animate-fade-in-up">
            <div className="bg-red-50 dark:bg-red-500/10 p-6 rounded-full mb-6 text-red-400 dark:text-red-500">
              <Heart size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              It's feeling a little empty here
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
              Explore our premium products and save your favorites here for later.
            </p>
            <Link to="/">
              <Button size="lg" className="px-8 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:shadow-indigo-900/20">
                Explore Products <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
