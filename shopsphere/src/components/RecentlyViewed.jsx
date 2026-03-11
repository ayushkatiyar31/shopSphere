import { useEffect, useState } from "react"
import products from "../data/products"
import ProductCard from "./ProductCard"

function RecentlyViewed({ currentProductId }) {
  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed")
    if (saved) {
      const parsedIds = JSON.parse(saved)
      const ids = parsedIds.filter(id => id !== currentProductId).slice(0, 4)
      const mapped = ids.map(id => products.find(p => p.id === id)).filter(Boolean)
      setRecentProducts(mapped)
    }
  }, [currentProductId])

  if (recentProducts.length === 0) return null

  return (
    <div className="mt-20 mb-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed
