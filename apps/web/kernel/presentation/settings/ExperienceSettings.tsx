'use client';

import {
  BorderedBox,
  Button,
  CompactFormRow,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { useExperienceFlagsStore } from '@/kernel';

type ExperienceSettingsProps = {
  className?: string;
  listClassName?: string;
};

const ExperienceSettings: FunctionComponent<ExperienceSettingsProps> = ({
  className = '',
  listClassName = '',
}) => {
  const experience = useExperienceFlagsStore();
  const t = useTranslations();

  const onPageTitleInactiveArrayPagedChange = (value: boolean) =>
    experience.setPageTitle({ inactiveArrayPaged: value });

  return (
    <BorderedBox
      title={t('settings.optionalExperienceFlags.title')}
      className={className}>
      <div className={listClassName}>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.gifts.flaps')}>
          <FormCheckbox
            name="gift_flaps"
            checked={experience.gifts.flaps}
            onValueChange={(flaps) => experience.setGifts({ flaps })}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.gifts.detectAdblocker')}>
          <FormCheckbox
            name="detect_adblocker"
            checked={experience.gifts.detectAdblocker}
            onValueChange={(detectAdblocker) =>
              experience.setGifts({ detectAdblocker })
            }
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.gifts.oneByOne')}>
          <FormCheckbox
            name="gift_flaps"
            checked={experience.gifts.oneByOne}
            onValueChange={(oneByOne) => experience.setGifts({ oneByOne })}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.clipboardMarker')}>
          <FormCheckbox
            name="clipboard_marker"
            checked={experience.clipboardMarker}
            onValueChange={experience.setClipboardMarker}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.contentPaywall')}>
          <FormCheckbox
            name="content_paywall"
            checked={experience.contentPaywall}
            onValueChange={experience.setContentPaywall}
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalExperienceFlags.deadPixel')}>
          <FormCheckbox
            name="dead_pixel"
            checked={experience.deadPixel}
            onValueChange={experience.setDeadPixel}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.disableContextMenu')}>
          <FormCheckbox
            name="disable_context"
            checked={experience.disableContextMenu}
            onValueChange={experience.setDisableContextMenu}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.exitPrompt')}>
          <FormCheckbox
            name="exit_prompt"
            checked={experience.exitPrompt}
            onValueChange={experience.setExitPrompt}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.historySpam')}>
          <FormCheckbox
            name="history_spam"
            checked={experience.historySpam}
            onValueChange={experience.setHistorySpam}
          />
        </CompactFormRow>
        <CompactFormRow label={t('settings.optionalExperienceFlags.mockChat')}>
          <FormCheckbox
            name="mock_chat"
            checked={experience.mockChat}
            onValueChange={experience.setMockChat}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.newsletterModal')}>
          <FormCheckbox
            name="newsletter"
            checked={experience.newsletterModal}
            onValueChange={experience.setNewsletterModal}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.notifications')}>
          <FormCheckbox
            name="notifications"
            checked={experience.notifications}
            onValueChange={experience.setNotifications}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t(
            'settings.optionalExperienceFlags.pageTitleInactiveArrayPaged',
          )}>
          <FormCheckbox
            name="page_title_inactive_array_paged"
            checked={experience.pageTitle.inactiveArrayPaged}
            onValueChange={onPageTitleInactiveArrayPagedChange}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.searchDelay')}>
          <FormCheckbox
            name="search_delay"
            checked={experience.searchDelay}
            onValueChange={experience.setSearchDelay}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.stickyVideo')}>
          <FormCheckbox
            name="sticky_video"
            checked={experience.stickyVideo}
            onValueChange={experience.setStickyVideo}
          />
        </CompactFormRow>
        <CompactFormRow
          label={t('settings.optionalExperienceFlags.wheelOfFortune')}>
          <FormCheckbox
            name="wheel_of_fortune"
            checked={experience.wheelOfFortune}
            onValueChange={experience.setWheelOfFortune}
          />
        </CompactFormRow>
      </div>
      <div className="flex gap-3">
        <Button
          className="mt-6"
          variant="primary"
          onClick={experience.allEnabled}>
          {t('common.enableAll')}
        </Button>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={experience.allDisabled}>
          {t('common.disableAll')}
        </Button>
      </div>
    </BorderedBox>
  );
};

export default ExperienceSettings;
