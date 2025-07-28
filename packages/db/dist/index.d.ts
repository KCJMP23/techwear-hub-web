import { PrismaClient } from '@prisma/client';
export { PrismaClient } from '@prisma/client';
declare global {
    var __prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export * from './utils';
export type { ContentFilter, AffiliateLinkFilter, AnalyticsPeriod, ClickAnalytics, Pagination, ApiResponse } from './types';
export * from './site-config';
export declare function cleanupPrisma(): Promise<void>;
//# sourceMappingURL=index.d.ts.map