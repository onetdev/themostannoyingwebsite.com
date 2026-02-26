import type { AchievementDefinition } from '../../types';

export const ACHIEVEMENT_REGISTRY: AchievementDefinition[] = [
  {
    id: 'first-visit',
    nameKey: 'achievements.registry.firstVisit.name',
    descriptionKey: 'achievements.registry.firstVisit.description',
    type: 'boolean',
  },
  {
    id: 'click-annoying-button',
    nameKey: 'achievements.registry.clickAnnoyingButton.name',
    descriptionKey: 'achievements.registry.clickAnnoyingButton.description',
    type: 'progression',
    targetProgress: 10,
  },
];

export const getAchievementById = (id: string) =>
  ACHIEVEMENT_REGISTRY.find((a) => a.id === id);
