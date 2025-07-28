import { NextRequest, NextResponse } from 'next/server';
import { autoBlogPostService } from '@affiliate-template/db/src/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    
    const updatedPost = await autoBlogPostService.update(resolvedParams.id, {
      status: 'published',
      publishedAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: 'Post approved and published successfully'
    });
  } catch (error) {
    console.error('Error approving post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to approve post' },
      { status: 500 }
    );
  }
} 