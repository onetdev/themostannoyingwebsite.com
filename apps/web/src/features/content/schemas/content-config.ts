import { z } from 'zod';

export const ContentConfigSchema = z.object({
  assets: z.object({
    articleCoverPlaceholder: z.string(),
    hotThings: z.object({
      placeholder: z.string(),
      vtt: z.record(z.string(), z.string()),
    }),
  }),
});

export type ContentConfig = z.infer<typeof ContentConfigSchema>;
