const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt: 'Ladoo', category: 'Sweets' },
  { src: 'https://images.unsplash.com/photo-1627462788935-8e1065b48f17?w=600', alt: 'Kaju Katli', category: 'Sweets' },
  { src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600', alt: 'Kachori', category: 'Snacks' },
  { src: 'https://images.unsplash.com/photo-1593967037752-30cf86bcfb67?w=600', alt: 'Motichoor Ladoo', category: 'Sweets' },
  { src: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600', alt: 'Mango Shake', category: 'Beverages' },
  { src: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600', alt: 'Paneer', category: 'Dairy' },
  { src: 'https://images.unsplash.com/photo-1573816316900-c0bdb5a7f3e3?w=600', alt: 'Jalebi', category: 'Sweets' },
  { src: 'https://images.unsplash.com/photo-1536304993881-ff86e7b3b2f2?w=600', alt: 'Barfi', category: 'Sweets' },
  { src: 'https://images.unsplash.com/photo-1620748261788-d59e1f671d49?w=600', alt: 'Namkeen', category: 'Snacks' },
  { src: 'https://images.unsplash.com/photo-1562517916-9f68de83e5c8?w=600', alt: 'Halwa', category: 'Sweets' },
  { src: 'https://images.unsplash.com/photo-1627734433731-621a83f4c56b?w=600', alt: 'Gulab Jamun', category: 'Sweets' },
  { src: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600', alt: 'Lassi', category: 'Beverages' },
]

const categories = ['All', 'Sweets', 'Snacks', 'Dairy', 'Beverages']

import { useState } from 'react'

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'All' ? galleryImages : galleryImages.filter(i => i.category === filter)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-brown-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-saffron-400 font-semibold uppercase tracking-wider text-sm">Visual Delight</span>
          <h1 className="font-heading text-4xl font-bold mt-2 mb-3">Our Gallery</h1>
          <p className="text-orange-200 max-w-xl mx-auto">
            A visual journey through our delicious offerings — from traditional sweets to refreshing drinks.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                filter === cat
                  ? 'bg-saffron-500 text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-square shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelected(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold text-sm">{img.alt}</p>
                  <span className="text-saffron-300 text-xs">{img.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={selected.src}
              alt={selected.alt}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="text-center mt-3">
              <p className="text-white font-semibold">{selected.alt}</p>
              <span className="text-saffron-400 text-sm">{selected.category}</span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-brown-800 font-bold hover:bg-gray-100 shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
