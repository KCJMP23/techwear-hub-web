import { NextRequest, NextResponse } from 'next/server';
import { manualAmazonLinkManager } from '@affiliate-template/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls, trackingId } = body;

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      );
    }

    // Validate all URLs are Amazon URLs
    const invalidUrls = urls.filter(url => !manualAmazonLinkManager.isValidAmazonUrl(url));
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { 
          error: 'Invalid Amazon URLs found',
          invalidUrls 
        },
        { status: 400 }
      );
    }

    // Convert URLs to affiliate URLs
    const affiliateLinks = manualAmazonLinkManager.bulkConvertToAffiliateUrls(urls, trackingId);

    return NextResponse.json({
      success: true,
      data: affiliateLinks,
      count: affiliateLinks.length
    });

  } catch (error) {
    console.error('Error converting Amazon URLs:', error);
    return NextResponse.json(
      { error: 'Failed to convert URLs' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const trackingIds = manualAmazonLinkManager.getTrackingIds();
    
    return NextResponse.json({
      success: true,
      data: {
        trackingIds,
        instructions: {
          bulkUpload: 'Send a POST request with an array of Amazon URLs and optional trackingId',
          siteStripe: 'Use Amazon SiteStripe to copy affiliate links directly',
          categories: {
            'weartech00-20': 'Wearable and mobile health technology',
            'jmpkch23-20': 'General merchandise',
            'hothoneyfever00-20': 'Hot honey products'
          }
        }
      }
    });

  } catch (error) {
    console.error('Error getting tracking IDs:', error);
    return NextResponse.json(
      { error: 'Failed to get tracking IDs' },
      { status: 500 }
    );
  }
} 