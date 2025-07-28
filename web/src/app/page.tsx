import Link from 'next/link';
import { getSiteConfig, getFeaturedProducts, getCategories, getProductCount } from '@affiliate-template/db';

interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  basePrice?: number;
  category?: string;
  siteProduct?: {
    price: number;
    discount: number;
    category?: {
      name: string;
      slug: string;
    };
  };
  affiliateLinks?: Array<{
    id: string;
    name: string;
    affiliateUrl: string;
    displayText: string;
  }>;
  retailers?: Array<{
    name: string;
    url: string;
    logo: string;
    color: string;
  }>;
}

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface SiteConfig {
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  featuredProductsTitle: string;
  featuredProductsSubtitle: string;
}

export default async function HomePage() {
  const domain = 'localhost:3000';
  
  const [siteConfig, featuredProducts, categories, productCount] = await Promise.all([
    getSiteConfig(domain),
    getFeaturedProducts(domain, 8),
    getCategories(domain),
    getProductCount(domain)
  ]);

  const config = siteConfig || {
    siteTitle: 'TechGear Reviews',
    siteDescription: 'Comprehensive reviews of the latest gadgets and technology',
    heroTitle: 'Find the Best Tech Products',
    heroSubtitle: 'Comprehensive reviews of the latest gadgets and technology',
    featuredProductsTitle: 'Featured Products',
    featuredProductsSubtitle: 'Handpicked products with the best value and quality'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {config.heroTitle}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed">
              {config.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Browse Products
              </Link>
              <Link 
                href="/blog" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {config.featuredProductsTitle}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {config.featuredProductsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Product Image</span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {product.siteProduct?.category?.name || 'Technology'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.siteProduct?.price || product.basePrice}
                      </span>
                      {product.siteProduct?.discount && product.siteProduct.discount > 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          {product.siteProduct.discount}% OFF
                        </span>
                      )}
                    </div>
                    <Link 
                      href={`/products/${product.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View All Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Find exactly what you&apos;re looking for in our organized categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {categories.slice(0, 8).map((category, index) => (
              <Link 
                key={category.slug || index} 
                href={`/products?category=${category.slug}`}
                className="group bg-gray-50 rounded-xl p-6 sm:p-8 hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Browse products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8">
            Get the latest product reviews and tech news delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}