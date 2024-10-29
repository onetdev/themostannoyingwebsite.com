import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlock from './SettingsBlock';
import SettingsBlockRow from './SettingsBlockRow';

import FormCheckbox from '@/components/atoms/Checkbox';
import { useExperienceFlagsStore } from '@/state/experience_flags';

const ExperienceSettings: FunctionComponent = () => {
  const { t } = useTranslation(['settings', 'common']);
  const experience = useExperienceFlagsStore();

  const onPageTitleInactiveArrayPagedChange = (value: boolean) =>
    experience.setPageTitle({ inactiveArrayPaged: value });

  return (
    <SettingsBlock title={t('settings:section.experienceFlags.title')}>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.contentPaywall')}>
        <FormCheckbox
          name="content_paywall"
          checked={experience.contentPaywall}
          onValueChange={experience.setContentPaywall}
        />
      </SettingsBlockRow>
      <SettingsBlockRow label={t('settings:section.experienceFlags.deadPixel')}>
        <FormCheckbox
          name="dead_pixel"
          checked={experience.deadPixel}
          onValueChange={experience.setDeadPixel}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.exitPrompt')}>
        <FormCheckbox
          name="exit_prompt"
          checked={experience.exitPrompt}
          onValueChange={experience.setExitPrompt}
        />
      </SettingsBlockRow>
      <SettingsBlockRow label={t('settings:section.experienceFlags.mockChat')}>
        <FormCheckbox
          name="mock_chat"
          checked={experience.mockChat}
          onValueChange={experience.setMockChat}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.newsletterModal')}>
        <FormCheckbox
          name="newsletter"
          checked={experience.newsletterModal}
          onValueChange={experience.setNewsletterModal}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.notifications')}>
        <FormCheckbox
          name="notifications"
          checked={experience.notifications}
          onValueChange={experience.setNotifications}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t(
          'settings:section.experienceFlags.pageTitleInactiveArrayPaged',
        )}>
        <FormCheckbox
          name="page_title_inactive_array_paged"
          checked={experience.pageTitle.inactiveArrayPaged}
          onValueChange={onPageTitleInactiveArrayPagedChange}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.searchDelay')}>
        <FormCheckbox
          name="search_delay"
          checked={experience.searchDelay}
          onValueChange={experience.setSearchDelay}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.stickyVideo')}>
        <FormCheckbox
          name="sticky_video"
          checked={experience.stickyVideo}
          onValueChange={experience.setStickyVideo}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.wheelOfFortune')}>
        <FormCheckbox
          name="wheel_of_fortune"
          checked={experience.wheelOfFortune}
          onValueChange={experience.setWheelOfFortune}
        />
      </SettingsBlockRow>
    </SettingsBlock>
  );
};

export default ExperienceSettings;
