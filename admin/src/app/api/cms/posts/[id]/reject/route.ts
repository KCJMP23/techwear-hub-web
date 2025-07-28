import { NextRequest, NextResponse } from 'next/server';
import { autoBlogPostService } from '@affiliate-template/db/src/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { reason } = body;

    // For now, we'll delete the rejected post
    // In a real implementation, you might want to keep it with a 'rejected' status
    await autoBlogPostService.delete(resolvedParams.id);

    return NextResponse.json({
      success: true,
      message: 'Post rejected and removed successfully',
      reason: reason || 'Rejected by admin'
    });
  } catch (error) {
    console.error('Error rejecting post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reject post' },
      { status: 500 }
    );
  }
} 