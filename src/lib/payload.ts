// Mock data for when CMS is not available
const mockPosts = [
  {
    id: '1',
    title: 'How to Choose the Best Gaming Headset',
    slug: 'best-gaming-headset-guide',
    excerpt: 'A comprehensive guide to selecting the perfect gaming headset for your needs.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      alt: 'Gaming headset'
    },
    publishedAt: '2024-01-15T00:00:00.000Z',
    author: {
      name: 'Tech Expert'
    },
    featured: true,
    categories: [{ name: 'Gaming' }]
  },
  {
    id: '2',
    title: 'Top 10 Wireless Earbuds for 2024',
    slug: 'top-wireless-earbuds-2024',
    excerpt: 'Discover the best wireless earbuds that offer superior sound quality and comfort.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop',
      alt: 'Wireless earbuds'
    },
    publishedAt: '2024-01-10T00:00:00.000Z',
    author: {
      name: 'Audio Specialist'
    },
    featured: true,
    categories: [{ name: 'Audio & Video' }]
  },
  {
    id: '3',
    title: 'Smart Home Security Systems Comparison',
    slug: 'smart-home-security-comparison',
    excerpt: 'Compare the latest smart home security systems and find the best protection for your home.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Smart home security'
    },
    publishedAt: '2024-01-05T00:00:00.000Z',
    author: {
      name: 'Security Expert'
    },
    featured: true,
    categories: [{ name: 'Smart Home' }]
  }
];

const mockProducts = [
  {
    id: '1',
    name: 'Sony WH-1000XM4 Wireless Headphones',
    slug: 'sony-wh-1000xm4',
    description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life.',
    image: {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      alt: 'Sony headphones'
    },
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 1250,
    affiliateUrl: 'https://amazon.com/dp/B0863TXGM3',
    featured: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Apple AirPods Pro (2nd Generation)',
    slug: 'apple-airpods-pro-2nd-gen',
    description: 'Active noise cancellation, Transparency mode, and spatial audio for immersive sound.',
    image: {
      url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop',
      alt: 'Apple AirPods Pro'
    },
    price: 249.99,
    originalPrice: 279.99,
    rating: 4.7,
    reviewCount: 890,
    affiliateUrl: 'https://amazon.com/dp/B0BDJ6Z8F8',
    featured: true,
    status: 'active'
  },
  {
    id: '3',
    name: 'Ring Video Doorbell Pro',
    slug: 'ring-video-doorbell-pro',
    description: '1080p HD video, enhanced two-way talk, and advanced motion detection.',
    image: {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Ring doorbell'
    },
    price: 169.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviewCount: 567,
    affiliateUrl: 'https://amazon.com/dp/B01N6LIRZC',
    featured: true,
    status: 'active'
  }
];

// Helper function to get published posts
export async function getPublishedPosts(limit = 10) {
  return { 
    docs: mockPosts.slice(0, limit), 
    totalDocs: mockPosts.length, 
    totalPages: 1, 
    page: 1, 
    limit 
  };
}

// Helper function to get featured posts
export async function getFeaturedPosts(limit = 3) {
  return { 
    docs: mockPosts.slice(0, limit), 
    totalDocs: mockPosts.length, 
    totalPages: 1, 
    page: 1, 
    limit 
  };
}

// Helper function to get active products
export async function getActiveProducts(limit = 10) {
  return { 
    docs: mockProducts.slice(0, limit), 
    totalDocs: mockProducts.length, 
    totalPages: 1, 
    page: 1, 
    limit 
  };
}

// Helper function to get featured products
export async function getFeaturedProducts(limit = 3) {
  return { 
    docs: mockProducts.slice(0, limit), 
    totalDocs: mockProducts.length, 
    totalPages: 1, 
    page: 1, 
    limit 
  };
}

// Helper function to get categories
export async function getCategories() {
  return { 
    docs: [
      { id: '1', name: 'Audio & Video', slug: 'audio-video' },
      { id: '2', name: 'Smart Home', slug: 'smart-home' },
      { id: '3', name: 'Gaming', slug: 'gaming' }
    ], 
    totalDocs: 3, 
    totalPages: 1, 
    page: 1, 
    limit: 10 
  };
}

// Helper function to get a single post by slug
export async function getPostBySlug(slug: string) {
  return mockPosts.find(post => post.slug === slug) || null;
}

// Helper function to get a single product by slug
export async function getProductBySlug(slug: string) {
  return mockProducts.find(product => product.slug === slug) || null;
} 