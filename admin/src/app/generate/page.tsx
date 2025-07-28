'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function GenerateContent() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">Content Generation</h1>
                <p className="text-apple-gray-600 mt-1">Generate content and images with AI</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Content Generation</h2>
              <p className="text-apple-gray-600 mb-6">Generate blog posts, product descriptions, and images using AI</p>
              
              <div className="text-center text-apple-gray-500 py-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-apple-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-lg font-semibold">Content generation coming soon</p>
                <p className="text-sm">Generate blog posts, reviews, and images</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 