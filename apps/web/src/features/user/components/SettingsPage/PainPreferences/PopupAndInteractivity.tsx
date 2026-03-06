'use client';

import { Checkbox as FormCheckbox } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { usePainPreferencesStore } from '@/stores';
import { SettingsField } from '../SettingsField';

export function PopupAndInteractivity() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations('user');

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('optionalPainPoints.categories.interactivity')}
      </h3>
      <SettingsField
        label={t('optionalPainPoints.newsletterModal')}
        info={t('optionalPainPointsHints.newsletterModal')}
      >
        <FormCheckbox
          name="newsletter"
          checked={painPreferences.flags.newsletterModal}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('newsletterModal', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('optionalPainPoints.mockChat')}
        info={t('optionalPainPointsHints.mockChat')}
      >
        <FormCheckbox
          name="mock_chat"
          checked={painPreferences.flags.mockChat}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('mockChat', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('optionalPainPoints.wheelOfFortune')}
        info={t('optionalPainPointsHints.wheelOfFortune')}
      >
        <FormCheckbox
          name="wheel_of_fortune"
          checked={painPreferences.flags.wheelOfFortune}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('wheelOfFortune', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('optionalPainPoints.notifications')}
        info={t('optionalPainPointsHints.notifications')}
      >
        <FormCheckbox
          name="notifications"
          checked={painPreferences.flags.notifications}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('notifications', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('optionalPainPoints.exitPrompt')}
        info={t('optionalPainPointsHints.exitPrompt')}
      >
        <FormCheckbox
          name="exit_prompt"
          checked={painPreferences.flags.exitPrompt}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('exitPrompt', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('optionalPainPoints.clipboardMarker')}
        info={t('optionalPainPointsHints.clipboardMarker')}
      >
        <FormCheckbox
          name="clipboard_marker"
          checked={painPreferences.flags.clipboardMarker}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('clipboardMarker', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('optionalPainPoints.achievementNotifications')}
        info={t('optionalPainPointsHints.achievementNotifications')}
      >
        <FormCheckbox
          name="achievementNotifications"
          checked={painPreferences.flags.achievementNotifications}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate(
              'achievementNotifications',
              value,
            )
          }
        />
      </SettingsField>
    </section>
  );
}
