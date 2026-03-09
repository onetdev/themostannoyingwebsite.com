import { z } from 'zod';
import { ArticleLookupQuerySchema } from './article-lookup-query-schema';
import { ArticleQuerySchema } from './article-query-schema';

export const ArticleSearchQeurySchema = z.object({
  ...ArticleQuerySchema.shape,
  params: z.object({
    ...ArticleLookupQuerySchema.shape,
    query: z.string().min(2),
  }),
});

export type ArticleSearchQuery = z.infer<typeof ArticleSearchQeurySchema>;
