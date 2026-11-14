import { useState, useEffect } from 'react'
import {
  FaPlus, FaEdit, FaTrash, FaSearch, FaCheck, FaTimes,
  FaStar, FaSpinner
} from 'react-icons/fa'
import {
  getProducts, getCategories, createProduct,
  updateProduct, deleteProduct
} from '../../services/productService'
import toast from 'react-hot-toast'

const initialForm = {
  name: '',
  description: '',
  price: '',
  unit: 'per kg',
  stock: 100,
  categoryId: '',
  imageUrl: '',
  available: true,
  featured: false
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCatFilter, setSelectedCatFilter] = useState('')
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [prodRes, catRes] = await Promise.all([
        getProducts({ all: true }),
        getCategories(true)
      ])
      setProducts(prodRes.data)
      setCategories(catRes.data)
    } catch (err) {
      toast.error('Failed to load products or categories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        unit: product.unit || 'per kg',
        stock: product.stock ?? 100,
        categoryId: product.categoryId || (categories[0]?.id || ''),
        imageUrl: product.imageUrl || '',
        available: product.available ?? true,
        featured: product.featured ?? false
      })
    } else {
      setEditingProduct(null)
      setFormData({
        ...initialForm,
        categoryId: categories[0]?.id || ''
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    setFormData(initialForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.categoryId) {
      toast.error('Please select a category')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        categoryId: Number(formData.categoryId)
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload)
        toast.success('Product updated successfully! 🍬')
      } else {
        await createProduct(payload)
        toast.success('Product added successfully! 🎉')
      }

      handleCloseModal()
      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      await deleteProduct(id)
      toast.success('Product deleted')
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product')
    }
  }

  const handleToggleFeatured = async (product) => {
    try {
      await updateProduct(product.id, {
        ...product,
        featured: !product.featured
      })
      toast.success(`Product marked as ${!product.featured ? 'featured' : 'standard'}`)
      fetchData()
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCatFilter ? String(p.categoryId) === String(selectedCatFilter) : true
    return matchesSearch && matchesCat
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brown-800">Product Management</h1>
          <p className="text-gray-500 text-sm">Add, edit, manage stock, and organize sweets and snacks.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center justify-center gap-2 text-sm py-2.5 px-5"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 py-2.5 text-sm"
          />
        </div>
        <div className="w-full md:w-64">
          <select
            value={selectedCatFilter}
            onChange={(e) => setSelectedCatFilter(e.target.value)}
            className="input-field py-2.5 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loader w-10 h-10" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-4xl mb-2">📦</p>
            <p className="font-medium">No products found matching the criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price / Unit</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl || 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=100'}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-xl flex-shrink-0"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=100' }}
                        />
                        <div>
                          <p className="font-semibold text-brown-800">{p.name}</p>
                          <p className="text-gray-400 text-xs line-clamp-1">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge bg-saffron-50 text-saffron-600 font-medium">
                        {p.categoryName}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-brown-800">
                      ₹{p.price} <span className="text-xs font-normal text-gray-400">/{p.unit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${p.stock < 15 ? 'text-red-500' : 'text-gray-700'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${p.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {p.available ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded-full transition-colors ${
                          p.featured ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' : 'text-gray-300 hover:text-amber-400'
                        }`}
                        title={p.featured ? 'Remove from featured' : 'Mark as featured'}
                      >
                        <FaStar className="text-base" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(p)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="font-heading font-bold text-xl text-brown-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kaju Katli"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 800"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Unit / Quantity Measure
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="input-field"
                  >
                    <option value="per kg">per kg</option>
                    <option value="per 500g">per 500g</option>
                    <option value="per 250g">per 250g</option>
                    <option value="per piece">per piece</option>
                    <option value="per glass">per glass</option>
                    <option value="per box">per box</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Stock Available
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="100"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details about ingredients, taste, and freshness..."
                  className="input-field resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 text-saffron-500 rounded border-gray-300 focus:ring-saffron-400"
                  />
                  Available for sale
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-400"
                  />
                  Featured on Homepage
                </label>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn-secondary flex-1 py-2.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? <FaSpinner className="animate-spin" /> : (editingProduct ? 'Save Changes' : 'Create Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
