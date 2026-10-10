'use client';

import {
  FieldGroup,
  FieldLegend,
  FieldSet,
  Switch as FormSwitch,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { usePainPreferencesStore } from '@/stores';
import { SettingsField } from '../SettingsField';

export function Interruptions() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations('user.optionalPainPoints');

  return (
    <FieldSet className="gap-3">
      <FieldLegend
        variant="label"
        className="mb-0 text-muted-foreground text-xs font-bold tracking-wider uppercase"
      >
        {t('categories.interruptions')}
      </FieldLegend>
      <FieldGroup className="gap-3">
        <SettingsField
          label={t('newsletterModal.label')}
          info={t('newsletterModal.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="newsletter"
              checked={painPreferences.flags.newsletterModal}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate('newsletterModal', value)
              }
            />
          )}
        </SettingsField>
        <SettingsField
          label={t('wheelOfFortune.label')}
          info={t('wheelOfFortune.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="wheel_of_fortune"
              checked={painPreferences.flags.wheelOfFortune}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate('wheelOfFortune', value)
              }
            />
          )}
        </SettingsField>
        <SettingsField
          label={t('exitPrompt.label')}
          info={t('exitPrompt.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="exit_prompt"
              checked={painPreferences.flags.exitPrompt}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate('exitPrompt', value)
              }
            />
          )}
        </SettingsField>
        <SettingsField
          label={t('contentPaywall.label')}
          info={t('contentPaywall.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="content_paywall"
              checked={painPreferences.flags.contentPaywall}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate('contentPaywall', value)
              }
            />
          )}
        </SettingsField>
        <SettingsField
          label={t('detectAdblocker.label')}
          info={t('detectAdblocker.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="detect_adblocker"
              checked={painPreferences.flags['promotions.detectAdblocker']}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate(
                  'promotions.detectAdblocker',
                  value,
                )
              }
            />
          )}
        </SettingsField>
        <SettingsField
          label={t('mockSupportChat.label')}
          info={t('mockSupportChat.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="mock_chat"
              checked={painPreferences.flags.mockChat}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate('mockChat', value)
              }
            />
          )}
        </SettingsField>
        <SettingsField
          label={t('ratingDialog.label')}
          info={t('ratingDialog.hint')}
        >
          {(id) => (
            <FormSwitch
              id={id}
              name="rating_dialog"
              checked={painPreferences.flags.ratingDialog}
              onCheckedChange={(value) =>
                painPreferences.setFlagIndeterminate('ratingDialog', value)
              }
            />
          )}
        </SettingsField>
      </FieldGroup>
    </FieldSet>
  );
}
