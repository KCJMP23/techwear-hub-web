'use client';

import { useState } from 'react';
import { ImageGenerationRequest } from '@affiliate-template/shared-types';

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

export function ImageGenerator({ onImageGenerated, onError }: ImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    prompt: '',
    provider: 'leonardo' as const,
    size: '1024x1024' as const,
    style: '',
    aspectRatio: '1:1' as const,
    quality: 'standard' as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const request: ImageGenerationRequest = {
        prompt: formData.prompt,
        provider: formData.provider,
        size: formData.size,
        style: formData.style || undefined,
        aspectRatio: formData.aspectRatio,
        quality: formData.quality,
      };

      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Image generation failed');
      }

      const result = await response.json();
      const imageUrl = result.data.imageUrl;

      setGeneratedImage(imageUrl);
      onImageGenerated?.(imageUrl);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Image generation failed';
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
      <h2 className="text-2xl font-bold text-apple-gray-900 mb-6">AI Image Generator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
            Image Description/Prompt *
          </label>
          <textarea
            value={formData.prompt}
            onChange={(e) => handleInputChange('prompt', e.target.value)}
            className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            rows={3}
            placeholder="Describe the image you want to generate..."
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
              <option value="leonardo">Leonardo.AI</option>
              <option value="openai">OpenAI (DALL-E)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
              Image Size
            </label>
            <select
              value={formData.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            >
              <option value="1024x1024">1024x1024 (Square)</option>
              <option value="1792x1024">1792x1024 (Landscape)</option>
              <option value="1024x1792">1024x1792 (Portrait)</option>
              <option value="512x512">512x512 (Small Square)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
              Style (Optional)
            </label>
            <input
              type="text"
              value={formData.style}
              onChange={(e) => handleInputChange('style', e.target.value)}
              className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
              placeholder="e.g., photorealistic, artistic, minimalist"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
              Quality
            </label>
            <select
              value={formData.quality}
              onChange={(e) => handleInputChange('quality', e.target.value)}
              className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            >
              <option value="standard">Standard</option>
              <option value="hd">HD</option>
            </select>
          </div>
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
              Generating Image...
            </div>
          ) : (
            'Generate Image'
          )}
        </button>
      </form>

      {generatedImage && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Generated Image</h3>
          <div className="border border-apple-gray-200 rounded-2xl p-6 bg-apple-gray-50">
            <img
              src={generatedImage}
              alt="Generated image"
              className="w-full h-auto rounded-2xl shadow-apple-sm"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = generatedImage;
                  link.download = 'generated-image.png';
                  link.click();
                }}
                className="admin-button admin-button-primary"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
              <button
                onClick={() => setGeneratedImage(null)}
                className="admin-button admin-button-secondary"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 