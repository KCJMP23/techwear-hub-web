'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">Product Management</h1>
                <p className="text-apple-gray-600 mt-1">Manage your affiliate products and links</p>
              </div>
              <div className="animate-fade-in-right">
                <button className="admin-button admin-button-primary">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Products</h2>
              <p className="text-apple-gray-600 mb-6">Manage your affiliate products and track performance</p>
              
              <div className="text-center text-apple-gray-500 py-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-apple-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-lg font-semibold">No products yet</p>
                <p className="text-sm">Start by adding your first affiliate product</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 