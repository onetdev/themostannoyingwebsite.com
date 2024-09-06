import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { FunctionComponent, PropsWithChildren } from 'react';
import ReactTimeAgo from 'react-timeago';

import FormCheckbox from '@/components/atoms/FormCheckbox';
import SiteTitle from '@/components/atoms/SiteTitle';
import DarkModeToggle from '@/components/molecules/DarkModeToggle';
import { useExperienceFlagsStore } from '@/state/experience_flags';
import { useRuntimeStore } from '@/state/runtime';
import { useUserGrantsStore } from '@/state/user_grants';
import { useUserPreferencesStore } from '@/state/user_preferences';
import { makeI18nStaticProps } from '@/utils/i18n';

const PrivacyPolicy: NextPage = () => {
  const experience = useExperienceFlagsStore();
  const grant = useUserGrantsStore();
  const preference = useUserPreferencesStore();
  const runtime = useRuntimeStore();
  const { t } = useTranslation(['settings', 'common']);

  // User preferences
  const onFlashingContentsChange = (value: boolean) =>
    preference.setEnableFlashing(value);
  const onSoundChange = (value: boolean) => preference.setEnableSound(value);
  const onAdultFilterChange = (value: boolean) =>
    preference.setAdultFilter(value);

  // Experience flags
  const onAlowMockChatChange = (value: boolean) =>
    experience.setMockChat(value);
  const onWheelOfFortuneChange = (value: boolean) =>
    experience.setWheelOfFortune(value);
  const onExitPromptChange = (value: boolean) =>
    experience.setExitPrompt(value);
  const onContentPaywallChange = (value: boolean) =>
    experience.setContentPaywall(value);
  const onPageTitleInactiveArrayPagedChange = (value: boolean) =>
    experience.setPageTitle({ inactiveArrayPaged: value });

  return (
    <main>
      <SiteTitle>{t('common:navigation.settings')}</SiteTitle>
      <h1>{t('settings:title')}</h1>

      <div className="grid gap-3 md:grid-cols-2">
        <Block title={t('settings:section.user_preferences.title')}>
          <SettingsFormRow
            label={t('settings:section.user_preferences.color_scheme')}>
            <DarkModeToggle />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.user_preferences.enable_flashing')}>
            <FormCheckbox
              name="enable_flashing"
              checked={preference.enableFlashing}
              onValueChange={onFlashingContentsChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.user_preferences.enable_sound')}>
            <FormCheckbox
              name="enable_sound"
              checked={preference.enableSound}
              onValueChange={onSoundChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.user_preferences.adult_filter')}>
            <FormCheckbox
              name="adult_filter"
              checked={preference.adultFilter}
              onValueChange={onAdultFilterChange}
            />
          </SettingsFormRow>
        </Block>

        <Block title={t('settings:section.user_grants.title')}>
          <SettingsFormRow
            label={t('settings:section.user_grants.essential_cookies')}>
            <FormCheckbox
              name="essential_cookies"
              checked={grant.cookies.essential}
              disabled
            />
          </SettingsFormRow>
          <br />
          <i>{t('settings:section.user_grants.permission_disclaimer')}</i>
          <SettingsFormRow
            label={t('settings:section.user_grants.notification_permission')}>
            {`${grant.permission.notification || t('common:status.not_set')}`}
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.user_grants.location_permission')}>
            {`${grant.permission.location || t('common:status.not_set')}`}
          </SettingsFormRow>
        </Block>

        <Block title={t('settings:section.experience_flags.title')}>
          <SettingsFormRow
            label={t('settings:section.experience_flags.mock_chat')}>
            <FormCheckbox
              name="mock_chat"
              checked={experience.mockChat}
              onValueChange={onAlowMockChatChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.experience_flags.wheel_of_fortune')}>
            <FormCheckbox
              name="wheel_of_fortune"
              checked={experience.wheelOfFortune}
              onValueChange={onWheelOfFortuneChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.experience_flags.exit_prompt')}>
            <FormCheckbox
              name="exit_prompt"
              checked={experience.exitPrompt}
              onValueChange={onExitPromptChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.experience_flags.content_paywall')}>
            <FormCheckbox
              name="content_paywall"
              checked={experience.contentPaywall}
              onValueChange={onContentPaywallChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t(
              'settings:section.experience_flags.page_title_inactive_array_paged',
            )}>
            <FormCheckbox
              name="page_title_inactive_array_paged"
              checked={experience.pageTitle.inactiveArrayPaged}
              onValueChange={onPageTitleInactiveArrayPagedChange}
            />
          </SettingsFormRow>
        </Block>

        <Block title={t('settings:section.runtime.title')}>
          <small>{t('settings:section.runtime.disclaimer')}</small>
          <p>
            {t('settings:section.runtime.started_ago')}{' '}
            {runtime.startedAt ? (
              <ReactTimeAgo date={runtime.startedAt} />
            ) : (
              'n/a'
            )}
          </p>
          <p>
            {t('settings:section.runtime.visibility_seconds')}{' '}
            <span>{runtime.document.visibilitySeconds}</span>
          </p>
          <p>
            {t('settings:section.runtime.is_document_visible')}{' '}
            <span>
              {runtime.document.isVisible
                ? t('common:response.yes')
                : t('common:response.yes')}
            </span>
          </p>
          <p>
            {t('settings:section.runtime.interaction_unlocked')}{' '}
            <span>
              {runtime.interactionUnlocked
                ? t('common:response.yes')
                : t('common:response.yes')}
            </span>
          </p>
        </Block>
      </div>
    </main>
  );
};

const SettingsFormRow: FunctionComponent<
  PropsWithChildren<{ label: string }>
> = ({ label, children }) => {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      {children}
    </div>
  );
};

const Block: FunctionComponent<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className="rounded-md border border-secondary bg-surface p-5">
      <h2 className="m-0 mb-5">{title}</h2>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export const getStaticProps = makeI18nStaticProps(['settings']);
export default PrivacyPolicy;
