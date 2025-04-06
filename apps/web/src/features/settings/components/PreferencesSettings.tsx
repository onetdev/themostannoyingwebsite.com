'use client';

import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';

import FormCheckbox from '@/root/apps/web/src/components/atoms/Checkbox';
import LabeledChild from '@/root/apps/web/src/components/molecules/LabeledChild';
import BorderedBox from '@/root/apps/web/src/components/templates/BorderedBox';
import { useRuntimeStore } from '@/root/apps/web/src/lib/state/runtime';
import { useUserPreferencesStore } from '@/root/apps/web/src/lib/state/user_preferences';
import { useTranslations } from 'next-intl';

const PreferencesSettings: FunctionComponent = () => {
  const preference = useUserPreferencesStore();
  const runtime = useRuntimeStore();
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();
  const setDarkMode = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <BorderedBox title={t('settings.userPreferences.title')}>
      <LabeledChild label={t('settings.userPreferences.darkMode')}>
        <FormCheckbox
          name="dark_mode"
          checked={resolvedTheme === 'dark'}
          onValueChange={setDarkMode}
        />
      </LabeledChild>
      <LabeledChild
        label={t('settings.userPreferences.reducedMotion')}
        info={t('settings.userPreferences.reducedMotionHelp')}>
        <FormCheckbox
          name="reduced_motion"
          disabled={true}
          checked={runtime.reducedMotion}
        />
      </LabeledChild>
      <LabeledChild label={t('settings.userPreferences.enableSound')}>
        <FormCheckbox
          name="enable_sound"
          checked={preference.enableSound}
          onValueChange={preference.setEnableSound}
        />
      </LabeledChild>
      <LabeledChild label={t('settings.userPreferences.adultFilter')}>
        <FormCheckbox
          name="adult_filter"
          checked={preference.adultFilter}
          onValueChange={preference.setAdultFilter}
        />
      </LabeledChild>
    </BorderedBox>
  );
};

export default PreferencesSettings;
