import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaShoppingCart, FaStar, FaPlus, FaMinus } from 'react-icons/fa'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProductById(id)
      .then(r => setProduct(r.data))
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader w-12 h-12" />
    </div>
  )

  if (error || !product) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="text-6xl">😕</div>
      <h2 className="font-heading text-2xl text-brown-800">Product Not Found</h2>
      <Link to="/products" className="btn-primary">Back to Products</Link>
    </div>
  )

  return (
    <div className="min-h-screen pattern-bg py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-saffron-500">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-saffron-500">Products</Link>
          <span>›</span>
          <span className="text-brown-800 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-96 md:h-auto bg-orange-50">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=600' }}
              />
              {product.featured && (
                <span className="absolute top-4 left-4 badge bg-golden-400 text-brown-800 text-sm px-4 py-1.5">
                  <FaStar className="mr-1" /> Featured
                </span>
              )}
            </div>

            {/* Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-saffron-500 text-sm font-semibold uppercase tracking-wider">
                {product.categoryName}
              </span>

              <h1 className="font-heading text-3xl font-bold text-brown-800 mt-2 mb-3">
                {product.name}
              </h1>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-golden-400" />
                ))}
                <span className="text-gray-400 text-sm ml-2">(Highly Rated)</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-saffron-500">₹{product.price}</span>
                {product.unit && (
                  <span className="text-gray-400">/ {product.unit.replace('per ', '')}</span>
                )}
              </div>

              {/* Stock indicator */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${product.available ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className={`text-sm font-medium ${product.available ? 'text-green-600' : 'text-red-600'}`}>
                  {product.available ? `In Stock (${product.stock} available)` : 'Currently Unavailable'}
                </span>
              </div>

              {product.available && (
                <>
                  {/* Quantity */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-medium text-brown-800">Quantity:</span>
                    <div className="flex items-center border-2 border-saffron-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="p-3 hover:bg-saffron-50 transition-colors"
                      >
                        <FaMinus className="text-xs text-saffron-500" />
                      </button>
                      <span className="px-5 font-semibold text-brown-800">{quantity}</span>
                      <button
                        onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                        className="p-3 hover:bg-saffron-50 transition-colors"
                      >
                        <FaPlus className="text-xs text-saffron-500" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-saffron-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-2xl font-bold text-saffron-500">
                        ₹{(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                      <FaShoppingCart /> Add to Cart
                    </button>
                    <Link to="/cart" className="btn-crimson flex-1 text-center flex items-center justify-center">
                      Buy Now
                    </Link>
                  </div>
                </>
              )}

              {/* Info pills */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
                <span className="badge bg-green-100 text-green-700">🌿 Natural Ingredients</span>
                <span className="badge bg-orange-100 text-orange-700">🔥 Made Fresh Daily</span>
                <span className="badge bg-yellow-100 text-yellow-700">⭐ Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-saffron-500 transition-colors mt-8 text-sm font-medium"
        >
          <FaArrowLeft /> Back to Products
        </button>
      </div>
    </div>
  )
}
