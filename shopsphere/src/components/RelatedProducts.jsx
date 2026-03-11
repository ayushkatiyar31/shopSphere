import products from "../data/products"
import ProductCard from "./ProductCard"

function RelatedProducts({ currentProduct }) {
  if (!currentProduct) return null

  const related = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <div className="mt-16 mb-8 border-t border-gray-200 pt-16 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">You Might Also Like</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
