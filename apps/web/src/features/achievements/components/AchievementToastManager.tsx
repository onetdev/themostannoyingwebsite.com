'use client';

import { toast } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import config from '@/config';
import { useAudio, useEvent } from '@/hooks';
import { usePainPreferencesStore } from '@/stores';
import { useAchievementBankService } from '../hooks';
import { useAchievementsStore } from '../stores';
import { AchievementToast } from './AchievementToast';

export const AchievementToastManager = () => {
  const t = useTranslations();
  const achievementBank = useAchievementBankService();
  const { notifyAchievementProgress } = useAchievementsStore();
  const { play, audio } = useAudio(
    config.achievements.assets.achievementUnlockedSfx,
  );
  const notificationsEnabled = usePainPreferencesStore(
    (state) => state.flags.achievementNotifications,
  );

  useEvent('achievement:unlocked', (payload) => {
    const { achievementId } = payload || {};
    if (!achievementId || !notificationsEnabled) return;

    const definition = achievementBank.getAchievementById(achievementId);
    if (!definition) return;

    play();

    toast.custom(
      () => <AchievementToast name={t(definition.nameKey)} type="unlocked" />,
      {
        position: 'top-center',
      },
    );
  });

  useEvent('achievement:progress-updated', (payload) => {
    const { achievementId, progress, lastNotifiedAt } = payload || {};
    if (!achievementId || !notificationsEnabled) return;

    const now = Date.now();
    const lastNotified = lastNotifiedAt || 0;
    const shouldShowToast =
      now - lastNotified >
      config.achievements.progressiveAchievementToastThrottlingSeconds * 1000;

    if (!shouldShowToast) return;

    const definition = achievementBank.getAchievementById(achievementId);
    if (!definition) return;

    notifyAchievementProgress(achievementId);

    toast.custom(
      () => (
        <AchievementToast
          name={t(definition.nameKey)}
          type="progress"
          progress={progress}
          target={definition.targetProgress}
        />
      ),
      {
        position: 'top-center',
      },
    );
  });

  return audio;
};
