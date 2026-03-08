import { z } from 'zod/v3';

export const ArticleSimplifiedSchema = z
  .object({
    content: z.string(),
    intro: z
      .string()
      .describe(
        "It's recommended to keep the intro below 160 characters or less.",
      )
      .optional(),
    publishedAt: z
      .string()
      .datetime({ offset: true })
      .describe('Must be in ISO 8601 format'),
    updatedAt: z
      .string()
      .datetime({ offset: true })
      .optional()
      .describe('Must be in ISO 8601 format'),
    title: z
      .string()
      .describe(
        "It's recommended to keep the title below 80 characters or less.",
      ),
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
        'The name of the cover image file in the assets directory (e.g. "gary.webp").',
      ),
  })
  .strict();

export type ArticleSimplified = z.infer<typeof ArticleSimplifiedSchema>;
