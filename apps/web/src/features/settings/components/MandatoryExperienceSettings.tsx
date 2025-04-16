'use client';

import { BorderedBox, Checkbox as FormCheckbox, LabeledChild } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

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
