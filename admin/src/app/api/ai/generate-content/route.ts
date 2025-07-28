import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIService } from '@affiliate-template/ai';
import { AIContentGenerationRequest } from '@affiliate-template/shared-types';

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
    const { prompt, provider, contentType, tone, length, keywords, targetAudience } = body;

    // Validate required fields
    if (!prompt || !provider || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt, provider, contentType' },
        { status: 400 }
      );
    }

    // Create AI service request
    const aiRequest: AIContentGenerationRequest = {
      prompt,
      provider,
      contentType,
      tone,
      length,
      keywords,
      targetAudience,
    };

    // Initialize AI service
    const aiService = new AIService();

    // Generate content
    const response = await aiService.generateContent(aiRequest);

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { 
        error: 'Content generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 