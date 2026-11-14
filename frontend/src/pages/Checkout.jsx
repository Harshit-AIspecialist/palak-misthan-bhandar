import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingBag, FaSpinner } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/productService'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { cart, totalAmount, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    notes: '',
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cart.items.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    setLoading(true)
    try {
      const orderData = {
        ...form,
        items: cart.items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        }))
      }
      const res = await createOrder(orderData)
      clearCart()
      toast.success('Order placed successfully! 🎉')
      navigate(`/order-success/${res.data.orderNumber}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pattern-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="font-heading text-2xl font-bold text-brown-800 mb-3">Your cart is empty</h2>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pattern-bg py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-brown-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card p-8 space-y-5">
              <h2 className="font-heading font-semibold text-xl text-brown-800 pb-4 border-b">
                Delivery Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={form.customerPhone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    pattern="[0-9+\-\s]{10,15}"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brown-800 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brown-800 mb-1.5">
                  Delivery Address *
                </label>
                <textarea
                  name="deliveryAddress"
                  value={form.deliveryAddress}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="House no., Street, Locality, City, Pincode"
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brown-800 mb-1.5">
                  Special Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Any special instructions for your order..."
                  className="input-field resize-none"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-700 text-sm font-medium">💡 Note</p>
                <p className="text-amber-600 text-xs mt-1">
                  We currently accept Cash on Delivery only. Our team will contact you to confirm your order.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
              >
                {loading ? (
                  <><FaSpinner className="animate-spin" /> Placing Order...</>
                ) : (
                  <><FaShoppingBag /> Place Order — ₹{totalAmount.toFixed(2)}</>
                )}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="card p-6 sticky top-24">
              <h2 className="font-heading font-semibold text-lg text-brown-800 mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {cart.items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=60' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brown-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <span className="text-sm font-semibold text-saffron-500">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold text-brown-800 text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-saffron-500">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
