import { useState, useEffect } from "react"
import products from "../data/products"
import ProductCard from "../components/ProductCard"
import ProductCarousel from "../components/ProductCarousel"
import { Search, SlidersHorizontal, ChevronRight, ChevronLeft } from "lucide-react"
import { Input } from "../components/ui/Input"
import { Badge } from "../components/ui/Badge"
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
    indexOfLastProduct,
  )

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: document.getElementById("product-grid").offsetTop - 100, behavior: 'smooth' })
  }

  // Pre-calculate sections
  const trendingProducts = products.filter(p => p.id % 4 === 0).slice(0, 4)
  const bestSellers = products.filter(p => p.id % 5 === 0 && p.id % 4 !== 0).slice(0, 4)

  return (
    <div className="bg-gray-50 dark:bg-dark-background min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-gray-800 py-16 px-6 sm:px-12 text-center overflow-hidden relative transition-colors duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[140%] rounded-full bg-indigo-50 dark:bg-indigo-900/20 blur-[100px] opacity-70 transition-colors duration-700" />
           <div className="absolute top-[20%] right-[-10%] w-[30%] h-[100%] rounded-full bg-blue-50 dark:bg-blue-900/20 blur-[100px] opacity-70 transition-colors duration-700" />
           <div className="absolute bottom-[-20%] left-[40%] w-[30%] h-[100%] rounded-full bg-purple-50 dark:bg-purple-900/20 blur-[100px] opacity-70 transition-colors duration-700" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge className="mb-6 animate-fade-in-up" variant="secondary">Spring Collection 2026</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Premium</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Explore our curated collection of high-end products designed to elevate your lifestyle and transform your everyday experience.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Button size="lg" className="px-8 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20" onClick={() => document.getElementById("product-grid")?.scrollIntoView({behavior: 'smooth'})}>Shop Collection</Button>
            <Button size="lg" variant="outline" className="px-8 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-dark-background transition-colors">View Offers</Button>
          </div>
        </div>
      </div>

      <ProductCarousel title="Trending Now" subtitle="Discover what's hot right now" products={trendingProducts} />
      <ProductCarousel title="Best Sellers" subtitle="Our most popular premium items" products={bestSellers} />

      <div id="product-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2 dark:border-gray-700 dark:text-gray-300">
            <SlidersHorizontal size={18} /> Filters
          </Button>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-surface px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
            {filteredProducts.length} Results
          </span>
        </div>

        {/* Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 space-y-8 animate-fade-in md:sticky md:top-24 h-max`}>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Search</h3>
            <Input
              icon={Search}
              placeholder="Find products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dark:bg-dark-surface dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Category</h3>
            <div className="space-y-3">
              {["All", "Electronics", "Fashion", "Accessories"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-gray-600 dark:bg-dark-surface focus:ring-indigo-500"
                  />
                  <span className={`text-sm ${category === cat ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'} transition-colors`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold tracking-wider text-gray-900 dark:text-white uppercase">Max Price</h3>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 px-2 py-1 rounded-md">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="50"
              max="250000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 dark:text-white uppercase mb-4">Sort By</h3>
            <div className="relative">
              <select
                className="w-full appearance-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-surface dark:text-white px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
                <SlidersHorizontal size={14} />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="hidden md:flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">All Products</h2>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-surface px-3 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              Showing {filteredProducts.length} results
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {Array.from({length: productsPerPage}).map((_, i) => (
                  <div key={i} className="flex flex-col bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 h-80 overflow-hidden">
                      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse mb-4"></div>
                      <div className="w-2/3 h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
                      <div className="w-1/3 h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-4"></div>
                      <div className="w-1/4 h-6 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mt-auto relative overflow-hidden">
                         <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent"></div>
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
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white dark:bg-dark-surface rounded-3xl border border-gray-200 dark:border-gray-800 border-dashed animate-fade-in-up">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
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
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-600 dark:ring-indigo-400 ring-offset-2 dark:ring-offset-dark-background scale-110"
                      : "bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Home