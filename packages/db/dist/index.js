import { PrismaClient } from '@prisma/client';
// Export Prisma client
export { PrismaClient } from '@prisma/client';
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
