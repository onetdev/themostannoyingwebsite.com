'use client';

import {
  BorderedBox,
  CompactFormRow,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';

import { useRuntimeStore, useUserPreferencesStore } from '@/kernel';

const PreferencesSettings: FunctionComponent = () => {
  const preference = useUserPreferencesStore();
  const runtime = useRuntimeStore();
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();
  const setDarkMode = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <BorderedBox
      title={t('settings.userPreferences.title')}
      data-testid="preferences-settings">
      <CompactFormRow label={t('settings.userPreferences.darkMode')}>
        <FormCheckbox
          name="dark_mode"
          checked={resolvedTheme === 'dark'}
          onValueChange={setDarkMode}
        />
      </CompactFormRow>
      <CompactFormRow
        label={t('settings.userPreferences.reducedMotion')}
        info={t('settings.userPreferences.reducedMotionHelp')}>
        <FormCheckbox
          name="reduced_motion"
          disabled={true}
          checked={runtime.reducedMotion}
        />
      </CompactFormRow>
      <CompactFormRow label={t('settings.userPreferences.enableSound')}>
        <FormCheckbox
          name="enable_sound"
          checked={preference.enableSound}
          onValueChange={preference.setEnableSound}
        />
      </CompactFormRow>
      <CompactFormRow label={t('settings.userPreferences.adultFilter')}>
        <FormCheckbox
          name="adult_filter"
          checked={preference.adultFilter}
          onValueChange={preference.setAdultFilter}
        />
      </CompactFormRow>
    </BorderedBox>
  );
};

export default PreferencesSettings;
