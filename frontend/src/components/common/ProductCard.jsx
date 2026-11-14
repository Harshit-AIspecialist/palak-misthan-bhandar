import { Link } from 'react-router-dom'
import { FaShoppingCart, FaStar } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <Link to={`/products/${product.id}`} className="card group block hover:-translate-y-1 transition-transform duration-300">
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-orange-50">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=400'
          }}
        />
        {product.featured && (
          <span className="absolute top-3 left-3 badge bg-golden-400 text-brown-800">
            <FaStar className="mr-1 text-[10px]" /> Featured
          </span>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-red-500 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-xs text-saffron-500 font-medium uppercase tracking-wider">
          {product.categoryName}
        </span>
        <h3 className="font-heading font-semibold text-brown-800 mt-1 group-hover:text-saffron-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xl font-bold text-saffron-500">₹{product.price}</span>
            {product.unit && (
              <span className="text-gray-400 text-xs ml-1">/{product.unit.replace('per ', '')}</span>
            )}
          </div>

          {product.available && (
            <button
              onClick={handleAddToCart}
              className="p-2 bg-saffron-500 text-white rounded-full hover:bg-saffron-600 transition-colors shadow-md hover:shadow-lg"
              title="Add to cart"
            >
              <FaShoppingCart className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
