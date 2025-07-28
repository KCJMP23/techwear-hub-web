import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, siteId } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // For now, return a success response indicating the API is working
    // We'll implement the full database integration later
    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        email,
        site_id: siteId || 'default-site-id',
        status: 'ACTIVE',
        subscribed_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const siteId = searchParams.get('siteId');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // For now, return a success response indicating the API is working
    // We'll implement the full database integration later
    return NextResponse.json({ 
      success: true,
      message: 'Successfully unsubscribed',
      data: {
        email,
        site_id: siteId || 'default-site-id',
        status: 'UNSUBSCRIBED',
        unsubscribed_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
} 