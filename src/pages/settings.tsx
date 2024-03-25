import ReactTimeAgo from 'react-timeago';
import { styled } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';

import { cssRule, cssVars } from '@/styles/theme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  UserColorScheme,
  actions as preferenceActions,
} from '@/redux/slices/preference';
import { actions as consentActions } from '@/redux/slices/consent';
import { actions as experienceActions } from '@/redux/slices/experience';
import selectPreference from '@/redux/selectors/preference';
import selectExperience from '@/redux/selectors/experience';
import selectConsent from '@/redux/selectors/consent';
import selectRuntime from '@/redux/selectors/runtime';
import { makeI18nStaticProps } from '@/utils/i18n';

const Blocks = styled.div`
  display: grid;
  gap: ${cssVars.spacing.gap};
  ${cssRule.mdUp} {
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
const RowWithLabel = styled.div`
  label {
    display: flex;
    justify-content: space-between;
  }
`;

type FormElementProps = {
  label: string;
  name: string;
};

type ToggableRowProps = FormElementProps & {
  checked: boolean;
  onChange: (value: boolean) => void;
};
const ToggableRow = ({ label, name, checked, onChange }: ToggableRowProps) => (
  <RowWithLabel>
    <label>
      <span>{label}</span>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  </RowWithLabel>
);

type SelectRowProps = FormElementProps & {
  values: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
};
const SelectRow = ({
  label,
  name,
  values,
  selected,
  onChange,
}: SelectRowProps) => (
  <RowWithLabel>
    <label>
      <span>{label}</span>
      <select
        name={name}
        onChange={(e) => onChange(values[e.target.selectedIndex].value)}
        defaultValue={selected}>
        {values.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  </RowWithLabel>
);

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
  // Consent block
  const onAllowCookiesChange = (value: boolean) =>
    dispatch(consentActions.setAllowCookies(value));
  const onAlowNotificationChange = (value: boolean) =>
    dispatch(consentActions.setAllowNotification(value));
  const onAllowLocationChange = (value: boolean) =>
    dispatch(consentActions.setAllowLocation(value));
  // Experience block
  const onAlowMockChatChange = (value: boolean) =>
    dispatch(experienceActions.setMockChat(value));
  const onWheelOfFortuneChange = (value: boolean) =>
    dispatch(experienceActions.setWheelOfFortune(value));
  const onExitPromptChange = (value: boolean) =>
    dispatch(experienceActions.setExitPrompt(value));
  const onContentPaywallChange = (value: boolean) =>
    dispatch(experienceActions.setContentPaywall(value));

  const colorSchemes: { value: UserColorScheme; label: string }[] = [
    { value: 'auto', label: 'System default' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <main>
      <h1>{t('title')}</h1>

      <Blocks>
        <Block>
          <BlockTitle>{t('preference_section.title')}</BlockTitle>
          <BlockBody $gap>
            <SelectRow
              label={t('preference_section.color_scheme')}
              name="color_scheme"
              selected={preference.colorScheme}
              values={colorSchemes}
              onChange={onColorSchemeChange}
            />
            <ToggableRow
              label={t('preference_section.enable_flashing')}
              name="enable_flashing"
              checked={preference.enableFlashing}
              onChange={onFlashingContentsChange}
            />
            <ToggableRow
              label={t('preference_section.enable_sound')}
              name="enable_sound"
              checked={preference.enableSound}
              onChange={onSoundChange}
            />
            <ToggableRow
              label={t('preference_section.adult_filter')}
              name="adult_filter"
              checked={preference.adultFilter}
              onChange={onAdultFilterChange}
            />
          </BlockBody>
        </Block>

        <Block>
          <BlockTitle>{t('consent_section.title')}</BlockTitle>
          <BlockBody $gap>
            <ToggableRow
              label={t('consent_section.allow_cookies')}
              name="allow_cookies"
              checked={consent.allowCookies}
              onChange={onAllowCookiesChange}
            />
            <ToggableRow
              label={t('consent_section.allow_notification')}
              name="allow_notification"
              checked={consent.allowNotification || false}
              onChange={onAlowNotificationChange}
            />
            <ToggableRow
              label={t('consent_section.enable_location')}
              name="enable_location"
              checked={consent.allowLocation || false}
              onChange={onAllowLocationChange}
            />
          </BlockBody>
        </Block>

        <Block>
          <BlockTitle>{t('experience_section.title')}</BlockTitle>
          <BlockBody $gap>
            <ToggableRow
              label={t('experience_section.mock_chat')}
              name="mock_chat"
              checked={experience.mockChat}
              onChange={onAlowMockChatChange}
            />
            <ToggableRow
              label={t('experience_section.wheel_of_fortune')}
              name="wheel_of_fortune"
              checked={experience.wheelOfFortune}
              onChange={onWheelOfFortuneChange}
            />
            <ToggableRow
              label={t('experience_section.exit_prompt')}
              name="exit_prompt"
              checked={experience.exitPrompt}
              onChange={onExitPromptChange}
            />
            <ToggableRow
              label={t('experience_section.content_paywall')}
              name="content_paywall"
              checked={experience.contentPaywall}
              onChange={onContentPaywallChange}
            />
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
