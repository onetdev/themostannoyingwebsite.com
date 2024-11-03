import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import Button from '@/components/atoms/Button';
import FormCheckbox from '@/components/atoms/Checkbox';
import FormRow from '@/components/molecules/FormRow';
import BorderedBox from '@/components/templates/BorderedBox';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';

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
    <BorderedBox
      title={t('settings.optionalExperienceFlags.title')}
      className={className}>
      <div className={listClassName}>
        <FormRow label={t('settings.optionalExperienceFlags.gifts.flaps')}>
          <FormCheckbox
            name="gift_flaps"
            checked={experience.gifts.flaps}
            onValueChange={(flaps) => experience.setGifts({ flaps })}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.gifts.oneByOne')}>
          <FormCheckbox
            name="gift_flaps"
            checked={experience.gifts.oneByOne}
            onValueChange={(oneByOne) => experience.setGifts({ oneByOne })}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.contentPaywall')}>
          <FormCheckbox
            name="content_paywall"
            checked={experience.contentPaywall}
            onValueChange={experience.setContentPaywall}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.deadPixel')}>
          <FormCheckbox
            name="dead_pixel"
            checked={experience.deadPixel}
            onValueChange={experience.setDeadPixel}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.exitPrompt')}>
          <FormCheckbox
            name="exit_prompt"
            checked={experience.exitPrompt}
            onValueChange={experience.setExitPrompt}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.mockChat')}>
          <FormCheckbox
            name="mock_chat"
            checked={experience.mockChat}
            onValueChange={experience.setMockChat}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.newsletterModal')}>
          <FormCheckbox
            name="newsletter"
            checked={experience.newsletterModal}
            onValueChange={experience.setNewsletterModal}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.notifications')}>
          <FormCheckbox
            name="notifications"
            checked={experience.notifications}
            onValueChange={experience.setNotifications}
          />
        </FormRow>
        <FormRow
          label={t(
            'settings.optionalExperienceFlags.pageTitleInactiveArrayPaged',
          )}>
          <FormCheckbox
            name="page_title_inactive_array_paged"
            checked={experience.pageTitle.inactiveArrayPaged}
            onValueChange={onPageTitleInactiveArrayPagedChange}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.searchDelay')}>
          <FormCheckbox
            name="search_delay"
            checked={experience.searchDelay}
            onValueChange={experience.setSearchDelay}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.stickyVideo')}>
          <FormCheckbox
            name="sticky_video"
            checked={experience.stickyVideo}
            onValueChange={experience.setStickyVideo}
          />
        </FormRow>
        <FormRow label={t('settings.optionalExperienceFlags.wheelOfFortune')}>
          <FormCheckbox
            name="wheel_of_fortune"
            checked={experience.wheelOfFortune}
            onValueChange={experience.setWheelOfFortune}
          />
        </FormRow>
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
