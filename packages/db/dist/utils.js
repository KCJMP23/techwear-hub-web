import { PrismaClient } from '@prisma/client';
// Create a singleton Prisma client to avoid connection issues
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
// Content Management
export const contentService = {
    async create(data) {
        return await prisma.content.create({ data });
    },
    async findById(id) {
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
    async findBySlug(slug) {
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
    async findAll(options) {
        const where = {};
        if (options?.status)
            where.status = options.status;
        if (options?.contentTypeId)
            where.contentTypeId = options.contentTypeId;
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
    async update(id, data) {
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
    async delete(id) {
        return await prisma.content.delete({ where: { id } });
    },
    async addCategory(contentId, categoryId) {
        return await prisma.contentCategory.create({
            data: { contentId, categoryId },
            include: { category: true }
        });
    },
    async removeCategory(contentId, categoryId) {
        return await prisma.contentCategory.delete({
            where: { contentId_categoryId: { contentId, categoryId } }
        });
    },
    async addTag(contentId, tagId) {
        return await prisma.contentTag.create({
            data: { contentId, tagId },
            include: { tag: true }
        });
    },
    async removeTag(contentId, tagId) {
        return await prisma.contentTag.delete({
            where: { contentId_tagId: { contentId, tagId } }
        });
    }
};
// Site Management
export const siteService = {
    async create(data) {
        return await prisma.site.create({ data });
    },
    async findById(id) {
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
    async findByDomain(domain) {
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
    async findAll(options) {
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
    async update(id, data) {
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
    async delete(id) {
        return await prisma.site.delete({ where: { id } });
    }
};
// Affiliate Link Management
export const affiliateLinkService = {
    async create(data) {
        return await prisma.affiliateLink.create({ data });
    },
    async findById(id) {
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
    async findBySite(siteId, options) {
        const where = { siteId };
        if (options?.status)
            where.status = options.status;
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
    async findAll(options) {
        const where = {};
        if (options?.status)
            where.status = options.status;
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
    async update(id, data) {
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
    async delete(id) {
        return await prisma.affiliateLink.delete({ where: { id } });
    },
    async trackClick(data) {
        return await prisma.linkClick.create({ data });
    },
    async getClickStats(affiliateLinkId) {
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
    async create(data) {
        return await prisma.product.create({ data });
    },
    async findById(id) {
        return await prisma.product.findUnique({
            where: { id },
            include: {
                siteProducts: { include: { site: true } },
                affiliateLinks: true
            }
        });
    },
    async findByManufacturer(manufacturer, options) {
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
    async findAll(options) {
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
    async update(id, data) {
        return await prisma.product.update({
            where: { id },
            data,
            include: {
                siteProducts: { include: { site: true } },
                affiliateLinks: true
            }
        });
    },
    async delete(id) {
        return await prisma.product.delete({ where: { id } });
    }
};
// Analytics Service
export const analyticsService = {
    async getSiteAnalytics(siteId, dateRange) {
        const where = {
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
    async getTopProducts(siteId, limit = 10) {
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
        const products = await Promise.all(productStats.map(async (stat) => {
            const affiliateLink = await prisma.affiliateLink.findUnique({
                where: { id: stat.affiliateLinkId },
                include: { product: true }
            });
            return {
                product: affiliateLink?.product,
                clicks: stat._count?.id || 0,
                revenue: stat._sum?.conversionValue ? Number(stat._sum.conversionValue) : 0
            };
        }));
        return products.filter(p => p.product);
    },
    async getClickHistory(affiliateLinkId, limit = 50) {
        return await prisma.linkClick.findMany({
            where: { affiliateLinkId },
            orderBy: { clickedAt: 'desc' },
            take: limit
        });
    }
};
// Newsletter Management
export const newsletterService = {
    async subscribe(data) {
        return await prisma.newsletterSubscriber.create({ data });
    },
    async unsubscribe(email) {
        return await prisma.newsletterSubscriber.updateMany({
            where: { email },
            data: { isActive: false }
        });
    },
    async findSubscriber(email) {
        return await prisma.newsletterSubscriber.findFirst({
            where: { email }
        });
    },
    async getAllSubscribers(options) {
        const where = {};
        if (options?.isActive !== undefined)
            where.isActive = options.isActive;
        return await prisma.newsletterSubscriber.findMany({
            where,
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    },
    async createCampaign(data) {
        return await prisma.newsletterCampaign.create({ data });
    },
    async findCampaign(id) {
        return await prisma.newsletterCampaign.findUnique({
            where: { id }
        });
    },
    async updateCampaign(id, data) {
        return await prisma.newsletterCampaign.update({
            where: { id },
            data
        });
    },
    async getAllCampaigns(options) {
        const where = {};
        if (options?.status)
            where.status = options.status;
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
    async create(data) {
        return await prisma.category.create({ data });
    },
    async findById(id) {
        return await prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                content: { include: { content: true } }
            }
        });
    },
    async findAll(options) {
        const where = {};
        if (options?.parentId !== undefined)
            where.parentId = options.parentId;
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
    async update(id, data) {
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
    async delete(id) {
        return await prisma.category.delete({ where: { id } });
    }
};
// Tag Management
export const tagService = {
    async create(data) {
        return await prisma.tag.create({ data });
    },
    async findById(id) {
        return await prisma.tag.findUnique({
            where: { id },
            include: {
                content: { include: { content: true } }
            }
        });
    },
    async findAll(options) {
        return await prisma.tag.findMany({
            include: {
                content: { include: { content: true } }
            },
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { name: 'asc' }
        });
    },
    async update(id, data) {
        return await prisma.tag.update({
            where: { id },
            data,
            include: {
                content: { include: { content: true } }
            }
        });
    },
    async delete(id) {
        return await prisma.tag.delete({ where: { id } });
    }
};
// Media Asset Management
export const mediaService = {
    async create(data) {
        return await prisma.mediaAsset.create({ data });
    },
    async findById(id) {
        return await prisma.mediaAsset.findUnique({
            where: { id },
            include: {
                siteMedia: { include: { site: true, content: true } }
            }
        });
    },
    async findByFilename(filename) {
        return await prisma.mediaAsset.findFirst({
            where: { filename },
            include: {
                siteMedia: { include: { site: true, content: true } }
            }
        });
    },
    async findAll(options) {
        const where = {};
        if (options?.mimeType)
            where.mimeType = options.mimeType;
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
    async update(id, data) {
        return await prisma.mediaAsset.update({
            where: { id },
            data,
            include: {
                siteMedia: { include: { site: true, content: true } }
            }
        });
    },
    async delete(id) {
        return await prisma.mediaAsset.delete({ where: { id } });
    }
};
// Merchant Management
export const merchantService = {
    async create(data) {
        return await prisma.merchant.create({ data });
    },
    async findById(id) {
        return await prisma.merchant.findUnique({
            where: { id },
            include: {
                affiliateLinks: true
            }
        });
    },
    async findByName(name) {
        return await prisma.merchant.findFirst({
            where: { name },
            include: {
                affiliateLinks: true
            }
        });
    },
    async findAll(options) {
        return await prisma.merchant.findMany({
            include: {
                affiliateLinks: true
            },
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { name: 'asc' }
        });
    },
    async update(id, data) {
        return await prisma.merchant.update({
            where: { id },
            data,
            include: {
                affiliateLinks: true
            }
        });
    },
    async delete(id) {
        return await prisma.merchant.delete({ where: { id } });
    }
};
// Audit Logging
export const auditService = {
    async log(data) {
        return await prisma.auditLog.create({ data });
    },
    async findByUserId(userId, options) {
        return await prisma.auditLog.findMany({
            where: { userId },
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    },
    async findByTable(tableName, recordId, options) {
        return await prisma.auditLog.findMany({
            where: { tableName, recordId },
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    },
    async findAll(options) {
        return await prisma.auditLog.findMany({
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    }
};
// Recipe Management
export const recipeService = {
    async create(data) {
        return await prisma.recipe.create({ data });
    },
    async findById(id) {
        return await prisma.recipe.findUnique({
            where: { id },
            include: {
                ingredients: { orderBy: { order: 'asc' } },
                instructions: { orderBy: { stepNumber: 'asc' } }
            }
        });
    },
    async findByTitle(title) {
        return await prisma.recipe.findFirst({
            where: { title },
            include: {
                ingredients: { orderBy: { order: 'asc' } },
                instructions: { orderBy: { stepNumber: 'asc' } }
            }
        });
    },
    async findAll(options) {
        const where = {};
        if (options?.cuisine)
            where.cuisine = options.cuisine;
        if (options?.difficulty)
            where.difficulty = options.difficulty;
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
    async update(id, data) {
        return await prisma.recipe.update({
            where: { id },
            data,
            include: {
                ingredients: { orderBy: { order: 'asc' } },
                instructions: { orderBy: { stepNumber: 'asc' } }
            }
        });
    },
    async delete(id) {
        return await prisma.recipe.delete({ where: { id } });
    },
    async addIngredient(data) {
        return await prisma.recipeIngredient.create({ data });
    },
    async updateIngredient(id, data) {
        return await prisma.recipeIngredient.update({
            where: { id },
            data
        });
    },
    async deleteIngredient(id) {
        return await prisma.recipeIngredient.delete({ where: { id } });
    },
    async addInstruction(data) {
        return await prisma.recipeInstruction.create({ data });
    },
    async updateInstruction(id, data) {
        return await prisma.recipeInstruction.update({
            where: { id },
            data
        });
    },
    async deleteInstruction(id) {
        return await prisma.recipeInstruction.delete({ where: { id } });
    }
};
// AI Content Logging
export const aiContentService = {
    async log(data) {
        return await prisma.aIContentLog.create({ data });
    },
    async findById(id) {
        return await prisma.aIContentLog.findUnique({
            where: { id }
        });
    },
    async findByStatus(status, options) {
        return await prisma.aIContentLog.findMany({
            where: { status },
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    },
    async findAll(options) {
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
    async create(data) {
        return await prisma.realTimeNotification.create({ data });
    },
    async findById(id) {
        return await prisma.realTimeNotification.findUnique({
            where: { id }
        });
    },
    async findByUserId(userId, options) {
        const where = { userId };
        if (options?.isRead !== undefined)
            where.isRead = options.isRead;
        return await prisma.realTimeNotification.findMany({
            where,
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { createdAt: 'desc' }
        });
    },
    async markAsRead(id) {
        return await prisma.realTimeNotification.update({
            where: { id },
            data: { isRead: true }
        });
    },
    async markAllAsRead(userId) {
        return await prisma.realTimeNotification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true }
        });
    },
    async delete(id) {
        return await prisma.realTimeNotification.delete({ where: { id } });
    }
};
// Content Type Management
export const contentTypeService = {
    async create(data) {
        return await prisma.contentType.create({ data });
    },
    async findById(id) {
        return await prisma.contentType.findUnique({
            where: { id },
            include: {
                content: true
            }
        });
    },
    async findByName(name) {
        return await prisma.contentType.findFirst({
            where: { name },
            include: {
                content: true
            }
        });
    },
    async findAll(options) {
        return await prisma.contentType.findMany({
            include: {
                content: true
            },
            take: options?.limit || 50,
            skip: options?.offset || 0,
            orderBy: { name: 'asc' }
        });
    },
    async update(id, data) {
        return await prisma.contentType.update({
            where: { id },
            data,
            include: {
                content: true
            }
        });
    },
    async delete(id) {
        return await prisma.contentType.delete({ where: { id } });
    }
};
// Custom Niche Management
export const customNicheService = {
    async create(data) {
        return await prisma.customNiche.create({ data });
    },
    async findById(id) {
        return await prisma.customNiche.findUnique({
            where: { id },
            include: {
                sites: true
            }
        });
    },
    async findByName(name) {
        return await prisma.customNiche.findFirst({
            where: { name },
            include: {
                sites: true
            }
        });
    },
    async findAll(options) {
        const where = {};
        if (options?.isActive !== undefined)
            where.isActive = options.isActive;
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
    async update(id, data) {
        return await prisma.customNiche.update({
            where: { id },
            data,
            include: {
                sites: true
            }
        });
    },
    async delete(id) {
        return await prisma.customNiche.delete({ where: { id } });
    }
};
// Auto Blog Post Management
export const autoBlogPostService = {
    async create(data) {
        return await prisma.autoBlogPost.create({ data });
    },
    async findById(id) {
        return await prisma.autoBlogPost.findUnique({
            where: { id },
            include: {
                site: true
            }
        });
    },
    async findBySite(siteId, options) {
        const where = { siteId };
        if (options?.status)
            where.status = options.status;
        if (options?.postType)
            where.postType = options.postType;
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
    async findAll(options) {
        const where = {};
        if (options?.status)
            where.status = options.status;
        if (options?.postType)
            where.postType = options.postType;
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
    async update(id, data) {
        return await prisma.autoBlogPost.update({
            where: { id },
            data,
            include: {
                site: true
            }
        });
    },
    async delete(id) {
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
    async create(data) {
        return await prisma.contentSchedule.create({ data });
    },
    async findById(id) {
        return await prisma.contentSchedule.findUnique({
            where: { id },
            include: {
                site: true
            }
        });
    },
    async findBySite(siteId, options) {
        const where = { siteId };
        if (options?.isActive !== undefined)
            where.isActive = options.isActive;
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
    async findAll(options) {
        const where = {};
        if (options?.isActive !== undefined)
            where.isActive = options.isActive;
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
    async update(id, data) {
        return await prisma.contentSchedule.update({
            where: { id },
            data,
            include: {
                site: true
            }
        });
    },
    async delete(id) {
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
    async create(data) {
        return await prisma.productCategory.create({ data });
    },
    async findById(id) {
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
    async findBySlug(slug) {
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
    async findBySite(siteId, options) {
        const where = { siteId };
        if (options?.isActive !== undefined)
            where.isActive = options.isActive;
        if (options?.parentId !== undefined)
            where.parentId = options.parentId;
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
    async findAll(options) {
        const where = {};
        if (options?.isActive !== undefined)
            where.isActive = options.isActive;
        if (options?.parentId !== undefined)
            where.parentId = options.parentId;
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
    async update(id, data) {
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
    async delete(id) {
        return await prisma.productCategory.delete({ where: { id } });
    },
    async getHierarchy(siteId) {
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
        const rootCategories = [];
        categories.forEach(category => {
            categoryMap.set(category.id, category);
        });
        categories.forEach(category => {
            if (category.parentId) {
                const parent = categoryMap.get(category.parentId);
                if (parent) {
                    if (!parent.children)
                        parent.children = [];
                    parent.children.push(category);
                }
            }
            else {
                rootCategories.push(category);
            }
        });
        return rootCategories;
    }
};
export default prisma;
