import * as z from 'zod';
import { LocaleResourceSchema } from '@/schemas';

export const ContentConfigSchema = z.object({
  assets: z.object({
    articleCoverPlaceholder: z.string(),
    hotThings: z.object({
      placeholder: z.string(),
      vtt: z.union([z.string(), LocaleResourceSchema]),
    }),
  }),
  api: z.object({
    searchEndpoint: z.string(),
  }),
});

export type ContentConfig = z.infer<typeof ContentConfigSchema>;
