import { z } from 'zod';

export const ArticleSharedSchema = z
  .object({
    id: z.coerce.string(),
    publishedAt: z.iso
      .datetime({ offset: true })
      .describe('Must be in ISO 8601 format'),
    updatedAt: z.iso
      .datetime({ offset: true })
      .optional()
      .describe('Must be in ISO 8601 format'),
    coverImage: z
      .string()
      .optional()
      .describe(
        'The default name of the cover image file in the assets directory.',
      ),
  })
  .strict();

export const ArticleLanguageSchema = z
  .object({
    title: z
      .string()
      .describe(
        "It's recommended to keep the title below 80 characters or less.",
      ),
    slug: z.string().describe('URL-friendly version of the title.'),
    intro: z
      .string()
      .describe(
        "It's recommended to keep the intro below 160 characters or less.",
      )
      .optional(),
    content: z.string(),
    contentFormat: z
      .enum(['markdown', 'html'])
      .describe(
        'Processing for indexing will be decided based on this value, both html and markdown are supported.\n\nDefaults to markdown.',
      )
      .default('markdown'),
    coverImage: z
      .string()
      .optional()
      .describe(
        'Optional override for the cover image file in the assets directory.',
      ),
  })
  .strict();

export type ArticleShared = z.infer<typeof ArticleSharedSchema>;
export type ArticleLanguage = z.infer<typeof ArticleLanguageSchema>;
