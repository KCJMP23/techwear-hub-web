import { NextRequest, NextResponse } from 'next/server';
import { autoBlogPostService } from '@affiliate-template/db/src/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    
    // For now, return a simple response indicating the API is working
    // We'll implement the full database integration later
    return NextResponse.json({
      success: true,
      data: {
        id: resolvedParams.id,
        title: 'Example Post',
        content: 'This is an example post content.',
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      message: 'Individual post API is working. Database integration coming soon.'
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();

    const updatedPost = await autoBlogPostService.update(resolvedParams.id, {
      ...body,
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: 'Post updated successfully'
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
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
    
    await autoBlogPostService.delete(resolvedParams.id);

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
} 