import { z } from 'zod';

export const ArticleSortSchema = z.object({
  date: z.enum(['asc', 'desc']).optional(),
  title: z.enum(['asc', 'desc']).optional(),
});

export type ArticleSort = z.infer<typeof ArticleSortSchema>;
