'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function NewsletterPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">Newsletter Management</h1>
                <p className="text-apple-gray-600 mt-1">Manage email campaigns and subscribers</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Newsletter</h2>
              <p className="text-apple-gray-600 mb-6">Manage email campaigns and subscriber lists</p>
              
              <div className="text-center text-apple-gray-500 py-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-apple-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-semibold">Newsletter management coming soon</p>
                <p className="text-sm">Create campaigns and manage subscribers</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 