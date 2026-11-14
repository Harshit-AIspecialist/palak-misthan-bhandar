import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaSpinner } from 'react-icons/fa'
import { submitContact } from '../services/productService'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitContact(form)
      setSubmitted(true)
      toast.success('Message sent successfully! We\'ll reply soon. 📨')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-brown-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-saffron-400 font-semibold uppercase tracking-wider text-sm">Get In Touch</span>
          <h1 className="font-heading text-4xl font-bold mt-2 mb-3">Contact Us</h1>
          <p className="text-orange-200 max-w-xl mx-auto">
            Have a question, want to place a bulk order, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-brown-800 mb-8">Our Information</h2>
            <div className="space-y-6">
              {[
                {
                  icon: FaMapMarkerAlt, color: 'bg-saffron-100 text-saffron-500',
                  title: 'Visit Our Shop',
                  content: 'Near Sanganer Chowk, Sanganer, Jaipur - 302029, Rajasthan, India'
                },
                {
                  icon: FaPhone, color: 'bg-green-100 text-green-600',
                  title: 'Call Us',
                  content: '+91 98765 43210'
                },
                {
                  icon: FaEnvelope, color: 'bg-blue-100 text-blue-600',
                  title: 'Email Us',
                  content: 'palakmistandbhandar@gmail.com'
                },
                {
                  icon: FaClock, color: 'bg-purple-100 text-purple-600',
                  title: 'Shop Hours',
                  content: 'Monday – Sunday: 7:00 AM – 10:00 PM (All Days)'
                },
              ].map(({ icon: Icon, color, title, content }) => (
                <div key={title} className="flex gap-4 card p-5">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown-800 mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm">{content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi! I'd like to enquire about your products."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors shadow-md"
            >
              <FaWhatsapp className="text-2xl" />
              Chat on WhatsApp
            </a>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg h-56">
              <iframe
                title="Shop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2!2d75.7906!3d26.7912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ3JzI4LjMiTiA3NcKwNDcnMjYuMiJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-brown-800 mb-8">Send us a Message</h2>
            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 text-center">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-green-700 font-semibold">Message sent successfully!</p>
                <p className="text-green-600 text-sm mt-1">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-3 text-sm text-green-600 underline">
                  Send another message
                </button>
              </div>
            )}

            {!submitted && (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-800 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Ramesh Sharma"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-800 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1.5">Subject *</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select a subject</option>
                    <option>Product Enquiry</option>
                    <option>Bulk Order</option>
                    <option>Wedding / Event Catering</option>
                    <option>Delivery Enquiry</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                >
                  {loading ? (
                    <><FaSpinner className="animate-spin" /> Sending...</>
                  ) : (
                    '📨 Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
