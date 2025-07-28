import { getSiteConfig } from '@/lib/db';

export interface SiteConfig {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  
  // Site Configuration
  siteTitle?: string;
  siteDescription?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  contactEmail?: string;
  
  // SEO Configuration
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  
  // Content Configuration
  featuredPostsTitle?: string;
  featuredPostsSubtitle?: string;
  featuredProductsTitle?: string;
  featuredProductsSubtitle?: string;
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  
  // Footer Configuration
  footerText?: string;
  socialLinks?: Record<string, string>;
}

// Default configuration for fallback
export const getDefaultSiteConfig = (): SiteConfig => ({
  id: 'default',
  name: 'Your Site',
  domain: 'localhost',
  siteTitle: 'Your Trusted Source for Product Reviews',
  siteDescription: 'Discover the best products through honest, comprehensive reviews. We test everything so you don\'t have to.',
  heroTitle: 'Your Trusted Source for Product Reviews',
  heroSubtitle: 'Discover the best products through honest, comprehensive reviews. We test everything so you don\'t have to.',
  aboutTitle: 'About Us',
  aboutDescription: 'Your trusted source for honest product reviews and recommendations',
  featuredPostsTitle: 'Featured Reviews',
  featuredPostsSubtitle: 'Latest product reviews and recommendations',
  featuredProductsTitle: 'Featured Products',
  featuredProductsSubtitle: 'Top-rated products we recommend',
  newsletterTitle: 'Stay Updated',
  newsletterSubtitle: 'Get the latest product reviews and recommendations delivered to your inbox.',
  footerText: '© 2024 Your Site. All rights reserved.'
});

export async function getCurrentSiteConfig(): Promise<SiteConfig> {
  try {
    // Get the current domain from the request
    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost';
    
    // Try to fetch site config from database
    const siteConfig = await getSiteConfig(domain);
    
    if (siteConfig) {
      return siteConfig as SiteConfig;
    }
    
    // Fallback to default config
    return getDefaultSiteConfig();
  } catch (error) {
    console.error('Error fetching site config:', error);
    return getDefaultSiteConfig();
  }
}

// Hook for use in components
export function useSiteConfig() {
  // This would be used in client components
  // For now, we'll use the server-side function
  return getCurrentSiteConfig();
} 