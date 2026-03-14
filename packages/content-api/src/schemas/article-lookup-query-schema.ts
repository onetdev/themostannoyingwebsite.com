import * as z from 'zod';

export const ArticleLookupQuerySchema = z.object({
  id: z.string().optional(),
  isOnCover: z.boolean().optional(),
  locale: z.string().optional(),
  slug: z.string().optional(),
  includeFuture: z.boolean().optional(),
});

export type ArticleLookupQuery = z.infer<typeof ArticleLookupQuerySchema>;
