'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  currentPage?: string;
}

export default function Sidebar({ currentPage }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '🛍️' },
    { name: 'Blog', href: '/blog', icon: '📝' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
    { name: 'Contact', href: '/contact', icon: '📧' },
  ];

  const categories = [
    { name: 'Electronics', href: '/products?category=electronics', count: 156 },
    { name: 'Home & Garden', href: '/products?category=home', count: 89 },
    { name: 'Fashion', href: '/products?category=fashion', count: 234 },
    { name: 'Sports', href: '/products?category=sports', count: 67 },
    { name: 'Books', href: '/products?category=books', count: 123 },
    { name: 'Toys', href: '/products?category=toys', count: 78 },
  ];

  const popularTags = [
    { name: '#reviews', href: '/blog?tag=reviews' },
    { name: '#tech', href: '/blog?tag=tech' },
    { name: '#gaming', href: '/blog?tag=gaming' },
    { name: '#audio', href: '/blog?tag=audio' },
    { name: '#budget', href: '/blog?tag=budget' },
    { name: '#comparison', href: '/blog?tag=comparison' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-lg border border-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 lg:w-64
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">AffiliateHub</h1>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${pathname === item.href
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <div className="mb-8 flex-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link
                  key={tag.name}
                  href={tag.href}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Logo at bottom */}
          <div className="mt-auto">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
} 