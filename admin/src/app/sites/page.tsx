'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function SitesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', name: 'All Sites', count: 12 },
    { id: 'active', name: 'Active', count: 8 },
    { id: 'pending', name: 'Pending', count: 3 },
    { id: 'inactive', name: 'Inactive', count: 1 },
  ];

  const sites = [
    {
      id: 1,
      name: 'TechGear Reviews',
      domain: 'techgear-reviews.com',
      status: 'Active',
      theme: 'Tech',
      posts: 127,
      revenue: 2847,
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      name: 'Audio Enthusiast',
      domain: 'audio-enthusiast.com',
      status: 'Active',
      theme: 'Audio',
      posts: 89,
      revenue: 1847,
      lastUpdated: '2024-01-14',
    },
    {
      id: 3,
      name: 'Gaming Setup',
      domain: 'gaming-setup.com',
      status: 'Pending',
      theme: 'Gaming',
      posts: 0,
      revenue: 0,
      lastUpdated: '2024-01-13',
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
                <h1 className="text-3xl font-bold text-apple-gray-900">Site Management</h1>
                <p className="text-apple-gray-600 mt-1">Manage your affiliate sites and domains</p>
              </div>
              <div className="animate-fade-in-right">
                <button className="admin-button admin-button-primary">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Site
                </button>
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

            {/* Sites Table */}
            <div className="admin-action-card animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-apple-gray-900">Sites</h2>
                <div className="flex space-x-2">
                  <button className="admin-button admin-button-secondary">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Filter
                  </button>
                  <button className="admin-button admin-button-secondary">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-apple-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Site Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Domain</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Theme</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Posts</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Revenue</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Last Updated</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sites.map((site) => (
                      <tr key={site.id} className="border-b border-apple-gray-100 hover:bg-apple-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold text-apple-gray-900">{site.name}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-apple-gray-600">{site.domain}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            site.status === 'Active' 
                              ? 'bg-apple-green/10 text-apple-green' 
                              : site.status === 'Pending'
                              ? 'bg-apple-orange/10 text-apple-orange'
                              : 'bg-apple-gray/10 text-apple-gray'
                          }`}>
                            {site.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-apple-gray-600">{site.theme}</td>
                        <td className="py-4 px-4 text-apple-gray-600">{site.posts}</td>
                        <td className="py-4 px-4 text-apple-green font-semibold">${site.revenue.toLocaleString()}</td>
                        <td className="py-4 px-4 text-apple-gray-600">{site.lastUpdated}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-apple-blue hover:bg-apple-blue/10 rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="p-2 text-apple-red hover:bg-apple-red/10 rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 