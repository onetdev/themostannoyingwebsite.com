import type { AchievementDefinition } from '../../types';

export const ACHIEVEMENT_REGISTRY: AchievementDefinition[] = [
  {
    id: 'first-visit',
    name: 'Welcome to Hell',
    description: 'Visit the website for the first time.',
    type: 'boolean',
  },
  {
    id: 'click-annoying-button',
    name: 'Persistent Clicker',
    description: 'Click an annoying button 10 times.',
    type: 'progression',
    targetProgress: 10,
  },
];

export const getAchievementById = (id: string) =>
  ACHIEVEMENT_REGISTRY.find((a) => a.id === id);
