'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldLabel,
  Checkbox as FormCheckbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@maw/ui-lib';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useRuntimeStore, useUserPreferencesStore } from '@/stores';
import { SettingsField } from './SettingsField';

export function UserPreferences() {
  const preference = useUserPreferencesStore();
  const runtime = useRuntimeStore();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const { resolvedTheme, setTheme } = useTheme();
  const setDarkMode = (value: boolean | 'indeterminate') => {
    setTheme(value !== false ? 'dark' : 'light');
  };

  const onLanguageChange = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  return (
    <Card data-testid="preferences-settings">
      <CardHeader>
        <CardTitle>{t('settings.userPreferences.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-3">
        <Field orientation="vertical" className="gap-2 pb-2">
          <FieldLabel className="text-sm font-normal">
            {t('settings.userPreferences.language')}
          </FieldLabel>
          <FieldContent>
            <Select value={locale} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  {t('settings.userPreferences.languages.en')}
                </SelectItem>
                <SelectItem value="hu">
                  {t('settings.userPreferences.languages.hu')}
                </SelectItem>
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>

        <Separator className="mb-2" />

        <SettingsField label={t('settings.userPreferences.darkMode')}>
          <FormCheckbox
            name="dark_mode"
            checked={resolvedTheme === 'dark'}
            onCheckedChange={setDarkMode}
          />
        </SettingsField>
        <SettingsField
          label={t('settings.userPreferences.reducedMotion')}
          info={t('settings.userPreferences.reducedMotionHelp')}
        >
          <FormCheckbox
            name="reduced_motion"
            disabled={true}
            checked={runtime.systemReducedMotion}
          />
        </SettingsField>
        <SettingsField label={t('settings.userPreferences.enableSound')}>
          <FormCheckbox
            name="enable_sound"
            checked={preference.enableSound}
            onCheckedChange={(value) =>
              preference.setEnableSound(value !== false)
            }
          />
        </SettingsField>
        <SettingsField label={t('settings.userPreferences.adultFilter')}>
          <FormCheckbox
            name="adult_filter"
            checked={preference.adultFilter}
            onCheckedChange={(value) =>
              preference.setAdultFilter(value === true)
            }
          />
        </SettingsField>
      </CardContent>
    </Card>
  );
}
