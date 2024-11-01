import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlock from './SettingsBlock';
import SettingsBlockRow from './SettingsBlockRow';

import FormCheckbox from '@/components/atoms/Checkbox';

const MandatoryExperienceSettings: FunctionComponent = () => {
  const { t } = useTranslation(['settings', 'common']);
  return (
    <SettingsBlock title={t('settings:section.mandatoryExperienceFlags.title')}>
      <SettingsBlockRow
        label={t(
          'settings:section.mandatoryExperienceFlags.unreasonableContent',
        )}>
        <FormCheckbox name="unreasonable_content" checked={true} disabled />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.mandatoryExperienceFlags.impossibleLogin')}>
        <FormCheckbox name="impossible_login" checked={true} disabled />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t(
          'settings:section.mandatoryExperienceFlags.impossibleRegistration',
        )}>
        <FormCheckbox name="impossible_registration" checked={true} disabled />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t(
          'settings:section.mandatoryExperienceFlags.impossiblePasswordReminder',
        )}>
        <FormCheckbox
          name="impossible_password_reminder"
          checked={true}
          disabled
        />
      </SettingsBlockRow>
    </SettingsBlock>
  );
};

export default MandatoryExperienceSettings;
