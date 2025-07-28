import { PrismaClient } from '@prisma/client';

// Export Prisma client
export { PrismaClient } from '@prisma/client';

// Create and export prisma instance
declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Simplified logging for development
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Export utility functions
export * from './utils';

// Export specific types that don't conflict with Prisma
export type { 
  ContentFilter, 
  AffiliateLinkFilter, 
  AnalyticsPeriod, 
  ClickAnalytics, 
  Pagination, 
  ApiResponse 
} from './types';

// Export site configuration
export * from './site-config';

// Add connection cleanup function
export async function cleanupPrisma() {
  if (prisma) {
    await prisma.$disconnect();
  }
}

// Handle process termination
process.on('beforeExit', async () => {
  await cleanupPrisma();
});