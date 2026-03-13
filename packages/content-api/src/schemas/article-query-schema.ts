import * as z from 'zod';
import { ArticleLookupQuerySchema } from './article-lookup-query-schema';
import { ArticleSortSchema } from './article-sort-schema';

export const ArticleQuerySchema = z.object({
  params: ArticleLookupQuerySchema,
  sort: ArticleSortSchema.optional(),
  paginate: z
    .object({
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .optional(),
});

export type ArticleQuery = z.infer<typeof ArticleQuerySchema>;
