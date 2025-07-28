import { PrismaClient } from '@prisma/client';
export declare class CacheManager {
    private memoryCache;
    private redisCache;
    private prisma;
    constructor(prisma: PrismaClient);
    private generateKey;
    getCached<T>(key: string, fetchFn: () => Promise<T>, options?: {
        ttl?: number;
        useMemory?: boolean;
        useRedis?: boolean;
    }): Promise<T>;
    invalidate(pattern: string): Promise<void>;
    getStats(): {
        memory: {
            totalEntries: number;
            validEntries: number;
            expiredEntries: number;
            memoryUsage: NodeJS.MemoryUsage;
        };
        redis: {
            totalEntries: number;
        };
    };
}
export declare class CachedDatabaseService {
    private cacheManager;
    private prisma;
    constructor(prisma: PrismaClient);
    getContentById(id: string): Promise<({
        contentType: {
            name: string;
            id: number;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            schema: import("@prisma/client/runtime/library").JsonValue | null;
        };
        categories: ({
            category: {
                name: string;
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                description: string | null;
                parentId: number | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        tags: ({
            tag: {
                name: string;
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        versions: {
            id: string;
            data: import("@prisma/client/runtime/library").JsonValue;
            createdBy: string | null;
            createdAt: Date | null;
            version: number;
            contentId: string;
        }[];
        siteContent: ({
            site: {
                name: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                domain: string;
                logoUrl: string | null;
                primaryColor: string | null;
                secondaryColor: string | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
    } & {
        id: string;
        title: string;
        slug: string;
        contentTypeId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }) | null>;
    getContentBySlug(slug: string): Promise<({
        contentType: {
            name: string;
            id: number;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            schema: import("@prisma/client/runtime/library").JsonValue | null;
        };
        categories: ({
            category: {
                name: string;
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                description: string | null;
                parentId: number | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        tags: ({
            tag: {
                name: string;
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        versions: {
            id: string;
            data: import("@prisma/client/runtime/library").JsonValue;
            createdBy: string | null;
            createdAt: Date | null;
            version: number;
            contentId: string;
        }[];
        siteContent: ({
            site: {
                name: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                domain: string;
                logoUrl: string | null;
                primaryColor: string | null;
                secondaryColor: string | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
    } & {
        id: string;
        title: string;
        slug: string;
        contentTypeId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }) | null>;
    getSiteById(id: string): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: import("@prisma/client/runtime/library").JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                name: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                description: string | null;
                manufacturer: string | null;
                basePrice: import("@prisma/client/runtime/library").Decimal;
                mainImageUrl: string | null;
                specifications: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            productId: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal | null;
            inStock: boolean;
        })[];
        affiliateLinks: {
            name: string;
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            merchantId: string | null;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: import("@prisma/client/runtime/library").JsonValue | null;
            expirationDate: Date | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        domain: string;
        logoUrl: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
    }) | null>;
    getSiteByDomain(domain: string): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: import("@prisma/client/runtime/library").JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                name: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                description: string | null;
                manufacturer: string | null;
                basePrice: import("@prisma/client/runtime/library").Decimal;
                mainImageUrl: string | null;
                specifications: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            productId: string;
            price: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal | null;
            inStock: boolean;
        })[];
        affiliateLinks: {
            name: string;
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            merchantId: string | null;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: import("@prisma/client/runtime/library").JsonValue | null;
            expirationDate: Date | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        domain: string;
        logoUrl: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
    }) | null>;
    getSiteAnalytics(siteId: string, dateRange?: {
        start: Date;
        end: Date;
    }): Promise<{
        totalLinks: number;
        totalClicks: number;
        totalConversions: number;
        conversionRate: number;
        totalRevenue: number;
        averageOrderValue: number;
    }>;
    getTopProducts(siteId: string, limit?: number): Promise<{
        product: {
            name: string;
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            manufacturer: string | null;
            basePrice: import("@prisma/client/runtime/library").Decimal;
            mainImageUrl: string | null;
            specifications: import("@prisma/client/runtime/library").JsonValue | null;
        };
        clicks: number;
        conversions: number;
        revenue: number;
    }[]>;
    invalidateContentCache(contentId?: string): Promise<void>;
    invalidateSiteCache(siteId?: string): Promise<void>;
    invalidateAnalyticsCache(siteId?: string): Promise<void>;
    getCacheStats(): {
        memory: {
            totalEntries: number;
            validEntries: number;
            expiredEntries: number;
            memoryUsage: NodeJS.MemoryUsage;
        };
        redis: {
            totalEntries: number;
        };
    };
}
export declare const cachedDb: CachedDatabaseService;
//# sourceMappingURL=cache.d.ts.map