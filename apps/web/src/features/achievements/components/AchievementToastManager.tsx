'use client';

import { toast } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import config from '@/config';
import { useEventBusListener } from '@/contexts/EventBusContext';
import { useAudio } from '@/hooks';
import { useAchievementsStore, usePainPreferencesStore } from '@/stores';
import { getAchievementMetaById } from '../providers/data/registry';

export const AchievementToastManager = () => {
  const t = useTranslations();
  const { notifyAchievementProgress } = useAchievementsStore();
  const { play, audio } = useAudio(
    config.achievements.assets.achievementUnlockedSfx,
  );
  const notificationsEnabled = usePainPreferencesStore(
    (state) => state.flags.achievementNotifications,
  );

  useEventBusListener('ACHIEVEMENT_UNLOCKED', (event) => {
    const { achievementId } = event.payload || {};
    if (!achievementId || !notificationsEnabled) return;

    const definition = getAchievementMetaById(achievementId);
    if (!definition) return;

    play();

    toast.info(
      t('achievements.unlocked', {
        name: t(definition.nameKey),
      }),
      {
        icon: '🏆',
        position: 'top-center',
      },
    );
  });

  useEventBusListener('ACHIEVEMENT_PROGRESS_UPDATED', (event) => {
    const { achievementId, progress, lastNotifiedAt } = event.payload || {};
    if (!achievementId || !notificationsEnabled) return;

    const now = Date.now();
    const lastNotified = lastNotifiedAt || 0;
    const shouldShowToast =
      now - lastNotified >
      config.achievements.progressiveAchievementToastThrottlingSeconds * 1000;

    if (!shouldShowToast) return;

    const definition = getAchievementMetaById(achievementId);
    if (!definition) return;

    notifyAchievementProgress(achievementId);

    toast.info(
      t('achievements.progress', {
        name: t(definition.nameKey),
        progress,
        target: definition.targetProgress ?? 0,
      }),
      {
        icon: '📈',
        position: 'top-center',
      },
    );
  });

  return audio;
};
