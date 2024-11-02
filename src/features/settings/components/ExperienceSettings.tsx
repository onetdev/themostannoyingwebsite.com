import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlock from './SettingsBlock';
import SettingsBlockRow from './SettingsBlockRow';

import Button from '@/components/atoms/Button';
import FormCheckbox from '@/components/atoms/Checkbox';
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
  const { t } = useTranslation();

  const onPageTitleInactiveArrayPagedChange = (value: boolean) =>
    experience.setPageTitle({ inactiveArrayPaged: value });

  return (
    <SettingsBlock
      title={t('settings.experienceFlags.title')}
      className={className}>
      <div className={listClassName}>
        <SettingsBlockRow label={t('settings.experienceFlags.gifts.flaps')}>
          <FormCheckbox
            name="gift_flaps"
            checked={experience.gifts.flaps}
            onValueChange={(flaps) => experience.setGifts({ flaps })}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.gifts.oneByOne')}>
          <FormCheckbox
            name="gift_flaps"
            checked={experience.gifts.oneByOne}
            onValueChange={(oneByOne) => experience.setGifts({ oneByOne })}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.contentPaywall')}>
          <FormCheckbox
            name="content_paywall"
            checked={experience.contentPaywall}
            onValueChange={experience.setContentPaywall}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.deadPixel')}>
          <FormCheckbox
            name="dead_pixel"
            checked={experience.deadPixel}
            onValueChange={experience.setDeadPixel}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.exitPrompt')}>
          <FormCheckbox
            name="exit_prompt"
            checked={experience.exitPrompt}
            onValueChange={experience.setExitPrompt}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.mockChat')}>
          <FormCheckbox
            name="mock_chat"
            checked={experience.mockChat}
            onValueChange={experience.setMockChat}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.newsletterModal')}>
          <FormCheckbox
            name="newsletter"
            checked={experience.newsletterModal}
            onValueChange={experience.setNewsletterModal}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.notifications')}>
          <FormCheckbox
            name="notifications"
            checked={experience.notifications}
            onValueChange={experience.setNotifications}
          />
        </SettingsBlockRow>
        <SettingsBlockRow
          label={t('settings.experienceFlags.pageTitleInactiveArrayPaged')}>
          <FormCheckbox
            name="page_title_inactive_array_paged"
            checked={experience.pageTitle.inactiveArrayPaged}
            onValueChange={onPageTitleInactiveArrayPagedChange}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.searchDelay')}>
          <FormCheckbox
            name="search_delay"
            checked={experience.searchDelay}
            onValueChange={experience.setSearchDelay}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.stickyVideo')}>
          <FormCheckbox
            name="sticky_video"
            checked={experience.stickyVideo}
            onValueChange={experience.setStickyVideo}
          />
        </SettingsBlockRow>
        <SettingsBlockRow label={t('settings.experienceFlags.wheelOfFortune')}>
          <FormCheckbox
            name="wheel_of_fortune"
            checked={experience.wheelOfFortune}
            onValueChange={experience.setWheelOfFortune}
          />
        </SettingsBlockRow>
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
    </SettingsBlock>
  );
};

export default ExperienceSettings;
