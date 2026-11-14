import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#3E2723',
                color: '#fff',
                borderRadius: '12px',
                padding: '12px 16px',
              },
              success: {
                iconTheme: { primary: '#FF6B35', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#C62828', secondary: '#fff' },
              },
            }}
          />
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
