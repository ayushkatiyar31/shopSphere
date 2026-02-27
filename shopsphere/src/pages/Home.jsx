import { useState, useEffect } from "react"
import products from "../data/products"
import ProductCard from "../components/ProductCard"

function Home() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState("")
  const [maxPrice, setMaxPrice] = useState(10000)
  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 4

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, category, sortOrder, maxPrice])

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === "All" ? true : product.category === category
    )
    .filter((product) => product.price <= maxPrice)
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price
      if (sortOrder === "high") return b.price - a.price
      return 0
    })

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  )

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">

      {/* Sidebar */}
      <div className="md:w-72 w-full bg-white p-6 shadow-md md:sticky md:top-0 md:h-screen overflow-y-auto">

        <h2 className="text-xl font-bold mb-6">Filters</h2>

        {/* Search */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Search</label>
          <input
            type="text"
            placeholder="Search..."
            className="w-full border p-2 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <select
            className="w-full border p-2 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Max Price: ₹{maxPrice}
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Sorting */}
        <div>
          <label className="block font-semibold mb-2">Sort By</label>
          <select
            className="w-full border p-2 rounded-lg"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Default</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

      </div>

      {/* Products Section */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-4">
          Products
        </h1>

        <p className="text-gray-600 mb-6">
          Showing {filteredProducts.length} results
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>

    </div>
  )
}

export default Home