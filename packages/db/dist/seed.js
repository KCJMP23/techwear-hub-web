import { prisma } from './index';
async function main() {
    console.log('🌱 Seeding database with real data...');
    try {
        // Create a test site
        const site = await prisma.site.upsert({
            where: { id: 'test-site-1' },
            update: {},
            create: {
                id: 'test-site-1',
                name: 'TechGear Reviews',
                domain: 'localhost:3000',
                siteTitle: 'TechGear Reviews - Best Tech Products & Reviews',
                siteDescription: 'Find the best tech products with our comprehensive reviews',
                heroTitle: 'Find the Best Tech Products',
                heroSubtitle: 'Comprehensive reviews of the latest gadgets and technology',
                featuredProductsTitle: 'Featured Products',
                featuredProductsSubtitle: 'Handpicked products with the best value and quality',
                nicheType: 'predefined',
                nicheKeywords: ['tech', 'electronics', 'gadgets', 'reviews']
            }
        });
        console.log('✅ Created site:', site.name);
        // Create product categories
        const categories = await Promise.all([
            prisma.productCategory.upsert({
                where: { id: 'cat-1' },
                update: {},
                create: {
                    id: 'cat-1',
                    siteId: site.id,
                    name: 'Electronics',
                    description: 'Latest electronic devices and gadgets',
                    slug: 'electronics',
                    displayOrder: 1,
                    isActive: true
                }
            }),
            prisma.productCategory.upsert({
                where: { id: 'cat-2' },
                update: {},
                create: {
                    id: 'cat-2',
                    siteId: site.id,
                    name: 'Audio',
                    description: 'High-quality audio equipment',
                    slug: 'audio',
                    displayOrder: 2,
                    isActive: true
                }
            }),
            prisma.productCategory.upsert({
                where: { id: 'cat-3' },
                update: {},
                create: {
                    id: 'cat-3',
                    siteId: site.id,
                    name: 'Computers',
                    description: 'Laptops, desktops, and accessories',
                    slug: 'computers',
                    displayOrder: 3,
                    isActive: true
                }
            })
        ]);
        console.log('✅ Created categories:', categories.length);
        // Create products
        const products = await Promise.all([
            prisma.product.upsert({
                where: { id: 'prod-1' },
                update: {},
                create: {
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
                    }
                }
            }),
            prisma.product.upsert({
                where: { id: 'prod-2' },
                update: {},
                create: {
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
                    }
                }
            }),
            prisma.product.upsert({
                where: { id: 'prod-3' },
                update: {},
                create: {
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
                    }
                }
            })
        ]);
        console.log('✅ Created products:', products.length);
        // Create site products (linking products to the site)
        const siteProducts = await Promise.all([
            prisma.siteProduct.upsert({
                where: { siteId_productId: { siteId: site.id, productId: 'prod-1' } },
                update: {},
                create: {
                    siteId: site.id,
                    productId: 'prod-1',
                    price: 1999.99,
                    discount: 0,
                    inStock: true,
                    categoryId: 'cat-3'
                }
            }),
            prisma.siteProduct.upsert({
                where: { siteId_productId: { siteId: site.id, productId: 'prod-2' } },
                update: {},
                create: {
                    siteId: site.id,
                    productId: 'prod-2',
                    price: 349.99,
                    discount: 50.00,
                    inStock: true,
                    categoryId: 'cat-2'
                }
            }),
            prisma.siteProduct.upsert({
                where: { siteId_productId: { siteId: site.id, productId: 'prod-3' } },
                update: {},
                create: {
                    siteId: site.id,
                    productId: 'prod-3',
                    price: 1299.99,
                    discount: 200.00,
                    inStock: true,
                    categoryId: 'cat-1'
                }
            })
        ]);
        console.log('✅ Created site products:', siteProducts.length);
        // Create affiliate links
        const affiliateLinks = await Promise.all([
            prisma.affiliateLink.upsert({
                where: { id: 'aff-1' },
                update: {},
                create: {
                    id: 'aff-1',
                    name: 'Amazon MacBook Pro',
                    originalUrl: 'https://amazon.com/macbook-pro',
                    affiliateUrl: 'https://amazon.com/macbook-pro?tag=affiliate-20',
                    siteId: site.id,
                    productId: 'prod-1',
                    displayText: 'Buy on Amazon',
                    status: 'active'
                }
            }),
            prisma.affiliateLink.upsert({
                where: { id: 'aff-2' },
                update: {},
                create: {
                    id: 'aff-2',
                    name: 'Best Buy MacBook Pro',
                    originalUrl: 'https://bestbuy.com/macbook-pro',
                    affiliateUrl: 'https://bestbuy.com/macbook-pro?tag=affiliate-20',
                    siteId: site.id,
                    productId: 'prod-1',
                    displayText: 'Buy on Best Buy',
                    status: 'active'
                }
            })
        ]);
        console.log('✅ Created affiliate links:', affiliateLinks.length);
        console.log('🎉 Database seeding completed successfully!');
        console.log('📊 Summary:');
        console.log(`   - Site: ${site.name}`);
        console.log(`   - Categories: ${categories.length}`);
        console.log(`   - Products: ${products.length}`);
        console.log(`   - Site Products: ${siteProducts.length}`);
        console.log(`   - Affiliate Links: ${affiliateLinks.length}`);
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
