import { prisma } from './index';
async function main() {
    console.log('🌱 Seeding database with simple real data...');
    try {
        // Check if site already exists
        const existingSite = await prisma.site.findFirst({
            where: { domain: 'localhost:3000' }
        });
        if (existingSite) {
            console.log('✅ Site already exists, skipping creation');
        }
        else {
            // Create a test site
            const site = await prisma.site.create({
                data: {
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
        }
        // Create categories
        const categories = [
            { name: 'Electronics', description: 'Latest electronic devices and gadgets', slug: 'electronics', displayOrder: 1 },
            { name: 'Audio', description: 'High-quality audio equipment', slug: 'audio', displayOrder: 2 },
            { name: 'Computers', description: 'Laptops, desktops, and accessories', slug: 'computers', displayOrder: 3 }
        ];
        for (const catData of categories) {
            const existingCat = await prisma.productCategory.findFirst({
                where: { slug: catData.slug }
            });
            if (!existingCat) {
                const category = await prisma.productCategory.create({
                    data: {
                        name: catData.name,
                        description: catData.description,
                        slug: catData.slug,
                        displayOrder: catData.displayOrder,
                        isActive: true,
                        siteId: (await prisma.site.findFirst({ where: { domain: 'localhost:3000' } }))?.id || 'test-site-1'
                    }
                });
                console.log('✅ Created category:', category.name);
            }
            else {
                console.log('✅ Category already exists:', catData.name);
            }
        }
        // Create products
        const products = [
            {
                name: 'Apple MacBook Pro 14-inch',
                description: 'Latest M3 chip, 16GB RAM, 512GB SSD',
                manufacturer: 'Apple',
                basePrice: 1999.99,
                mainImageUrl: '/products/macbook-pro.jpg',
                specifications: { processor: 'M3 Chip', memory: '16GB RAM', storage: '512GB SSD', display: '14-inch Retina' }
            },
            {
                name: 'Sony WH-1000XM5 Headphones',
                description: 'Industry-leading noise cancellation',
                manufacturer: 'Sony',
                basePrice: 349.99,
                mainImageUrl: '/products/sony-headphones.jpg',
                specifications: { type: 'Over-ear', connectivity: 'Bluetooth 5.2', battery: '30 hours', noiseCancellation: 'Yes' }
            },
            {
                name: 'Samsung 65-inch QLED TV',
                description: '4K Ultra HD, Quantum HDR, Smart TV',
                manufacturer: 'Samsung',
                basePrice: 1299.99,
                mainImageUrl: '/products/samsung-tv.jpg',
                specifications: { resolution: '4K Ultra HD', screenSize: '65-inch', hdr: 'Quantum HDR', smartFeatures: 'Yes' }
            }
        ];
        for (const prodData of products) {
            const existingProd = await prisma.product.findFirst({
                where: { name: prodData.name }
            });
            if (!existingProd) {
                const product = await prisma.product.create({
                    data: prodData
                });
                console.log('✅ Created product:', product.name);
            }
            else {
                console.log('✅ Product already exists:', prodData.name);
            }
        }
        // Create site products
        const site = await prisma.site.findFirst({ where: { domain: 'localhost:3000' } });
        if (site) {
            const siteProducts = [
                { productName: 'Apple MacBook Pro 14-inch', price: 1999.99, discount: 0, categorySlug: 'computers' },
                { productName: 'Sony WH-1000XM5 Headphones', price: 349.99, discount: 50.00, categorySlug: 'audio' },
                { productName: 'Samsung 65-inch QLED TV', price: 1299.99, discount: 200.00, categorySlug: 'electronics' }
            ];
            for (const spData of siteProducts) {
                const product = await prisma.product.findFirst({ where: { name: spData.productName } });
                const category = await prisma.productCategory.findFirst({ where: { slug: spData.categorySlug } });
                if (product && category) {
                    const existingSP = await prisma.siteProduct.findFirst({
                        where: {
                            siteId: site.id,
                            productId: product.id
                        }
                    });
                    if (!existingSP) {
                        const siteProduct = await prisma.siteProduct.create({
                            data: {
                                siteId: site.id,
                                productId: product.id,
                                price: spData.price,
                                discount: spData.discount,
                                inStock: true,
                                categoryId: category.id
                            }
                        });
                        console.log('✅ Created site product:', spData.productName);
                    }
                    else {
                        console.log('✅ Site product already exists:', spData.productName);
                    }
                }
            }
        }
        console.log('🎉 Database seeding completed successfully!');
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
