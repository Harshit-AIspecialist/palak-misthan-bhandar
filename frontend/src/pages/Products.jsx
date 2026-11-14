import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'
import { getProducts, getCategories } from '../services/productService'
import ProductCard from '../components/common/ProductCard'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')

  useEffect(() => {
    getCategories().then(r => setCategories(r.data)).catch(console.error)
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (selectedCategory) params.categoryId = selectedCategory
    if (search) params.search = search

    getProducts(params)
      .then(r => setProducts(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [selectedCategory, search])

  const handleCategoryClick = (id) => {
    const val = id === selectedCategory ? '' : id
    setSelectedCategory(val)
    if (val) setSearchParams({ category: val })
    else setSearchParams({})
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSearchParams({})
  }

  return (
    <div className="min-h-screen pattern-bg">
      {/* Header */}
      <div className="bg-brown-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold mb-3">Our Products</h1>
          <p className="text-orange-200 max-w-xl mx-auto">
            Explore our wide range of authentic Indian sweets, crispy snacks, fresh dairy products, and refreshing beverages.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            {/* Clear */}
            {(search || selectedCategory) && (
              <button onClick={clearFilters} className="flex items-center gap-2 text-sm text-gray-500 hover:text-crimson-500 transition-colors px-3">
                <FaTimes /> Clear Filters
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => handleCategoryClick('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedCategory
                  ? 'bg-saffron-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(String(cat.id))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  String(selectedCategory) === String(cat.id)
                    ? 'bg-saffron-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-gray-500 text-sm mb-6">
            Showing <span className="font-semibold text-brown-800">{products.length}</span> products
            {selectedCategory && categories.find(c => String(c.id) === String(selectedCategory)) &&
              <span> in <span className="font-semibold text-saffron-500">
                {categories.find(c => String(c.id) === String(selectedCategory))?.name}
              </span></span>
            }
          </p>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="text-center">
              <div className="loader w-12 h-12 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading text-xl font-semibold text-brown-800 mb-2">No products found</h3>
            <p className="text-gray-500">Try a different search term or category.</p>
            <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
