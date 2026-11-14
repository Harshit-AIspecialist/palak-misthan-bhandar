import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen pattern-bg flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-9xl mb-6">🍬</div>
        <h1 className="font-heading text-6xl font-bold text-saffron-500 mb-3">404</h1>
        <h2 className="font-heading text-2xl font-bold text-brown-800 mb-4">Page Not Found!</h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-8">
          Oops! Looks like this page went missing, just like the last piece of kaju katli! 😄
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/products" className="btn-secondary">Our Products</Link>
        </div>
      </div>
    </div>
  )
}
