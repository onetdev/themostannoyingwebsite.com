import { z } from 'zod';

const schema = z
  .object({
    'on-cover': z
      .array(z.string())
      .describe('Folder names (IDs) that will appear on the cover'),
  })
  .strict();

export type ArticleLocaleMetaSchema = z.infer<typeof schema>;
export default schema;
