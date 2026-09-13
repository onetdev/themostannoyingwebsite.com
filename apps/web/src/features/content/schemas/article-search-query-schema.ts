import * as z from 'zod';

export const ArticleLookupQuerySchema = z.object({
  id: z.string().optional(),
  includeFuture: z.boolean().optional(),
  isOnCover: z.boolean().optional(),
  locale: z.string().optional(),
  slug: z.string().optional(),
});

export const ArticleQuerySchema = z.object({
  params: ArticleLookupQuerySchema.optional(),
  paginate: z
    .object({
      take: z.coerce.number().optional(),
      skip: z.coerce.number().optional(),
    })
    .optional(),
});

export const ArticleSearchQuerySchema = z.object({
  params: z.object({
    id: z.string().optional(),
    isOnCover: z.boolean().optional(),
    locale: z.string().optional(),
    slug: z.string().optional(),
    query: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .transform((q) => q.normalize('NFKC'))
      .transform((q) => q.replace(/\s+/g, ' ')),
  }),
  paginate: z
    .object({
      take: z.coerce.number().optional(),
      skip: z.coerce.number().optional(),
    })
    .optional(),
});

export type ArticleSearchQuery = z.infer<typeof ArticleSearchQuerySchema>;
