import ReactTimeAgo from 'react-timeago';
import { styled } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { FunctionComponent, PropsWithChildren } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  UserColorScheme,
  actions as preferenceActions,
} from '@/redux/slices/preference';
import { actions as experienceActions } from '@/redux/slices/experience';
import selectPreference from '@/redux/selectors/preference';
import selectExperience from '@/redux/selectors/experience';
import selectConsent from '@/redux/selectors/consent';
import selectRuntime from '@/redux/selectors/runtime';
import { makeI18nStaticProps } from '@/utils/i18n';
import SiteTitle from '@/components/atoms/SiteTitle';
import FormSelect from '@/components/atoms/FormSelect';
import FormCheckbox from '@/components/atoms/FormCheckbox';
import cssVars from '@/styles/css_vars';
import mediaQueries from '@/styles/media_queries';

const Blocks = styled.div`
  display: grid;
  gap: ${cssVars.spacing.gap};
  ${mediaQueries.mdUp} {
    grid-template-columns: 1fr 1fr;
  }
`;
const Block = styled.div`
  background: ${cssVars.color.surface};
  border: 1px solid ${cssVars.color.secondary};
  padding: ${cssVars.spacing.gap2x};
  border-radius: 5px;
`;
const BlockTitle = styled.h2`
  margin: 0 0 ${cssVars.spacing.gap2x} 0;
  font-size: ${cssVars.fontSize.headline};
`;
const BlockBody = styled.div<{ $gap?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$gap ? cssVars.spacing.gap : 0)};
`;
const LabelRow = styled.label`
  display: flex;
  justify-content: space-between;
`;

const SettingsFormRow: FunctionComponent<
  PropsWithChildren<{ label: string }>
> = ({ label, children }) => {
  return (
    <LabelRow>
      <span>{label}</span>
      {children}
    </LabelRow>
  );
};

const PrivacyPolicy: NextPage = () => {
  const dispatch = useAppDispatch();
  const preference = useAppSelector(selectPreference);
  const experience = useAppSelector(selectExperience);
  const consent = useAppSelector(selectConsent);
  const runtime = useAppSelector(selectRuntime);
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');

  // Preferences
  const onColorSchemeChange = (value: string) => {
    dispatch(preferenceActions.setColorScheme(value as UserColorScheme));
  };
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

  const colorSchemes: { value: UserColorScheme; label: string }[] = [
    { value: 'auto', label: 'System default' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <main>
      <SiteTitle>{tCommon('navigation.settings')}</SiteTitle>
      <h1>{t('title')}</h1>

      <Blocks>
        <Block>
          <BlockTitle>{t('preference_section.title')}</BlockTitle>
          <BlockBody $gap>
            <SettingsFormRow label={t('preference_section.color_scheme')}>
              <FormSelect
                name="color_scheme"
                selected={preference.colorScheme}
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
          </BlockBody>
        </Block>

        <Block>
          <BlockTitle>{t('consent_section.title')}</BlockTitle>
          <BlockBody $gap>
            <SettingsFormRow label={t('consent_section.essential_cookies')}>
              <FormCheckbox
                name="essential_cookies"
                checked={consent.cookies.essential}
                disabled
              />
            </SettingsFormRow>
            <br />
            <i>{t('consent_section.permission_disclaimer')}</i>
            <SettingsFormRow
              label={t('consent_section.notification_permission')}>
              {`${consent.permission.notification || tCommon('status.not_set')}`}
            </SettingsFormRow>
            <SettingsFormRow label={t('consent_section.location_permission')}>
              {`${consent.permission.location || tCommon('status.not_set')}`}
            </SettingsFormRow>
          </BlockBody>
        </Block>

        <Block>
          <BlockTitle>{t('experience_section.title')}</BlockTitle>
          <BlockBody $gap>
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
          </BlockBody>
        </Block>

        <Block>
          <BlockTitle>{t('runtime_section.title')}</BlockTitle>
          <BlockBody>
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
          </BlockBody>
        </Block>
      </Blocks>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps(['common', 'settings']);
export default PrivacyPolicy;
