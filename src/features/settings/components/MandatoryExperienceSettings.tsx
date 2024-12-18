import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import FormCheckbox from '@/components/atoms/Checkbox';
import LabeledChild from '@/components/molecules/LabeledChild';
import BorderedBox from '@/components/templates/BorderedBox';

const MandatoryExperienceSettings: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <BorderedBox title={t('settings.mandatoryExperienceFlags.title')}>
      <LabeledChild
        label={t('settings.mandatoryExperienceFlags.unreasonableContent')}>
        <FormCheckbox name="unreasonable_content" checked={true} disabled />
      </LabeledChild>
      <LabeledChild
        label={t('settings.mandatoryExperienceFlags.impossibleLogin')}>
        <FormCheckbox name="impossible_login" checked={true} disabled />
      </LabeledChild>
      <LabeledChild
        label={t('settings.mandatoryExperienceFlags.impossibleRegistration')}>
        <FormCheckbox name="impossible_registration" checked={true} disabled />
      </LabeledChild>
      <LabeledChild
        label={t(
          'settings.mandatoryExperienceFlags.impossiblePasswordReminder',
        )}>
        <FormCheckbox
          name="impossible_password_reminder"
          checked={true}
          disabled
        />
      </LabeledChild>
      <LabeledChild
        label={t('settings.mandatoryExperienceFlags.flaimYourPhone')}>
        <FormCheckbox name="claim_your_phone" checked={true} disabled />
      </LabeledChild>
    </BorderedBox>
  );
};

export default MandatoryExperienceSettings;
