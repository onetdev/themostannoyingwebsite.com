'use client';

import { FunctionComponent } from 'react';

import FormCheckbox from '@/root/apps/web/src/components/atoms/Checkbox';
import LabeledChild from '@/root/apps/web/src/components/molecules/LabeledChild';
import BorderedBox from '@/root/apps/web/src/components/templates/BorderedBox';
import { useTranslations } from 'next-intl';

const MandatoryExperienceSettings: FunctionComponent = () => {
  const t = useTranslations();
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
