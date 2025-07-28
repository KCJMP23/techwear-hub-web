import { describe, it, expect, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';

// Mock the database utilities
jest.mock('@affiliate-template/db', () => ({
  affiliateLinkService: {
    create: jest.fn(),
    findById: jest.fn(),
    findBySite: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    trackClick: jest.fn(),
    getClickStats: jest.fn()
  },
  siteService: {
    create: jest.fn(),
    findById: jest.fn(),
    findByDomain: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  productService: {
    create: jest.fn(),
    findById: jest.fn(),
    findByManufacturer: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  analyticsService: {
    getSiteAnalytics: jest.fn(),
    getTopProducts: jest.fn(),
    getClickHistory: jest.fn()
  }
}));

describe('API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/affiliate', () => {
    it('should create a new affiliate link', async () => {
      const mockData = {
        name: 'Test Link',
        originalUrl: 'https://example.com',
        affiliateUrl: 'https://affiliate.com/link',
        siteId: 'site-123',
        status: 'active'
      };

      const { affiliateLinkService } = await import('@affiliate-template/db');
      (affiliateLinkService.create as jest.Mock).mockResolvedValue({
        id: 'link-123',
        ...mockData
      });

      const { POST } = await import('../app/api/affiliate/route');
      const request = new NextRequest('http://localhost:3000/api/affiliate', {
        method: 'POST',
        body: JSON.stringify(mockData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.id).toBe('link-123');
      expect(affiliateLinkService.create).toHaveBeenCalledWith(mockData);
    });

    it('should return 400 for invalid data', async () => {
      const { POST } = await import('../app/api/affiliate/route');
      const request = new NextRequest('http://localhost:3000/api/affiliate', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });

  describe('GET /api/affiliate', () => {
    it('should return all affiliate links', async () => {
      const mockLinks = [
        { id: 'link-1', name: 'Link 1' },
        { id: 'link-2', name: 'Link 2' }
      ];

      const { affiliateLinkService } = await import('@affiliate-template/db');
      (affiliateLinkService.findAll as jest.Mock).mockResolvedValue(mockLinks);

      const { GET } = await import('../app/api/affiliate/route');
      const request = new NextRequest('http://localhost:3000/api/affiliate');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockLinks);
    });
  });

  describe('GET /api/sites', () => {
    it('should return all sites', async () => {
      const mockSites = [
        { id: 'site-1', name: 'Site 1' },
        { id: 'site-2', name: 'Site 2' }
      ];

      const { siteService } = await import('@affiliate-template/db');
      (siteService.findAll as jest.Mock).mockResolvedValue(mockSites);

      const { GET } = await import('../app/api/sites/route');
      const request = new NextRequest('http://localhost:3000/api/sites');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockSites);
    });
  });

  describe('POST /api/sites', () => {
    it('should create a new site', async () => {
      const mockData = {
        name: 'Test Site',
        domain: 'test.com',
        description: 'Test site description'
      };

      const { siteService } = await import('@affiliate-template/db');
      (siteService.create as jest.Mock).mockResolvedValue({
        id: 'site-123',
        ...mockData
      });

      const { POST } = await import('../app/api/sites/route');
      const request = new NextRequest('http://localhost:3000/api/sites', {
        method: 'POST',
        body: JSON.stringify(mockData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.id).toBe('site-123');
      expect(siteService.create).toHaveBeenCalledWith(mockData);
    });
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { id: 'product-1', name: 'Product 1' },
        { id: 'product-2', name: 'Product 2' }
      ];

      const { productService } = await import('@affiliate-template/db');
      (productService.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const { GET } = await import('../app/api/products/route');
      const request = new NextRequest('http://localhost:3000/api/products');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockProducts);
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const mockData = {
        name: 'Test Product',
        description: 'Test product description',
        manufacturer: 'Test Manufacturer',
        basePrice: 99.99
      };

      const { productService } = await import('@affiliate-template/db');
      (productService.create as jest.Mock).mockResolvedValue({
        id: 'product-123',
        ...mockData
      });

      const { POST } = await import('../app/api/products/route');
      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(mockData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.id).toBe('product-123');
      expect(productService.create).toHaveBeenCalledWith(mockData);
    });
  });

  describe('GET /api/analytics', () => {
    it('should return site analytics', async () => {
      const mockAnalytics = {
        totalClicks: 100,
        uniqueClicks: 80,
        conversions: 10,
        conversionRate: 10,
        totalRevenue: 500
      };

      const { analyticsService } = await import('@affiliate-template/db');
      (analyticsService.getSiteAnalytics as jest.Mock).mockResolvedValue(mockAnalytics);

      const { GET } = await import('../app/api/analytics/route');
      const request = new NextRequest('http://localhost:3000/api/analytics?siteId=site-123');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockAnalytics);
    });

    it('should return top products', async () => {
      const mockTopProducts = [
        { product: { id: 'product-1', name: 'Product 1' }, clicks: 50, revenue: 250 },
        { product: { id: 'product-2', name: 'Product 2' }, clicks: 30, revenue: 150 }
      ];

      const { analyticsService } = await import('@affiliate-template/db');
      (analyticsService.getTopProducts as jest.Mock).mockResolvedValue(mockTopProducts);

      const { GET } = await import('../app/api/analytics/route');
      const request = new NextRequest('http://localhost:3000/api/analytics?type=top-products&siteId=site-123');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockTopProducts);
    });

    it('should return link statistics', async () => {
      const mockLinkStats = {
        totalClicks: 25,
        uniqueClicks: 20,
        conversionRate: 8,
        clicks: []
      };

      const { affiliateLinkService } = await import('@affiliate-template/db');
      (affiliateLinkService.getClickStats as jest.Mock).mockResolvedValue(mockLinkStats);

      const { GET } = await import('../app/api/analytics/route');
      const request = new NextRequest('http://localhost:3000/api/analytics?type=link-stats&linkId=link-123');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockLinkStats);
    });

    it('should return click history', async () => {
      const mockClickHistory = [
        { id: 'click-1', clickedAt: new Date(), ipAddress: '192.168.1.1' },
        { id: 'click-2', clickedAt: new Date(), ipAddress: '192.168.1.2' }
      ];

      const { analyticsService } = await import('@affiliate-template/db');
      (analyticsService.getClickHistory as jest.Mock).mockResolvedValue(mockClickHistory);

      const { GET } = await import('../app/api/analytics/route');
      const request = new NextRequest('http://localhost:3000/api/analytics?type=click-history&linkId=link-123');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockClickHistory);
    });
  });
}); 