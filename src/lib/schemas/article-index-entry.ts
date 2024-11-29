import { z } from 'zod';

const schema = z
  .object({
    content: z.string(),
    directory: z.string(),
    hasCoverImage: z.boolean(),
    intro: z
      .string()
      .describe(
        "It's recommended to keep the intro below 160 characters or less.",
      )
      .optional(),
    isHighlighted: z.boolean(),
    isOnCover: z.boolean(),
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

export type ArticleIndexEntrySchema = z.infer<typeof schema>;
export default schema;
