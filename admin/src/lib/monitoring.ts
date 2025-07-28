import { NextRequest, NextResponse } from 'next/server';

// Performance monitoring
interface PerformanceMetrics {
  responseTime: number;
  memoryUsage: number;
  cpuUsage: number;
  requestCount: number;
  errorCount: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    responseTime: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    requestCount: 0,
    errorCount: 0
  };

  private startTime: number = 0;

  startTimer(): void {
    this.startTime = Date.now();
  }

  endTimer(): number {
    const responseTime = Date.now() - this.startTime;
    this.metrics.responseTime = responseTime;
    return responseTime;
  }

  recordRequest(): void {
    this.metrics.requestCount++;
  }

  recordError(): void {
    this.metrics.errorCount++;
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = {
      responseTime: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      requestCount: 0,
      errorCount: 0
    };
  }
}

// Error tracking
interface ErrorLog {
  timestamp: Date;
  error: Error;
  context: Record<string, any>;
  userId?: string;
  requestId?: string;
}

class ErrorTracker {
  private errors: ErrorLog[] = [];

  logError(error: Error, context: Record<string, any> = {}, userId?: string, requestId?: string): void {
    const errorLog: ErrorLog = {
      timestamp: new Date(),
      error,
      context,
      userId,
      requestId
    };

    this.errors.push(errorLog);
    console.error('Error logged:', errorLog);
  }

  getErrors(): ErrorLog[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

// Database query monitoring
interface QueryLog {
  timestamp: Date;
  query: string;
  duration: number;
  success: boolean;
  error?: string;
}

class DatabaseMonitor {
  private queries: QueryLog[] = [];

  logQuery(query: string, duration: number, success: boolean, error?: string): void {
    const queryLog: QueryLog = {
      timestamp: new Date(),
      query,
      duration,
      success,
      error
    };

    this.queries.push(queryLog);
    
    if (!success) {
      console.error('Database query failed:', queryLog);
    }
  }

  getQueries(): QueryLog[] {
    return [...this.queries];
  }

  getAverageQueryTime(): number {
    if (this.queries.length === 0) return 0;
    
    const totalTime = this.queries.reduce((sum, query) => sum + query.duration, 0);
    return totalTime / this.queries.length;
  }

  clearQueries(): void {
    this.queries = [];
  }
}

// Health check monitoring
interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  checks: {
    database: boolean;
    api: boolean;
    memory: boolean;
    disk: boolean;
  };
  details: Record<string, any>;
}

class HealthMonitor {
  private lastCheck: HealthStatus | null = null;

