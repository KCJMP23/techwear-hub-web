import { NextRequest, NextResponse } from 'next/server';
import { analyticsService, affiliateLinkService } from '@affiliate-template/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'site';
    const siteId = searchParams.get('siteId');
    const linkId = searchParams.get('linkId');
    const limit = parseInt(searchParams.get('limit') || '10');

    let data;
    switch (type) {
      case 'site':
        if (!siteId) {
          return NextResponse.json({
            success: false,
            error: 'Site ID is required for site analytics'
          }, { status: 400 });
        }
        data = await analyticsService.getSiteAnalytics(siteId);
        break;

      case 'top-products':
        if (!siteId) {
          return NextResponse.json({
            success: false,
            error: 'Site ID is required for top products analytics'
          }, { status: 400 });
        }
        data = await analyticsService.getTopProducts(siteId, limit);
        break;

      case 'link-stats':
        if (!linkId) {
          return NextResponse.json({
            success: false,
            error: 'Link ID is required for link statistics'
          }, { status: 400 });
        }
        data = await affiliateLinkService.getClickStats(linkId);
        break;

      case 'click-history':
        if (!linkId) {
          return NextResponse.json({
            success: false,
            error: 'Link ID is required for click history'
          }, { status: 400 });
        }
        data = await analyticsService.getClickHistory(linkId, limit);
        break;

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid analytics type'
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch analytics'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.type) {
      return NextResponse.json({
        success: false,
        error: 'Analytics type is required'
      }, { status: 400 });
    }

    if (body.type === 'click') {
      const clickData = await affiliateLinkService.trackClick({
        affiliateLink: { connect: { id: body.affiliateLinkId } },
        ipAddress: body.ipAddress,
        userAgent: body.userAgent,
        referrer: body.referrer,
        conversionStatus: body.conversionStatus || 'clicked',
        conversionValue: body.conversionValue
      });

      return NextResponse.json({
        success: true,
        data: clickData
      }, { status: 201 });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid analytics type'
    }, { status: 400 });
  } catch (error) {
    console.error('Failed to track analytics:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to track analytics'
    }, { status: 500 });
  }
} 