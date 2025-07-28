import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIService } from '@affiliate-template/ai';
import { ImageGenerationRequest } from '@affiliate-template/shared-types';

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
    const { prompt, provider, size, style, aspectRatio, quality } = body;

    // Validate required fields
    if (!prompt || !provider) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt, provider' },
        { status: 400 }
      );
    }

    // Create AI service request
    const aiRequest: ImageGenerationRequest = {
      prompt,
      provider,
      size,
      style,
      aspectRatio,
      quality,
    };

    // Initialize AI service
    const aiService = new AIService();

    // Generate image
    const response = await aiService.generateImage(aiRequest);

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { 
        error: 'Image generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 