import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('pmb_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchCurrentUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get('/auth/me')
      setUser(res.data)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password })
    const { token: newToken, ...userData } = res.data
    localStorage.setItem('pmb_token', newToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    setToken(newToken)
    setUser(userData)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('pmb_token')
    delete api.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
