import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { GiIndianPalace } from 'react-icons/gi'

export default function Footer() {
  return (
    <footer className="bg-brown-800 text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-saffron-gradient rounded-full flex items-center justify-center shadow-lg">
                <GiIndianPalace className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg leading-tight">Palak Mistan Bhandar</h3>
                <p className="text-golden-400 text-xs">Since 1985</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Bringing the authentic taste of Rajasthan to your doorstep. 
              Made with love, served with tradition for over 3 decades.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <FaFacebook />
              </a>
              <a href="https://wa.me/919876543210" className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <FaWhatsapp />
              </a>
              <a href="#" className="w-9 h-9 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-golden-400 mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Our Products' },
                { to: '/about', label: 'About Us' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/admin/login', label: 'Admin Panel' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-300 hover:text-saffron-400 text-sm transition-colors flex items-center gap-2">
                    <span className="text-saffron-500">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-golden-400 mb-4 uppercase tracking-wider text-sm">Our Products</h4>
            <ul className="space-y-2">
              {[
                'Indian Sweets (Mithai)',
                'Kachori & Samosa',
                'Namkeen & Snacks',
                'Fresh Paneer',
                'Mawa & Khoya',
                'Juices & Shakes',
                'Desi Ghee',
              ].map(item => (
                <li key={item}>
                  <Link to="/products" className="text-gray-300 hover:text-saffron-400 text-sm transition-colors flex items-center gap-2">
                    <span className="text-golden-400">🍬</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-golden-400 mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-300 text-sm">
                <FaMapMarkerAlt className="text-saffron-400 mt-1 flex-shrink-0" />
                <span>Near Sanganer Chowk, Sanganer,<br />Jaipur - 302029, Rajasthan, India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <FaPhone className="text-saffron-400" />
                <a href="tel:+919876543210" className="hover:text-saffron-400 transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <FaEnvelope className="text-saffron-400" />
                <a href="mailto:palakmistandbhandar@gmail.com" className="hover:text-saffron-400 transition-colors">palakmistandbhandar@gmail.com</a>
              </div>
            </div>

            <div className="mt-5 p-3 bg-saffron-500/10 rounded-xl border border-saffron-500/20">
              <p className="text-golden-400 font-semibold text-sm">🕐 Shop Hours</p>
              <p className="text-gray-300 text-xs mt-1">Mon – Sun: 7:00 AM – 10:00 PM</p>
              <p className="text-green-400 text-xs font-medium mt-1">● Open Now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <p>© 2024 Palak Mistan Bhandar. All rights reserved. | Owner: Shishpal Kumawat</p>
          <p>Made with ❤️ in Sanganer, Jaipur 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}
