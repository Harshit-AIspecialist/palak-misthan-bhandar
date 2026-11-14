import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FaTachometerAlt, FaBox, FaList, FaShoppingBag,
  FaEnvelope, FaSignOutAlt, FaBars, FaTimes, FaUser
} from 'react-icons/fa'
import { GiIndianPalace } from 'react-icons/gi'
import toast from 'react-hot-toast'

const adminNav = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt },
  { to: '/admin/products', label: 'Products', icon: FaBox },
  { to: '/admin/categories', label: 'Categories', icon: FaList },
  { to: '/admin/orders', label: 'Orders', icon: FaShoppingBag },
  { to: '/admin/messages', label: 'Messages', icon: FaEnvelope },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-brown-800 text-white flex flex-col transition-all duration-300 overflow-hidden`}>
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10 h-16">
          <div className="w-8 h-8 bg-saffron-gradient rounded-full flex items-center justify-center flex-shrink-0">
            <GiIndianPalace className="text-white" />
          </div>
          {sidebarOpen && (
            <span className="font-heading font-bold text-sm truncate">Admin Panel</span>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {adminNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-saffron-500 text-white shadow-md'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="flex-shrink-0 text-lg" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="p-3 border-t border-white/10">
          {sidebarOpen && (
            <div className="flex items-center gap-2 px-2 mb-3">
              <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <div className="text-xs">
                <p className="font-semibold truncate">{user?.fullName || 'Admin'}</p>
                <p className="text-gray-400">{user?.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-300 hover:bg-crimson-500 hover:text-white transition-all text-sm"
          >
            <FaSignOutAlt className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-saffron-500 transition-colors"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/" className="text-sm text-saffron-500 hover:underline font-medium">
            ← View Public Website
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
