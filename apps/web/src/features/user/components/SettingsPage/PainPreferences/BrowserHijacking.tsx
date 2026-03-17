'use client';

import { Checkbox as FormCheckbox } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { usePainPreferencesStore } from '@/stores';
import { SettingsField } from '../SettingsField';

export function BrowserHijacking() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations('user.optionalPainPoints');

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('categories.browserHijacking')}
      </h3>
      <SettingsField
        label={t('pageTitleInactiveArrayPaged.label')}
        info={t('pageTitleInactiveArrayPaged.hint')}
      >
        <FormCheckbox
          name="page_title_inactive_array_paged"
          checked={painPreferences.flags['pageTitle.inactiveArrayPaged']}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate(
              'pageTitle.inactiveArrayPaged',
              value,
            )
          }
        />
      </SettingsField>
      <SettingsField
        label={t('notifications.label')}
        info={t('notifications.hint')}
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
        label={t('achievementNotifications.label')}
        info={t('achievementNotifications.hint')}
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
