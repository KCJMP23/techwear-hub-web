import { NextRequest, NextResponse } from 'next/server';
import { autoBlogPostService } from '@affiliate-template/db/src/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const posts = await autoBlogPostService.findAll({
      status: status || undefined,
      limit,
      offset
    });

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        limit,
        offset,
        total: posts.length
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const post = await autoBlogPostService.create({
      site: { connect: { id: body.siteId } },
      title: body.title,
      content: body.content,
      summary: body.summary,
      keyTakeaways: body.keyTakeaways,
      featuredImage: body.featuredImage,
      status: body.status || 'draft',
      seoData: body.seoData,
      tags: body.tags,
      category: body.category,
      postType: body.postType || 'blog_post',
      wordCount: body.wordCount,
      readingTime: body.readingTime,
      affiliateLinks: body.affiliateLinks,
      internalLinks: body.internalLinks,
      externalLinks: body.externalLinks,
      aiProvider: body.aiProvider,
      generationCost: body.generationCost
    });

    return NextResponse.json({
      success: true,
      data: post
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 