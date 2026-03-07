import { z } from 'zod';
import { LocaleResourceSchema } from '@/schemas';

export const ContentConfigSchema = z.object({
  assets: z.object({
    articleCoverPlaceholder: z.string(),
    hotThings: z.object({
      placeholder: z.string(),
      vtt: z.union([z.string(), LocaleResourceSchema]),
    }),
  }),
});

export type ContentConfig = z.infer<typeof ContentConfigSchema>;
