import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="text-center">
          <div className="loader w-12 h-12 mx-auto mb-4" />
          <p className="text-brown-800 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return token ? children : <Navigate to="/admin/login" replace />
}
