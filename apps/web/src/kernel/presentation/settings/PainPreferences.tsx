'use client';

import {
  BorderedBox,
  Button,
  CompactFormRow,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { usePainPreferencesStore } from '@/kernel';

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

  return (
    <BorderedBox
      title={t('settings.optionalPainPoints.title')}
      className={className}
      data-testid="pain-preferences">
      <div className={listClassName}>
        <CompactFormRow label={t('settings.optionalPainPoints.gifts.flaps')}>
          <FormCheckbox
            name="gift_flaps"
            checked={painPreferences.flags['gifts.flaps']}
            onValueChange={(value) =>
              painPreferences.setFlag('gifts.flaps', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalPainPoints.gifts.detectAdblocker')}>
          <FormCheckbox
            name="detect_adblocker"
            checked={painPreferences.flags['gifts.detectAdblocker']}
            onValueChange={(value) =>
              painPreferences.setFlag('gifts.detectAdblocker', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.gifts.oneByOne')}>
          <FormCheckbox
            name="gift_flaps"
            checked={painPreferences.flags['gifts.oneByOne']}
            onValueChange={(value) =>
              painPreferences.setFlag('gifts.oneByOne', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalPainPoints.clipboardMarker')}>
          <FormCheckbox
            name="clipboard_marker"
            checked={painPreferences.flags.clipboardMarker}
            onValueChange={(value) =>
              painPreferences.setFlag('clipboardMarker', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.contentPaywall')}>
          <FormCheckbox
            name="content_paywall"
            checked={painPreferences.flags.contentPaywall}
            onValueChange={(value) =>
              painPreferences.setFlag('contentPaywall', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.deadPixel')}>
          <FormCheckbox
            name="dead_pixel"
            checked={painPreferences.flags.deadPixel}
            onValueChange={(value) =>
              painPreferences.setFlag('deadPixel', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalPainPoints.disableContextMenu')}>
          <FormCheckbox
            name="disable_context"
            checked={painPreferences.flags.disableContextMenu}
            onValueChange={(value) =>
              painPreferences.setFlag('disableContextMenu', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.exitPrompt')}>
          <FormCheckbox
            name="exit_prompt"
            checked={painPreferences.flags.exitPrompt}
            onValueChange={(value) =>
              painPreferences.setFlag('exitPrompt', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.historySpam')}>
          <FormCheckbox
            name="history_spam"
            checked={painPreferences.flags.historySpam}
            onValueChange={(value) =>
              painPreferences.setFlag('historySpam', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.mockChat')}>
          <FormCheckbox
            name="mock_chat"
            checked={painPreferences.flags.mockChat}
            onValueChange={(value) =>
              painPreferences.setFlag('mockChat', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalPainPoints.newsletterModal')}>
          <FormCheckbox
            name="newsletter"
            checked={painPreferences.flags.newsletterModal}
            onValueChange={(value) =>
              painPreferences.setFlag('newsletterModal', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.notifications')}>
          <FormCheckbox
            name="notifications"
            checked={painPreferences.flags.notifications}
            onValueChange={(value) =>
              painPreferences.setFlag('notifications', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalPainPoints.pageTitleInactiveArrayPaged')}>
          <FormCheckbox
            name="page_title_inactive_array_paged"
            checked={painPreferences.flags['pageTitle.inactiveArrayPaged']}
            onValueChange={(value) =>
              painPreferences.setFlag('pageTitle.inactiveArrayPaged', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.searchDelay')}>
          <FormCheckbox
            name="search_delay"
            checked={painPreferences.flags.searchDelay}
            onValueChange={(value) =>
              painPreferences.setFlag('searchDelay', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.stickyVideo')}>
          <FormCheckbox
            name="sticky_video"
            checked={painPreferences.flags.stickyVideo}
            onValueChange={(value) =>
              painPreferences.setFlag('stickyVideo', value)
            }
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalPainPoints.wheelOfFortune')}>
          <FormCheckbox
            name="wheel_of_fortune"
            checked={painPreferences.flags.wheelOfFortune}
            onValueChange={(value) =>
              painPreferences.setFlag('wheelOfFortune', value)
            }
          />
        </CompactFormRow>
      </div>
      <div className="flex gap-3">
        <Button
          className="mt-6"
          variant="primary"
          onClick={painPreferences.allEnable}>
          {t('common.enableAll')}
        </Button>
        <Button
          className="mt-6"
          variant="tertiary"
          onClick={painPreferences.allDisable}>
          {t('common.disableAll')}
        </Button>
      </div>
    </BorderedBox>
  );
}
