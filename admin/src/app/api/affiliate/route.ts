import { NextRequest, NextResponse } from 'next/server';
import { affiliateLinkService } from '@affiliate-template/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get('siteId');
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let links;
    if (siteId) {
      links = await affiliateLinkService.findBySite(siteId, {
        status,
        limit,
        offset
      });
    } else {
      links = await affiliateLinkService.findAll({
        status,
        limit,
        offset
      });
    }

    return NextResponse.json({
      success: true,
      data: links
    });
  } catch (error) {
    console.error('Failed to fetch affiliate links:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch affiliate links'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.originalUrl || !body.affiliateUrl) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, originalUrl, affiliateUrl'
      }, { status: 400 });
    }

    const createData: any = {
      name: body.name,
      originalUrl: body.originalUrl,
      affiliateUrl: body.affiliateUrl,
      site: { connect: { id: body.siteId } },
      displayText: body.displayText,
      trackingId: body.trackingId,
      commissionInfo: body.commissionInfo || {},
      status: body.status || 'draft'
    };

    if (body.createdBy) {
      createData.createdBy = body.createdBy;
    }

    if (body.productId) {
      createData.product = { connect: { id: body.productId } };
    }

    if (body.merchantId) {
      createData.merchant = { connect: { id: body.merchantId } };
    }

    if (body.expirationDate) {
      createData.expirationDate = new Date(body.expirationDate);
    }

    const link = await affiliateLinkService.create(createData);

    return NextResponse.json({
      success: true,
      data: link
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create affiliate link:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create affiliate link'
    }, { status: 500 });
  }
} 