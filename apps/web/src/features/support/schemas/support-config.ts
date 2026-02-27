import { z } from 'zod';

export const SupportConfigSchema = z.object({
  assets: z.object({
    newMessageSfx: z.string(),
  }),
});

export type SupportConfig = z.infer<typeof SupportConfigSchema>;
