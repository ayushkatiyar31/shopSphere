import { Link } from "react-router-dom"

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-xl font-bold text-indigo-600 mb-4">
          ₹{product.price}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
        >
          View Details
        </Link>
      </div>

    </div>
  )
}

export default ProductCard