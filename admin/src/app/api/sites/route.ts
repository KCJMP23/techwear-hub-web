import { NextRequest, NextResponse } from 'next/server';
import { siteService } from '@affiliate-template/db/src/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const sites = await siteService.findAll({
      limit,
      offset
    });

    return NextResponse.json({
      success: true,
      data: sites,
      pagination: {
        limit,
        offset,
        total: sites.length
      }
    });
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const site = await siteService.create({
      name: body.name,
      domain: body.domain,
      logoUrl: body.logoUrl,
      primaryColor: body.primaryColor,
      secondaryColor: body.secondaryColor
    });

    return NextResponse.json({
      success: true,
      data: site
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating site:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create site' },
      { status: 500 }
    );
  }
} 