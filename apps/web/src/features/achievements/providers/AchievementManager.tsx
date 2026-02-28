'use client';

import { useCallback } from 'react';
import { useEventBus, useEventBusListener } from '@/contexts/EventBusContext';

import type { ContentEvent } from '@/features/content/types';
import type { InterferrerEvent } from '@/features/interferrer/types';
import type { ObstructorEvent } from '@/features/obstructor/types';
import type { PromotionEvent } from '@/features/promotion/types';
import type { SubscriptionEvent } from '@/features/subscription/types';
import type { UserEvent } from '@/features/user/types';
import type { AppEvent, PickEventPayload } from '@/types';
import { AchievementToastManager } from '../components/AchievementToastManager';
import { useAchievementBankService } from '../hooks';
import { useAchievementsStore } from '../stores';

export const AchievementManager = () => {
  const { incrementAchievementProgress, completeAchievement } =
    useAchievementsStore();
  const { dispatch } = useEventBus();
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
        dispatch('ACHIEVEMENT_UNLOCKED', { achievementId });
      } else {
        dispatch('ACHIEVEMENT_PROGRESS_UPDATED', {
          achievementId,
          progress: result.progress,
          lastNotifiedAt: result.lastNotifiedAt,
        });
      }
    },
    [dispatch, incrementAchievementProgress, achievementBank],
  );

  const handleSingleUnlock = useCallback(
    (achievementId: string) => {
      const newlyAchieved = completeAchievement(achievementId);
      if (!newlyAchieved) {
        return;
      }

      dispatch('ACHIEVEMENT_UNLOCKED', { achievementId });
    },
    [completeAchievement, dispatch],
  );

  useEventBusListener<PickEventPayload<ObstructorEvent, 'MAZE_STEP'>>(
    'MAZE_STEP',
    (event) => {
      handleProgression('maze-explorer');

      if (event.payload?.passedSpecialCell) {
        handleSingleUnlock('maze-special-cell');
      }
    },
  );

  useEventBusListener<PickEventPayload<ObstructorEvent, 'BOUNCY_LOGO_BOUNCE'>>(
    'BOUNCY_LOGO_BOUNCE',
    (event) => {
      handleProgression('bouncing-logo-fanatic');

      if (event.payload?.isPerfectCorner) {
        handleSingleUnlock('bouncing-logo-corner-hit');
      }
    },
  );

  useEventBusListener<
    PickEventPayload<SubscriptionEvent, 'SUBSCRIPTION_PACKAGE_SELECTED'>
  >('SUBSCRIPTION_PACKAGE_SELECTED', () =>
    handleSingleUnlock('first-package-selection'),
  );

  useEventBusListener<PickEventPayload<ContentEvent, 'SEARCH'>>('SEARCH', () =>
    handleSingleUnlock('first-search'),
  );

  useEventBusListener<
    PickEventPayload<InterferrerEvent, 'CONTEXT_MENU_ATTEMPT'>
  >('CONTEXT_MENU_ATTEMPT', () => {
    handleProgression('right-click-rebel');
  });

  useEventBusListener<PickEventPayload<AppEvent, 'TEXT_COPIED'>>(
    'TEXT_COPIED',
    () => {
      handleProgression('copy-paste-criminal');
    },
  );

  useEventBusListener<PickEventPayload<AppEvent, 'EXIT_PROMPT_TRIGGERED'>>(
    'EXIT_PROMPT_TRIGGERED',
    () => handleSingleUnlock('escape-artist'),
  );

  useEventBusListener<
    PickEventPayload<ObstructorEvent, 'DEAD_PIXEL_CLICK_ATTEMPT'>
  >('DEAD_PIXEL_CLICK_ATTEMPT', () => handleSingleUnlock('dead-pixel-hunter'));

  useEventBusListener<PickEventPayload<AppEvent, 'NAVIGATION'>>(
    'NAVIGATION',
    () => handleSingleUnlock('first-visit'),
  );

  useEventBusListener<
    PickEventPayload<PromotionEvent, 'WHEEL_OF_FORTUNE_SPIN_COMPLETE'>
  >('WHEEL_OF_FORTUNE_SPIN_COMPLETE', () =>
    handleSingleUnlock('wheel-of-fortune-spin'),
  );

  useEventBusListener<PickEventPayload<UserEvent, 'ADMIN_LOGIN_SUCCESS'>>(
    'ADMIN_LOGIN_SUCCESS',
    () => handleSingleUnlock('admin-login'),
  );

  return <AchievementToastManager />;
};
