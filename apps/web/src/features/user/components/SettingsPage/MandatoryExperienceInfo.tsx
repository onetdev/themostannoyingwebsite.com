'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldGroup,
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
      <CardContent>
        <FieldGroup className="gap-3">
          <SettingsField
            label={t('user.mandatoryExperienceFlags.unreasonableContent')}
            disabled
          >
            {(id) => (
              <FormCheckbox
                id={id}
                name="unreasonable_content"
                checked={true}
                disabled
              />
            )}
          </SettingsField>
          <SettingsField
            label={t('user.mandatoryExperienceFlags.impossibleLogin')}
            disabled
          >
            {(id) => (
              <FormCheckbox
                id={id}
                name="impossible_login"
                checked={true}
                disabled
              />
            )}
          </SettingsField>
          <SettingsField
            label={t('user.mandatoryExperienceFlags.impossibleSignup')}
            disabled
          >
            {(id) => (
              <FormCheckbox
                id={id}
                name="impossible_signup"
                checked={true}
                disabled
              />
            )}
          </SettingsField>
          <SettingsField
            label={t(
              'user.mandatoryExperienceFlags.impossiblePasswordReminder',
            )}
            disabled
          >
            {(id) => (
              <FormCheckbox
                id={id}
                name="impossible_password_reminder"
                checked={true}
                disabled
              />
            )}
          </SettingsField>
          <SettingsField
            label={t('user.mandatoryExperienceFlags.flaimYourPhone')}
            disabled
          >
            {(id) => (
              <FormCheckbox
                id={id}
                name="claim_your_phone"
                checked={true}
                disabled
              />
            )}
          </SettingsField>
          <SettingsField
            label={t('user.mandatoryExperienceFlags.fakeAiSubscription')}
            disabled
          >
            {(id) => (
              <FormCheckbox
                id={id}
                name="fake_ai_subscription"
                checked={true}
                disabled
              />
            )}
          </SettingsField>
          <SettingsField
            label={t('user.mandatoryExperienceFlags.fakeComments')}
            disabled
          >
            {(id) => (
              <FormCheckbox
                id={id}
                name="fake_comments"
                checked={true}
                disabled
              />
            )}
          </SettingsField>
          <SettingsField
            label={t('user.mandatoryExperienceFlags.dilf')}
            disabled
          >
            {(id) => (
              <FormCheckbox id={id} name="dilf" checked={true} disabled />
            )}
          </SettingsField>
          <SettingsField
            label={t('user.mandatoryExperienceFlags.flaimYourPhone')}
            disabled
          >
            {(id) => (
              <FormCheckbox
                id={id}
                name="flaim_your_phone"
                checked={true}
                disabled
              />
            )}
          </SettingsField>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
