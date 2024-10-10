import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlock from './settings-block';
import SettingsBlockRow from './settings-block-row';

import FormCheckbox from '@/components/atoms/form/Checkbox';
import DarkModeToggle from '@/root/src/components/atoms/DarkModeToggle';
import { useUserPreferencesStore } from '@/state/user_preferences';

const PreferencesSettings: FunctionComponent = () => {
  const { t } = useTranslation(['settings', 'common']);
  const preference = useUserPreferencesStore();

  const onFlashingContentsChange = (value: boolean) =>
    preference.setEnableFlashing(value);
  const onSoundChange = (value: boolean) => preference.setEnableSound(value);
  const onAdultFilterChange = (value: boolean) =>
    preference.setAdultFilter(value);

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
          onValueChange={onFlashingContentsChange}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.userPreferences.enableSound')}>
        <FormCheckbox
          name="enable_sound"
          checked={preference.enableSound}
          onValueChange={onSoundChange}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.userPreferences.adultFilter')}>
        <FormCheckbox
          name="adult_filter"
          checked={preference.adultFilter}
          onValueChange={onAdultFilterChange}
        />
      </SettingsBlockRow>
    </SettingsBlock>
  );
};

export default PreferencesSettings;
