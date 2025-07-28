import { prisma } from './index';

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

export async function getSiteConfig(domain: string): Promise<SiteConfig | null> {
  try {
    const site = await prisma.site.findFirst({
      where: { domain }
    });

    if (!site) {
      return null;
    }

    return {
      id: site.id,
      name: site.name,
      domain: site.domain,
      siteTitle: site.siteTitle || 'TechGear Reviews',
      siteDescription: site.siteDescription || 'Comprehensive reviews of the latest gadgets and technology',
      heroTitle: site.heroTitle || 'Find the Best Tech Products',
      heroSubtitle: site.heroSubtitle || 'Comprehensive reviews of the latest gadgets and technology',
      aboutTitle: site.aboutTitle || 'About TechGear Reviews',
      aboutDescription: site.aboutDescription || 'We provide honest, detailed reviews of the latest technology products to help you make informed purchasing decisions.',
      contactEmail: site.contactEmail || 'contact@techgear-reviews.com',
      metaTitle: site.metaTitle || 'TechGear Reviews - Best Tech Products & Reviews',
      metaDescription: site.metaDescription || 'Find the best tech products with our comprehensive reviews. We test and review the latest gadgets, electronics, and technology.',
      featuredPostsTitle: site.featuredPostsTitle || 'Featured Reviews',
      featuredPostsSubtitle: site.featuredPostsSubtitle || 'Our most popular and latest product reviews',
      featuredProductsTitle: site.featuredProductsTitle || 'Featured Products',
      featuredProductsSubtitle: site.featuredProductsSubtitle || 'Handpicked products with the best value and quality',
      newsletterTitle: site.newsletterTitle || 'Stay Updated',
      newsletterSubtitle: site.newsletterSubtitle || 'Get the latest product reviews and tech news delivered to your inbox',
      footerText: site.footerText || '© 2025 TechGear Reviews. All rights reserved.',
      socialLinks: site.socialLinks as Record<string, string> || {}
    };
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
}

export async function getFeaturedProducts(domain: string, limit: number = 4): Promise<Product[]> {
  try {
    const site = await prisma.site.findFirst({
      where: { domain }
    });

    if (!site) {
      return [];
    }

    const siteProducts = await prisma.siteProduct.findMany({
      where: {
        siteId: site.id,
        inStock: true
      },
      include: {
        product: {
          include: {
            affiliateLinks: {
              where: {
                siteId: site.id,
                status: 'active'
              }
            }
          }
        },
        category: true
      },
      take: limit,
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return siteProducts.map(sp => ({
      id: sp.product.id,
      name: sp.product.name,
      description: sp.product.description || '',
      manufacturer: sp.product.manufacturer || '',
      basePrice: Number(sp.product.basePrice),
      mainImageUrl: sp.product.mainImageUrl || '/products/placeholder.jpg',
      specifications: sp.product.specifications as Record<string, any> || {},
      siteProduct: {
        price: Number(sp.price),
        discount: sp.discount ? Number(sp.discount) : 0,
        inStock: sp.inStock,
        category: sp.category ? {
          name: sp.category.name,
          slug: sp.category.slug
        } : undefined
      },
      affiliateLinks: sp.product.affiliateLinks.map(al => ({
        id: al.id,
        name: al.name,
        affiliateUrl: al.affiliateUrl,
        displayText: al.displayText || 'Buy Now',
        status: al.status
      }))
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getCategories(domain: string): Promise<Category[]> {
  try {
    const site = await prisma.site.findFirst({
      where: { domain }
    });

    if (!site) {
      return [];
    }

    const categories = await prisma.productCategory.findMany({
      where: {
        siteId: site.id
      },
      orderBy: {
        displayOrder: 'asc'
      }
    });

    return categories.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      description: cat.description || '',
      slug: cat.slug,
      displayOrder: cat.displayOrder,
      seoTitle: cat.seoTitle || cat.name,
      seoDescription: cat.seoDescription || cat.description || '',
      seoKeywords: cat.seoKeywords || ''
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getBlogPosts(domain: string, limit: number = 6): Promise<BlogPost[]> {
  try {
    const site = await prisma.site.findFirst({
      where: { domain }
    });

    if (!site) {
      return [];
    }

    const posts = await prisma.content.findMany({
      where: {
        siteContent: {
          some: {
            siteId: site.id
          }
        },
        status: 'published',
        contentType: {
          name: 'blog-post'
        }
      },
      include: {
        contentType: true
      },
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return posts.map(post => {
      const data = post.data as any;
      return {
        id: post.id,
        title: data.title || post.title,
        content: data.content || '',
        summary: data.summary || '',
        keyTakeaways: data.keyTakeaways || [],
        featuredImage: data.featuredImage || '/blog/placeholder.jpg',
        status: post.status,
        publishedAt: post.createdAt || new Date(),
        category: data.category || 'Technology',
        wordCount: data.wordCount || 0,
        readingTime: data.readingTime || 5,
        affiliateLinks: data.affiliateLinks || []
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getProductCount(domain: string): Promise<number> {
  try {
    const site = await prisma.site.findFirst({
      where: { domain }
    });

    if (!site) {
      return 0;
    }

    return await prisma.siteProduct.count({
      where: {
        siteId: site.id,
        inStock: true
      }
    });
  } catch (error) {
    console.error('Error fetching product count:', error);
    return 0;
  }
}