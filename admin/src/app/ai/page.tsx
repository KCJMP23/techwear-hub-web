'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AIDashboard() {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Header */}
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-left">
                <h1 className="text-3xl font-bold text-apple-gray-900">AI Services</h1>
                <p className="text-apple-gray-600 mt-1">Generate content and images with AI</p>
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
                <button
                  onClick={() => setActiveTab('content')}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'content'
                      ? 'bg-white text-apple-gray-900 shadow-apple-sm'
                      : 'text-apple-gray-600 hover:text-apple-gray-900'
                  }`}
                >
                  Content Generation
                </button>
                <button
                  onClick={() => setActiveTab('images')}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'images'
                      ? 'bg-white text-apple-gray-900 shadow-apple-sm'
                      : 'text-apple-gray-600 hover:text-apple-gray-900'
                  }`}
                >
                  Image Generation
                </button>
              </div>
            </div>

            {/* Content Generation Tab */}
            {activeTab === 'content' && (
              <div className="admin-action-card animate-fade-in-up">
                <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Content Generation</h2>
                <p className="text-apple-gray-600 mb-6">Generate blog posts, product descriptions, and more using AI</p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-apple-blue/5 rounded-2xl border border-apple-blue/10">
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Blog Posts</h3>
                      <p className="text-sm text-apple-gray-600 mb-4">Generate engaging blog posts with SEO optimization</p>
                      <button className="admin-button admin-button-primary">
                        Generate Blog Post
                      </button>
                    </div>
                    
                    <div className="p-6 bg-apple-green/5 rounded-2xl border border-apple-green/10">
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Product Reviews</h3>
                      <p className="text-sm text-apple-gray-600 mb-4">Create detailed product reviews and comparisons</p>
                      <button className="admin-button admin-button-secondary">
                        Generate Review
                      </button>
                    </div>
                    
                    <div className="p-6 bg-apple-orange/5 rounded-2xl border border-apple-orange/10">
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Product Descriptions</h3>
                      <p className="text-sm text-apple-gray-600 mb-4">Write compelling product descriptions</p>
                      <button className="admin-button admin-button-secondary">
                        Generate Description
                      </button>
                    </div>
                    
                    <div className="p-6 bg-apple-purple/5 rounded-2xl border border-apple-purple/10">
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Social Media</h3>
                      <p className="text-sm text-apple-gray-600 mb-4">Create social media posts and captions</p>
                      <button className="admin-button admin-button-secondary">
                        Generate Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Image Generation Tab */}
            {activeTab === 'images' && (
              <div className="admin-action-card animate-fade-in-up">
                <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Image Generation</h2>
                <p className="text-apple-gray-600 mb-6">Generate custom images for your content using AI</p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-apple-blue/5 rounded-2xl border border-apple-blue/10">
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Product Images</h3>
                      <p className="text-sm text-apple-gray-600 mb-4">Generate product mockups and lifestyle images</p>
                      <button className="admin-button admin-button-primary">
                        Generate Product Image
                      </button>
                    </div>
                    
                    <div className="p-6 bg-apple-green/5 rounded-2xl border border-apple-green/10">
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Blog Graphics</h3>
                      <p className="text-sm text-apple-gray-600 mb-4">Create featured images and infographics</p>
                      <button className="admin-button admin-button-secondary">
                        Generate Blog Graphic
                      </button>
                    </div>
                    
                    <div className="p-6 bg-apple-orange/5 rounded-2xl border border-apple-orange/10">
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Social Media Graphics</h3>
                      <p className="text-sm text-apple-gray-600 mb-4">Design social media posts and stories</p>
                      <button className="admin-button admin-button-secondary">
                        Generate Social Graphic
                      </button>
                    </div>
                    
                    <div className="p-6 bg-apple-purple/5 rounded-2xl border border-apple-purple/10">
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Custom Artwork</h3>
                      <p className="text-sm text-apple-gray-600 mb-4">Create custom illustrations and artwork</p>
                      <button className="admin-button admin-button-secondary">
                        Generate Artwork
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 