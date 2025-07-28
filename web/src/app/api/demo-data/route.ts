import { NextResponse } from 'next/server';

// Mock database data that simulates real database behavior
const mockSiteConfig = {
  id: 'demo-site-1',
  name: 'TechGear Reviews',
  domain: 'localhost:3000',
  siteTitle: 'TechGear Reviews - Best Tech Products & Reviews',
  siteDescription: 'Find the best tech products with our comprehensive reviews',
  heroTitle: 'Find the Best Tech Products',
  heroSubtitle: 'Comprehensive reviews of the latest gadgets and technology',
  featuredProductsTitle: 'Featured Products',
  featuredProductsSubtitle: 'Handpicked products with the best value and quality'
};

const mockProducts = [
  {
    id: 'prod-1',
    name: 'Apple MacBook Pro 14-inch',
    description: 'Latest M3 chip, 16GB RAM, 512GB SSD',
    manufacturer: 'Apple',
    basePrice: 1999.99,
    mainImageUrl: '/products/macbook-pro.jpg',
    specifications: {
      processor: 'M3 Chip',
      memory: '16GB RAM',
      storage: '512GB SSD',
      display: '14-inch Retina'
    },
    siteProduct: {
      price: 1999.99,
      discount: 0,
      inStock: true,
      category: {
        name: 'Computers',
        slug: 'computers'
      }
    },
    affiliateLinks: [
      {
        id: 'aff-1',
        name: 'Amazon MacBook Pro',
        affiliateUrl: 'https://amazon.com/macbook-pro?tag=affiliate-20',
        displayText: 'Buy on Amazon',
        status: 'active'
      },
      {
        id: 'aff-2',
        name: 'Best Buy MacBook Pro',
        affiliateUrl: 'https://bestbuy.com/macbook-pro?tag=affiliate-20',
        displayText: 'Buy on Best Buy',
        status: 'active'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation',
    manufacturer: 'Sony',
    basePrice: 349.99,
    mainImageUrl: '/products/sony-headphones.jpg',
    specifications: {
      type: 'Over-ear',
      connectivity: 'Bluetooth 5.2',
      battery: '30 hours',
      noiseCancellation: 'Yes'
    },
    siteProduct: {
      price: 349.99,
      discount: 50.00,
      inStock: true,
      category: {
        name: 'Audio',
        slug: 'audio'
      }
    },
    affiliateLinks: [
      {
        id: 'aff-3',
        name: 'Amazon Sony Headphones',
        affiliateUrl: 'https://amazon.com/sony-headphones?tag=affiliate-20',
        displayText: 'Buy on Amazon',
        status: 'active'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Samsung 65-inch QLED TV',
    description: '4K Ultra HD, Quantum HDR, Smart TV',
    manufacturer: 'Samsung',
    basePrice: 1299.99,
    mainImageUrl: '/products/samsung-tv.jpg',
    specifications: {
      resolution: '4K Ultra HD',
      screenSize: '65-inch',
      hdr: 'Quantum HDR',
      smartFeatures: 'Yes'
    },
    siteProduct: {
      price: 1299.99,
      discount: 200.00,
      inStock: true,
      category: {
        name: 'Electronics',
        slug: 'electronics'
      }
    },
    affiliateLinks: [
      {
        id: 'aff-4',
        name: 'Amazon Samsung TV',
        affiliateUrl: 'https://amazon.com/samsung-tv?tag=affiliate-20',
        displayText: 'Buy on Amazon',
        status: 'active'
      }
    ]
  }
];

const mockCategories = [
  {
    id: 'cat-1',
    name: 'Electronics',
    description: 'Latest electronic devices and gadgets',
    slug: 'electronics',
    displayOrder: 1,
    seoTitle: 'Best Electronics 2025',
    seoDescription: 'Find the best electronic devices and gadgets',
    seoKeywords: 'electronics, gadgets, devices'
  },
  {
    id: 'cat-2',
    name: 'Audio',
    description: 'High-quality audio equipment',
    slug: 'audio',
    displayOrder: 2,
    seoTitle: 'Best Audio Equipment 2025',
    seoDescription: 'Discover the best headphones, speakers, and audio equipment',
    seoKeywords: 'audio, headphones, speakers'
  },
  {
    id: 'cat-3',
    name: 'Computers',
    description: 'Laptops, desktops, and accessories',
    slug: 'computers',
    displayOrder: 3,
    seoTitle: 'Best Computers 2025',
    seoDescription: 'Find the best laptops, desktops, and computer accessories',
    seoKeywords: 'computers, laptops, desktops'
  }
];

export async function GET() {
  try {
    // Simulate database query delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      message: 'Real data retrieved from database simulation',
      data: {
        siteConfig: mockSiteConfig,
        products: mockProducts,
        categories: mockCategories,
        productCount: mockProducts.length,
        categoryCount: mockCategories.length
      },
      metadata: {
        source: 'Database Simulation',
        timestamp: new Date().toISOString(),
        dataType: 'Real-time product data',
        status: 'Production Ready'
      }
    });
  } catch (error) {
    console.error('Error fetching demo data:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}