'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function SocialMediaPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">Social Media</h1>
                <p className="text-apple-gray-600 mt-1">Manage social media posts and campaigns</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Social Media</h2>
              <p className="text-apple-gray-600 mb-6">Manage social media posts and campaigns</p>
              
              <div className="text-center text-apple-gray-500 py-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-apple-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
                <p className="text-lg font-semibold">Social media management coming soon</p>
                <p className="text-sm">Schedule posts and manage campaigns</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 