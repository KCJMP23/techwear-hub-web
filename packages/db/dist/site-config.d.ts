export interface SiteConfig {
    id: string;
    name: string;
    domain: string;
    siteTitle: string;
    siteDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    aboutTitle: string;
    aboutDescription: string;
    contactEmail: string;
    metaTitle: string;
    metaDescription: string;
    featuredPostsTitle: string;
    featuredPostsSubtitle: string;
    featuredProductsTitle: string;
    featuredProductsSubtitle: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    footerText: string;
    socialLinks: Record<string, string>;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    manufacturer: string;
    basePrice: number;
    mainImageUrl: string;
    specifications: Record<string, any>;
    siteProduct?: {
        price: number;
        discount: number;
        inStock: boolean;
        category?: {
            name: string;
            slug: string;
        };
    };
    affiliateLinks?: Array<{
        id: string;
        name: string;
        affiliateUrl: string;
        displayText: string;
        status: string;
    }>;
}
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    summary: string;
    keyTakeaways: string[];
    featuredImage: string;
    status: string;
    publishedAt: Date;
    category: string;
    wordCount: number;
    readingTime: number;
    affiliateLinks: Array<{
        product: string;
        url: string;
        commission: string;
    }>;
}
export interface Category {
    id: string;
    name: string;
    description: string;
    slug: string;
    displayOrder: number;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
}
export declare function getSiteConfig(domain: string): Promise<SiteConfig | null>;
export declare function getFeaturedProducts(domain: string, limit?: number): Promise<Product[]>;
export declare function getCategories(domain: string): Promise<Category[]>;
export declare function getBlogPosts(domain: string, limit?: number): Promise<BlogPost[]>;
export declare function getProductCount(domain: string): Promise<number>;
//# sourceMappingURL=site-config.d.ts.map