import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';

import FormCheckbox from '@/components/atoms/Checkbox';
import LabeledChild from '@/components/molecules/LabeledChild';
import BorderedBox from '@/components/templates/BorderedBox';
import { useRuntimeStore } from '@/lib/state/runtime';
import { useUserPreferencesStore } from '@/lib/state/user_preferences';

const PreferencesSettings: FunctionComponent = () => {
  const preference = useUserPreferencesStore();
  const runtime = useRuntimeStore();
  const { t } = useTranslation();
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
