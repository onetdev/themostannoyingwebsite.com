import { z } from 'zod';

const schema = z
  .object({
    content: z.string(),
    intro: z
      .string()
      .describe(
        "It's recommended to keep the intro below 160 characters or less.",
      )
      .optional(),
    publishedAt: z.iso
      .datetime({ offset: true })
      .describe('Must be in ISO 8601 format'),
    updatedAt: z.iso
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
  })
  .strict();

export type ArticleSimplifiedSchema = z.infer<typeof schema>;
export default schema;
