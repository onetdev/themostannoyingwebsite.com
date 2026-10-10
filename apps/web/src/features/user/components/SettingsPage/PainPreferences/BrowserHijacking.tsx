'use client';

import {
  FieldGroup,
  FieldLegend,
  FieldSet,
  Switch as FormSwitch,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { usePainPreferencesStore } from '@/stores';
import { SettingsField } from '../SettingsField';

export function BrowserHijacking() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations('user.optionalPainPoints');

  return (
    <FieldSet className="gap-3">
      <FieldLegend
        variant="label"
        className="mb-0 text-muted-foreground text-xs font-bold tracking-wider uppercase"
      >
        {t('categories.browserHijacking')}
      </FieldLegend>
      <FieldGroup className="gap-3">
        <SettingsField
          label={t('pageTitleInactiveArrayPaged.label')}
          info={t('pageTitleInactiveArrayPaged.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="page_title_inactive_array_paged"
              checked={painPreferences.flags['pageTitle.inactiveArrayPaged']}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate(
                  'pageTitle.inactiveArrayPaged',
                  value,
                )
              }
            />
          )}
        </SettingsField>
        <SettingsField
          label={t('notifications.label')}
          info={t('notifications.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="notifications"
              checked={painPreferences.flags.notifications}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate('notifications', value)
              }
            />
          )}
        </SettingsField>
        <SettingsField
          label={t('achievementNotifications.label')}
          info={t('achievementNotifications.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="achievementNotifications"
              checked={painPreferences.flags.achievementNotifications}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate(
                  'achievementNotifications',
                  value,
                )
              }
            />
          )}
        </SettingsField>
      </FieldGroup>
    </FieldSet>
  );
}
