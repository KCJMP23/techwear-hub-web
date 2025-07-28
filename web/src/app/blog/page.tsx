'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Blog Posts with affiliate content
  const posts = [
    {
      id: 1,
      title: "Best Laptops for 2024: Complete Buyer's Guide",
      excerpt: "Discover the top-rated laptops for work, gaming, and everyday use. Our comprehensive guide covers everything from budget options to premium machines.",
      slug: "best-laptops-2024",
      publishedAt: "2024-01-15",
      category: "Tech Reviews",
      author: "Alex Thompson",
      authorAvatar: "AT",
      readTime: "12 min read",
      featuredImage: "/blog/best-laptops.jpg",
      rating: 4.8,
      recommendedProduct: {
        name: "MacBook Pro 14-inch",
        price: 1999.99,
        retailers: [
          { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
          { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
        ]
      }
    },
    {
      id: 2,
      title: "Top Gaming Headsets: Immersive Audio Experience",
      excerpt: "Find the perfect gaming headset for your setup. We've tested dozens of models to bring you the best options for competitive gaming and casual play.",
      slug: "best-gaming-headsets",
      publishedAt: "2024-01-12",
      category: "Gaming",
      author: "Sarah Chen",
      authorAvatar: "SC",
      readTime: "8 min read",
      featuredImage: "/blog/gaming-headsets.jpg",
      rating: 4.6,
      recommendedProduct: {
        name: "SteelSeries Arctis Pro",
        price: 179.99,
        retailers: [
          { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
          { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
        ]
      }
    },
    {
      id: 3,
      title: "Smart Home Setup: Essential Devices for 2024",
      excerpt: "Transform your home with the latest smart devices. From security cameras to smart speakers, we'll help you build the perfect connected home.",
      slug: "smart-home-setup-2024",
      publishedAt: "2024-01-10",
      category: "Home & Kitchen",
      author: "Mike Rodriguez",
      authorAvatar: "MR",
      readTime: "15 min read",
      featuredImage: "/blog/smart-home.jpg",
      rating: 4.7,
      recommendedProduct: {
        name: "Ring Video Doorbell",
        price: 99.99,
        retailers: [
          { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
          { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" }
        ]
      }
    },
    {
      id: 4,
      title: "Wireless Earbuds Comparison: AirPods vs Galaxy Buds",
      excerpt: "Detailed comparison of the most popular wireless earbuds on the market. Find out which pair offers the best value for your needs.",
      slug: "airpods-vs-galaxy-buds",
      publishedAt: "2024-01-08",
      category: "Audio",
      author: "Emma Davis",
      authorAvatar: "ED",
      readTime: "10 min read",
      featuredImage: "/blog/wireless-earbuds.jpg",
      rating: 4.5,
      recommendedProduct: {
        name: "AirPods Pro 2nd Gen",
        price: 249.99,
        retailers: [
          { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
          { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
        ]
      }
    },
    {
      id: 5,
      title: "Gaming Setup Essentials: Complete Guide",
      excerpt: "From monitors to keyboards, discover the essential components for building a high-performance gaming setup that will give you the competitive edge.",
      slug: "gaming-setup-essentials",
      publishedAt: "2024-01-05",
      category: "Gaming",
      author: "David Kim",
      authorAvatar: "DK",
      readTime: "18 min read",
      featuredImage: "/blog/gaming-setup.jpg",
      rating: 4.9,
      recommendedProduct: {
        name: "ASUS ROG Swift Monitor",
        price: 799.99,
        retailers: [
          { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
          { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
        ]
      }
    },
    {
      id: 6,
      title: "Kitchen Appliances: Must-Have Gadgets for Home Chefs",
      excerpt: "Upgrade your kitchen with the latest smart appliances and gadgets that make cooking easier, faster, and more enjoyable.",
      slug: "kitchen-appliances-guide",
      publishedAt: "2024-01-03",
      category: "Home & Kitchen",
      author: "Emma Davis",
      authorAvatar: "ED",
      readTime: "14 min read",
      featuredImage: "/blog/kitchen-appliances.jpg",
      rating: 4.5,
      recommendedProduct: {
        name: "Instant Pot Duo Plus",
        price: 129.99,
        retailers: [
          { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
          { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" }
        ]
      }
    }
  ];

  const categories = [
    { name: 'all', label: 'All Posts', count: posts.length },
    { name: 'Tech Reviews', label: 'Tech Reviews', count: posts.filter(p => p.category === 'Tech Reviews').length },
    { name: 'Gaming', label: 'Gaming', count: posts.filter(p => p.category === 'Gaming').length },
    { name: 'Home & Kitchen', label: 'Home & Kitchen', count: posts.filter(p => p.category === 'Home & Kitchen').length },
    { name: 'Audio', label: 'Audio', count: posts.filter(p => p.category === 'Audio').length },
  ];

  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    if (selectedCategory !== 'all') {
      filtered = posts.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm, posts]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Blog
        </h1>
        <p className="text-lg text-gray-600">
          Expert reviews, guides, and recommendations to help you make informed decisions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{post.category} • {post.readTime}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">{post.rating}</span>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                    {post.authorAvatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Recommended Product */}
              {post.recommendedProduct && (
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommended</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{post.recommendedProduct.name}</span>
                      <span className="text-sm font-bold text-gray-900">${post.recommendedProduct.price}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {post.recommendedProduct.retailers.map((retailer) => (
                        <button
                          key={retailer.name}
                          className={`${retailer.color} text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center`}
                        >
                          <span className="mr-1">{retailer.logo}</span>
                          {retailer.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
} 