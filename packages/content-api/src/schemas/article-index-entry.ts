import { z } from 'zod/v3';

export const ArticleIndexEntrySchema = z
  .object({
    content: z.string(),
    directory: z.string(),
    coverImage: z.string().optional(),
    intro: z
      .string()
      .describe(
        "It's recommended to keep the intro below 160 characters or less.",
      )
      .optional(),
    isOnCover: z.boolean(),
    id: z.coerce.string(),
    locale: z.string(),
    publishedAt: z
      .string()
      .datetime({ offset: true })
      .describe('Must be in ISO 8601 format'),
    updatedAt: z
      .string()
      .datetime({ offset: true })
      .optional()
      .describe('Must be in ISO 8601 format'),
    slug: z.string(),
    title: z
      .string()
      .describe(
        "It's recommended to keep the title below 80 characters or less.",
      ),
  })
  .strict();

export type ArticleIndexEntry = z.infer<typeof ArticleIndexEntrySchema>;
