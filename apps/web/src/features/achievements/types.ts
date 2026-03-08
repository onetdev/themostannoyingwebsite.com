export type AchievementType = 'boolean' | 'progression';

import type achievementsEnLocale from './i18n/en';

export interface AchievementDefinition {
  id: string;
  nameKey: AppTranslationKey;
  descriptionKey: AppTranslationKey;
  type: AchievementType;
  targetProgress?: number;
  secret?: boolean;
}

export const DI = {
  AchievementBankService: Symbol.for('AchievementBankService'),
};

export type ArhievementsI18nShape = typeof achievementsEnLocale;

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
