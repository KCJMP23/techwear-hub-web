import { z } from 'zod';
export declare const ContentFilterSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    contentType: z.ZodOptional<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodDate>;
    dateTo: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    status?: string | undefined;
    contentType?: number | undefined;
    search?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
}, {
    status?: string | undefined;
    contentType?: number | undefined;
    search?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
}>;
export type ContentFilter = z.infer<typeof ContentFilterSchema>;
export declare const AffiliateLinkFilterSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    merchant: z.ZodOptional<z.ZodString>;
    product: z.ZodOptional<z.ZodString>;
    site: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodDate>;
    dateTo: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    status?: string | undefined;
    search?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
    merchant?: string | undefined;
    product?: string | undefined;
    site?: string | undefined;
}, {
    status?: string | undefined;
    search?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
    merchant?: string | undefined;
    product?: string | undefined;
    site?: string | undefined;
}>;
export type AffiliateLinkFilter = z.infer<typeof AffiliateLinkFilterSchema>;
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodNumber;
    limit: z.ZodNumber;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}, {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}>;
export type Pagination = z.infer<typeof PaginationSchema>;
export declare const ApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodString>;
    pagination: z.ZodOptional<z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data?: any;
    error?: string | undefined;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    } | undefined;
}, {
    success: boolean;
    data?: any;
    error?: string | undefined;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    } | undefined;
}>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export declare const AnalyticsPeriodSchema: z.ZodObject<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    startDate: Date;
    endDate: Date;
}, {
    startDate: Date;
    endDate: Date;
}>;
export type AnalyticsPeriod = z.infer<typeof AnalyticsPeriodSchema>;
export declare const ClickAnalyticsSchema: z.ZodObject<{
    totalClicks: z.ZodNumber;
    uniqueClicks: z.ZodNumber;
    conversionRate: z.ZodNumber;
    revenue: z.ZodNumber;
    topProducts: z.ZodArray<z.ZodAny, "many">;
    dailyStats: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    totalClicks: number;
    uniqueClicks: number;
    conversionRate: number;
    revenue: number;
    topProducts: any[];
    dailyStats: any[];
}, {
    totalClicks: number;
    uniqueClicks: number;
    conversionRate: number;
    revenue: number;
    topProducts: any[];
    dailyStats: any[];
}>;
export type ClickAnalytics = z.infer<typeof ClickAnalyticsSchema>;
//# sourceMappingURL=types.d.ts.map