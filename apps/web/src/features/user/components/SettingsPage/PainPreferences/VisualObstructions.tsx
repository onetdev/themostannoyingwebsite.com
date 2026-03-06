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

export function VisualObstructions() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations();

  const timeoutOptions = ['15', '30', '60', '300', '900'] as const;
  const variantOptions = ['bouncingLogo', 'maze'] as const;

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('user.optionalPainPoints.categories.visual')}
      </h3>
      <SettingsField
        label={t('user.optionalPainPoints.screensaver')}
        info={t('user.optionalPainPointsHints.screensaver')}
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
              {t('user.optionalPainPoints.screensaverVariant')}
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
                      {t(
                        `user.optionalPainPoints.screensaverVariantOptions.${value}`,
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field orientation="vertical" className="gap-2">
            <FieldLabel className="text-sm font-normal">
              {t('user.optionalPainPoints.screensaverTimeout')}
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
                      {t(
                        `user.optionalPainPoints.screensaverTimeoutOptions.${value}`,
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </div>
      )}
      <SettingsField
        label={t('user.optionalPainPoints.deadPixel')}
        info={t('user.optionalPainPointsHints.deadPixel')}
      >
        <FormCheckbox
          name="dead_pixel"
          checked={painPreferences.flags.deadPixel}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('deadPixel', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('user.optionalPainPoints.stickyVideo')}
        info={t('user.optionalPainPointsHints.stickyVideo')}
      >
        <FormCheckbox
          name="sticky_video"
          checked={painPreferences.flags.stickyVideo}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('stickyVideo', value)
          }
        />
      </SettingsField>
    </section>
  );
}
