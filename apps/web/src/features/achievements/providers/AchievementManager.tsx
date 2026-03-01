'use client';

import { useCallback } from 'react';
import { emit } from '@/event-bus';
import { useEvent } from '@/hooks';
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
        emit('achievement:unlocked', { achievementId });
      } else {
        emit('achievement:progress-updated', {
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

      emit('achievement:unlocked', { achievementId });
    },
    [completeAchievement],
  );

  useEvent('screensaver:maze:stepped', (event) => {
    handleProgression('maze-explorer');

    if (event.passedSpecialCell) {
      handleSingleUnlock('maze-special-cell');
    }
  });

  useEvent('screensaver:bouncy-logo:bounced', (event) => {
    handleProgression('bouncing-logo-fanatic');

    if (event.isPerfectCorner) {
      handleSingleUnlock('bouncing-logo-corner-hit');
    }
  });

  useEvent('subscription:package-selected', () =>
    handleSingleUnlock('first-package-selection'),
  );

  useEvent('global-search:query', () => handleSingleUnlock('first-search'));

  useEvent('context-menu:triggered', () => {
    handleProgression('right-click-rebel');
  });

  useEvent('global-text:copied', () => {
    handleProgression('copy-paste-criminal');
  });

  useEvent('exit-prompt:shown', () => handleSingleUnlock('escape-artist'));

  useEvent('dead-pixel:clicked', () => handleSingleUnlock('dead-pixel-hunter'));

  useEvent('navigation:changed', () => handleSingleUnlock('first-visit'));

  useEvent('wof:spin-completed', () =>
    handleSingleUnlock('wheel-of-fortune-spin'),
  );

  useEvent('admin-auth:login', () => handleSingleUnlock('admin-login'));

  return <AchievementToastManager />;
};
