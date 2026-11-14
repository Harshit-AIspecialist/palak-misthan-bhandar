import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaCheckCircle, FaShoppingBag, FaHome, FaPhone } from 'react-icons/fa'
import { getOrderByNumber } from '../services/productService'

export default function OrderSuccess() {
  const { orderNumber } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    getOrderByNumber(orderNumber)
      .then(r => setOrder(r.data))
      .catch(console.error)
  }, [orderNumber])

  return (
    <div className="min-h-screen pattern-bg flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="card p-10">
          {/* Success animation */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-brown-800 mb-3">
            Order Placed! 🎉
          </h1>
          <p className="text-gray-500 mb-6">
            Thank you for your order! Our team will contact you shortly to confirm and arrange delivery.
          </p>

          {/* Order number */}
          <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-mono font-bold text-saffron-500 text-xl">{orderNumber}</p>
          </div>

          {/* Order details */}
          {order && (
            <div className="text-left space-y-2 mb-6 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Customer</span>
                <span className="font-medium text-brown-800">{order.customerName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium text-brown-800">{order.customerPhone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Items</span>
                <span className="font-medium text-brown-800">{order.items?.length || 0} item(s)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-bold text-saffron-500 text-base">₹{order.totalAmount}</span>
              </div>
            </div>
          )}

          {/* Contact note */}
          <div className="bg-blue-50 rounded-xl p-3 mb-6 text-left">
            <p className="text-blue-700 text-xs font-medium flex items-center gap-1">
              <FaPhone className="text-xs" /> Our team will call you at {order?.customerPhone} to confirm your order.
            </p>
          </div>

          <div className="flex gap-3">
            <Link to="/products" className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm py-3">
              <FaShoppingBag /> Shop More
            </Link>
            <Link to="/" className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-3">
              <FaHome /> Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
