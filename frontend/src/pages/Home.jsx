import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaStar, FaLeaf, FaAward, FaHeart, FaTruck } from 'react-icons/fa'
import { GiCookingPot, GiMilkCarton } from 'react-icons/gi'
import CountUp from 'react-countup'
import { getFeaturedProducts, getCategories } from '../services/productService'
import ProductCard from '../components/common/ProductCard'

const testimonials = [
  { name: 'Ramesh Sharma', text: 'Best kachori in Sanganer! The pyaaz kachori is simply outstanding.', rating: 5, location: 'Sanganer' },
  { name: 'Priya Joshi', text: "Palak Mistan's gulab jamun reminds me of my grandmother's cooking. Pure bliss!", rating: 5, location: 'Jaipur' },
  { name: 'Vikram Singh', text: 'Fresh paneer delivered daily. The quality is unmatched in the entire area.', rating: 5, location: 'Sanganer' },
  { name: 'Meena Agarwal', text: 'Order kaju katli every festival. The taste is authentic and the packing is beautiful!', rating: 5, location: 'Jaipur' },
]

const whyUs = [
  { icon: FaLeaf, title: 'Fresh Every Day', desc: 'All products made fresh each morning with no preservatives' },
  { icon: FaAward, title: '38+ Years of Trust', desc: 'Serving the people of Sanganer since 1985' },
  { icon: GiCookingPot, title: 'Traditional Recipes', desc: 'Authentic Rajasthani recipes passed down through generations' },
  { icon: GiMilkCarton, title: 'Pure Ingredients', desc: 'Pure desi ghee, fresh milk, and quality ingredients always' },
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featRes, catRes] = await Promise.all([
          getFeaturedProducts(),
          getCategories(),
        ])
        setFeatured(featRes.data)
        setCategories(catRes.data)
      } catch (err) {
        console.error('Failed to load data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brown-800">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='2' fill='%23FF6B35' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-saffron-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-golden-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-white animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-500/40 rounded-full px-4 py-2 text-saffron-300 text-sm font-medium mb-6">
                <FaStar className="text-golden-400" />
                Sanganer's Most Loved Sweet Shop
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Taste the
                <span className="block text-gradient bg-gradient-to-r from-golden-400 to-saffron-500 bg-clip-text text-transparent">
                  Sweetness of
                </span>
                Rajasthan 🍬
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Welcome to <strong className="text-saffron-400">Palak Mistan Bhandar</strong> — your neighborhood 
                sweet shop serving authentic Indian mithai, crispy kachori, fresh dairy products, 
                and refreshing beverages since 1985.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary flex items-center gap-2 group">
                  Explore Products
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="btn-secondary text-white border-white hover:bg-white hover:text-brown-800">
                  Visit Our Shop
                </Link>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                {[
                  { end: 38, suffix: '+', label: 'Years of Legacy' },
                  { end: 50, suffix: '+', label: 'Products' },
                  { end: 10000, suffix: '+', label: 'Happy Customers' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold font-heading text-saffron-400">
                      <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} enableScrollSpy />
                    </div>
                    <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
                'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300',
                'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300',
                'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300',
              ].map((src, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden shadow-2xl ${i === 1 ? 'mt-8' : ''} ${i === 3 ? '-mt-4' : ''}`}>
                  <img src={src} alt="Palak Mistan Bhandar products" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES SECTION ═══════════════ */}
      <section className="py-20 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">What We Offer</p>
            <h2 className="section-title">Our Product Categories</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From authentic Rajasthani sweets to fresh dairy and refreshing beverages — we have everything for your celebrations and daily needs.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="loader w-10 h-10" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="card group cursor-pointer hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1548379088-85e0225a9bdf?w=300' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-3 left-3 right-3 text-white font-heading font-semibold text-sm">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="p-3">
                    <p className="text-gray-500 text-xs line-clamp-2">{cat.description}</p>
                    <span className="text-saffron-500 text-xs font-medium mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore <FaArrowRight className="text-[10px]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ FEATURED PRODUCTS ═══════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <p className="section-subtitle mb-2">Hand-Picked</p>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/products" className="btn-secondary mt-4 sm:mt-0 text-sm py-2 px-5 flex items-center gap-2 group">
              View All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="loader w-10 h-10" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="py-20 bg-saffron-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why Choose Palak Mistan Bhandar?</h2>
            <p className="text-orange-100 max-w-xl mx-auto">
              We take pride in our quality, tradition, and commitment to serving you the best Indian sweets and snacks.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center group">
                <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/25 transition-colors">
                  <Icon className="text-3xl text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
                <p className="text-orange-100 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SPECIAL OFFER BANNER ═══════════════ */}
      <section className="py-16 bg-golden-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-brown-800 mb-3">
              🎉 Festival Season Special!
            </h2>
            <p className="text-brown-800/80 mb-6">
              Order mithai boxes for Diwali, Holi, Eid & all celebrations! 
              Bulk orders get special discounts. Call us to place your order!
            </p>
            <a href="tel:+919876543210" className="btn-crimson inline-flex items-center gap-2">
              📞 Call Now: +91 98765 43210
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-20 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">Customer Love</p>
            <h2 className="section-title">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <FaStar key={j} className="text-golden-400 text-sm" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-saffron-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-brown-800 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ LOCATION SECTION ═══════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle mb-2">Find Us</p>
              <h2 className="section-title mb-6">Visit Our Shop</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-brown-800">Address</p>
                    <p>Near Sanganer Chowk, Sanganer, Jaipur - 302029, Rajasthan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="font-semibold text-brown-800">Hours</p>
                    <p>Monday – Sunday: 7:00 AM – 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold text-brown-800">Phone</p>
                    <a href="tel:+919876543210" className="text-saffron-500 hover:underline">+91 98765 43210</a>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="btn-primary mt-8 inline-flex items-center gap-2">
                Get Directions <FaArrowRight />
              </Link>
            </div>
            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden shadow-xl h-72">
              <iframe
                title="Palak Mistan Bhandar Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2!2d75.7906!3d26.7912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ3JzI4LjMiTiA3NcKwNDcnMjYuMiJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
