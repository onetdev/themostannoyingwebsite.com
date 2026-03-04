import { z } from 'zod';

export const SpriteConfigSchema = z.object({
  width: z.number(),
  height: z.number(),
  rows: z.number(),
  columns: z.number(),
  uri: z.string(),
});

export type SpriteConfig = z.infer<typeof SpriteConfigSchema>;
