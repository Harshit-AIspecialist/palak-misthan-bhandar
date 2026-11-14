import { useState, useEffect } from 'react'
import {
  FaEnvelope, FaCheck, FaPhone, FaWhatsapp, FaClock,
  FaSearch, FaReply, FaEnvelopeOpen
} from 'react-icons/fa'
import { getAllMessages, markMessageRead } from '../../services/productService'
import toast from 'react-hot-toast'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL') // ALL, UNREAD, READ
  const [search, setSearch] = useState('')

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const res = await getAllMessages()
      setMessages(res.data)
    } catch (err) {
      toast.error('Failed to load contact messages')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleMarkAsRead = async (id) => {
    try {
      await markMessageRead(id)
      toast.success('Marked as read')
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
    } catch (err) {
      toast.error('Failed to update message')
    }
  }

  const filteredMessages = messages.filter(m => {
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'UNREAD' && !m.read) ||
      (filter === 'READ' && m.read)

    const term = search.toLowerCase()
    const matchesSearch =
      m.name?.toLowerCase().includes(term) ||
      m.email?.toLowerCase().includes(term) ||
      m.subject?.toLowerCase().includes(term) ||
      m.message?.toLowerCase().includes(term)

    return matchesFilter && matchesSearch
  })

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brown-800">Customer Messages</h1>
          <p className="text-gray-500 text-sm">
            Inquiries and bulk catering messages received from the contact form.
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="badge bg-red-100 text-red-600 font-semibold px-4 py-1.5 self-start sm:self-auto">
            {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search messages by name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 py-2.5 text-sm"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {['ALL', 'UNREAD', 'READ'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-brown-800 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="loader w-10 h-10" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm text-gray-500">
            <FaEnvelopeOpen className="text-4xl mx-auto mb-3 opacity-30" />
            <p className="font-medium">No messages found.</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-200 ${
                !msg.read ? 'border-saffron-300 bg-saffron-50/20' : 'border-gray-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    !msg.read ? 'bg-saffron-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {msg.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-brown-800 text-base">{msg.name}</h3>
                      {!msg.read && (
                        <span className="badge bg-saffron-100 text-saffron-700 text-[10px]">NEW</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-0.5">
                      <a href={`mailto:${msg.email}`} className="hover:text-saffron-600 underline">
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FaPhone className="text-[10px]" /> {msg.phone}
                          </span>
                        </>
                      )}
                      <span>•</span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <FaClock className="text-[10px]" />
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleString('en-IN') : 'Recent'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1.5 transition-colors"
                      title="Mark as read"
                    >
                      <FaCheck /> Mark Read
                    </button>
                  )}
                  {msg.phone && (
                    <a
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hi ${encodeURIComponent(msg.name)}, regarding your inquiry at Palak Mistan Bhandar:`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg text-sm transition-colors"
                      title="Reply via WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  )}
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Inquiry')} - Palak Mistan Bhandar`}
                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors"
                    title="Reply via Email"
                  >
                    <FaReply />
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mt-3">
                <p className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-1">
                  Subject: {msg.subject}
                </p>
                <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
