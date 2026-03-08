import { z } from 'zod/v3';

export const ArticleLocaleMetaSchema = z
  .object({
    'on-cover': z
      .array(z.string())
      .describe('Folder names (IDs) that will appear on the cover'),
  })
  .strict();

export type ArticleLocaleMeta = z.infer<typeof ArticleLocaleMetaSchema>;
