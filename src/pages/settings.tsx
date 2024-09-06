import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { FunctionComponent, PropsWithChildren } from 'react';
import ReactTimeAgo from 'react-timeago';

import FormCheckbox from '@/components/atoms/form/Checkbox';
import SiteTitle from '@/components/atoms/SiteTitle';
import DarkModeToggle from '@/root/src/components/atoms/DarkModeToggle';
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
        <Block title={t('settings:section.userPreferences.title')}>
          <SettingsFormRow
            label={t('settings:section.userPreferences.colorScheme')}>
            <DarkModeToggle />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.userPreferences.enableFlashing')}>
            <FormCheckbox
              name="enable_flashing"
              checked={preference.enableFlashing}
              onValueChange={onFlashingContentsChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.userPreferences.enableSound')}>
            <FormCheckbox
              name="enable_sound"
              checked={preference.enableSound}
              onValueChange={onSoundChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.userPreferences.adultFilter')}>
            <FormCheckbox
              name="adult_filter"
              checked={preference.adultFilter}
              onValueChange={onAdultFilterChange}
            />
          </SettingsFormRow>
        </Block>

        <Block title={t('settings:section.userGrants.title')}>
          <SettingsFormRow
            label={t('settings:section.userGrants.essentialCookies')}>
            <FormCheckbox
              name="essential_cookies"
              checked={grant.cookies.essential}
              disabled
            />
          </SettingsFormRow>
          <br />
          <i>{t('settings:section.userGrants.permissionDisclaimer')}</i>
          <SettingsFormRow
            label={t('settings:section.userGrants.notificationPermission')}>
            {`${grant.permission.notification || t('common:status.notSet')}`}
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.userGrants.locationPermission')}>
            {`${grant.permission.location || t('common:status.notSet')}`}
          </SettingsFormRow>
        </Block>

        <Block title={t('settings:section.experienceFlags.title')}>
          <SettingsFormRow
            label={t('settings:section.experienceFlags.mockChat')}>
            <FormCheckbox
              name="mock_chat"
              checked={experience.mockChat}
              onValueChange={onAlowMockChatChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.experienceFlags.wheelOfFortune')}>
            <FormCheckbox
              name="wheel_of_fortune"
              checked={experience.wheelOfFortune}
              onValueChange={onWheelOfFortuneChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.experienceFlags.exitPrompt')}>
            <FormCheckbox
              name="exit_prompt"
              checked={experience.exitPrompt}
              onValueChange={onExitPromptChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('settings:section.experienceFlags.contentPaywall')}>
            <FormCheckbox
              name="content_paywall"
              checked={experience.contentPaywall}
              onValueChange={onContentPaywallChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t(
              'settings:section.experienceFlags.pageTitleInactiveArrayPaged',
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
            {t('settings:section.runtime.startedAgo')}{' '}
            {runtime.startedAt ? (
              <ReactTimeAgo date={runtime.startedAt} />
            ) : (
              'n/a'
            )}
          </p>
          <p>
            {t('settings:section.runtime.visibilitySeconds')}{' '}
            <span>{runtime.document.visibilitySeconds}</span>
          </p>
          <p>
            {t('settings:section.runtime.isDocumentVisible')}{' '}
            <span>
              {runtime.document.isVisible
                ? t('common:response.yes')
                : t('common:response.yes')}
            </span>
          </p>
          <p>
            {t('settings:section.runtime.interactionUnlocked')}{' '}
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
