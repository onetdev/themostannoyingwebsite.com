'use client';

import {
  Field,
  FieldContent,
  FieldLabel,
  Checkbox as FormCheckbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import type { ScreensaverVariant } from '@/features/disruptions/schemas';
import { usePainPreferencesStore } from '@/stores';
import { SettingsField } from '../SettingsField';

export function VisualChaos() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations('user.optionalPainPoints');

  const timeoutOptions = ['15', '30', '60', '300', '900'] as const;
  const variantOptions = ['bouncingLogo', 'maze'] as const;

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('categories.visualChaos')}
      </h3>
      <SettingsField
        label={t('screensaver.label')}
        info={t('screensaver.hint')}
      >
        <FormCheckbox
          name="screensaver"
          checked={painPreferences.flags.screensaver}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('screensaver', value)
          }
        />
      </SettingsField>
      {painPreferences.flags.screensaver && (
        <div className="ml-8 flex flex-col gap-4">
          <Field orientation="vertical" className="gap-2">
            <FieldLabel className="text-sm font-normal">
              {t('screensaver.variant.label')}
            </FieldLabel>
            <FieldContent>
              <Select
                name="screensaver_variant"
                value={painPreferences.screensaver.variant}
                onValueChange={(value) => {
                  painPreferences.setScreensaverVariant(
                    value as ScreensaverVariant,
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {variantOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {t(`screensaver.variant.options.${value}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field orientation="vertical" className="gap-2">
            <FieldLabel className="text-sm font-normal">
              {t('screensaver.timer.label')}
            </FieldLabel>
            <FieldContent>
              <Select
                name="screensaver_timeout"
                value={painPreferences.screensaver.timeoutSeconds.toString()}
                onValueChange={(value) => {
                  painPreferences.setScreensaverTimeoutSeconds(
                    parseInt(value, 10),
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeoutOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {t(`screensaver.timer.options.${value}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </div>
      )}
      <SettingsField label={t('deadPixel.label')} info={t('deadPixel.hint')}>
        <FormCheckbox
          name="dead_pixel"
          checked={painPreferences.flags.deadPixel}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('deadPixel', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('stickyVideoPlayer.label')}
        info={t('stickyVideoPlayer.hint')}
      >
        <FormCheckbox
          name="sticky_video"
          checked={painPreferences.flags.stickyVideo}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('stickyVideo', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('backgroundAdflaps.label')}
        info={t('backgroundAdflaps.hint')}
      >
        <FormCheckbox
          name="promotions_flaps"
          checked={painPreferences.flags['promotions.flaps']}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('promotions.flaps', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('flaimAPHoneAd.label')}
        info={t('flaimAPHoneAd.hint')}
      >
        <FormCheckbox
          name="one_by_one"
          checked={painPreferences.flags['promotions.oneByOne']}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('promotions.oneByOne', value)
          }
        />
      </SettingsField>
    </section>
  );
}
