'use client';

import { useState, useMemo } from 'react';


export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Products Data with multiple retailers
  const products = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro",
      description: "Latest A17 Pro chip, 48MP camera, Titanium design",
      price: 999.99,
      originalPrice: 1099.99,
      rating: 4.9,
      reviewCount: 2847,
      category: "Phones",
      image: "/products/iphone-15-pro.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" },
        { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
      ]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      description: "200MP camera, S Pen, AI features",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviewCount: 1567,
      category: "Phones",
      image: "/products/samsung-s24.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" }
      ]
    },
    {
      id: 3,
      name: "MacBook Air M2",
      description: "13.6-inch Retina display, M2 chip, 18-hour battery",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.9,
      reviewCount: 892,
      category: "Laptops",
      image: "/products/macbook-air.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" },
        { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
      ]
    },
    {
      id: 4,
      name: "Dell XPS 13 Plus",
      description: "13.4-inch OLED, Intel i7, 16GB RAM",
      price: 1499.99,
      originalPrice: 1699.99,
      rating: 4.7,
      reviewCount: 445,
      category: "Laptops",
      image: "/products/dell-xps.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" }
      ]
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      description: "Industry-leading noise cancellation, 30-hour battery",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.9,
      reviewCount: 2341,
      category: "Audio",
      image: "/products/sony-headphones.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" },
        { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
      ]
    },
    {
      id: 6,
      name: "AirPods Pro 2nd Gen",
      description: "Active noise cancellation, Spatial audio",
      price: 249.99,
      originalPrice: 279.99,
      rating: 4.8,
      reviewCount: 1892,
      category: "Audio",
      image: "/products/airpods-pro.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" },
        { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
      ]
    },
    {
      id: 7,
      name: "Samsung 65-inch QLED",
      description: "4K Ultra HD, Quantum HDR, Smart TV",
      price: 1299.99,
      originalPrice: 1499.99,
      rating: 4.7,
      reviewCount: 567,
      category: "TVs",
      image: "/products/samsung-tv.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" },
        { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
      ]
    },
    {
      id: 8,
      name: "LG C3 55-inch OLED",
      description: "4K OLED, AI-powered, Gaming features",
      price: 1499.99,
      originalPrice: 1799.99,
      rating: 4.8,
      reviewCount: 334,
      category: "TVs",
      image: "/products/lg-oled.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" },
        { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
      ]
    }
  ];

  const categories = [
    { name: 'all', label: 'All Products', count: products.length },
    { name: 'phones', label: 'Phones', count: products.filter(p => p.category === 'Phones').length },
    { name: 'laptops', label: 'Laptops', count: products.filter(p => p.category === 'Laptops').length },
    { name: 'audio', label: 'Audio', count: products.filter(p => p.category === 'Audio').length },
    { name: 'tvs', label: 'TVs', count: products.filter(p => p.category === 'TVs').length },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = products.filter(product => 
        product.category.toLowerCase() === selectedCategory
      );
    }

    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [selectedCategory, sortBy, products]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          All Products
        </h1>
        <p className="text-lg text-gray-600">
          Discover amazing products with the best prices and reviews
        </p>
      </div>

      {/* Filters and Sort */}
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

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through ml-2">${product.originalPrice}</span>
                  )}
                </div>
              </div>
              
              {/* Retailer Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {product.retailers.map((retailer) => (
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
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
} 