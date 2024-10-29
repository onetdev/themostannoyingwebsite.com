import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlock from './SettingsBlock';
import SettingsBlockRow from './SettingsBlockRow';

import FormCheckbox from '@/components/atoms/Checkbox';
import DarkModeToggle from '@/components/atoms/DarkModeToggle';
import { useUserPreferencesStore } from '@/state/user_preferences';

const PreferencesSettings: FunctionComponent = () => {
  const preference = useUserPreferencesStore();
  const { t } = useTranslation(['settings', 'common']);

  return (
    <SettingsBlock title={t('settings:section.userPreferences.title')}>
      <SettingsBlockRow
        label={t('settings:section.userPreferences.colorScheme')}>
        <DarkModeToggle />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.userPreferences.enableFlashing')}>
        <FormCheckbox
          name="enable_flashing"
          checked={preference.enableFlashing}
          onValueChange={preference.setEnableFlashing}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.userPreferences.enableSound')}>
        <FormCheckbox
          name="enable_sound"
          checked={preference.enableSound}
          onValueChange={preference.setEnableSound}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.userPreferences.adultFilter')}>
        <FormCheckbox
          name="adult_filter"
          checked={preference.adultFilter}
          onValueChange={preference.setAdultFilter}
        />
      </SettingsBlockRow>
    </SettingsBlock>
  );
};

export default PreferencesSettings;
