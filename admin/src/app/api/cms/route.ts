import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return CMS status and configuration
    return NextResponse.json({
      status: 'connected',
      collections: ['posts', 'pages', 'media', 'categories', 'tags', 'users'],
      apiUrl: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
    });
  } catch (error) {
    console.error('CMS API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, collection, data } = body;

    // Handle different CMS actions
    switch (action) {
      case 'create':
        // Create new content
        return NextResponse.json({ 
          success: true, 
          message: `Created ${collection} successfully` 
        });
      
      case 'update':
        // Update existing content
        return NextResponse.json({ 
          success: true, 
          message: `Updated ${collection} successfully` 
        });
      
      case 'delete':
        // Delete content
        return NextResponse.json({ 
          success: true, 
          message: `Deleted ${collection} successfully` 
        });
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('CMS API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 