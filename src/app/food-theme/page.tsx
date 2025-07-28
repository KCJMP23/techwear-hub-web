'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for food products
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Cookie Collection',
    description: 'Artisanal cookies made with organic ingredients',
    price: 24.99,
    originalPrice: 29.99,
    image: '/food-product-1.jpg',
    rating: 4.8,
    reviews: 342,
    badge: 'Best Seller',
    retailers: [
      { name: 'Amazon', url: '#', color: 'bg-orange-500' },
      { name: 'Walmart', url: '#', color: 'bg-blue-600' },
      { name: 'Whole Foods', url: '#', color: 'bg-green-600' },
    ]
  },
  {
    id: 2,
    name: 'Gourmet Chocolate Box',
    description: 'Belgian dark chocolate with assorted fillings',
    price: 34.99,
    originalPrice: 44.99,
    image: '/food-product-2.jpg',
    rating: 4.9,
    reviews: 567,
    badge: 'Limited Edition',
    retailers: [
      { name: 'Amazon', url: '#', color: 'bg-orange-500' },
      { name: 'Target', url: '#', color: 'bg-red-600' },
      { name: 'Costco', url: '#', color: 'bg-blue-700' },
    ]
  },
  {
    id: 3,
    name: 'Organic Snack Bundle',
    description: 'Healthy snacks for the whole family',
    price: 19.99,
    originalPrice: 24.99,
    image: '/food-product-3.jpg',
    rating: 4.7,
    reviews: 189,
    badge: 'New',
    retailers: [
      { name: 'Amazon', url: '#', color: 'bg-orange-500' },
      { name: 'Walmart', url: '#', color: 'bg-blue-600' },
      { name: 'Instacart', url: '#', color: 'bg-green-500' },
    ]
  },
];

const categories = [
  { name: 'Cookies & Treats', count: 156, icon: '🍪' },
  { name: 'Chocolate', count: 89, icon: '🍫' },
  { name: 'Healthy Snacks', count: 234, icon: '🥗' },
  { name: 'Beverages', count: 67, icon: '🥤' },
  { name: 'Gourmet Foods', count: 123, icon: '🍯' },
  { name: 'Kitchen Tools', count: 78, icon: '🔪' },
];

export default function FoodThemePage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&h=1080&fit=crop)' }}
        />
        <div className="relative z-20 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-7xl font-serif font-light mb-6 leading-tight">
              Discover Delicious<br />Artisanal Treats
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Curated collection of premium foods from trusted brands
            </p>
            <Link 
              href="/products?category=food"
              className="inline-flex items-center px-10 py-4 bg-[#FF5227] text-white rounded-full text-lg font-medium hover:bg-[#E64A1F] transition-all duration-300 transform hover:scale-105"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 overflow-hidden bg-[#FFF8F5] border-y border-[#FFE5DF]">
        <div className="flex animate-marquee space-x-16">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-16 whitespace-nowrap">
              <span className="text-2xl font-serif text-[#FF5227]">100% Organic</span>
              <span className="text-2xl font-serif text-[#FF5227]">•</span>
              <span className="text-2xl font-serif text-[#FF5227]">Farm to Table</span>
              <span className="text-2xl font-serif text-[#FF5227]">•</span>
              <span className="text-2xl font-serif text-[#FF5227]">Sustainable</span>
              <span className="text-2xl font-serif text-[#FF5227]">•</span>
              <span className="text-2xl font-serif text-[#FF5227]">Small Batch</span>
              <span className="text-2xl font-serif text-[#FF5227]">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-light mb-4">Featured Finds</h2>
            <p className="text-xl text-gray-600">Hand-picked favorites from our food experts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-[#FF5227] text-white text-sm rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <div 
                    className="w-full h-full bg-gray-200 transform transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(https://images.unsplash.com/photo-${
                        product.id === 1 ? '1558961363-fa8fdf82db35' :
                        product.id === 2 ? '1481391319842-e2e01a90a67f' :
                        '1506224772-9432d9018732'
                      }?w=600&h=750&fit=crop)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-serif">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex text-[#FF5227]">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-semibold">${product.price}</span>
                    <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-sm text-[#FF5227]">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    {product.retailers.map((retailer) => (
                      <a
                        key={retailer.name}
                        href={retailer.url}
                        className={`block w-full py-3 px-4 text-center text-white rounded-lg ${retailer.color} hover:opacity-90 transition-opacity duration-200`}
                      >
                        Buy on {retailer.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 lg:px-8 bg-[#FFF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-light mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you&apos;re craving</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group text-center"
              >
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-light mb-6">
                Curated with Care
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every product in our collection is hand-picked by food enthusiasts who understand 
                quality. We partner with small-batch producers, family farms, and artisan makers 
                to bring you authentic flavors and exceptional ingredients.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From organic cookies to gourmet chocolates, each item tells a story of craftsmanship 
                and passion. We believe in supporting sustainable practices and celebrating the 
                makers who pour their hearts into every batch.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-[#FF5227] font-medium hover:underline"
              >
                Learn more about our mission
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <div 
                className="w-full h-full bg-gray-200"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 lg:px-8 bg-[#FFF8F5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-light mb-4">
            Get 10% off your first order
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community for exclusive deals and new product updates
          </p>
          
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border-2 border-[#FFE5DF] focus:border-[#FF5227] focus:outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#FF5227] text-white rounded-full font-medium hover:bg-[#E64A1F] transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our{' '}
            <Link href="/privacy" className="underline">privacy policy</Link>.
            We&apos;ll treat your information with care.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}