import Link from 'next/link';
import { Card } from '@affiliate-template/ui';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Dashboard</h1>
              <p className="text-apple-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your affiliate sites.</p>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in-right">
              <span className="text-sm text-apple-gray-500">Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="admin-stat-card animate-fade-in-up animation-delay-100">
            <div className="flex items-center">
              <div className="p-3 bg-apple-blue/10 rounded-2xl">
                <svg className="w-8 h-8 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-apple-gray-600">Total Sites</p>
                <p className="text-2xl font-bold text-apple-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="admin-stat-card animate-fade-in-up animation-delay-200">
            <div className="flex items-center">
              <div className="p-3 bg-apple-green/10 rounded-2xl">
                <svg className="w-8 h-8 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-apple-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-apple-gray-900">127</p>
              </div>
            </div>
          </div>

          <div className="admin-stat-card animate-fade-in-up animation-delay-300">
            <div className="flex items-center">
              <div className="p-3 bg-apple-orange/10 rounded-2xl">
                <svg className="w-8 h-8 text-apple-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-apple-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-apple-gray-900">342</p>
              </div>
            </div>
          </div>

          <div className="admin-stat-card animate-fade-in-up animation-delay-400">
            <div className="flex items-center">
              <div className="p-3 bg-apple-purple/10 rounded-2xl">
                <svg className="w-8 h-8 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-apple-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-apple-gray-900">$2,847</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Content Management */}
          <div className="admin-action-card animate-fade-in-up animation-delay-500">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Content Management</h2>
            <div className="space-y-4">
              <Link 
                href="/generate" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-blue/20"
              >
                <div className="p-3 bg-apple-blue/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Generate Content</p>
                  <p className="text-sm text-apple-gray-600">AI-powered blog posts and product reviews</p>
                </div>
              </Link>

              <Link 
                href="/cms" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-green/20"
              >
                <div className="p-3 bg-apple-green/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Content Management</p>
                  <p className="text-sm text-apple-gray-600">Manage posts, products, and media</p>
                </div>
              </Link>

              <Link 
                href="/approval" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-orange/20"
              >
                <div className="p-3 bg-apple-orange/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Content Approval</p>
                  <p className="text-sm text-apple-gray-600">Review and approve generated content</p>
                </div>
              </Link>

              <Link 
                href="/products" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-purple/20"
              >
                <div className="p-3 bg-apple-purple/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Product Management</p>
                  <p className="text-sm text-apple-gray-600">Manage affiliate products and links</p>
                </div>
              </Link>

              <Link 
                href="/products/manual-amazon" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-pink/20"
              >
                <div className="p-3 bg-apple-pink/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Manual Amazon Links</p>
                  <p className="text-sm text-apple-gray-600">Convert Amazon URLs to affiliate links</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Analytics & Marketing */}
          <div className="admin-action-card animate-fade-in-up animation-delay-600">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Analytics & Marketing</h2>
            <div className="space-y-4">
              <Link 
                href="/analytics" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-blue/20"
              >
                <div className="p-3 bg-apple-blue/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Analytics Dashboard</p>
                  <p className="text-sm text-apple-gray-600">Track clicks, conversions, and revenue</p>
                </div>
              </Link>

              <Link 
                href="/sites" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-red/20"
              >
                <div className="p-3 bg-apple-red/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Site Management</p>
                  <p className="text-sm text-apple-gray-600">Manage multiple niche sites</p>
                </div>
              </Link>

              <Link 
                href="/newsletter" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-pink/20"
              >
                <div className="p-3 bg-apple-pink/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Email Marketing</p>
                  <p className="text-sm text-apple-gray-600">Newsletter campaigns and subscribers</p>
                </div>
              </Link>

              <Link 
                href="/social" 
                className="flex items-center p-4 rounded-2xl border border-apple-gray-200 hover:shadow-apple-md transition-all duration-300 hover:border-apple-yellow/20"
              >
                <div className="p-3 bg-apple-yellow/10 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-apple-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 8h6m-6 4h6m-6 4h6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Social Media</p>
                  <p className="text-sm text-apple-gray-600">Automated social media posting</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-action-card animate-fade-in-up animation-delay-700">
          <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl border border-apple-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-apple-green rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold text-apple-gray-900">New blog post published</p>
                  <p className="text-sm text-apple-gray-600">&quot;Best Wireless Headphones 2024&quot; - TechGear Reviews</p>
                </div>
              </div>
              <span className="text-sm text-apple-gray-500">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl border border-apple-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-apple-blue rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Product price updated</p>
                  <p className="text-sm text-apple-gray-600">Sony WH-1000XM4 - Price dropped to $349.99</p>
                </div>
              </div>
              <span className="text-sm text-apple-gray-500">4 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl border border-apple-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-apple-orange rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold text-apple-gray-900">New conversion</p>
                  <p className="text-sm text-apple-gray-600">Apple AirPods Pro sale - $24.50 commission</p>
                </div>
              </div>
              <span className="text-sm text-apple-gray-500">6 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl border border-apple-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-apple-purple rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold text-apple-gray-900">Social media post scheduled</p>
                  <p className="text-sm text-apple-gray-600">Instagram post for &quot;Top 10 Tech Gadgets&quot;</p>
                </div>
              </div>
              <span className="text-sm text-apple-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

