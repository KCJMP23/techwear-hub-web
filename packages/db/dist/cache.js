import { PrismaClient } from '@prisma/client';
// In-memory cache for frequently accessed data
class MemoryCache {
    constructor() {
        this.cache = new Map();
        this.DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
    }
    set(key, data, ttl = this.DEFAULT_TTL) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl
        });
    }
    get(key) {
        const item = this.cache.get(key);
        if (!item)
            return null;
        const now = Date.now();
        if (now - item.timestamp > item.ttl) {
            this.cache.delete(key);
            return null;
        }
        return item.data;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    // Get cache statistics
    getStats() {
        const now = Date.now();
        let validEntries = 0;
        let expiredEntries = 0;
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp > item.ttl) {
                expiredEntries++;
                this.cache.delete(key);
            }
            else {
                validEntries++;
            }
        }
        return {
            totalEntries: validEntries + expiredEntries,
            validEntries,
            expiredEntries,
            memoryUsage: process.memoryUsage()
        };
    }
}
// Redis-like cache interface (can be replaced with actual Redis)
class RedisCache {
    constructor() {
        this.cache = new Map();
    }
    async set(key, data, ttl = 300) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: ttl * 1000
        });
    }
    async get(key) {
        const item = this.cache.get(key);
        if (!item)
            return null;
        const now = Date.now();
        if (now - item.timestamp > item.ttl) {
            this.cache.delete(key);
            return null;
        }
        return item.data;
    }
    async del(key) {
        this.cache.delete(key);
    }
    async flush() {
        this.cache.clear();
    }
}
// Cache manager that coordinates different cache layers
export class CacheManager {
    constructor(prisma) {
        this.memoryCache = new MemoryCache();
        this.redisCache = new RedisCache();
        this.prisma = prisma;
    }
    // Generate cache keys
    generateKey(prefix, params) {
        const sortedParams = Object.keys(params)
            .sort()
            .map(key => `${key}:${params[key]}`)
            .join('|');
        return `${prefix}:${sortedParams}`;
    }
    // Cache with fallback strategy
    async getCached(key, fetchFn, options = {}) {
        const { ttl = 300, useMemory = true, useRedis = true } = options;
        // Try memory cache first
        if (useMemory) {
            const memoryData = this.memoryCache.get(key);
            if (memoryData) {
                return memoryData;
            }
        }
        // Try Redis cache
        if (useRedis) {
            const redisData = await this.redisCache.get(key);
            if (redisData) {
                // Store in memory cache for faster subsequent access
                if (useMemory) {
                    this.memoryCache.set(key, redisData, ttl * 1000);
                }
                return redisData;
            }
        }
        // Fetch from database
        const data = await fetchFn();
        // Store in caches
        if (useRedis) {
            await this.redisCache.set(key, data, ttl);
        }
        if (useMemory) {
            this.memoryCache.set(key, data, ttl * 1000);
        }
        return data;
    }
    // Invalidate cache entries
    async invalidate(pattern) {
        // Clear memory cache entries matching pattern
        for (const key of this.memoryCache.cache.keys()) {
            if (key.includes(pattern)) {
                this.memoryCache.delete(key);
            }
        }
        // Clear Redis cache entries matching pattern
        // In a real Redis implementation, you would use SCAN and DEL
        await this.redisCache.flush();
    }
    // Get cache statistics
    getStats() {
        return {
            memory: this.memoryCache.getStats(),
            redis: {
                totalEntries: this.redisCache.cache.size
            }
        };
    }
}
// Cached database service wrapper
export class CachedDatabaseService {
    constructor(prisma) {
        this.prisma = prisma;
        this.cacheManager = new CacheManager(prisma);
    }
    // Cached content operations
    async getContentById(id) {
        const key = this.cacheManager.generateKey('content', { id });
        return this.cacheManager.getCached(key, () => this.prisma.content.findUnique({
            where: { id },
            include: {
                contentType: true,
                categories: { include: { category: true } },
                tags: { include: { tag: true } },
                media: { include: { mediaAsset: true } },
                versions: true,
                siteContent: { include: { site: true } }
            }
        }));
    }
    async getContentBySlug(slug) {
        const key = this.cacheManager.generateKey('content-slug', { slug });
        return this.cacheManager.getCached(key, () => this.prisma.content.findFirst({
            where: { slug },
            include: {
                contentType: true,
                categories: { include: { category: true } },
                tags: { include: { tag: true } },
                media: { include: { mediaAsset: true } },
                versions: true,
                siteContent: { include: { site: true } }
            }
        }));
    }
    // Cached site operations
    async getSiteById(id) {
        const key = this.cacheManager.generateKey('site', { id });
        return this.cacheManager.getCached(key, () => this.prisma.site.findUnique({
            where: { id },
            include: {
                content: { include: { content: true } },
                media: { include: { mediaAsset: true } },
                products: { include: { product: true } },
                affiliateLinks: true
            }
        }));
    }
    async getSiteByDomain(domain) {
        const key = this.cacheManager.generateKey('site-domain', { domain });
        return this.cacheManager.getCached(key, () => this.prisma.site.findFirst({
            where: { domain },
            include: {
                content: { include: { content: true } },
                media: { include: { mediaAsset: true } },
                products: { include: { product: true } },
                affiliateLinks: true
            }
        }));
    }
    // Cached analytics operations
    async getSiteAnalytics(siteId, dateRange) {
        const key = this.cacheManager.generateKey('analytics-site', {
            siteId,
            start: dateRange?.start?.toISOString(),
            end: dateRange?.end?.toISOString()
        });
        return this.cacheManager.getCached(key, async () => {
            const where = { siteId };
            if (dateRange) {
                where.createdAt = {
                    gte: dateRange.start,
                    lte: dateRange.end
                };
            }
            const affiliateLinks = await this.prisma.affiliateLink.findMany({
                where,
                include: {
                    linkClicks: true
                }
            });
            const totalLinks = affiliateLinks.length;
            const totalClicks = affiliateLinks.reduce((sum, link) => sum + link.linkClicks.length, 0);
            const totalConversions = affiliateLinks.reduce((sum, link) => sum + link.linkClicks.filter(c => c.conversionStatus === 'converted').length, 0);
            const totalRevenue = affiliateLinks.reduce((sum, link) => sum + link.linkClicks
                .filter(c => c.conversionValue)
                .reduce((linkSum, c) => linkSum + Number(c.conversionValue), 0), 0);
            return {
                totalLinks,
                totalClicks,
                totalConversions,
                conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
                totalRevenue,
                averageOrderValue: totalConversions > 0 ? totalRevenue / totalConversions : 0
            };
        }, { ttl: 60 }); // Cache analytics for 1 minute
    }
    async getTopProducts(siteId, limit = 10) {
        const key = this.cacheManager.generateKey('top-products', { siteId, limit });
        return this.cacheManager.getCached(key, async () => {
            const affiliateLinks = await this.prisma.affiliateLink.findMany({
                where: { siteId },
                include: {
                    product: true,
                    linkClicks: true
                }
            });
            const productStats = affiliateLinks
                .filter(link => link.product)
                .map(link => ({
                product: link.product,
                clicks: link.linkClicks.length,
                conversions: link.linkClicks.filter(c => c.conversionStatus === 'converted').length,
                revenue: link.linkClicks
                    .filter(c => c.conversionValue)
                    .reduce((sum, c) => sum + Number(c.conversionValue), 0)
            }))
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, limit);
            return productStats;
        }, { ttl: 300 }); // Cache for 5 minutes
    }
    // Invalidate cache when data changes
    async invalidateContentCache(contentId) {
        if (contentId) {
            await this.cacheManager.invalidate(`content:${contentId}`);
        }
        else {
            await this.cacheManager.invalidate('content');
        }
    }
    async invalidateSiteCache(siteId) {
        if (siteId) {
            await this.cacheManager.invalidate(`site:${siteId}`);
        }
        else {
            await this.cacheManager.invalidate('site');
        }
    }
    async invalidateAnalyticsCache(siteId) {
        if (siteId) {
            await this.cacheManager.invalidate(`analytics-site:${siteId}`);
            await this.cacheManager.invalidate(`top-products:${siteId}`);
        }
        else {
            await this.cacheManager.invalidate('analytics');
        }
    }
    // Get cache statistics
    getCacheStats() {
        return this.cacheManager.getStats();
    }
}
// Export singleton instance
export const cachedDb = new CachedDatabaseService(new PrismaClient());
