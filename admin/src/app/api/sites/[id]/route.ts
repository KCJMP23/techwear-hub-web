import { NextRequest, NextResponse } from 'next/server';
import { siteService } from '@affiliate-template/db/src/utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { name, domain, siteDescription, logoUrl, primaryColor, secondaryColor } = body;

    if (!name || !domain) {
      return NextResponse.json({ error: 'Name and domain are required' }, { status: 400 });
    }

    const updatedSite = await siteService.update(resolvedParams.id, {
      name,
      domain,
      siteDescription,
      logoUrl,
      primaryColor,
      secondaryColor,
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      data: updatedSite
    });
  } catch (error) {
    console.error('Site update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update site' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    
    await siteService.delete(resolvedParams.id);

    return NextResponse.json({
      success: true,
      message: 'Site deleted successfully'
    });
  } catch (error) {
    console.error('Site deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete site' },
      { status: 500 }
    );
  }
} 