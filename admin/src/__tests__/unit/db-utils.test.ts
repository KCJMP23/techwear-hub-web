import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import {
  contentService,
  siteService,
  affiliateLinkService,
  productService,
  analyticsService,
  newsletterService,
  categoryService,
  tagService,
  mediaService,
  merchantService,
  auditService,
  recipeService,
  aiContentService,
  notificationService,
  contentTypeService
} from '@affiliate-template/db';

// Mock Prisma client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    content: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    site: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    affiliateLink: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    linkClick: {
      create: jest.fn(),
      findMany: jest.fn(),
      groupBy: jest.fn()
    },
    product: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    newsletterSubscriber: {
      create: jest.fn(),
      updateMany: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn()
    },
    newsletterCampaign: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn()
    },
    category: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    tag: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    mediaAsset: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    merchant: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    auditLog: {
      create: jest.fn(),
      findMany: jest.fn()
    },
    recipe: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    recipeIngredient: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    recipeInstruction: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    aIContentLog: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      aggregate: jest.fn()
    },
    realTimeNotification: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn()
    },
    contentType: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }))
}));

describe('Database Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Content Service', () => {
    it('should create content', async () => {
      const mockData = {
        title: 'Test Content',
        slug: 'test-content',
        contentTypeId: 1,
        data: { content: 'test' },
        status: 'draft'
      };

      const mockResult = { id: 'content-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.content.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await contentService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.content.create).toHaveBeenCalledWith({ data: mockData });
    });

    it('should find content by ID', async () => {
      const mockContent = {
        id: 'content-123',
        title: 'Test Content',
        slug: 'test-content'
      };

      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.content.findUnique as jest.Mock).mockResolvedValue(mockContent);

      const result = await contentService.findById('content-123');
      expect(result).toEqual(mockContent);
      expect(mockPrisma.content.findUnique).toHaveBeenCalledWith({
        where: { id: 'content-123' },
        include: expect.any(Object)
      });
    });
  });

  describe('Site Service', () => {
    it('should create site', async () => {
      const mockData = {
        name: 'Test Site',
        domain: 'test.com',
        description: 'Test site'
      };

      const mockResult = { id: 'site-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.site.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await siteService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.site.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Affiliate Link Service', () => {
    it('should create affiliate link', async () => {
      const mockData = {
        name: 'Test Link',
        originalUrl: 'https://example.com',
        affiliateUrl: 'https://affiliate.com/link',
        siteId: 'site-123'
      };

      const mockResult = { id: 'link-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.affiliateLink.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await affiliateLinkService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.affiliateLink.create).toHaveBeenCalledWith({ data: mockData });
    });

    it('should track click', async () => {
      const mockClickData = {
        affiliateLinkId: 'link-123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0'
      };

      const mockResult = { id: 'click-123', ...mockClickData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.linkClick.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await affiliateLinkService.trackClick(mockClickData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.linkClick.create).toHaveBeenCalledWith({ data: mockClickData });
    });
  });

  describe('Analytics Service', () => {
    it('should get site analytics', async () => {
      const mockAnalytics = {
        totalClicks: 100,
        uniqueClicks: 80,
        conversions: 10,
        conversionRate: 10,
        totalRevenue: 500
      };

      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.linkClick.findMany as jest.Mock).mockResolvedValue([]);

      const result = await analyticsService.getSiteAnalytics('site-123');
      expect(result).toBeDefined();
      expect(mockPrisma.linkClick.findMany).toHaveBeenCalled();
    });

    it('should get top products', async () => {
      const mockProductStats = [
        {
          affiliateLinkId: 'link-123',
          _count: { id: 50 },
          _sum: { conversionValue: 250 }
        }
      ];

      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.linkClick.groupBy as jest.Mock).mockResolvedValue(mockProductStats);
      (mockPrisma.affiliateLink.findUnique as jest.Mock).mockResolvedValue({
        product: { id: 'product-123', name: 'Test Product' }
      });

      const result = await analyticsService.getTopProducts('site-123');
      expect(result).toBeDefined();
      expect(mockPrisma.linkClick.groupBy).toHaveBeenCalled();
    });
  });

  describe('Newsletter Service', () => {
    it('should subscribe user', async () => {
      const mockData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
      };

      const mockResult = { id: 'sub-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.newsletterSubscriber.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await newsletterService.subscribe(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.newsletterSubscriber.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Category Service', () => {
    it('should create category', async () => {
      const mockData = {
        name: 'Test Category',
        description: 'Test category description',
        slug: 'test-category'
      };

      const mockResult = { id: 1, ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.category.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await categoryService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.category.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Tag Service', () => {
    it('should create tag', async () => {
      const mockData = {
        name: 'Test Tag',
        description: 'Test tag description',
        slug: 'test-tag'
      };

      const mockResult = { id: 1, ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.tag.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await tagService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.tag.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Media Service', () => {
    it('should create media asset', async () => {
      const mockData = {
        filename: 'test.jpg',
        originalName: 'test.jpg',
        mimeType: 'image/jpeg',
        size: 1024,
        url: 'https://example.com/test.jpg'
      };

      const mockResult = { id: 'media-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.mediaAsset.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await mediaService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.mediaAsset.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Merchant Service', () => {
    it('should create merchant', async () => {
      const mockData = {
        name: 'Test Merchant',
        description: 'Test merchant description',
        website: 'https://testmerchant.com'
      };

      const mockResult = { id: 'merchant-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.merchant.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await merchantService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.merchant.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Audit Service', () => {
    it('should log audit event', async () => {
      const mockData = {
        userId: 'user-123',
        action: 'CREATE',
        tableName: 'content',
        recordId: 'content-123'
      };

      const mockResult = { id: 'audit-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.auditLog.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await auditService.log(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Recipe Service', () => {
    it('should create recipe', async () => {
      const mockData = {
        title: 'Test Recipe',
        description: 'Test recipe description',
        prepTime: 30,
        cookTime: 60,
        servings: 4
      };

      const mockResult = { id: 'recipe-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.recipe.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await recipeService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.recipe.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('AI Content Service', () => {
    it('should log AI content', async () => {
      const mockData = {
        prompt: 'Test prompt',
        response: 'Test response',
        model: 'gpt-4',
        tokensUsed: 100,
        status: 'success'
      };

      const mockResult = { id: 'ai-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.aIContentLog.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await aiContentService.log(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.aIContentLog.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Notification Service', () => {
    it('should create notification', async () => {
      const mockData = {
        userId: 'user-123',
        type: 'info',
        title: 'Test Notification',
        message: 'Test notification message'
      };

      const mockResult = { id: 'notif-123', ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.realTimeNotification.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await notificationService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.realTimeNotification.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('Content Type Service', () => {
    it('should create content type', async () => {
      const mockData = {
        name: 'Test Content Type',
        description: 'Test content type description'
      };

      const mockResult = { id: 1, ...mockData };
      const { PrismaClient } = await import('@prisma/client');
      const mockPrisma = new PrismaClient();
      (mockPrisma.contentType.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await contentTypeService.create(mockData);
      expect(result).toEqual(mockResult);
      expect(mockPrisma.contentType.create).toHaveBeenCalledWith({ data: mockData });
    });
  });
}); 