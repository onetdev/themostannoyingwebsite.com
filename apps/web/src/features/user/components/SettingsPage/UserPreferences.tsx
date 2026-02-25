'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { SettingsField } from './SettingsField';

import { useRuntimeStore, useUserPreferencesStore } from '@/stores';

export function UserPreferences() {
  const preference = useUserPreferencesStore();
  const runtime = useRuntimeStore();
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();
  const setDarkMode = (value: boolean | 'indeterminate') => {
    setTheme(value !== false ? 'dark' : 'light');
  };

  return (
    <Card data-testid="preferences-settings">
      <CardHeader>
        <CardTitle>{t('settings.userPreferences.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-3">
        <SettingsField label={t('settings.userPreferences.darkMode')}>
          <FormCheckbox
            name="dark_mode"
            checked={resolvedTheme === 'dark'}
            onCheckedChange={setDarkMode}
          />
        </SettingsField>
        <SettingsField
          label={t('settings.userPreferences.reducedMotion')}
          info={t('settings.userPreferences.reducedMotionHelp')}>
          <FormCheckbox
            name="reduced_motion"
            disabled={true}
            checked={runtime.systemReducedMotion}
          />
        </SettingsField>
        <SettingsField label={t('settings.userPreferences.enableSound')}>
          <FormCheckbox
            name="enable_sound"
            checked={preference.enableSound}
            onCheckedChange={(value) =>
              preference.setEnableSound(value !== false)
            }
          />
        </SettingsField>
        <SettingsField label={t('settings.userPreferences.adultFilter')}>
          <FormCheckbox
            name="adult_filter"
            checked={preference.adultFilter}
            onCheckedChange={(value) =>
              preference.setAdultFilter(value === true)
            }
          />
        </SettingsField>
      </CardContent>
    </Card>
  );
}