  async checkHealth(): Promise<HealthStatus> {
    const checks = {
      database: await this.checkDatabase(),
      api: await this.checkAPI(),
      memory: await this.checkMemory(),
      disk: await this.checkDisk()
    };

    const allHealthy = Object.values(checks).every(check => check === true);

    let status: 'healthy' | 'degraded' | 'unhealthy';
    if (allHealthy) {
      status = 'healthy';
    } else {
      status = 'unhealthy';
    }

    const healthStatus: HealthStatus = {
      status,
      timestamp: new Date(),
      checks,
      details: {
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
        nodeVersion: process.version
      }
    };

    this.lastCheck = healthStatus;
    return healthStatus;
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      // This would typically check database connectivity
      // For now, we'll simulate a successful check
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  private async checkAPI(): Promise<boolean> {
    try {
      // This would typically check API endpoints
      // For now, we'll simulate a successful check
      return true;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }

  private async checkMemory(): Promise<boolean> {
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
    
    // Consider memory usage > 90% as unhealthy
    return memoryUsagePercent < 90;
  }

  private async checkDisk(): Promise<boolean> {
    // This would typically check disk space
    // For now, we'll simulate a successful check
    return true;
  }

  getLastHealthCheck(): HealthStatus | null {
    return this.lastCheck;
  }
}

// Memory monitoring
class MemoryMonitor {
  private memorySnapshots: Array<{
    timestamp: Date;
    usage: NodeJS.MemoryUsage;
  }> = [];

  takeSnapshot(): void {
    this.memorySnapshots.push({
      timestamp: new Date(),
      usage: process.memoryUsage()
    });

    // Keep only last 100 snapshots
    if (this.memorySnapshots.length > 100) {
      this.memorySnapshots = this.memorySnapshots.slice(-100);
    }
  }

  getMemoryUsage(): NodeJS.MemoryUsage {
    return process.memoryUsage();
  }

  getMemoryTrend(): {
    heapUsed: number[];
    heapTotal: number[];
    external: number[];
    rss: number[];
  } {
    return {
      heapUsed: this.memorySnapshots.map(s => s.usage.heapUsed),
      heapTotal: this.memorySnapshots.map(s => s.usage.heapTotal),
      external: this.memorySnapshots.map(s => s.usage.external),
      rss: this.memorySnapshots.map(s => s.usage.rss)
    };
  }

  clearSnapshots(): void {
    this.memorySnapshots = [];
  }
}

// Rate limiting
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  public config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    const userRequests = this.requests.get(identifier) || [];
    const recentRequests = userRequests.filter(time => time > windowStart);
    
    if (recentRequests.length >= this.config.maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    const userRequests = this.requests.get(identifier) || [];
    const recentRequests = userRequests.filter(time => time > windowStart);
    
    return Math.max(0, this.config.maxRequests - recentRequests.length);
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }

  clear(): void {
    this.requests.clear();
  }
}

// Middleware for monitoring
export function withMonitoring(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const monitor = new PerformanceMonitor();
    const errorTracker = new ErrorTracker();
    
    monitor.startTimer();
    monitor.recordRequest();

    try {
      const response = await handler(req);
      monitor.endTimer();
      
      return response;
    } catch (error) {
      monitor.recordError();
      errorTracker.logError(error as Error, {
        url: req.url,
        method: req.method,
        headers: Object.fromEntries(req.headers.entries())
      });
      
      throw error;
    }
  };
}

// Export monitoring instances
export const performanceMonitor = new PerformanceMonitor();
export const errorTracker = new ErrorTracker();
export const databaseMonitor = new DatabaseMonitor();
export const healthMonitor = new HealthMonitor();
export const memoryMonitor = new MemoryMonitor();

// Rate limiters for different endpoints
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'Too many requests from this IP'
});

export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  message: 'Too many authentication attempts'
});

// Utility functions
export function getSystemMetrics() {
  return {
    performance: performanceMonitor.getMetrics(),
    memory: memoryMonitor.getMemoryUsage(),
    errors: errorTracker.getErrors().length,
    queries: databaseMonitor.getQueries().length,
    averageQueryTime: databaseMonitor.getAverageQueryTime()
  };
}

export function logDatabaseQuery(query: string, duration: number, success: boolean, error?: string) {
  databaseMonitor.logQuery(query, duration, success, error);
}

export function logError(error: Error, context: Record<string, any> = {}, userId?: string, requestId?: string) {
  errorTracker.logError(error, context, userId, requestId);
}

export function takeMemorySnapshot() {
  memoryMonitor.takeSnapshot();
}

export async function getHealthStatus(): Promise<HealthStatus> {
  return await healthMonitor.checkHealth();
}

// Middleware for rate limiting
export function withRateLimit(rateLimiter: RateLimiter, identifierExtractor: (req: NextRequest) => string) {
  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest): Promise<NextResponse> => {
      const identifier = identifierExtractor(req);
      
      if (!rateLimiter.isAllowed(identifier)) {
        return new NextResponse(
          JSON.stringify({
            error: 'Rate limit exceeded',
            message: rateLimiter.config.message || 'Too many requests'
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Remaining': rateLimiter.getRemainingRequests(identifier).toString()
            }
          }
        );
      }
      
      return handler(req);
    };
  };
}

// Default rate limit extractors
export function extractIPAddress(req: NextRequest): string {
  return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
}

export function extractUserAgent(req: NextRequest): string {
  return req.headers.get('user-agent') || 'unknown';
} 