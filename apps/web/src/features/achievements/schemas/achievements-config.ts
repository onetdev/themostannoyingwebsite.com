import { z } from 'zod';

export const AchievementsConfigSchema = z.object({
  assets: z.object({
    achievementUnlockedSfx: z.string(),
  }),
});

export type AchievementsConfig = z.infer<typeof AchievementsConfigSchema>;
