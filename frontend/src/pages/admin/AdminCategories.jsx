import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/productService'
import toast from 'react-hot-toast'

const initialForm = {
  name: '',
  description: '',
  imageUrl: '',
  displayOrder: 1,
  active: true
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await getCategories(true)
      setCategories(res.data)
    } catch (err) {
      toast.error('Failed to load categories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setEditingCategory(cat)
      setFormData({
        name: cat.name || '',
        description: cat.description || '',
        imageUrl: cat.imageUrl || '',
        displayOrder: cat.displayOrder ?? 1,
        active: cat.active ?? true
      })
    } else {
      setEditingCategory(null)
      setFormData({
        ...initialForm,
        displayOrder: categories.length + 1
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
    setFormData(initialForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        ...formData,
        displayOrder: parseInt(formData.displayOrder, 10) || 1
      }

      if (editingCategory) {
        await updateCategory(editingCategory.id, payload)
        toast.success('Category updated successfully!')
      } else {
        await createCategory(payload)
        toast.success('Category created successfully!')
      }

      handleCloseModal()
      fetchCategories()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save category')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"? Products inside may be affected.`)) return

    try {
      await deleteCategory(id)
      toast.success('Category deleted')
      setCategories(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete category')
    }
  }

  const handleToggleActive = async (cat) => {
    try {
      await updateCategory(cat.id, {
        ...cat,
        active: !cat.active
      })
      toast.success(`Category ${!cat.active ? 'activated' : 'hidden'}`)
      fetchCategories()
    } catch (err) {
      toast.error('Failed to update category')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brown-800">Category Management</h1>
          <p className="text-gray-500 text-sm">Organize sweet, snack, dairy, and beverage sections.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center justify-center gap-2 text-sm py-2.5 px-5"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loader w-10 h-10" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-4xl mb-2">🏷️</p>
            <p className="font-medium">No categories found. Click "Add Category" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 bg-orange-50">
                    <img
                      src={cat.imageUrl || 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=300'}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=300' }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-brown-800/80 backdrop-blur-sm text-white">
                        Order #{cat.displayOrder}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleToggleActive(cat)}
                        className={`badge cursor-pointer transition-colors ${
                          cat.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                        title="Click to toggle active state"
                      >
                        {cat.active ? 'Active' : 'Hidden'}
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-bold text-brown-800 text-base">{cat.name}</h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{cat.description}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-gray-50 flex items-center justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleOpenModal(cat)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                    title="Edit Category"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    title="Delete Category"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="font-heading font-bold text-xl text-brown-800">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Traditional Sweets"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                  className="input-field"
                />
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
                  placeholder="Brief description of this category..."
                  className="input-field resize-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-saffron-500 rounded border-gray-300 focus:ring-saffron-400"
                  />
                  Active (visible on website)
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
                  {submitting ? <FaSpinner className="animate-spin" /> : (editingCategory ? 'Save Changes' : 'Create Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
