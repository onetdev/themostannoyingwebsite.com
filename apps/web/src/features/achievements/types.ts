export type AchievementType = 'boolean' | 'progression';

export interface AchievementDefinition {
  id: string;
  nameKey: string;
  descriptionKey: string;
  type: AchievementType;
  targetProgress?: number;
  secret?: boolean;
}

export type AchievementsEvent =
  | {
      type: 'ACHIEVEMENT_UNLOCKED';
      payload: {
        achievementId: string;
      };
    }
  | {
      type: 'ACHIEVEMENT_PROGRESS_UPDATED';
      payload: {
        achievementId: string;
        progress: number;
        lastNotifiedAt?: number;
      };
    };
