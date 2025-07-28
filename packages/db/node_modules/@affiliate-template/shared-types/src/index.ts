// Core data models for the affiliate platform
// Based on the architecture document and PRD requirements

export interface User {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Site {
  id: string;
  name: string;
  url: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
  settings?: SiteSettings;
}

export interface SiteSettings {
  logo_url?: string;
  color_scheme?: ColorScheme;
  font_family?: string;
  custom_domain?: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  status: 'draft' | 'pending_approval' | 'published';
  site_id: string;
  featured_image_url?: string;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
  author_id: string;
  seo_title?: string;
  seo_description?: string;
  key_takeaways?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  affiliate_url: string;
  price: number;
  currency: string;
  image_url?: string;
  site_id: string;
  category: string;
  rating?: number;
  review_count?: number;
  custom_fields?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface Click {
  id: string;
  affiliate_url: string;
  product_id: string;
  site_id: string;
  visitor_ip?: string;
  user_agent?: string;
  referrer?: string;
  clicked_at: Date;
  converted?: boolean;
  conversion_value?: number;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  site_id: string;
  subscribed_at: Date;
  status: 'active' | 'unsubscribed';
}

export interface ApiKey {
  id: string;
  name: string;
  service: 'openai' | 'claude' | 'leonardo' | 'amazon';
  key_hash: string;
  user_id: string;
  created_at: Date;
  last_used?: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Content generation types
export interface ContentGenerationRequest {
  topic: string;
  site_id: string;
  target_length?: number;
  tone?: 'professional' | 'casual' | 'friendly';
  include_affiliate_links?: boolean;
}

export interface ContentGenerationResponse {
  title: string;
  content: string;
  summary: string;
  key_takeaways: string[];
  featured_image_url?: string;
  seo_title?: string;
  seo_description?: string;
}

// Analytics types
export interface SiteAnalytics {
  site_id: string;
  total_clicks: number;
  total_conversions: number;
  total_revenue: number;
  period: 'day' | 'week' | 'month' | 'year';
  start_date: Date;
  end_date: Date;
}

export interface ClickAnalytics {
  date: Date;
  clicks: number;
  conversions: number;
  revenue: number;
}

// AI Service types
export * from './ai';