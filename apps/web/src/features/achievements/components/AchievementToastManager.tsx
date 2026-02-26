'use client';

import { toast } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import config from '@/config';
import { useEventBusListener } from '@/contexts/EventBusContext';
import { useAudio } from '@/hooks';
import { usePainPreferencesStore } from '@/stores';
import { getAchievementById } from '../providers/data/registry';

export const AchievementToastManager = () => {
  const t = useTranslations();
  const { play, audio } = useAudio(
    config.achievements.assets.achievementUnlockedSfx,
  );
  const notificationsEnabled = usePainPreferencesStore(
    (state) => state.flags.achievementNotifications,
  );

  useEventBusListener('ACHIEVEMENT_UNLOCKED', (event) => {
    const { achievementId } = event.payload || {};
    if (!achievementId || !notificationsEnabled) return;

    const definition = getAchievementById(achievementId);
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

  return audio;
};
