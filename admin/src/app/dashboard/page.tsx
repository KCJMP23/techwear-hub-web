'use client';

import { useSession, signOut } from 'next-auth/react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">Admin Dashboard</h1>
                <p className="text-apple-gray-600 mt-1">
                  Welcome back, {session?.user?.name || session?.user?.email}
                </p>
              </div>
              <div className="animate-fade-in-right">
                <button
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  className="admin-button admin-button-secondary"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="admin-stat-card animate-fade-in-up animation-delay-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-apple-gray-600">Total Sites</p>
                    <p className="text-2xl font-semibold text-apple-gray-900">0</p>
                    <p className="text-sm text-apple-gray-500">+0% from last month</p>
                  </div>
                  <div className="p-3 bg-apple-blue/10 rounded-2xl">
                    <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="admin-stat-card animate-fade-in-up animation-delay-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-apple-gray-600">Total Posts</p>
                    <p className="text-2xl font-semibold text-apple-gray-900">0</p>
                    <p className="text-sm text-apple-gray-500">+0% from last month</p>
                  </div>
                  <div className="p-3 bg-apple-green/10 rounded-2xl">
                    <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="admin-stat-card animate-fade-in-up animation-delay-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-apple-gray-600">Total Clicks</p>
                    <p className="text-2xl font-semibold text-apple-gray-900">0</p>
                    <p className="text-sm text-apple-gray-500">+0% from last month</p>
                  </div>
                  <div className="p-3 bg-apple-orange/10 rounded-2xl">
                    <svg className="w-6 h-6 text-apple-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="admin-stat-card animate-fade-in-up animation-delay-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-apple-gray-600">Total Revenue</p>
                    <p className="text-2xl font-semibold text-apple-gray-900">$0</p>
                    <p className="text-sm text-apple-gray-500">+0% from last month</p>
                  </div>
                  <div className="p-3 bg-apple-purple/10 rounded-2xl">
                    <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="admin-action-card animate-fade-in-up animation-delay-500">
                <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Quick Actions</h2>
                <p className="text-sm text-apple-gray-600 mb-6">Common tasks and shortcuts</p>
                <div className="space-y-4">
                  <button 
                    onClick={() => window.location.href = '/generate'}
                    className="w-full admin-button admin-button-secondary justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Generate Content
                  </button>
                  <button 
                    onClick={() => window.location.href = '/approval'}
                    className="w-full admin-button admin-button-secondary justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Content Approval
                  </button>
                  <button 
                    onClick={() => window.location.href = '/products'}
                    className="w-full admin-button admin-button-secondary justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Product Management
                  </button>
                  <button 
                    onClick={() => window.location.href = '/analytics'}
                    className="w-full admin-button admin-button-secondary justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics Dashboard
                  </button>
                  <button 
                    onClick={() => window.location.href = '/sites'}
                    className="w-full admin-button admin-button-secondary justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Site Management
                  </button>
                  <button 
                    onClick={() => window.location.href = '/cms'}
                    className="w-full admin-button admin-button-secondary justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    CMS Dashboard
                  </button>
                  <button 
                    onClick={() => window.location.href = '/ai'}
                    className="w-full admin-button admin-button-secondary justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    AI Services
                  </button>
                </div>
              </div>

              <div className="admin-action-card animate-fade-in-up animation-delay-600">
                <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Recent Activity</h2>
                <p className="text-sm text-apple-gray-600 mb-6">Latest updates and changes</p>
                <div className="text-center text-apple-gray-500 py-8">
                  <svg className="w-16 h-16 mx-auto mb-4 text-apple-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-lg font-semibold">No recent activity</p>
                  <p className="text-sm">Start by creating your first site</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}