export type AchievementType = 'boolean' | 'progression';

export interface AchievementDefinition {
  id: string;
  nameKey: string;
  descriptionKey: string;
  type: AchievementType;
  targetProgress?: number;
  secret?: boolean;
}

export const DI = {
  AchievementBankService: Symbol.for('AchievementBankService'),
};

export interface AchievementBankService {
  getAchievements(): AchievementDefinition[];
  getAchievementById(id: string): AchievementDefinition | undefined;
}

export type AchievementsEvent = {
  ACHIEVEMENT_UNLOCKED: {
    achievementId: string;
  };
  ACHIEVEMENT_PROGRESS_UPDATED: {
    achievementId: string;
    progress: number;
    lastNotifiedAt?: number;
  };
};
