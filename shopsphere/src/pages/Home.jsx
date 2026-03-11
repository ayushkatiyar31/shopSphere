import { useState, useEffect } from "react"
import products from "../data/products"
import ProductCard from "../components/ProductCard"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

function Home() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState("")
  const [maxPrice, setMaxPrice] = useState(250000)
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const productsPerPage = 8 // Increased for better grid density

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(t)
  }, [search, category, sortOrder, maxPrice, currentPage])

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

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 py-12 px-6 sm:px-12 text-center overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
           <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[140%] rounded-full bg-indigo-50 blur-[100px] opacity-70" />
           <div className="absolute top-[20%] right-[-10%] w-[30%] h-[100%] rounded-full bg-blue-50 blur-[100px] opacity-70" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 animate-fade-in-up">
            Discover <span className="text-indigo-600">Premium</span> Quality
          </h1>
          <p className="text-gray-500 text-lg md:text-xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Explore our curated collection of high-end products designed to elevate your lifestyle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <SlidersHorizontal size={18} /> Filters
          </Button>
          <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
            {filteredProducts.length} Results
          </span>
        </div>

        {/* Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 space-y-8 animate-fade-in md:sticky md:top-24 h-max`}>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4">Search</h3>
            <Input
              icon={Search}
              placeholder="Find products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4">Category</h3>
            <div className="space-y-3">
              {["All", "Electronics", "Fashion", "Accessories"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className={`text-sm ${category === cat ? 'font-semibold text-indigo-600' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">Max Price</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="50"
              max="250000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4">Sort By</h3>
            <div className="relative">
              <select
                className="w-full appearance-none border border-gray-300 bg-white px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <SlidersHorizontal size={14} />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="hidden md:flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">All Products</h2>
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
              Showing {filteredProducts.length} results
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {Array.from({length: productsPerPage}).map((_, i) => (
                  <div key={i} className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-80 overflow-hidden">
                      <div className="w-full h-48 bg-gray-100 rounded-xl animate-pulse mb-4"></div>
                      <div className="w-2/3 h-4 bg-gray-100 rounded animate-pulse mb-2"></div>
                      <div className="w-1/3 h-4 bg-gray-100 rounded animate-pulse mb-4"></div>
                      <div className="w-1/4 h-6 bg-gray-100 rounded animate-pulse mt-auto relative overflow-hidden">
                         <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      </div>
                  </div>
               ))}
            </div>
          ) : currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-2xl border border-gray-200 border-dashed animate-fade-in-up">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 max-w-sm mb-6">
                We couldn't find any products matching your current filters. Try adjusting your search or category.
              </p>
              <Button onClick={() => { setSearch(""); setCategory("All"); setMaxPrice(250000); setSortOrder(""); }} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-600 ring-offset-2 scale-110"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Home