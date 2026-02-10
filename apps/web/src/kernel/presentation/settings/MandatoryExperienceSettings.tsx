'use client';

import {
  BorderedBox,
  CompactFormRow,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

export function MandatoryExperienceSettings() {
  const t = useTranslations();
  return (
    <BorderedBox
      title={t('settings.mandatoryExperienceFlags.title')}
      data-testid="mandatory-experience-settings">
      <CompactFormRow
        label={t('settings.mandatoryExperienceFlags.unreasonableContent')}>
        <FormCheckbox name="unreasonable_content" checked={true} disabled />
      </CompactFormRow>
      <CompactFormRow
        label={t('settings.mandatoryExperienceFlags.impossibleLogin')}>
        <FormCheckbox name="impossible_login" checked={true} disabled />
      </CompactFormRow>
      <CompactFormRow
        label={t('settings.mandatoryExperienceFlags.impossibleSignup')}>
        <FormCheckbox name="impossible_signup" checked={true} disabled />
      </CompactFormRow>
      <CompactFormRow
        label={t(
          'settings.mandatoryExperienceFlags.impossiblePasswordReminder',
        )}>
        <FormCheckbox
          name="impossible_password_reminder"
          checked={true}
          disabled
        />
      </CompactFormRow>
      <CompactFormRow
        label={t('settings.mandatoryExperienceFlags.flaimYourPhone')}>
        <FormCheckbox name="claim_your_phone" checked={true} disabled />
      </CompactFormRow>
    </BorderedBox>
  );
}
