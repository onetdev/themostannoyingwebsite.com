'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { SettingsField } from './SettingsField';

export function MandatoryExperienceInfo() {
  const t = useTranslations();
  return (
    <Card data-testid="mandatory-experience-settings">
      <CardHeader>
        <CardTitle>{t('user.mandatoryExperienceFlags.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-3">
        <SettingsField
          label={t('user.mandatoryExperienceFlags.unreasonableContent')}
        >
          <FormCheckbox name="unreasonable_content" checked={true} disabled />
        </SettingsField>
        <SettingsField
          label={t('user.mandatoryExperienceFlags.impossibleLogin')}
        >
          <FormCheckbox name="impossible_login" checked={true} disabled />
        </SettingsField>
        <SettingsField
          label={t('user.mandatoryExperienceFlags.impossibleSignup')}
        >
          <FormCheckbox name="impossible_signup" checked={true} disabled />
        </SettingsField>
        <SettingsField
          label={t('user.mandatoryExperienceFlags.impossiblePasswordReminder')}
        >
          <FormCheckbox
            name="impossible_password_reminder"
            checked={true}
            disabled
          />
        </SettingsField>
        <SettingsField
          label={t('user.mandatoryExperienceFlags.flaimYourPhone')}
        >
          <FormCheckbox name="claim_your_phone" checked={true} disabled />
        </SettingsField>
        <SettingsField
          label={t('user.mandatoryExperienceFlags.fakeAiSubscription')}
        >
          <FormCheckbox name="fake_ai_subscription" checked={true} disabled />
        </SettingsField>
        <SettingsField label={t('user.mandatoryExperienceFlags.fakeComments')}>
          <FormCheckbox name="fake_comments" checked={true} disabled />
        </SettingsField>
        <SettingsField label={t('user.mandatoryExperienceFlags.dilf')}>
          <FormCheckbox name="dilf" checked={true} disabled />
        </SettingsField>
        <SettingsField
          label={t('user.mandatoryExperienceFlags.flaimYourPhone')}
        >
          <FormCheckbox name="flaim_your_phone" checked={true} disabled />
        </SettingsField>
      </CardContent>
    </Card>
  );
}
