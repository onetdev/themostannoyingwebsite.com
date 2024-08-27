import ReactTimeAgo from 'react-timeago';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useTheme } from 'next-themes';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as preferenceActions } from '@/redux/slices/preference';
import { actions as experienceActions } from '@/redux/slices/experience';
import selectPreference from '@/redux/selectors/preference';
import selectExperience from '@/redux/selectors/experience';
import selectConsent from '@/redux/selectors/consent';
import selectRuntime from '@/redux/selectors/runtime';
import { makeI18nStaticProps } from '@/utils/i18n';
import SiteTitle from '@/components/atoms/SiteTitle';
import FormSelect from '@/components/atoms/FormSelect';
import FormCheckbox from '@/components/atoms/FormCheckbox';
import { Theme } from '@/types';

const PrivacyPolicy: NextPage = () => {
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const preference = useAppSelector(selectPreference);
  const experience = useAppSelector(selectExperience);
  const consent = useAppSelector(selectConsent);
  const runtime = useAppSelector(selectRuntime);
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');

  // Preferences
  const onColorSchemeChange = (value: string) => setTheme(value);
  const onFlashingContentsChange = (value: boolean) =>
    dispatch(preferenceActions.setEnableFlashing(value));
  const onSoundChange = (value: boolean) =>
    dispatch(preferenceActions.setEnableSound(value));
  const onAdultFilterChange = (value: boolean) =>
    dispatch(preferenceActions.setAdultFilter(value));

  // Experience block
  const onAlowMockChatChange = (value: boolean) =>
    dispatch(experienceActions.setMockChat(value));
  const onWheelOfFortuneChange = (value: boolean) =>
    dispatch(experienceActions.setWheelOfFortune(value));
  const onExitPromptChange = (value: boolean) =>
    dispatch(experienceActions.setExitPrompt(value));
  const onContentPaywallChange = (value: boolean) =>
    dispatch(experienceActions.setContentPaywall(value));
  const onPageTitleInactiveArrayPagedChange = (value: boolean) =>
    dispatch(experienceActions.setPageTitle({ inactiveArrayPaged: value }));

  const colorSchemes: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <main>
      <SiteTitle>{tCommon('navigation.settings')}</SiteTitle>
      <h1>{t('title')}</h1>

      <div className="grid gap-3 md:grid-cols-2">
        <Block title={t('preference_section.title')}>
          <SettingsFormRow label={t('preference_section.color_scheme')}>
            <FormSelect
              key={theme}
              name="color_scheme"
              selected={theme as Theme}
              values={colorSchemes}
              onValueChange={onColorSchemeChange}
            />
          </SettingsFormRow>
          <SettingsFormRow label={t('preference_section.enable_flashing')}>
            <FormCheckbox
              name="enable_flashing"
              checked={preference.enableFlashing}
              onValueChange={onFlashingContentsChange}
            />
          </SettingsFormRow>
          <SettingsFormRow label={t('preference_section.enable_sound')}>
            <FormCheckbox
              name="enable_sound"
              checked={preference.enableSound}
              onValueChange={onSoundChange}
            />
          </SettingsFormRow>
          <SettingsFormRow label={t('preference_section.adult_filter')}>
            <FormCheckbox
              name="adult_filter"
              checked={preference.adultFilter}
              onValueChange={onAdultFilterChange}
            />
          </SettingsFormRow>
        </Block>

        <Block title={t('consent_section.title')}>
          <SettingsFormRow label={t('consent_section.essential_cookies')}>
            <FormCheckbox
              name="essential_cookies"
              checked={consent.cookies.essential}
              disabled
            />
          </SettingsFormRow>
          <br />
          <i>{t('consent_section.permission_disclaimer')}</i>
          <SettingsFormRow label={t('consent_section.notification_permission')}>
            {`${consent.permission.notification || tCommon('status.not_set')}`}
          </SettingsFormRow>
          <SettingsFormRow label={t('consent_section.location_permission')}>
            {`${consent.permission.location || tCommon('status.not_set')}`}
          </SettingsFormRow>
        </Block>

        <Block title={t('experience_section.title')}>
          <SettingsFormRow label={t('experience_section.mock_chat')}>
            <FormCheckbox
              name="mock_chat"
              checked={experience.mockChat}
              onValueChange={onAlowMockChatChange}
            />
          </SettingsFormRow>
          <SettingsFormRow label={t('experience_section.wheel_of_fortune')}>
            <FormCheckbox
              name="wheel_of_fortune"
              checked={experience.wheelOfFortune}
              onValueChange={onWheelOfFortuneChange}
            />
          </SettingsFormRow>
          <SettingsFormRow label={t('experience_section.exit_prompt')}>
            <FormCheckbox
              name="exit_prompt"
              checked={experience.exitPrompt}
              onValueChange={onExitPromptChange}
            />
          </SettingsFormRow>
          <SettingsFormRow label={t('experience_section.content_paywall')}>
            <FormCheckbox
              name="content_paywall"
              checked={experience.contentPaywall}
              onValueChange={onContentPaywallChange}
            />
          </SettingsFormRow>
          <SettingsFormRow
            label={t('experience_section.page_title_inactive_array_paged')}>
            <FormCheckbox
              name="page_title_inactive_array_paged"
              checked={experience.pageTitle.inactiveArrayPaged}
              onValueChange={onPageTitleInactiveArrayPagedChange}
            />
          </SettingsFormRow>
        </Block>

        <Block title={t('runtime_section.title')}>
          <small>{t('runtime_section.disclaimer')}</small>
          <p>
            {t('runtime_section.started_ago')}{' '}
            <ReactTimeAgo date={runtime.startedAt} />
          </p>
          <p>
            {t('runtime_section.visibility_seconds')}{' '}
            <span>{runtime.document.visibilitySeconds}</span>
          </p>
          <p>
            {t('runtime_section.is_document_visible')}{' '}
            <span>
              {runtime.document.isVisible
                ? tCommon('response.yes')
                : tCommon('response.yes')}
            </span>
          </p>
          <p>
            {t('runtime_section.interaction_unlocked')}{' '}
            <span>
              {runtime.interactionUnlocked
                ? tCommon('response.yes')
                : tCommon('response.yes')}
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

export const getStaticProps = makeI18nStaticProps(['common', 'settings']);
export default PrivacyPolicy;
