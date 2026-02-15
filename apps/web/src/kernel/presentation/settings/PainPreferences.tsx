'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { SettingsField } from './SettingsField';

import { PainPointKey, usePainPreferencesStore } from '@/kernel';

type PainPreferencesProps = {
  className?: string;
  listClassName?: string;
};

export function PainPreferences({
  className = '',
  listClassName = '',
}: PainPreferencesProps) {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations();

  const setFlag = (name: PainPointKey, value: boolean | 'indeterminate') => {
    painPreferences.setFlag(name, value === 'indeterminate' ? false : value);
  };

  return (
    <Card className={className} data-testid="pain-preferences">
      <CardHeader>
        <CardTitle>{t('settings.optionalPainPoints.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={listClassName}>
          <SettingsField
            label={t('settings.optionalPainPoints.gifts.flaps')}
            info={t('settings.optionalPainPointsHints.gifts.flaps')}>
            <FormCheckbox
              name="gift_flaps"
              checked={painPreferences.flags['gifts.flaps']}
              onCheckedChange={(value) => setFlag('gifts.flaps', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.gifts.detectAdblocker')}
            info={t('settings.optionalPainPointsHints.gifts.detectAdblocker')}>
            <FormCheckbox
              name="detect_adblocker"
              checked={painPreferences.flags['gifts.detectAdblocker']}
              onCheckedChange={(value) =>
                setFlag('gifts.detectAdblocker', value)
              }
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.gifts.oneByOne')}
            info={t('settings.optionalPainPointsHints.gifts.oneByOne')}>
            <FormCheckbox
              name="one_by_one"
              checked={painPreferences.flags['gifts.oneByOne']}
              onCheckedChange={(value) => setFlag('gifts.oneByOne', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.clipboardMarker')}
            info={t('settings.optionalPainPointsHints.clipboardMarker')}>
            <FormCheckbox
              name="clipboard_marker"
              checked={painPreferences.flags.clipboardMarker}
              onCheckedChange={(value) => setFlag('clipboardMarker', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.contentPaywall')}
            info={t('settings.optionalPainPointsHints.contentPaywall')}>
            <FormCheckbox
              name="content_paywall"
              checked={painPreferences.flags.contentPaywall}
              onCheckedChange={(value) => setFlag('contentPaywall', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.deadPixel')}
            info={t('settings.optionalPainPointsHints.deadPixel')}>
            <FormCheckbox
              name="dead_pixel"
              checked={painPreferences.flags.deadPixel}
              onCheckedChange={(value) => setFlag('deadPixel', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.disableContextMenu')}
            info={t('settings.optionalPainPointsHints.disableContextMenu')}>
            <FormCheckbox
              name="disable_context"
              checked={painPreferences.flags.disableContextMenu}
              onCheckedChange={(value) => setFlag('disableContextMenu', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.exitPrompt')}
            info={t('settings.optionalPainPointsHints.exitPrompt')}>
            <FormCheckbox
              name="exit_prompt"
              checked={painPreferences.flags.exitPrompt}
              onCheckedChange={(value) => setFlag('exitPrompt', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.historySpam')}
            info={t('settings.optionalPainPointsHints.historySpam')}>
            <FormCheckbox
              name="history_spam"
              checked={painPreferences.flags.historySpam}
              onCheckedChange={(value) => setFlag('historySpam', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.mockChat')}
            info={t('settings.optionalPainPointsHints.mockChat')}>
            <FormCheckbox
              name="mock_chat"
              checked={painPreferences.flags.mockChat}
              onCheckedChange={(value) => setFlag('mockChat', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.newsletterModal')}
            info={t('settings.optionalPainPointsHints.newsletterModal')}>
            <FormCheckbox
              name="newsletter"
              checked={painPreferences.flags.newsletterModal}
              onCheckedChange={(value) => setFlag('newsletterModal', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.notifications')}
            info={t('settings.optionalPainPointsHints.notifications')}>
            <FormCheckbox
              name="notifications"
              checked={painPreferences.flags.notifications}
              onCheckedChange={(value) => setFlag('notifications', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.pageTitleInactiveArrayPaged')}
            info={t(
              'settings.optionalPainPointsHints.pageTitleInactiveArrayPaged',
            )}>
            <FormCheckbox
              name="page_title_inactive_array_paged"
              checked={painPreferences.flags['pageTitle.inactiveArrayPaged']}
              onCheckedChange={(value) =>
                setFlag('pageTitle.inactiveArrayPaged', value)
              }
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.searchDelay')}
            info={t('settings.optionalPainPointsHints.searchDelay')}>
            <FormCheckbox
              name="search_delay"
              checked={painPreferences.flags.searchDelay}
              onCheckedChange={(value) => setFlag('searchDelay', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.stickyVideo')}
            info={t('settings.optionalPainPointsHints.stickyVideo')}>
            <FormCheckbox
              name="sticky_video"
              checked={painPreferences.flags.stickyVideo}
              onCheckedChange={(value) => setFlag('stickyVideo', value)}
            />
          </SettingsField>
          <SettingsField
            label={t('settings.optionalPainPoints.wheelOfFortune')}
            info={t('settings.optionalPainPointsHints.wheelOfFortune')}>
            <FormCheckbox
              name="wheel_of_fortune"
              checked={painPreferences.flags.wheelOfFortune}
              onCheckedChange={(value) => setFlag('wheelOfFortune', value)}
            />
          </SettingsField>
        </div>
        <div className="flex gap-3">
          <Button className="mt-6" onClick={painPreferences.allEnable}>
            {t('common.enableAll')}
          </Button>
          <Button
            className="mt-6"
            variant="secondary"
            onClick={painPreferences.allDisable}>
            {t('common.disableAll')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
