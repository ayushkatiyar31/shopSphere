import ProductCard from "./ProductCard"
import { ArrowRight } from "lucide-react"

export default function ProductCarousel({ title, subtitle, products }) {
  if (!products || products.length === 0) return null

  return (
    <section className="py-12 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
            {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>}
          </div>
          <button className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors group">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
