export type AchievementType = 'boolean' | 'progression';

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  type: AchievementType;
  targetProgress?: number;
}
