'use client';

import { Checkbox as FormCheckbox } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { usePainPreferencesStore } from '@/stores';
import { SettingsField } from '../SettingsField';

export function PopupAndInteractivity() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations();

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('settings.optionalPainPoints.categories.interactivity')}
      </h3>
      <SettingsField
        label={t('settings.optionalPainPoints.newsletterModal')}
        info={t('settings.optionalPainPointsHints.newsletterModal')}
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
        label={t('settings.optionalPainPoints.mockChat')}
        info={t('settings.optionalPainPointsHints.mockChat')}
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
        label={t('settings.optionalPainPoints.wheelOfFortune')}
        info={t('settings.optionalPainPointsHints.wheelOfFortune')}
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
        label={t('settings.optionalPainPoints.notifications')}
        info={t('settings.optionalPainPointsHints.notifications')}
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
        label={t('settings.optionalPainPoints.exitPrompt')}
        info={t('settings.optionalPainPointsHints.exitPrompt')}
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
        label={t('settings.optionalPainPoints.clipboardMarker')}
        info={t('settings.optionalPainPointsHints.clipboardMarker')}
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
        label={t('settings.optionalPainPoints.achievementNotifications')}
        info={t('settings.optionalPainPointsHints.achievementNotifications')}
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
