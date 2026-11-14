import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaShoppingCart, FaBars, FaTimes, FaPhone } from 'react-icons/fa'
import { GiIndianPalace } from 'react-icons/gi'
import { useCart } from '../../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <>
      {/* Top bar */}
      <div className="bg-brown-800 text-white text-xs py-2 px-4 hidden md:flex items-center justify-between">
        <span className="flex items-center gap-2">
          <FaPhone className="text-golden-400" />
          <span>+91 98765 43210 | Sanganer, Jaipur, Rajasthan</span>
        </span>
        <span className="text-golden-400">🕐 Open: 7:00 AM – 10:00 PM | All Days</span>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-saffron-gradient rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <GiIndianPalace className="text-white text-xl" />
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-brown-800 leading-tight text-sm">
                  Palak Mistan Bhandar
                </div>
                <div className="text-saffron-500 text-xs font-medium">
                  Since 1985 • Sanganer, Jaipur
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-saffron-500 ${
                      isActive ? 'text-saffron-500 border-b-2 border-saffron-500 pb-0.5' : 'text-brown-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Cart + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="relative p-2 text-brown-800 hover:text-saffron-500 transition-colors"
              >
                <FaShoppingCart className="text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-crimson-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link to="/checkout" className="hidden md:block btn-primary py-2 px-4 text-sm">
                Order Now
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-brown-800 hover:text-saffron-500 transition-colors"
              >
                {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
        }`}>
          <div className="px-4 py-4 space-y-3 bg-white">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-saffron-50 text-saffron-600' : 'text-brown-800 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/checkout" className="btn-primary block text-center text-sm py-2">
              🛒 Order Now
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
