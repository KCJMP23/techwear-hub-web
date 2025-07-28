import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIService } from '@affiliate-template/ai';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { provider } = body;

    // Validate required fields
    if (!provider) {
      return NextResponse.json(
        { error: 'Missing required field: provider' },
        { status: 400 }
      );
    }

    // Validate provider
    if (!['openai', 'claude', 'leonardo'].includes(provider)) {
      return NextResponse.json(
        { error: 'Invalid provider. Must be one of: openai, claude, leonardo' },
        { status: 400 }
      );
    }

    // Initialize AI service
    const aiService = new AIService();

    // Test connection
    const isConnected = await aiService.testConnection(provider);

    return NextResponse.json({
      success: true,
      data: {
        provider,
        connected: isConnected,
      },
    });
  } catch (error) {
    console.error('Connection test error:', error);
    return NextResponse.json(
      { 
        error: 'Connection test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 