import { useState, useEffect } from 'react'
import {
  FaSearch, FaEye, FaShoppingBag, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaEnvelope, FaClock
} from 'react-icons/fa'
import { getAllOrders, updateOrderStatus } from '../../services/productService'
import toast from 'react-hot-toast'

const statuses = [
  'ALL', 'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'
]

const statusBadges = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
  PREPARING: 'bg-orange-100 text-orange-800 border-orange-200',
  READY: 'bg-purple-100 text-purple-800 border-purple-200',
  DELIVERED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200'
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeStatus, setActiveStatus] = useState('ALL')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await getAllOrders()
      setOrders(res.data)
    } catch (err) {
      toast.error('Failed to load orders')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId)
      await updateOrderStatus(orderId, newStatus)
      toast.success(`Order status updated to ${newStatus}`)
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }))
      }
    } catch (err) {
      toast.error('Failed to update order status')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredOrders = orders.filter(o => {
    const matchesStatus = activeStatus === 'ALL' || o.status === activeStatus
    const term = search.toLowerCase()
    const matchesSearch =
      o.orderNumber?.toLowerCase().includes(term) ||
      o.customerName?.toLowerCase().includes(term) ||
      o.customerPhone?.toLowerCase().includes(term)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-brown-800">Orders Management</h1>
        <p className="text-gray-500 text-sm">Review incoming customer orders, manage statuses, and track fulfillment.</p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <div className="relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, or phone number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 py-2.5 text-sm"
          />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
          {statuses.map(st => {
            const count = st === 'ALL' ? orders.length : orders.filter(o => o.status === st).length
            return (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeStatus === st
                    ? 'bg-brown-800 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loader w-10 h-10" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FaShoppingBag className="text-4xl mx-auto mb-3 opacity-30" />
            <p className="font-medium">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Order Details</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items Count</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-mono font-bold text-saffron-600">{o.orderNumber}</p>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <FaClock className="text-[10px]" />
                        {o.createdAt ? new Date(o.createdAt).toLocaleString('en-IN') : 'Just now'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-brown-800">{o.customerName}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <FaPhone className="text-[10px]" /> {o.customerPhone}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {o.items?.length || 0} item(s)
                    </td>
                    <td className="px-6 py-4 font-bold text-brown-800 text-base">
                      ₹{parseFloat(o.totalAmount || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={o.status}
                        disabled={updatingId === o.id}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-saffron-400 cursor-pointer ${
                          statusBadges[o.status] || 'bg-gray-100'
                        }`}
                      >
                        {statuses.filter(s => s !== 'ALL').map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-saffron-50 text-saffron-600 hover:bg-saffron-100 font-medium text-xs rounded-xl transition-colors"
                      >
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs text-saffron-500 font-semibold uppercase tracking-wider">Order Details</span>
                <h2 className="font-heading font-bold text-xl text-brown-800">{selectedOrder.orderNumber}</h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 py-4">
              {/* Customer info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-cream p-4 rounded-2xl">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Customer</p>
                  <p className="font-semibold text-brown-800 text-sm mt-0.5">{selectedOrder.customerName}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <FaPhone className="text-saffron-500" /> {selectedOrder.customerPhone}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                    <FaEnvelope className="text-saffron-500" /> {selectedOrder.customerEmail}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Delivery Address</p>
                  <p className="text-xs text-gray-700 mt-1 flex items-start gap-1">
                    <FaMapMarkerAlt className="text-saffron-500 flex-shrink-0 mt-0.5" />
                    <span>{selectedOrder.deliveryAddress || 'Pick up at store'}</span>
                  </p>
                  {selectedOrder.notes && (
                    <div className="mt-2 pt-2 border-t border-orange-200/50">
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Special Note:</p>
                      <p className="text-xs text-gray-700 italic">{selectedOrder.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="font-heading font-semibold text-sm text-brown-800 mb-3">
                  Ordered Products ({selectedOrder.items?.length || 0})
                </h3>
                <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.productImageUrl || 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=80'}
                          alt={item.productName}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-brown-800 text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity} × ₹{item.unitPrice}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-brown-800">
                        ₹{item.subtotal ? parseFloat(item.subtotal).toFixed(2) : (item.quantity * item.unitPrice).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Total */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Update Status:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200"
                  >
                    {statuses.filter(s => s !== 'ALL').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">Grand Total</span>
                  <p className="text-2xl font-bold font-heading text-saffron-500">
                    ₹{parseFloat(selectedOrder.totalAmount || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="btn-secondary py-2 px-6 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
