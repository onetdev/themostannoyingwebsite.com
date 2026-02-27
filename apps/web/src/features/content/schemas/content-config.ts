import { z } from 'zod';

export const ContentConfigSchema = z.object({
  assets: z.object({
    lavaImage: z.string(),
    coverPlaceholder: z.string(),
    hotThingsVtt: z.record(z.string(), z.string()),
  }),
});

export type ContentConfig = z.infer<typeof ContentConfigSchema>;
