import { z } from 'zod';

// Filter and pagination types
export const ContentFilterSchema = z.object({
  status: z.string().optional(),
  contentType: z.number().optional(),
  search: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
});

export type ContentFilter = z.infer<typeof ContentFilterSchema>;

export const AffiliateLinkFilterSchema = z.object({
  status: z.string().optional(),
  merchant: z.string().optional(),
  product: z.string().optional(),
  site: z.string().optional(),
  search: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
});

export type AffiliateLinkFilter = z.infer<typeof AffiliateLinkFilterSchema>;

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  pagination: PaginationSchema.optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

// Analytics types
export const AnalyticsPeriodSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

export type AnalyticsPeriod = z.infer<typeof AnalyticsPeriodSchema>;

export const ClickAnalyticsSchema = z.object({
  totalClicks: z.number(),
  uniqueClicks: z.number(),
  conversionRate: z.number(),
  revenue: z.number(),
  topProducts: z.array(z.any()),
  dailyStats: z.array(z.any()),
});

export type ClickAnalytics = z.infer<typeof ClickAnalyticsSchema>;