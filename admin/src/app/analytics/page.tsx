'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function Analytics() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">Analytics Dashboard</h1>
                <p className="text-apple-gray-600 mt-1">Track performance and insights</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Analytics</h2>
              <p className="text-apple-gray-600 mb-6">Track your affiliate performance and revenue</p>
              
              <div className="text-center text-apple-gray-500 py-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-apple-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-lg font-semibold">Analytics coming soon</p>
                <p className="text-sm">Track clicks, conversions, and revenue</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 