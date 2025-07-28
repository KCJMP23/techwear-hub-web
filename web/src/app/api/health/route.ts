import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../packages/db/src';

export async function GET() {
  try {
    // Test database connection with a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime(),
      result: result
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 