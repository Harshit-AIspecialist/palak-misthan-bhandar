import { FaHeart, FaLeaf, FaAward } from 'react-icons/fa'
import { GiCookingPot } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'

const timeline = [
  { year: '1985', title: 'Founded', desc: 'Palak Mistan Bhandar started as a small halwai shop in Sanganer by the Kumawat family.' },
  { year: '1995', title: 'Expansion', desc: 'Expanded our product range to include dairy products like paneer, mawa, and khoya.' },
  { year: '2005', title: 'Beverages Added', desc: 'Introduced fresh juices, shakes, and lassi to serve the community better.' },
  { year: '2015', title: 'Community Favorite', desc: 'Recognized as the most trusted sweet shop in Sanganer by the local community.' },
  { year: '2024', title: 'Going Digital', desc: 'Launched our online presence to serve customers across Jaipur and beyond!' },
]

const team = [
  {
    name: 'Shishpal Kumawat',
    role: 'Owner & Head Halwai',
    desc: 'With 38 years of experience, Shishpal ji personally oversees quality and ensures every product meets our high standards.',
    emoji: '👨‍🍳',
  },
]

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-brown-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-saffron-400 font-semibold uppercase tracking-wider text-sm">Our Story</span>
          <h1 className="font-heading text-5xl font-bold mt-2 mb-4">About Palak Mistan Bhandar</h1>
          <p className="text-orange-200 max-w-2xl mx-auto text-lg">
            A family legacy of authentic Indian sweets, crafted with love and served with pride in Sanganer, Jaipur for over 38 years.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-subtitle mb-3 block">Our Heritage</span>
              <h2 className="section-title mb-6">A Taste Passed Down Through Generations</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1985 by the Kumawat family in the historic town of Sanganer, Jaipur, 
                  <strong className="text-brown-800"> Palak Mistan Bhandar</strong> has been a cornerstone of 
                  the community for nearly four decades. What started as a small roadside halwai stall has grown 
                  into Sanganer's most trusted and beloved sweet shop.
                </p>
                <p>
                  Under the guidance of <strong className="text-brown-800">Shishpal Kumawat</strong>, we continue 
                  to follow the same traditional recipes handed down through generations — using pure desi ghee, 
                  fresh milk, and locally sourced ingredients with absolutely no artificial preservatives or colors.
                </p>
                <p>
                  Whether it's our crispy <strong className="text-saffron-500">Pyaaz Kachori</strong>, 
                  delicate <strong className="text-saffron-500">Kaju Katli</strong>, 
                  fresh <strong className="text-saffron-500">Paneer</strong>, or a chilled 
                  <strong className="text-saffron-500"> Mango Shake</strong> — every item at Palak Mistan Bhandar 
                  is made with the same love and care as it was 38 years ago.
                </p>
              </div>
              <Link to="/products" className="btn-primary mt-8 inline-flex items-center gap-2">
                Explore Our Products
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" alt="Sweet shop" className="rounded-2xl h-56 w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" alt="Snacks" className="rounded-2xl h-56 w-full object-cover mt-8" />
              <img src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400" alt="Dairy" className="rounded-2xl h-56 w-full object-cover -mt-4" />
              <img src="https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400" alt="Beverages" className="rounded-2xl h-56 w-full object-cover mt-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-saffron-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 38, suffix: '+', label: 'Years of Legacy' },
              { end: 50, suffix: '+', label: 'Products' },
              { end: 10000, suffix: '+', label: 'Happy Customers' },
              { end: 365, suffix: '', label: 'Days Open / Year' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold font-heading text-white">
                  <CountUp end={s.end} duration={3} suffix={s.suffix} enableScrollSpy />
                </div>
                <div className="text-orange-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle mb-2 block">What We Stand For</span>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaLeaf, color: 'bg-green-100 text-green-600', title: 'Quality First', desc: 'We use only the finest, freshest ingredients. No artificial colors, flavors, or preservatives — ever.' },
              { icon: FaHeart, color: 'bg-red-100 text-red-500', title: 'Made with Love', desc: 'Every sweet, every snack, and every dairy product is made with passion and genuine care for our customers.' },
              { icon: FaAward, color: 'bg-yellow-100 text-yellow-600', title: 'Trusted Legacy', desc: 'Nearly 4 decades of serving the community has built trust that we cherish and protect every single day.' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="card p-8 text-center">
                <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <Icon className="text-3xl" />
                </div>
                <h3 className="font-heading font-bold text-xl text-brown-800 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-subtitle mb-2 block">Our Journey</span>
            <h2 className="section-title">The Palak Mistan Bhandar Story</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-saffron-200" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 card p-6 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-saffron-500 font-heading font-bold text-lg">{item.year}</span>
                    <h3 className="font-heading font-semibold text-brown-800 mt-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                  </div>
                  <div className="relative z-10 w-10 h-10 bg-saffron-gradient rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-subtitle mb-4 block">Meet the Owner</span>
          <div className="card p-10 max-w-lg mx-auto">
            <div className="text-7xl mb-5">{team[0].emoji}</div>
            <h3 className="font-heading text-2xl font-bold text-brown-800">{team[0].name}</h3>
            <p className="text-saffron-500 font-medium mt-1 mb-4">{team[0].role}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{team[0].desc}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
