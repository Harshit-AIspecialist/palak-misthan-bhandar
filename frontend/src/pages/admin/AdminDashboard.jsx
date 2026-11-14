import { useState, useEffect } from 'react'
import { FaBox, FaList, FaShoppingBag, FaEnvelope, FaRupeeSign, FaChartLine } from 'react-icons/fa'
import { getAllOrders, getProducts, getCategories, getAllMessages } from '../../services/productService'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, messages: 0, revenue: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes, ordRes, msgRes] = await Promise.all([
          getProducts({ all: true }),
          getCategories(true),
          getAllOrders(),
          getAllMessages(),
        ])
        const orders = ordRes.data
        const revenue = orders.reduce((sum, o) => sum + parseFloat(o.totalAmount || 0), 0)
        setStats({
          products: prodRes.data.length,
          categories: catRes.data.length,
          orders: orders.length,
          messages: msgRes.data.filter(m => !m.read).length,
          revenue,
        })
        setRecentOrders(orders.slice(0, 5))
      } catch (err) {
        console.error('Failed to load dashboard stats', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: FaBox, color: 'bg-blue-500', bg: 'bg-blue-50' },
    { label: 'Categories', value: stats.categories, icon: FaList, color: 'bg-purple-500', bg: 'bg-purple-50' },
    { label: 'Total Orders', value: stats.orders, icon: FaShoppingBag, color: 'bg-saffron-500', bg: 'bg-orange-50' },
    { label: 'Unread Messages', value: stats.messages, icon: FaEnvelope, color: 'bg-red-500', bg: 'bg-red-50' },
    { label: 'Total Revenue', value: `₹${stats.revenue.toFixed(0)}`, icon: FaRupeeSign, color: 'bg-green-500', bg: 'bg-green-50' },
  ]

  const statusColor = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    CONFIRMED: 'bg-blue-100 text-blue-700',
    PREPARING: 'bg-orange-100 text-orange-700',
    READY: 'bg-purple-100 text-purple-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader w-10 h-10" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-brown-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening at Palak Mistan Bhandar.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
              <Icon className={`text-xl ${color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-brown-800">{value}</p>
              <p className="text-gray-400 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-bold text-lg text-brown-800">Recent Orders</h2>
          <span className="text-sm text-gray-400">{recentOrders.length} latest</span>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <FaShoppingBag className="text-4xl mx-auto mb-3 opacity-30" />
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left pb-3 text-gray-400 font-medium">Order #</th>
                  <th className="text-left pb-3 text-gray-400 font-medium">Customer</th>
                  <th className="text-left pb-3 text-gray-400 font-medium">Items</th>
                  <th className="text-left pb-3 text-gray-400 font-medium">Total</th>
                  <th className="text-left pb-3 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-mono text-xs text-saffron-500">{order.orderNumber}</td>
                    <td className="py-3 font-medium text-brown-800">{order.customerName}</td>
                    <td className="py-3 text-gray-500">{order.items?.length || 0} items</td>
                    <td className="py-3 font-semibold">₹{parseFloat(order.totalAmount).toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`badge ${statusColor[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
