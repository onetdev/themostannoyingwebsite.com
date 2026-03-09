import { z} from 'zod';
import { ArticleQuerySchema } from './article-query-schema';

export const ArticleSearchQeurySchema = z.union([
  ArticleQuerySchema,
  z.object({
    query: z.string(),
  })
]);

export type ArticleSearchQuery = z.infer<typeof ArticleSearchQeurySchema>;
