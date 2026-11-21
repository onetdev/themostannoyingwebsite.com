'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  Switch as FormSwitch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  ThemeSelect,
} from '@maw/ui-lib';
import { useLocale, useTranslations } from 'next-intl';
import { useLanguageSwitcher, useThemeSwitcher } from '@/hooks';
import { useRuntimeStore, useUserPreferencesStore } from '@/stores';
import { SettingsField } from './SettingsField';

export function UserPreferences() {
  const preference = useUserPreferencesStore();
  const { onLanguageChange, onOpenChange, languages } = useLanguageSwitcher(
    'settings:preferences',
  );
  const themeSwitcher = useThemeSwitcher('settings:preferences');
  const runtime = useRuntimeStore();
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Card
      data-testid="preferences-settings"
      data-track-section="settings:preferences"
    >
      <CardHeader>
        <CardTitle>{t('user.userPreferences.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-3">
        <Field orientation="vertical" className="gap-2 pb-2">
          <FieldLabel className="text-sm font-normal">
            {t('common.language.label')}
          </FieldLabel>
          <FieldContent>
            <Select
              items={languages.map((lang) => ({
                value: lang.locale,
                label: `${lang.label}\u00A0${lang.flag}`,
              }))}
              value={locale}
              onValueChange={onLanguageChange}
              onOpenChange={onOpenChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-track-section="settings:preferences">
                {languages.map((lang) => (
                  <SelectItem key={lang.locale} value={lang.locale}>
                    {lang.label} &nbsp; {lang.flag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>

        <Field orientation="vertical" className="gap-2 pb-2">
          <FieldLabel className="text-sm font-normal">
            {t('user.userPreferences.theme')}
          </FieldLabel>
          <FieldContent>
            <ThemeSelect
              className="w-full"
              {...themeSwitcher}
              data-track-control="navigation:theme"
              data-track-section="settings:preferences"
            />
          </FieldContent>
        </Field>

        <Separator className="mb-2" />

        <FieldGroup className="gap-3">
          <SettingsField
            label={t('user.userPreferences.reducedMotion')}
            info={t('user.userPreferences.reducedMotionHelp')}
            disabled
          >
            {(id) => (
              <FormSwitch
                id={id}
                name="reduced_motion"
                disabled={true}
                checked={runtime.systemReducedMotion}
              />
            )}
          </SettingsField>
          <SettingsField label={t('user.userPreferences.enableSound')}>
            {(id) => (
              <FormSwitch
                id={id}
                name="enable_sound"
                checked={preference.enableSound}
                onCheckedChange={(value) =>
                  preference.setEnableSound(value !== false)
                }
              />
            )}
          </SettingsField>
          <SettingsField label={t('user.userPreferences.adultFilter')}>
            {(id) => (
              <FormSwitch
                id={id}
                name="adult_filter"
                checked={preference.adultFilter}
                onCheckedChange={(value) =>
                  preference.setAdultFilter(value === true)
                }
              />
            )}
          </SettingsField>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
