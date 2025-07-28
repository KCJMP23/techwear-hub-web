import { NextRequest, NextResponse } from 'next/server';
import { getHealthStatus, getSystemMetrics } from '../../../lib/monitoring';

export async function GET(request: NextRequest) {
  try {
    const healthStatus = await getHealthStatus();
    const systemMetrics = getSystemMetrics();

    return NextResponse.json({
      success: true,
      data: {
        health: healthStatus,
        metrics: systemMetrics,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Health check failed',
      data: {
        health: {
          status: 'unhealthy',
          timestamp: new Date(),
          checks: {
            database: false,
            api: false,
            memory: false,
            disk: false
          },
          details: {
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        },
        metrics: getSystemMetrics(),
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
} 