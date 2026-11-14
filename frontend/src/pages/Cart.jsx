import { Link } from 'react-router-dom'
import { FaTrash, FaPlus, FaMinus, FaArrowRight, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalAmount, totalItems } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pattern-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="font-heading text-3xl font-bold text-brown-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Looks like you haven't added any items yet. Explore our delicious products!
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <FaShoppingBag /> Explore Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pattern-bg py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-brown-800 mb-8">
          Shopping Cart ({totalItems} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div key={item.id} className="card flex gap-4 p-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=100' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-saffron-500 font-medium">{item.categoryName}</span>
                      <h3 className="font-heading font-semibold text-brown-800 text-sm mt-0.5">
                        {item.name}
                      </h3>
                      {item.unit && (
                        <span className="text-gray-400 text-xs">{item.unit}</span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-crimson-500 transition-colors p-1 flex-shrink-0"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 rounded-l-full transition-colors"
                      >
                        <FaMinus className="text-xs text-gray-500" />
                      </button>
                      <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 rounded-r-full transition-colors"
                      >
                        <FaPlus className="text-xs text-gray-500" />
                      </button>
                    </div>
                    <span className="font-bold text-saffron-500">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-heading font-bold text-brown-800 text-lg mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cart.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate flex-1 mr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between font-semibold text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-500 font-medium">Free 🎉</span>
                </div>
              </div>

              <div className="bg-saffron-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-heading font-bold text-brown-800">Total</span>
                  <span className="text-2xl font-bold text-saffron-500">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center flex items-center justify-center gap-2">
                Proceed to Checkout <FaArrowRight />
              </Link>

              <Link to="/products" className="mt-3 text-center block text-sm text-saffron-500 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
