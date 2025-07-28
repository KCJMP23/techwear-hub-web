'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ContentApprovalPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const tabs = [
    { id: 'pending', name: 'Pending', count: 12 },
    { id: 'approved', name: 'Approved', count: 89 },
    { id: 'rejected', name: 'Rejected', count: 5 },
  ];

  const pendingItems = [
    {
      id: 1,
      title: 'Best Wireless Headphones 2024',
      type: 'Blog Post',
      author: 'AI Generator',
      submitted: '2024-01-15',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Apple AirPods Pro Review',
      type: 'Product Review',
      author: 'AI Generator',
      submitted: '2024-01-14',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Sony WH-1000XM4 vs Bose QC45',
      type: 'Comparison',
      author: 'AI Generator',
      submitted: '2024-01-13',
      priority: 'High',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">Content Approval</h1>
                <p className="text-apple-gray-600 mt-1">Review and approve generated content</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-apple-gray-100 p-1 rounded-2xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white text-apple-gray-900 shadow-apple-sm'
                        : 'text-apple-gray-600 hover:text-apple-gray-900'
                    }`}
                  >
                    {tab.name}
                    <span className="ml-2 px-2 py-1 bg-apple-gray-200 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content List */}
            {activeTab === 'pending' && (
              <div className="admin-action-card animate-fade-in-up">
                <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Pending Approval</h2>
                
                <div className="space-y-4">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="p-6 border border-apple-gray-200 rounded-2xl hover:border-apple-gray-300 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-apple-gray-900">{item.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.priority === 'High' 
                                ? 'bg-apple-red/10 text-apple-red' 
                                : 'bg-apple-orange/10 text-apple-orange'
                            }`}>
                              {item.priority}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-apple-gray-600">
                            <span>{item.type}</span>
                            <span>•</span>
                            <span>{item.author}</span>
                            <span>•</span>
                            <span>Submitted {item.submitted}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="admin-button admin-button-primary">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button className="admin-button admin-button-secondary">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                          <button className="admin-button admin-button-secondary">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'approved' && (
              <div className="admin-action-card animate-fade-in-up">
                <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Approved Content</h2>
                <p className="text-apple-gray-600">View all approved content</p>
              </div>
            )}

            {activeTab === 'rejected' && (
              <div className="admin-action-card animate-fade-in-up">
                <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Rejected Content</h2>
                <p className="text-apple-gray-600">View all rejected content</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 