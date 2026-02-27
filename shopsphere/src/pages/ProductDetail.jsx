import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import products from "../data/products"
import { CartContext } from "../context/CartContext"

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const [showToast, setShowToast] = useState(false)

  const product = products.find(
    (item) => item.id === parseInt(id)
  )

  const handleAddToCart = () => {
    addToCart(product)
    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }

  if (!product) {
    return (
      <h2 className="text-center text-2xl font-semibold py-20">
        Product Not Found
      </h2>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 md:px-12 py-16 relative">

      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
          Added to Cart ✅
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
        
        <div className="w-full md:w-1/2 overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-cover rounded-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h2>

          <p className="text-2xl font-bold text-indigo-600 mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mb-8 leading-relaxed">
            This is a high-quality product available at the best price.
            Premium build, modern design, and reliable performance.
          </p>

          <button
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail