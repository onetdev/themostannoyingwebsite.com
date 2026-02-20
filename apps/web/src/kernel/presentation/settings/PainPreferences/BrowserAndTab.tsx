'use client';

import { Checkbox as FormCheckbox } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { SettingsField } from '../SettingsField';

import { usePainPreferencesStore } from '@/kernel';

export function BrowserAndTab() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations();

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('settings.optionalPainPoints.categories.browser')}
      </h3>
      <SettingsField
        label={t('settings.optionalPainPoints.pageTitleInactiveArrayPaged')}
        info={t(
          'settings.optionalPainPointsHints.pageTitleInactiveArrayPaged',
        )}>
        <FormCheckbox
          name="page_title_inactive_array_paged"
          checked={painPreferences.flags['pageTitle.inactiveArrayPaged']}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate(
              'pageTitle.inactiveArrayPaged',
              value,
            )
          }
        />
      </SettingsField>
      <SettingsField
        label={t('settings.optionalPainPoints.historySpam')}
        info={t('settings.optionalPainPointsHints.historySpam')}>
        <FormCheckbox
          name="history_spam"
          checked={painPreferences.flags.historySpam}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('historySpam', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('settings.optionalPainPoints.disableContextMenu')}
        info={t('settings.optionalPainPointsHints.disableContextMenu')}>
        <FormCheckbox
          name="disable_context"
          checked={painPreferences.flags.disableContextMenu}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('disableContextMenu', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('settings.optionalPainPoints.searchDelay')}
        info={t('settings.optionalPainPointsHints.searchDelay')}>
        <FormCheckbox
          name="search_delay"
          checked={painPreferences.flags.searchDelay}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('searchDelay', value)
          }
        />
      </SettingsField>
    </section>
  );
}
