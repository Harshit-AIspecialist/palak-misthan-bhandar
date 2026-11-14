import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { FaSpinner, FaLock, FaUser } from 'react-icons/fa'
import { GiIndianPalace } from 'react-icons/gi'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const { login, token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)

  if (token) return <Navigate to="/admin" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.username, form.password)
      toast.success('Welcome back, Admin! 👋')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brown-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-saffron-gradient text-white p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <GiIndianPalace className="text-3xl" />
          </div>
          <h1 className="font-heading text-xl font-bold">Palak Mistan Bhandar</h1>
          <p className="text-orange-100 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="font-heading text-lg font-semibold text-brown-800 mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                  required
                  placeholder="admin"
                  className="input-field pl-9"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="input-field pl-9"
                />
              </div>
            </div>

            <div className="bg-saffron-50 rounded-xl p-3 text-center text-xs text-gray-500">
              Default: <span className="font-mono font-semibold text-saffron-500">admin</span> / 
              <span className="font-mono font-semibold text-saffron-500"> admin123</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              {loading ? <><FaSpinner className="animate-spin" /> Signing In...</> : '🔐 Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-saffron-500 hover:underline">← Back to Website</a>
          </div>
        </div>
      </div>
    </div>
  )
}
