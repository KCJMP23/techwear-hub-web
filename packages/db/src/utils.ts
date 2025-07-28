import { PrismaClient, Prisma } from '@prisma/client';

// Create a singleton Prisma client to avoid connection issues
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Content Management
export const contentService = {
  async create(data: Prisma.ContentCreateInput) {
    return await prisma.content.create({ data });
  },

  async findById(id: string) {
    return await prisma.content.findUnique({
      where: { id },
      include: {
        contentType: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        media: { include: { mediaAsset: true } },
        versions: true,
        siteContent: { include: { site: true } }
      }
    });
  },

  async findBySlug(slug: string) {
    return await prisma.content.findFirst({
      where: { slug },
      include: {
        contentType: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        media: { include: { mediaAsset: true } },
        versions: true,
        siteContent: { include: { site: true } }
      }
    });
  },

  async findAll(options?: {
    status?: string;
    contentTypeId?: number;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.ContentWhereInput = {};
    if (options?.status) where.status = options.status;
    if (options?.contentTypeId) where.contentTypeId = options.contentTypeId;

    return await prisma.content.findMany({
      where,
      include: {
        contentType: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        media: { include: { mediaAsset: true } },
        versions: true,
        siteContent: { include: { site: true } }
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async update(id: string, data: Prisma.ContentUpdateInput) {
    return await prisma.content.update({
      where: { id },
      data,
      include: {
        contentType: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        media: { include: { mediaAsset: true } },
        versions: true,
        siteContent: { include: { site: true } }
      }
    });
  },

  async delete(id: string) {
    return await prisma.content.delete({ where: { id } });
  },

  async addCategory(contentId: string, categoryId: number) {
    return await prisma.contentCategory.create({
      data: { contentId, categoryId },
      include: { category: true }
    });
  },

  async removeCategory(contentId: string, categoryId: number) {
    return await prisma.contentCategory.delete({
      where: { contentId_categoryId: { contentId, categoryId } }
    });
  },

  async addTag(contentId: string, tagId: number) {
    return await prisma.contentTag.create({
      data: { contentId, tagId },
      include: { tag: true }
    });
  },

  async removeTag(contentId: string, tagId: number) {
    return await prisma.contentTag.delete({
      where: { contentId_tagId: { contentId, tagId } }
    });
  }
};

// Site Management
export const siteService = {
  async create(data: Prisma.SiteCreateInput) {
    return await prisma.site.create({ data });
  },

  async findById(id: string) {
    return await prisma.site.findUnique({
      where: { id },
      include: {
        content: { include: { content: true } },
        media: { include: { mediaAsset: true } },
        products: { include: { product: true } },
        affiliateLinks: true
      }
    });
  },

  async findByDomain(domain: string) {
    return await prisma.site.findFirst({
      where: { domain },
      include: {
        content: { include: { content: true } },
        media: { include: { mediaAsset: true } },
        products: { include: { product: true } },
        affiliateLinks: true
      }
    });
  },

  async findAll(options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.site.findMany({
      include: {
        content: { include: { content: true } },
        media: { include: { mediaAsset: true } },
        products: { include: { product: true } },
        affiliateLinks: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async update(id: string, data: Prisma.SiteUpdateInput) {
    return await prisma.site.update({
      where: { id },
      data,
      include: {
        content: { include: { content: true } },
        media: { include: { mediaAsset: true } },
        products: { include: { product: true } },
        affiliateLinks: true
      }
    });
  },

  async delete(id: string) {
    return await prisma.site.delete({ where: { id } });
  }
};

// Affiliate Link Management
export const affiliateLinkService = {
  async create(data: Prisma.AffiliateLinkCreateInput) {
    return await prisma.affiliateLink.create({ data });
  },

  async findById(id: string) {
    return await prisma.affiliateLink.findUnique({
      where: { id },
      include: {
        site: true,
        product: true,
        merchant: true,
        linkClicks: true
      }
    });
  },

  async findBySite(siteId: string, options?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.AffiliateLinkWhereInput = { siteId };
    if (options?.status) where.status = options.status;

    return await prisma.affiliateLink.findMany({
      where,
      include: {
        site: true,
        product: true,
        merchant: true,
        linkClicks: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async findAll(options?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.AffiliateLinkWhereInput = {};
    if (options?.status) where.status = options.status;

    return await prisma.affiliateLink.findMany({
      where,
      include: {
        site: true,
        product: true,
        merchant: true,
        linkClicks: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async update(id: string, data: Prisma.AffiliateLinkUpdateInput) {
    return await prisma.affiliateLink.update({
      where: { id },
      data,
      include: {
        site: true,
        product: true,
        merchant: true,
        linkClicks: true
      }
    });
  },

  async delete(id: string) {
    return await prisma.affiliateLink.delete({ where: { id } });
  },

  async trackClick(data: Prisma.LinkClickCreateInput) {
    return await prisma.linkClick.create({ data });
  },

  async getClickStats(affiliateLinkId: string) {
    const clicks = await prisma.linkClick.findMany({
      where: { affiliateLinkId },
      orderBy: { clickedAt: 'desc' }
    });

    const totalClicks = clicks.length;
    const uniqueClicks = new Set(clicks.map(click => click.ipAddress).filter(Boolean)).size;
    const conversions = clicks.filter(click => click.conversionStatus === 'converted').length;
    const conversionRate = totalClicks > 0 ? (conversions / totalClicks) * 100 : 0;

    return {
      totalClicks,
      uniqueClicks,
      conversionRate,
      clicks
    };
  }
};

// Product Management
export const productService = {
  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({ data });
  },

  async findById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        siteProducts: { include: { site: true } },
        affiliateLinks: true
      }
    });
  },

  async findByManufacturer(manufacturer: string, options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.product.findMany({
      where: { manufacturer },
      include: {
        siteProducts: { include: { site: true } },
        affiliateLinks: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async findAll(options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.product.findMany({
      include: {
        siteProducts: { include: { site: true } },
        affiliateLinks: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return await prisma.product.update({
      where: { id },
      data,
      include: {
        siteProducts: { include: { site: true } },
        affiliateLinks: true
      }
    });
  },

  async delete(id: string) {
    return await prisma.product.delete({ where: { id } });
  }
};

// Analytics Service
export const analyticsService = {
  async getSiteAnalytics(siteId: string, dateRange?: { start: Date; end: Date }) {
    const where: Prisma.LinkClickWhereInput = {
      affiliateLink: { siteId }
    };

    if (dateRange) {
      where.clickedAt = {
        gte: dateRange.start,
        lte: dateRange.end
      };
    }

    const clicks = await prisma.linkClick.findMany({
      where,
      include: {
        affiliateLink: {
          include: {
            product: true
          }
        }
      },
      orderBy: { clickedAt: 'desc' }
    });

    const totalClicks = clicks.length;
    const uniqueClicks = new Set(clicks.map(click => click.ipAddress).filter(Boolean)).size;
    const conversions = clicks.filter(click => click.conversionStatus === 'converted').length;
    const conversionRate = totalClicks > 0 ? (conversions / totalClicks) * 100 : 0;

    // Calculate revenue from conversion values
    const totalRevenue = clicks.reduce((sum, click) => {
      return sum + (click.conversionValue ? Number(click.conversionValue) : 0);
    }, 0);

    return {
      totalClicks,
      uniqueClicks,
      conversions,
      conversionRate,
      totalRevenue,
      clicks
    };
  },

  async getTopProducts(siteId: string, limit = 10) {
    const productStats = await prisma.linkClick.groupBy({
      by: ['affiliateLinkId'],
      where: {
        affiliateLink: { siteId }
      },
      _count: {
        id: true
      },
      _sum: {
        conversionValue: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: limit
    });

    const products = await Promise.all(
      productStats.map(async (stat) => {
        const affiliateLink = await prisma.affiliateLink.findUnique({
          where: { id: stat.affiliateLinkId },
          include: { product: true }
        });

        return {
          product: affiliateLink?.product,
          clicks: stat._count?.id || 0,
          revenue: stat._sum?.conversionValue ? Number(stat._sum.conversionValue) : 0
        };
      })
    );

    return products.filter(p => p.product);
  },

  async getClickHistory(affiliateLinkId: string, limit = 50) {
    return await prisma.linkClick.findMany({
      where: { affiliateLinkId },
      orderBy: { clickedAt: 'desc' },
      take: limit
    });
  }
};

// Newsletter Management
export const newsletterService = {
  async subscribe(data: Prisma.NewsletterSubscriberCreateInput) {
    return await prisma.newsletterSubscriber.create({ data });
  },

  async unsubscribe(email: string) {
    return await prisma.newsletterSubscriber.updateMany({
      where: { email },
      data: { isActive: false }
    });
  },

  async findSubscriber(email: string) {
    return await prisma.newsletterSubscriber.findFirst({
      where: { email }
    });
  },

  async getAllSubscribers(options?: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.NewsletterSubscriberWhereInput = {};
    if (options?.isActive !== undefined) where.isActive = options.isActive;

    return await prisma.newsletterSubscriber.findMany({
      where,
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async createCampaign(data: Prisma.NewsletterCampaignCreateInput) {
    return await prisma.newsletterCampaign.create({ data });
  },

  async findCampaign(id: string) {
    return await prisma.newsletterCampaign.findUnique({
      where: { id }
    });
  },

  async updateCampaign(id: string, data: Prisma.NewsletterCampaignUpdateInput) {
    return await prisma.newsletterCampaign.update({
      where: { id },
      data
    });
  },

  async getAllCampaigns(options?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.NewsletterCampaignWhereInput = {};
    if (options?.status) where.status = options.status;

    return await prisma.newsletterCampaign.findMany({
      where,
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  }
};

// Category Management
export const categoryService = {
  async create(data: Prisma.CategoryCreateInput) {
    return await prisma.category.create({ data });
  },

  async findById(id: number) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        content: { include: { content: true } }
      }
    });
  },

  async findAll(options?: {
    parentId?: number | null;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.CategoryWhereInput = {};
    if (options?.parentId !== undefined) where.parentId = options.parentId;

    return await prisma.category.findMany({
      where,
      include: {
        parent: true,
        children: true,
        content: { include: { content: true } }
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { name: 'asc' }
    });
  },

  async update(id: number, data: Prisma.CategoryUpdateInput) {
    return await prisma.category.update({
      where: { id },
      data,
      include: {
        parent: true,
        children: true,
        content: { include: { content: true } }
      }
    });
  },

  async delete(id: number) {
    return await prisma.category.delete({ where: { id } });
  }
};

// Tag Management
export const tagService = {
  async create(data: Prisma.TagCreateInput) {
    return await prisma.tag.create({ data });
  },

  async findById(id: number) {
    return await prisma.tag.findUnique({
      where: { id },
      include: {
        content: { include: { content: true } }
      }
    });
  },

  async findAll(options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.tag.findMany({
      include: {
        content: { include: { content: true } }
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { name: 'asc' }
    });
  },

  async update(id: number, data: Prisma.TagUpdateInput) {
    return await prisma.tag.update({
      where: { id },
      data,
      include: {
        content: { include: { content: true } }
      }
    });
  },

  async delete(id: number) {
    return await prisma.tag.delete({ where: { id } });
  }
};

// Media Asset Management
export const mediaService = {
  async create(data: Prisma.MediaAssetCreateInput) {
    return await prisma.mediaAsset.create({ data });
  },

  async findById(id: string) {
    return await prisma.mediaAsset.findUnique({
      where: { id },
      include: {
        siteMedia: { include: { site: true, content: true } }
      }
    });
  },

  async findByFilename(filename: string) {
    return await prisma.mediaAsset.findFirst({
      where: { filename },
      include: {
        siteMedia: { include: { site: true, content: true } }
      }
    });
  },

  async findAll(options?: {
    mimeType?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.MediaAssetWhereInput = {};
    if (options?.mimeType) where.mimeType = options.mimeType;

    return await prisma.mediaAsset.findMany({
      where,
      include: {
        siteMedia: { include: { site: true, content: true } }
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async update(id: string, data: Prisma.MediaAssetUpdateInput) {
    return await prisma.mediaAsset.update({
      where: { id },
      data,
      include: {
        siteMedia: { include: { site: true, content: true } }
      }
    });
  },

  async delete(id: string) {
    return await prisma.mediaAsset.delete({ where: { id } });
  }
};

// Merchant Management
export const merchantService = {
  async create(data: Prisma.MerchantCreateInput) {
    return await prisma.merchant.create({ data });
  },

  async findById(id: string) {
    return await prisma.merchant.findUnique({
      where: { id },
      include: {
        affiliateLinks: true
      }
    });
  },

  async findByName(name: string) {
    return await prisma.merchant.findFirst({
      where: { name },
      include: {
        affiliateLinks: true
      }
    });
  },

  async findAll(options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.merchant.findMany({
      include: {
        affiliateLinks: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { name: 'asc' }
    });
  },

  async update(id: string, data: Prisma.MerchantUpdateInput) {
    return await prisma.merchant.update({
      where: { id },
      data,
      include: {
        affiliateLinks: true
      }
    });
  },

  async delete(id: string) {
    return await prisma.merchant.delete({ where: { id } });
  }
};

// Audit Logging
export const auditService = {
  async log(data: Prisma.AuditLogCreateInput) {
    return await prisma.auditLog.create({ data });
  },

  async findByUserId(userId: string, options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.auditLog.findMany({
      where: { userId },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async findByTable(tableName: string, recordId: string, options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.auditLog.findMany({
      where: { tableName, recordId },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async findAll(options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.auditLog.findMany({
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  }
};

// Recipe Management
export const recipeService = {
  async create(data: Prisma.RecipeCreateInput) {
    return await prisma.recipe.create({ data });
  },

  async findById(id: string) {
    return await prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: { orderBy: { order: 'asc' } },
        instructions: { orderBy: { stepNumber: 'asc' } }
      }
    });
  },

  async findByTitle(title: string) {
    return await prisma.recipe.findFirst({
      where: { title },
      include: {
        ingredients: { orderBy: { order: 'asc' } },
        instructions: { orderBy: { stepNumber: 'asc' } }
      }
    });
  },

  async findAll(options?: {
    cuisine?: string;
    difficulty?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.RecipeWhereInput = {};
    if (options?.cuisine) where.cuisine = options.cuisine;
    if (options?.difficulty) where.difficulty = options.difficulty;

    return await prisma.recipe.findMany({
      where,
      include: {
        ingredients: { orderBy: { order: 'asc' } },
        instructions: { orderBy: { stepNumber: 'asc' } }
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { title: 'asc' }
    });
  },

  async update(id: string, data: Prisma.RecipeUpdateInput) {
    return await prisma.recipe.update({
      where: { id },
      data,
      include: {
        ingredients: { orderBy: { order: 'asc' } },
        instructions: { orderBy: { stepNumber: 'asc' } }
      }
    });
  },

  async delete(id: string) {
    return await prisma.recipe.delete({ where: { id } });
  },

  async addIngredient(data: Prisma.RecipeIngredientCreateInput) {
    return await prisma.recipeIngredient.create({ data });
  },

  async updateIngredient(id: string, data: Prisma.RecipeIngredientUpdateInput) {
    return await prisma.recipeIngredient.update({
      where: { id },
      data
    });
  },

  async deleteIngredient(id: string) {
    return await prisma.recipeIngredient.delete({ where: { id } });
  },

  async addInstruction(data: Prisma.RecipeInstructionCreateInput) {
    return await prisma.recipeInstruction.create({ data });
  },

  async updateInstruction(id: string, data: Prisma.RecipeInstructionUpdateInput) {
    return await prisma.recipeInstruction.update({
      where: { id },
      data
    });
  },

  async deleteInstruction(id: string) {
    return await prisma.recipeInstruction.delete({ where: { id } });
  }
};

// AI Content Logging
export const aiContentService = {
  async log(data: Prisma.AIContentLogCreateInput) {
    return await prisma.aIContentLog.create({ data });
  },

  async findById(id: string) {
    return await prisma.aIContentLog.findUnique({
      where: { id }
    });
  },

  async findByStatus(status: string, options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.aIContentLog.findMany({
      where: { status },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async findAll(options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.aIContentLog.findMany({
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async getStats() {
    const totalLogs = await prisma.aIContentLog.count();
    const successfulLogs = await prisma.aIContentLog.count({
      where: { status: 'success' }
    });
    const failedLogs = await prisma.aIContentLog.count({
      where: { status: 'failed' }
    });

    const averageDuration = await prisma.aIContentLog.aggregate({
      _avg: {
        duration: true
      }
    });

    return {
      totalLogs,
      successfulLogs,
      failedLogs,
      successRate: totalLogs > 0 ? (successfulLogs / totalLogs) * 100 : 0,
      averageDuration: averageDuration._avg?.duration || 0
    };
  }
};

// Real-time Notifications
export const notificationService = {
  async create(data: Prisma.RealTimeNotificationCreateInput) {
    return await prisma.realTimeNotification.create({ data });
  },

  async findById(id: string) {
    return await prisma.realTimeNotification.findUnique({
      where: { id }
    });
  },

  async findByUserId(userId: string, options?: {
    isRead?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.RealTimeNotificationWhereInput = { userId };
    if (options?.isRead !== undefined) where.isRead = options.isRead;

    return await prisma.realTimeNotification.findMany({
      where,
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async markAsRead(id: string) {
    return await prisma.realTimeNotification.update({
      where: { id },
      data: { isRead: true }
    });
  },

  async markAllAsRead(userId: string) {
    return await prisma.realTimeNotification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    });
  },

  async delete(id: string) {
    return await prisma.realTimeNotification.delete({ where: { id } });
  }
};

// Content Type Management
export const contentTypeService = {
  async create(data: Prisma.ContentTypeCreateInput) {
    return await prisma.contentType.create({ data });
  },

  async findById(id: number) {
    return await prisma.contentType.findUnique({
      where: { id },
      include: {
        content: true
      }
    });
  },

  async findByName(name: string) {
    return await prisma.contentType.findFirst({
      where: { name },
      include: {
        content: true
      }
    });
  },

  async findAll(options?: {
    limit?: number;
    offset?: number;
  }) {
    return await prisma.contentType.findMany({
      include: {
        content: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { name: 'asc' }
    });
  },

  async update(id: number, data: Prisma.ContentTypeUpdateInput) {
    return await prisma.contentType.update({
      where: { id },
      data,
      include: {
        content: true
      }
    });
  },

  async delete(id: number) {
    return await prisma.contentType.delete({ where: { id } });
  }
};

// Custom Niche Management
export const customNicheService = {
  async create(data: Prisma.CustomNicheCreateInput) {
    return await prisma.customNiche.create({ data });
  },

  async findById(id: string) {
    return await prisma.customNiche.findUnique({
      where: { id },
      include: {
        sites: true
      }
    });
  },

  async findByName(name: string) {
    return await prisma.customNiche.findFirst({
      where: { name },
      include: {
        sites: true
      }
    });
  },

  async findAll(options?: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.CustomNicheWhereInput = {};
    if (options?.isActive !== undefined) where.isActive = options.isActive;

    return await prisma.customNiche.findMany({
      where,
      include: {
        sites: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async update(id: string, data: Prisma.CustomNicheUpdateInput) {
    return await prisma.customNiche.update({
      where: { id },
      data,
      include: {
        sites: true
      }
    });
  },

  async delete(id: string) {
    return await prisma.customNiche.delete({ where: { id } });
  }
};

// Auto Blog Post Management
export const autoBlogPostService = {
  async create(data: Prisma.AutoBlogPostCreateInput) {
    return await prisma.autoBlogPost.create({ data });
  },

  async findById(id: string) {
    return await prisma.autoBlogPost.findUnique({
      where: { id },
      include: {
        site: true
      }
    });
  },

  async findBySite(siteId: string, options?: {
    status?: string;
    postType?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.AutoBlogPostWhereInput = { siteId };
    if (options?.status) where.status = options.status;
    if (options?.postType) where.postType = options.postType;

    return await prisma.autoBlogPost.findMany({
      where,
      include: {
        site: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async findAll(options?: {
    status?: string;
    postType?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.AutoBlogPostWhereInput = {};
    if (options?.status) where.status = options.status;
    if (options?.postType) where.postType = options.postType;

    return await prisma.autoBlogPost.findMany({
      where,
      include: {
        site: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async update(id: string, data: Prisma.AutoBlogPostUpdateInput) {
    return await prisma.autoBlogPost.update({
      where: { id },
      data,
      include: {
        site: true
      }
    });
  },

  async delete(id: string) {
    return await prisma.autoBlogPost.delete({ where: { id } });
  },

  async getScheduledPosts() {
    return await prisma.autoBlogPost.findMany({
      where: {
        status: 'scheduled',
        scheduledAt: {
          lte: new Date()
        }
      },
      include: {
        site: true
      }
    });
  }
};

// Content Schedule Management
export const contentScheduleService = {
  async create(data: Prisma.ContentScheduleCreateInput) {
    return await prisma.contentSchedule.create({ data });
  },

  async findById(id: string) {
    return await prisma.contentSchedule.findUnique({
      where: { id },
      include: {
        site: true
      }
    });
  },

  async findBySite(siteId: string, options?: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.ContentScheduleWhereInput = { siteId };
    if (options?.isActive !== undefined) where.isActive = options.isActive;

    return await prisma.contentSchedule.findMany({
      where,
      include: {
        site: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async findAll(options?: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.ContentScheduleWhereInput = {};
    if (options?.isActive !== undefined) where.isActive = options.isActive;

    return await prisma.contentSchedule.findMany({
      where,
      include: {
        site: true
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { createdAt: 'desc' }
    });
  },

  async update(id: string, data: Prisma.ContentScheduleUpdateInput) {
    return await prisma.contentSchedule.update({
      where: { id },
      data,
      include: {
        site: true
      }
    });
  },

  async delete(id: string) {
    return await prisma.contentSchedule.delete({ where: { id } });
  },

  async getDueSchedules() {
    return await prisma.contentSchedule.findMany({
      where: {
        isActive: true,
        nextRunAt: {
          lte: new Date()
        }
      },
      include: {
        site: true
      }
    });
  }
};

// Product Category Management
export const productCategoryService = {
  async create(data: Prisma.ProductCategoryCreateInput) {
    return await prisma.productCategory.create({ data });
  },

  async findById(id: string) {
    return await prisma.productCategory.findUnique({
      where: { id },
      include: {
        site: true,
        parent: true,
        children: true,
        products: { include: { product: true } }
      }
    });
  },

  async findBySlug(slug: string) {
    return await prisma.productCategory.findUnique({
      where: { slug },
      include: {
        site: true,
        parent: true,
        children: true,
        products: { include: { product: true } }
      }
    });
  },

  async findBySite(siteId: string, options?: {
    isActive?: boolean;
    parentId?: string | null;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.ProductCategoryWhereInput = { siteId };
    if (options?.isActive !== undefined) where.isActive = options.isActive;
    if (options?.parentId !== undefined) where.parentId = options.parentId;

    return await prisma.productCategory.findMany({
      where,
      include: {
        site: true,
        parent: true,
        children: true,
        products: { include: { product: true } }
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { displayOrder: 'asc', createdAt: 'asc' }
    });
  },

  async findAll(options?: {
    isActive?: boolean;
    parentId?: string | null;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.ProductCategoryWhereInput = {};
    if (options?.isActive !== undefined) where.isActive = options.isActive;
    if (options?.parentId !== undefined) where.parentId = options.parentId;

    return await prisma.productCategory.findMany({
      where,
      include: {
        site: true,
        parent: true,
        children: true,
        products: { include: { product: true } }
      },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      orderBy: { displayOrder: 'asc', createdAt: 'asc' }
    });
  },

  async update(id: string, data: Prisma.ProductCategoryUpdateInput) {
    return await prisma.productCategory.update({
      where: { id },
      data,
      include: {
        site: true,
        parent: true,
        children: true,
        products: { include: { product: true } }
      }
    });
  },

  async delete(id: string) {
    return await prisma.productCategory.delete({ where: { id } });
  },

  async getHierarchy(siteId: string) {
    const categories = await prisma.productCategory.findMany({
      where: { siteId, isActive: true },
      include: {
        parent: true,
        children: true
      },
      orderBy: { displayOrder: 'asc', createdAt: 'asc' }
    });

    // Build hierarchy
    const categoryMap = new Map();
    const rootCategories: any[] = [];

    categories.forEach(category => {
      categoryMap.set(category.id, category);
    });

    categories.forEach(category => {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(category);
        }
      } else {
        rootCategories.push(category);
      }
    });

    return rootCategories;
  }
};

export default prisma;