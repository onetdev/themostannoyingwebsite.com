'use client';

import { useEventBridgeListener } from '@/contexts/EventBridgeContext';
import { useAchievementsStore } from '@/stores/achievements';
import { getAchievementById } from './data/registry';

export const AchievementManager = () => {
  const {
    setAchievementProgress,
    incrementAchievementProgress,
    completeAchievement,
  } = useAchievementsStore();

  // This is where we will listen to events and update achievements
  // For now, we'll just have a placeholder for how it will look in phase 2

  // Example listener for a generic event
  useEventBridgeListener('ACHIEVEMENT_TRIGGERED', (event) => {
    const { achievementId, progress, increment } = event.payload || {};
    if (!achievementId) return;

    const definition = getAchievementById(achievementId);
    if (!definition) return;

    if (definition.type === 'progression') {
      const target = definition.targetProgress || 1;
      if (typeof increment === 'number') {
        incrementAchievementProgress(achievementId, increment, target);
      } else if (typeof progress === 'number') {
        setAchievementProgress(achievementId, progress, target);
      }
    } else {
      completeAchievement(achievementId);
    }
  });

  return null;
};
