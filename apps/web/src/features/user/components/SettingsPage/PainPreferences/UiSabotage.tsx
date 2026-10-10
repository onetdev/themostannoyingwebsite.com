'use client';

import { Switch as FormSwitch } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { usePainPreferencesStore } from '@/stores';
import { SettingsField } from '../SettingsField';

export function UiSabotage() {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations('user.optionalPainPoints');

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
        {t('categories.uiSabotage')}
      </h3>
      <SettingsField
        label={t('disableContextMenu.label')}
        info={t('disableContextMenu.hint')}
      >
        <FormSwitch
          name="disable_context"
          checked={painPreferences.flags.disableContextMenu}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('disableContextMenu', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('clipboardBrandingMark.label')}
        info={t('clipboardBrandingMark.hint')}
      >
        <FormSwitch
          name="clipboard_marker"
          checked={painPreferences.flags.clipboardMarker}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('clipboardMarker', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('searchDelay.label')}
        info={t('searchDelay.hint')}
      >
        <FormSwitch
          name="search_delay"
          checked={painPreferences.flags.searchDelay}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('searchDelay', value)
          }
        />
      </SettingsField>
      <SettingsField
        label={t('historySpam.label')}
        info={t('historySpam.hint')}
      >
        <FormSwitch
          name="history_spam"
          checked={painPreferences.flags.historySpam}
          onCheckedChange={(value) =>
            painPreferences.setFlagIndeterminate('historySpam', value)
          }
        />
      </SettingsField>
    </section>
  );
}
