'use client';

import { Checkbox as FormCheckbox } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { SettingsField } from '../SettingsField';

import { usePainPreferencesStore } from '@/kernel';

export function AdvertisingAndMonetization() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations();

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('settings.optionalPainPoints.categories.ads')}
      </h3>
      <SettingsField
        label={t('settings.optionalPainPoints.gifts.flaps')}
        info={t('settings.optionalPainPointsHints.gifts.flaps')}>
        <FormCheckbox
          name="gift_flaps"
          checked={painPreferences.flags['gifts.flaps']}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('gifts.flaps', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('settings.optionalPainPoints.gifts.detectAdblocker')}
        info={t('settings.optionalPainPointsHints.gifts.detectAdblocker')}>
        <FormCheckbox
          name="detect_adblocker"
          checked={painPreferences.flags['gifts.detectAdblocker']}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('gifts.detectAdblocker', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('settings.optionalPainPoints.gifts.oneByOne')}
        info={t('settings.optionalPainPointsHints.gifts.oneByOne')}>
        <FormCheckbox
          name="one_by_one"
          checked={painPreferences.flags['gifts.oneByOne']}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('gifts.oneByOne', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('settings.optionalPainPoints.contentPaywall')}
        info={t('settings.optionalPainPointsHints.contentPaywall')}>
        <FormCheckbox
          name="content_paywall"
          checked={painPreferences.flags.contentPaywall}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('contentPaywall', value)
          }
        />
      </SettingsField>
    </section>
  );
}
