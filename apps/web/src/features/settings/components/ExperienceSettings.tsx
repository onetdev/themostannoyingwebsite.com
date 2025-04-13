'use client';

import {
  BorderedBox,
  Button,
  Checkbox as FormCheckbox,
  LabeledChild,
} from '@maw/ui';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { useExperienceFlagsStore } from '@/state/experience_flags';

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
        <LabeledChild label={t('settings.optionalExperienceFlags.gifts.flaps')}>
          <FormCheckbox
            name="gift_flaps"
            checked={experience.gifts.flaps}
            onValueChange={(flaps) => experience.setGifts({ flaps })}
          />
        </LabeledChild>
        <LabeledChild
          label={t('settings.optionalExperienceFlags.gifts.detectAdblocker')}>
          <FormCheckbox
            name="detect_adblocker"
            checked={experience.gifts.detectAdblocker}
            onValueChange={(detectAdblocker) =>
              experience.setGifts({ detectAdblocker })
            }
          />
        </LabeledChild>
        <LabeledChild
          label={t('settings.optionalExperienceFlags.gifts.oneByOne')}>
          <FormCheckbox
            name="gift_flaps"
            checked={experience.gifts.oneByOne}
            onValueChange={(oneByOne) => experience.setGifts({ oneByOne })}
          />
        </LabeledChild>
        <LabeledChild
          label={t('settings.optionalExperienceFlags.clipboardMarker')}>
          <FormCheckbox
            name="clipboard_marker"
            checked={experience.clipboardMarker}
            onValueChange={experience.setClipboardMarker}
          />
        </LabeledChild>
        <LabeledChild
          label={t('settings.optionalExperienceFlags.contentPaywall')}>
          <FormCheckbox
            name="content_paywall"
            checked={experience.contentPaywall}
            onValueChange={experience.setContentPaywall}
          />
        </LabeledChild>
        <LabeledChild label={t('settings.optionalExperienceFlags.deadPixel')}>
          <FormCheckbox
            name="dead_pixel"
            checked={experience.deadPixel}
            onValueChange={experience.setDeadPixel}
          />
        </LabeledChild>
        <LabeledChild
          label={t('settings.optionalExperienceFlags.disableContextMenu')}>
          <FormCheckbox
            name="disable_context"
            checked={experience.disableContextMenu}
            onValueChange={experience.setDisableContextMenu}
          />
        </LabeledChild>
        <LabeledChild label={t('settings.optionalExperienceFlags.exitPrompt')}>
          <FormCheckbox
            name="exit_prompt"
            checked={experience.exitPrompt}
            onValueChange={experience.setExitPrompt}
          />
        </LabeledChild>
        <LabeledChild label={t('settings.optionalExperienceFlags.historySpam')}>
          <FormCheckbox
            name="history_spam"
            checked={experience.historySpam}
            onValueChange={experience.setHistorySpam}
          />
        </LabeledChild>
        <LabeledChild label={t('settings.optionalExperienceFlags.mockChat')}>
          <FormCheckbox
            name="mock_chat"
            checked={experience.mockChat}
            onValueChange={experience.setMockChat}
          />
        </LabeledChild>
        <LabeledChild
          label={t('settings.optionalExperienceFlags.newsletterModal')}>
          <FormCheckbox
            name="newsletter"
            checked={experience.newsletterModal}
            onValueChange={experience.setNewsletterModal}
          />
        </LabeledChild>
        <LabeledChild
          label={t('settings.optionalExperienceFlags.notifications')}>
          <FormCheckbox
            name="notifications"
            checked={experience.notifications}
            onValueChange={experience.setNotifications}
          />
        </LabeledChild>
        <LabeledChild
          label={t(
            'settings.optionalExperienceFlags.pageTitleInactiveArrayPaged',
          )}>
          <FormCheckbox
            name="page_title_inactive_array_paged"
            checked={experience.pageTitle.inactiveArrayPaged}
            onValueChange={onPageTitleInactiveArrayPagedChange}
          />
        </LabeledChild>
        <LabeledChild label={t('settings.optionalExperienceFlags.searchDelay')}>
          <FormCheckbox
            name="search_delay"
            checked={experience.searchDelay}
            onValueChange={experience.setSearchDelay}
          />
        </LabeledChild>
        <LabeledChild label={t('settings.optionalExperienceFlags.stickyVideo')}>
          <FormCheckbox
            name="sticky_video"
            checked={experience.stickyVideo}
            onValueChange={experience.setStickyVideo}
          />
        </LabeledChild>
        <LabeledChild
          label={t('settings.optionalExperienceFlags.wheelOfFortune')}>
          <FormCheckbox
            name="wheel_of_fortune"
            checked={experience.wheelOfFortune}
            onValueChange={experience.setWheelOfFortune}
          />
        </LabeledChild>
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
