'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DeployPage() {
  const [selectedSite, setSelectedSite] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState('idle');

  const sites = [
    {
      id: 1,
      name: 'TechGear Reviews',
      domain: 'techgear-reviews.com',
      status: 'Live',
      lastDeployed: '2024-01-15 14:30',
      platform: 'Vercel',
    },
    {
      id: 2,
      name: 'Audio Enthusiast',
      domain: 'audio-enthusiast.com',
      status: 'Live',
      lastDeployed: '2024-01-14 09:15',
      platform: 'Vercel',
    },
    {
      id: 3,
      name: 'Gaming Setup',
      domain: 'gaming-setup.com',
      status: 'Building',
      lastDeployed: '2024-01-13 16:45',
      platform: 'Vercel',
    },
  ];

  const handleDeploy = async () => {
    if (!selectedSite) return;
    
    setDeploymentStatus('deploying');
    
    // Simulate deployment
    setTimeout(() => {
      setDeploymentStatus('success');
      setTimeout(() => setDeploymentStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">Deployment</h1>
                <p className="text-apple-gray-600 mt-1">Deploy your sites to production</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Deploy Sites</h2>
              <p className="text-apple-gray-600 mb-6">Deploy your affiliate sites to production environments</p>
              
              <div className="space-y-6">
                {/* Site Selection */}
                <div>
                  <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
                    Select Site to Deploy
                  </label>
                  <select
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  >
                    <option value="">Choose a site...</option>
                    {sites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name} ({site.domain})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Deployment Status */}
                {deploymentStatus !== 'idle' && (
                  <div className={`p-4 rounded-2xl ${
                    deploymentStatus === 'deploying' 
                      ? 'bg-apple-orange/10 border border-apple-orange/20' 
                      : 'bg-apple-green/10 border border-apple-green/20'
                  }`}>
                    <div className="flex items-center">
                      {deploymentStatus === 'deploying' ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-apple-orange mr-3"></div>
                          <span className="text-apple-orange font-semibold">Deploying...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-apple-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-apple-green font-semibold">Deployment successful!</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Deploy Button */}
                <button
                  onClick={handleDeploy}
                  disabled={!selectedSite || deploymentStatus === 'deploying'}
                  className={`admin-button admin-button-primary ${
                    !selectedSite || deploymentStatus === 'deploying' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Deploy to Production
                </button>
              </div>
            </div>

            {/* Sites List */}
            <div className="admin-action-card mt-8 animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Your Sites</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-apple-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Site Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Domain</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Platform</th>
                      <th className="text-left py-3 px-4 font-semibold text-apple-gray-900">Last Deployed</th>
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
                            site.status === 'Live' 
                              ? 'bg-apple-green/10 text-apple-green' 
                              : 'bg-apple-orange/10 text-apple-orange'
                          }`}>
                            {site.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-apple-gray-600">{site.platform}</td>
                        <td className="py-4 px-4 text-apple-gray-600">{site.lastDeployed}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-apple-blue hover:bg-apple-blue/10 rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                            </button>
                            <button className="p-2 text-apple-gray-600 hover:bg-apple-gray/10 rounded-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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