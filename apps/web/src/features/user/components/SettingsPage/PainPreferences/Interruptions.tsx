'use client';

import { Checkbox as FormCheckbox } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { usePainPreferencesStore } from '@/stores';
import { SettingsField } from '../SettingsField';

export function Interruptions() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations('user.optionalPainPoints');

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('categories.interruptions')}
      </h3>
      <SettingsField
        label={t('newsletterModal.label')}
        info={t('newsletterModal.hint')}
      >
        <FormCheckbox
          name="newsletter"
          checked={painPreferences.flags.newsletterModal}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('newsletterModal', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('wheelOfFortune.label')}
        info={t('wheelOfFortune.hint')}
      >
        <FormCheckbox
          name="wheel_of_fortune"
          checked={painPreferences.flags.wheelOfFortune}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('wheelOfFortune', value)
          }
        />
      </SettingsField>
      <SettingsField label={t('exitPrompt.label')} info={t('exitPrompt.hint')}>
        <FormCheckbox
          name="exit_prompt"
          checked={painPreferences.flags.exitPrompt}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('exitPrompt', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('contentPaywall.label')}
        info={t('contentPaywall.hint')}
      >
        <FormCheckbox
          name="content_paywall"
          checked={painPreferences.flags.contentPaywall}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('contentPaywall', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('detectAdblocker.label')}
        info={t('detectAdblocker.hint')}
      >
        <FormCheckbox
          name="detect_adblocker"
          checked={painPreferences.flags['promotions.detectAdblocker']}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate(
              'promotions.detectAdblocker',
              value,
            )
          }
        />
      </SettingsField>
      <SettingsField
        label={t('mockSupportChat.label')}
        info={t('mockSupportChat.hint')}
      >
        <FormCheckbox
          name="mock_chat"
          checked={painPreferences.flags.mockChat}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('mockChat', value)
          }
        />
      </SettingsField>
    </section>
  );
}
