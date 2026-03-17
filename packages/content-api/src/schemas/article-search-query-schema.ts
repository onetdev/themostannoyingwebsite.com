import * as z from 'zod';
import { ArticleLookupQuerySchema } from './article-lookup-query-schema';
import { ArticleQuerySchema } from './article-query-schema';

export const ArticleSearchQuerySchema = z.object({
  ...ArticleQuerySchema.shape,
  params: z.object({
    ...ArticleLookupQuerySchema.shape,
    query: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .transform((q) => q.normalize('NFKC'))
      .transform((q) => q.replace(/\s+/g, ' ')),
  }),
});

export type ArticleSearchQuery = z.infer<typeof ArticleSearchQuerySchema>;
