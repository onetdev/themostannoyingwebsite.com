import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlock from './SettingsBlock';
import SettingsBlockRow from './SettingsBlockRow';

import FormCheckbox from '@/components/atoms/Checkbox';
import { useExperienceFlagsStore } from '@/state/experience_flags';

const ExperienceSettings: FunctionComponent = () => {
  const { t } = useTranslation(['settings', 'common']);
  const experience = useExperienceFlagsStore();

  // Experience flags
  const onContentPaywallChange = (value: boolean) =>
    experience.setContentPaywall(value);
  const onDeadPixelChange = (value: boolean) => experience.setDeadPixel(value);
  const onExitPromptChange = (value: boolean) =>
    experience.setExitPrompt(value);
  const onMockChatChange = (value: boolean) => experience.setMockChat(value);
  const onWheelOfFortuneChange = (value: boolean) =>
    experience.setWheelOfFortune(value);
  const onPageTitleInactiveArrayPagedChange = (value: boolean) =>
    experience.setPageTitle({ inactiveArrayPaged: value });

  return (
    <SettingsBlock title={t('settings:section.experienceFlags.title')}>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.contentPaywall')}>
        <FormCheckbox
          name="content_paywall"
          checked={experience.contentPaywall}
          onValueChange={onContentPaywallChange}
        />
      </SettingsBlockRow>
      <SettingsBlockRow label={t('settings:section.experienceFlags.deadPixel')}>
        <FormCheckbox
          name="dead_pixel"
          checked={experience.deadPixel}
          onValueChange={onDeadPixelChange}
        />
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.experienceFlags.exitPrompt')}>
        <FormCheckbox
          name="exit_prompt"
          checked={experience.exitPrompt}
          onValueChange={onExitPromptChange}
        />
      </SettingsBlockRow>
      <SettingsBlockRow label={t('settings:section.experienceFlags.mockChat')}>
        <FormCheckbox
          name="mock_chat"
          checked={experience.mockChat}
          onValueChange={onMockChatChange}
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
        label={t('settings:section.experienceFlags.wheelOfFortune')}>
        <FormCheckbox
          name="wheel_of_fortune"
          checked={experience.wheelOfFortune}
          onValueChange={onWheelOfFortuneChange}
        />
      </SettingsBlockRow>
    </SettingsBlock>
  );
};

export default ExperienceSettings;
