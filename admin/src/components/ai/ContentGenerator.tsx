'use client';

import { useState } from 'react';
import { AIContentGenerationRequest } from '@affiliate-template/shared-types';

interface ContentGeneratorProps {
  onContentGenerated?: (content: string) => void;
  onError?: (error: string) => void;
}

export function ContentGenerator({ onContentGenerated, onError }: ContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    prompt: '',
    provider: 'openai' as const,
    contentType: 'blog_post' as const,
    tone: 'professional' as const,
    length: 'medium' as const,
    keywords: '',
    targetAudience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const request: AIContentGenerationRequest = {
        prompt: formData.prompt,
        provider: formData.provider,
        contentType: formData.contentType,
        tone: formData.tone,
        length: formData.length,
        keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()) : undefined,
        targetAudience: formData.targetAudience || undefined,
      };

      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Content generation failed');
      }

      const result = await response.json();
      const content = result.data.content;

      onContentGenerated?.(content);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Content generation failed';
      onError?.(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-apple-gray-900 mb-6">AI Content Generator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
            Content Topic/Prompt *
          </label>
          <textarea
            value={formData.prompt}
            onChange={(e) => handleInputChange('prompt', e.target.value)}
            className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            rows={3}
            placeholder="Describe the content you want to generate..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
              AI Provider
            </label>
            <select
              value={formData.provider}
              onChange={(e) => handleInputChange('provider', e.target.value)}
              className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            >
              <option value="openai">OpenAI (GPT-4)</option>
              <option value="claude">Claude (Anthropic)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
              Content Type
            </label>
            <select
              value={formData.contentType}
              onChange={(e) => handleInputChange('contentType', e.target.value)}
              className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            >
              <option value="blog_post">Blog Post</option>
              <option value="product_description">Product Description</option>
              <option value="social_media">Social Media Post</option>
              <option value="email">Email Newsletter</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => handleInputChange('tone', e.target.value)}
              className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
              Length
            </label>
            <select
              value={formData.length}
              onChange={(e) => handleInputChange('length', e.target.value)}
              className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            placeholder="seo, marketing, affiliate"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
            Target Audience
          </label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            placeholder="e.g., tech-savvy professionals aged 25-40"
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating || !formData.prompt}
          className={`w-full admin-button admin-button-primary ${
            isGenerating || !formData.prompt ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Generating Content...
            </div>
          ) : (
            'Generate Content'
          )}
        </button>
      </form>
    </div>
  );
} 