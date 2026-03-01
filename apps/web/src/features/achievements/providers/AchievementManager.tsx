'use client';

import { useCallback } from 'react';
import { emit } from '@/eventBus';
import { useEvent } from '@/hooks/useEvent';
import { AchievementToastManager } from '../components/AchievementToastManager';
import { useAchievementBankService } from '../hooks';
import { useAchievementsStore } from '../stores';

export const AchievementManager = () => {
  const { incrementAchievementProgress, completeAchievement } =
    useAchievementsStore();
  const achievementBank = useAchievementBankService();

  const handleProgression = useCallback(
    (achievementId: string, amount = 1) => {
      const definition = achievementBank.getAchievementById(achievementId);
      if (!definition?.targetProgress) {
        return;
      }

      const result = incrementAchievementProgress(
        achievementId,
        amount,
        definition.targetProgress,
      );

      if (result.newlyAchieved) {
        emit('ACHIEVEMENT_UNLOCKED', { achievementId });
      } else {
        emit('ACHIEVEMENT_PROGRESS_UPDATED', {
          achievementId,
          progress: result.progress,
          lastNotifiedAt: result.lastNotifiedAt,
        });
      }
    },
    [incrementAchievementProgress, achievementBank],
  );

  const handleSingleUnlock = useCallback(
    (achievementId: string) => {
      const newlyAchieved = completeAchievement(achievementId);
      if (!newlyAchieved) {
        return;
      }

      emit('ACHIEVEMENT_UNLOCKED', { achievementId });
    },
    [completeAchievement],
  );

  useEvent('MAZE_STEP', (event) => {
    handleProgression('maze-explorer');

    if (event.passedSpecialCell) {
      handleSingleUnlock('maze-special-cell');
    }
  });

  useEvent('BOUNCY_LOGO_BOUNCE', (event) => {
    handleProgression('bouncing-logo-fanatic');

    if (event.isPerfectCorner) {
      handleSingleUnlock('bouncing-logo-corner-hit');
    }
  });

  useEvent('SUBSCRIPTION_PACKAGE_SELECTED', () =>
    handleSingleUnlock('first-package-selection'),
  );

  useEvent('SEARCH', () => handleSingleUnlock('first-search'));

  useEvent('CONTEXT_MENU_ATTEMPT', () => {
    handleProgression('right-click-rebel');
  });

  useEvent('TEXT_COPIED', () => {
    handleProgression('copy-paste-criminal');
  });

  useEvent('EXIT_PROMPT_TRIGGERED', () => handleSingleUnlock('escape-artist'));

  useEvent('DEAD_PIXEL_CLICK_ATTEMPT', () =>
    handleSingleUnlock('dead-pixel-hunter'),
  );

  useEvent('NAVIGATION', () => handleSingleUnlock('first-visit'));

  useEvent('WHEEL_OF_FORTUNE_SPIN_COMPLETE', () =>
    handleSingleUnlock('wheel-of-fortune-spin'),
  );

  useEvent('ADMIN_LOGIN_SUCCESS', () => handleSingleUnlock('admin-login'));

  return <AchievementToastManager />;
};
