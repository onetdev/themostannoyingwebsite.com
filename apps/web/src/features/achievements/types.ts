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

declare global {
  interface AppEvents {
    'achievement:unlocked': {
      achievementId: string;
    };
    'achievement:progress-updated': {
      achievementId: string;
      progress: number;
      lastNotifiedAt?: number;
    };
  }
}
