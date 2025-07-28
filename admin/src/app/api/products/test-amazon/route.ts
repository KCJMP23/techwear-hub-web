import { NextRequest, NextResponse } from 'next/server';
import { amazonService } from '@affiliate-template/ai';

export async function POST(request: NextRequest) {
  try {
    // Test the Amazon API connection
    const isConnected = await amazonService.testConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Amazon API connection failed. Check your credentials.' },
        { status: 500 }
      );
    }

    // Test a simple product search
    const products = await amazonService.searchProducts({
      keywords: 'laptop',
      itemCount: 3
    });

    return NextResponse.json({
      success: true,
      message: 'Amazon API connection successful',
      products: products.map((product: any) => ({
        asin: product.asin,
        title: product.title,
        price: product.price.displayAmount,
        rating: product.rating,
        affiliateUrl: product.affiliateUrl
      }))
    });

  } catch (error) {
    console.error('Amazon API test error:', error);
    return NextResponse.json(
      { 
        error: 'Amazon API test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Amazon API test endpoint. Use POST to test connection.',
    requiredEnvVars: [
      'AMAZON_ACCESS_KEY_ID',
      'AMAZON_SECRET_ACCESS_KEY', 
      'AMAZON_ASSOCIATE_TAG',
      'AMAZON_REGION'
    ]
  });
} 