'use client';

import { useState } from 'react';
import { Button } from '@affiliate-template/ui';
import { Card } from '@affiliate-template/ui';
import { Input } from '@affiliate-template/ui';
import { Textarea } from '@affiliate-template/ui';
import { Select } from '@affiliate-template/ui';
import { Badge } from '@affiliate-template/ui';
import { Toast } from '@affiliate-template/ui';

interface ManualAmazonLink {
  originalUrl: string;
  trackingId: string;
  affiliateUrl: string;
  category: string;
  description?: string;
}

interface AmazonTrackingId {
  id: string;
  category: string;
  description: string;
}

export default function ManualAmazonPage() {
  const [urls, setUrls] = useState('');
  const [trackingId, setTrackingId] = useState('jmpkch23-20');
  const [convertedLinks, setConvertedLinks] = useState<ManualAmazonLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const trackingIds: AmazonTrackingId[] = [
    {
      id: 'weartech00-20',
      category: 'wearable-tech',
      description: 'Wearable and mobile health technology and accessories'
    },
    {
      id: 'jmpkch23-20',
      category: 'general',
      description: 'General merchandise'
    },
    {
      id: 'hothoneyfever00-20',
      category: 'hot-honey',
      description: 'Hot honey products'
    }
  ];

  const handleConvertUrls = async () => {
    if (!urls.trim()) {
      setError('Please enter at least one URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const urlArray = urls.split('\n').map(url => url.trim()).filter(url => url);
      
      const response = await fetch('/api/products/manual-amazon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: urlArray,
          trackingId
        }),
      });

      const data = await response.json();

      if (data.success) {
        setConvertedLinks(data.data);
        setSuccess(`Successfully converted ${data.count} URLs`);
      } else {
        setError(data.error || 'Failed to convert URLs');
      }
    } catch (error) {
      setError('Failed to convert URLs');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('URL copied to clipboard');
    } catch (error) {
      setError('Failed to copy URL');
    }
  };

  const exportToCSV = () => {
    if (convertedLinks.length === 0) {
      setError('No links to export');
      return;
    }

    const csvContent = [
      'Original URL,Tracking ID,Affiliate URL,Category',
      ...convertedLinks.map(link => 
        `"${link.originalUrl}","${link.trackingId}","${link.affiliateUrl}","${link.category}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amazon-affiliate-links.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    setSuccess('CSV exported successfully');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manual Amazon Link Management</h1>
        <Badge variant="secondary">Manual Mode</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Convert Amazon URLs</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tracking ID
              </label>
              <Select
                value={trackingId}
                onChange={setTrackingId}
                options={trackingIds.map((tracking) => ({
                  value: tracking.id,
                  label: `${tracking.id} - ${tracking.description}`
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Amazon URLs (one per line)
              </label>
              <Textarea
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="https://amazon.com/product1&#10;https://amazon.com/product2"
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <Button 
              onClick={handleConvertUrls}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Converting...' : 'Convert to Affiliate Links'}
            </Button>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">Bulk Upload Method</h3>
              <p className="text-sm text-gray-600">
                Paste multiple Amazon URLs (one per line) and convert them to affiliate links with your tracking ID.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg">SiteStripe Method</h3>
              <p className="text-sm text-gray-600">
                Use Amazon&apos;s SiteStripe browser extension to copy affiliate links directly from Amazon product pages.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg">Your Tracking IDs</h3>
              <div className="space-y-2">
                {trackingIds.map((tracking) => (
                  <div key={tracking.id} className="text-sm">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {tracking.id}
                    </span>
                    <span className="ml-2 text-gray-600">
                      - {tracking.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Results */}
      {convertedLinks.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Converted Links ({convertedLinks.length})
            </h2>
            <Button onClick={exportToCSV} variant="outline">
              Export CSV
            </Button>
          </div>

          <div className="space-y-3">
            {convertedLinks.map((link, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">
                      Original: {link.originalUrl}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Tracking ID: {link.trackingId} ({link.category})
                    </div>
                    <div className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                      {link.affiliateUrl}
                    </div>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(link.affiliateUrl)}
                    size="sm"
                    variant="outline"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Toast notifications */}
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => setError('')}
        />
      )}
      
      {success && (
        <Toast
          message={success}
          type="success"
          onClose={() => setSuccess('')}
        />
      )}
    </div>
  );
} 