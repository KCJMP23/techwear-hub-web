import { z } from 'zod';
// Filter and pagination types
export const ContentFilterSchema = z.object({
    status: z.string().optional(),
    contentType: z.number().optional(),
    search: z.string().optional(),
    dateFrom: z.date().optional(),
    dateTo: z.date().optional(),
});
export const AffiliateLinkFilterSchema = z.object({
    status: z.string().optional(),
    merchant: z.string().optional(),
    product: z.string().optional(),
    site: z.string().optional(),
    search: z.string().optional(),
    dateFrom: z.date().optional(),
    dateTo: z.date().optional(),
});
export const PaginationSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
});
export const ApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.any().optional(),
    error: z.string().optional(),
    pagination: PaginationSchema.optional(),
});
// Analytics types
export const AnalyticsPeriodSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
});
export const ClickAnalyticsSchema = z.object({
    totalClicks: z.number(),
    uniqueClicks: z.number(),
    conversionRate: z.number(),
    revenue: z.number(),
    topProducts: z.array(z.any()),
    dailyStats: z.array(z.any()),
});
