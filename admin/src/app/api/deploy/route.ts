import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  siteService, 
  customNicheService, 
  autoBlogPostService, 
  contentScheduleService, 
  productCategoryService 
} from '@affiliate-template/db/src/utils';
import { AIService } from '@affiliate-template/ai';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      siteConfig,
      contentConfig,
      productConfig,
      seoConfig,
      deploymentConfig
    } = body;

    // Step 1: Create custom niche if needed
    let customNicheId = null;
    if (siteConfig.nicheType === 'custom' && siteConfig.customNiche) {
      const customNiche = await createCustomNiche(siteConfig.customNiche);
      customNicheId = customNiche.id;
    }

    // Step 2: Create the site in the database with all new fields
    const site = await siteService.create({
      name: siteConfig.name,
      domain: siteConfig.domain,
      logoUrl: siteConfig.logo ? '/uploads/logos/' + siteConfig.logo.name : '/images/default-logo.png',
      primaryColor: siteConfig.primaryColor,
      secondaryColor: siteConfig.secondaryColor,
      siteDescription: siteConfig.description,
      siteTitle: `${siteConfig.name} - Best ${siteConfig.niche} Reviews & Comparisons`,
      metaDescription: seoConfig.metaDescription || `Discover the best ${siteConfig.niche} products with expert reviews, comparisons, and exclusive deals.`,
      socialLinks: siteConfig.socialLinks,
      // New fields for custom niche and auto-blogger
      nicheType: siteConfig.nicheType,
      customNiche: customNicheId ? { connect: { id: customNicheId } } : undefined,
      nicheKeywords: siteConfig.customNiche?.keywords || [],
      targetAudience: siteConfig.customNiche?.targetAudience,
      autoBlogEnabled: contentConfig.autoBlogEnabled,
      autoBlogFrequency: contentConfig.autoBlogFrequency,
      autoBlogPostTypes: contentConfig.autoBlogPostTypes,
      autoBlogCategories: contentConfig.autoBlogCategories,
    });

    // Step 3: Create product categories if custom niche
    if (siteConfig.nicheType === 'custom' && siteConfig.customNiche?.categories) {
      await createProductCategories(site.id, siteConfig.customNiche.categories);
    }

    // Step 4: Generate initial content if requested
    if (contentConfig.generateBlogPosts || contentConfig.generateProductReviews) {
      const generatedContent = await generateInitialContent(siteConfig, contentConfig, site.id);
      await saveGeneratedContent(generatedContent, site.id);
    }

    // Step 5: Set up automated content scheduling
    if (contentConfig.autoBlogEnabled) {
      await setupContentSchedule(site.id, contentConfig, siteConfig);
    }

    // Step 6: Import products if requested
    if (productConfig.importProducts) {
      const importedProducts = await importProducts(siteConfig, productConfig, site.id);
      await saveImportedProducts(importedProducts, site.id);
    }

    // Step 7: Configure SEO
    await configureSEO(site.id, seoConfig);

    // Step 8: Deploy to Vercel if requested
    if (deploymentConfig.deployToVercel) {
      const deploymentResult = await deployToVercel(siteConfig, deploymentConfig);
      return NextResponse.json({
        success: true,
        data: {
          site,
          deployment: deploymentResult,
          message: 'Site deployed successfully!'
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        site,
        message: 'Site created successfully!'
      }
    });

  } catch (error) {
    console.error('Deployment error:', error);
    return NextResponse.json(
      { 
        error: 'Deployment failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function createCustomNiche(customNiche: any) {
  return await customNicheService.create({
    name: customNiche.name,
    description: customNiche.description,
    keywords: customNiche.keywords,
    categories: customNiche.categories,
    targetAudience: customNiche.targetAudience,
    competitionLevel: customNiche.competitionLevel,
    profitabilityScore: customNiche.profitabilityScore,
  });
}

async function createProductCategories(siteId: string, categories: string[]) {
  const createdCategories = [];
  for (let i = 0; i < categories.length; i++) {
    const category = await productCategoryService.create({
      site: { connect: { id: siteId } },
      name: categories[i],
      description: `Products in the ${categories[i]} category`,
      slug: categories[i].toLowerCase().replace(/\s+/g, '-'),
      displayOrder: i,
    });
    createdCategories.push(category);
  }
  return createdCategories;
}

async function generateInitialContent(siteConfig: any, contentConfig: any, siteId: string) {
  const aiService = new AIService();
  const content: any = {
    blogPosts: [],
    productReviews: [],
    aboutPage: null,
    contactPage: null,
  };

  // Generate blog posts
  if (contentConfig.generateBlogPosts) {
    const postTypes = contentConfig.autoBlogPostTypes || ['how_to', 'listicle', 'product_review'];
    const keywords = siteConfig.customNiche?.keywords || [siteConfig.niche];
    const targetAudience = siteConfig.customNiche?.targetAudience || 'general audience';

    for (let i = 0; i < contentConfig.blogPostCount; i++) {
      const postType = postTypes[i % postTypes.length];
      try {
        const blogPost = await aiService.generateAutoBlogPost({
          siteId,
          niche: siteConfig.niche,
          postType,
          keywords,
          targetAudience,
          tone: 'professional',
          provider: 'openai',
        });

        content.blogPosts.push(blogPost);
      } catch (error) {
        console.error(`Failed to generate blog post ${i + 1}:`, error);
      }
    }
  }

  // Generate product reviews
  if (contentConfig.generateProductReviews) {
    const productReviews = await generateProductReviews(siteConfig.niche, contentConfig.productReviewCount);
    content.productReviews = productReviews;
  }

  // Generate about page
  if (contentConfig.generateAboutPage) {
    content.aboutPage = await generateAboutPage(siteConfig);
  }

  // Generate contact page
  if (contentConfig.generateContactPage) {
    content.contactPage = await generateContactPage(siteConfig);
  }

  return content;
}

async function generateProductReviews(niche: string, count: number) {
  const reviews = [];
  const aiService = new AIService();
  
  for (let i = 0; i < count; i++) {
    try {
      const review = await aiService.generateAutoBlogPost({
        siteId: 'temp',
        niche,
        postType: 'product_review',
        keywords: [niche, 'review', 'best'],
        targetAudience: 'shoppers looking for quality products',
        tone: 'professional',
        provider: 'openai',
      });
      reviews.push(review);
    } catch (error) {
      console.error(`Failed to generate product review ${i + 1}:`, error);
    }
  }
  
  return reviews;
}

async function generateAboutPage(siteConfig: any) {
  return {
    title: `About ${siteConfig.name}`,
    content: `Welcome to ${siteConfig.name}, your trusted source for the best ${siteConfig.niche} products and reviews. We're passionate about helping you make informed purchasing decisions with our comprehensive product analysis and expert recommendations.`,
    metaDescription: `Learn more about ${siteConfig.name} and our mission to provide the best ${siteConfig.niche} product reviews and recommendations.`
  };
}

async function generateContactPage(siteConfig: any) {
  return {
    title: `Contact ${siteConfig.name}`,
    content: `Get in touch with the team at ${siteConfig.name}. We're here to help with any questions about ${siteConfig.niche} products or our affiliate recommendations.`,
    metaDescription: `Contact ${siteConfig.name} for questions about ${siteConfig.niche} products, reviews, or affiliate recommendations.`,
    contactEmail: siteConfig.contactEmail || 'contact@' + siteConfig.domain
  };
}

async function saveGeneratedContent(content: any, siteId: string) {
  // Save blog posts
  for (const blogPost of content.blogPosts) {
    await autoBlogPostService.create({
      site: { connect: { id: siteId } },
      title: blogPost.title,
      content: blogPost.content,
      summary: blogPost.summary,
      keyTakeaways: blogPost.keyTakeaways,
      status: 'published',
      publishedAt: new Date(),
      seoData: blogPost.seoData,
      postType: blogPost.postType || 'blog_post',
      wordCount: blogPost.wordCount,
      readingTime: blogPost.readingTime,
      aiProvider: 'openai',
    });
  }

  // Save product reviews
  for (const review of content.productReviews) {
    await autoBlogPostService.create({
      site: { connect: { id: siteId } },
      title: review.title,
      content: review.content,
      summary: review.summary,
      keyTakeaways: review.keyTakeaways,
      status: 'published',
      publishedAt: new Date(),
      seoData: review.seoData,
      postType: 'product_review',
      wordCount: review.wordCount,
      readingTime: review.readingTime,
      aiProvider: 'openai',
    });
  }
}

async function setupContentSchedule(siteId: string, contentConfig: any, siteConfig: any) {
  // Set up automated content generation every 3 days
  const nextRunDate = new Date();
  nextRunDate.setDate(nextRunDate.getDate() + 3);

  await contentScheduleService.create({
    site: { connect: { id: siteId } },
    name: 'Auto Blog Schedule',
    description: 'Automated blog post generation every 3 days',
    frequency: 'daily',
    interval: 3,
    postTypes: contentConfig.autoBlogPostTypes,
    categories: siteConfig.customNiche?.categories || [],
    keywords: siteConfig.customNiche?.keywords || [siteConfig.niche],
    isActive: true,
    nextRunAt: nextRunDate,
  });
}

async function importProducts(siteConfig: any, productConfig: any, siteId: string) {
  // Placeholder for product import logic
  // This would integrate with Amazon API or other product sources
  const products: any[] = [];
  
  // For now, return empty array - this will be implemented with actual product import
  return products;
}

async function saveImportedProducts(products: any[], siteId: string) {
  // Placeholder for saving imported products
  // This would create SiteProduct records
  console.log(`Saving ${products.length} imported products for site ${siteId}`);
}

async function configureSEO(siteId: string, seoConfig: any) {
  // Update site with SEO configuration
  await siteService.update(siteId, {
    metaTitle: seoConfig.metaTitle,
    metaDescription: seoConfig.metaDescription,
    metaKeywords: seoConfig.metaKeywords?.join(', '),
  });
}

async function deployToVercel(siteConfig: any, deploymentConfig: any) {
  // Placeholder for Vercel deployment
  // This would integrate with Vercel API
  return {
    url: `https://${siteConfig.domain}`,
    status: 'deployed',
    deploymentId: 'vercel-deployment-id',
  };
} 