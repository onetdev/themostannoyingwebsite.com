import ReactTimeAgo from 'react-timeago';
import { styled } from 'styled-components';
import { ChangeEventHandler } from 'react';

import { cssRule, cssVars } from '@/styles/theme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as preferenceActions } from '@/redux/slices/preference';
import { actions as consentActions } from '@/redux/slices/consent';
import { actions as experienceActions } from '@/redux/slices/experience';
import selectPreference from '@/redux/selectors/preference';
import selectExperience from '@/redux/selectors/experience';
import selectConsent from '@/redux/selectors/consent';
import selectRuntime from '@/redux/selectors/runtime';

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

type ToggableRowProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
const ToggableRow = ({ label, name, checked, onChange }: ToggableRowProps) => {
  return (
    <RowWithLabel>
      <label>
        <span>{label}</span>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </label>
    </RowWithLabel>
  );
};

export default function PrivacyPolicy() {
  const dispatch = useAppDispatch();
  const preference = useAppSelector(selectPreference);
  const experience = useAppSelector(selectExperience);
  const consent = useAppSelector(selectConsent);
  const runtime = useAppSelector(selectRuntime);

  // Preferences
  const onDarkModeChange = () =>
    dispatch(preferenceActions.setDarkMode(!preference.isDarkMode));
  const onFlashingContentsChange = () =>
    dispatch(preferenceActions.setEnableFlashing(!preference.enableFlashing));
  const onSoundChange = () =>
    dispatch(preferenceActions.setEnableSound(!preference.enableSound));
  const onAdultFilterChange = () =>
    dispatch(preferenceActions.setAdultFilter(!preference.adultFilter));
  // Consent block
  const onAllowCookiesChange = () =>
    dispatch(consentActions.setAllowCookies(!consent.allowCookies));
  const onAlowNotificationChange = () =>
    dispatch(consentActions.setAllowNotification(!consent.allowNotification));
  const onAllowLocationChange = () =>
    dispatch(consentActions.setAllowLocation(!consent.allowLocation));
  // Experience block
  const onAlowMockChatChange = () =>
    dispatch(experienceActions.setMockChat(!experience.mockChat));
  const onWheelOfFortuneChange = () =>
    dispatch(experienceActions.setWheelOfFortune(!experience.wheelOfFortune));
  const onExitPromptChange = () =>
    dispatch(experienceActions.setExitPrompt(!experience.exitPrompt));
  const onContentPaywallChange = () =>
    dispatch(experienceActions.setContentPaywall(!experience.contentPaywall));

  return (
    <main>
      <h1>Settings</h1>

      <Blocks>
        <Block>
          <BlockTitle>Preferences</BlockTitle>
          <BlockBody $gap>
            <ToggableRow
              label="Dark mode"
              name="dark_mode"
              checked={preference.isDarkMode}
              onChange={onDarkModeChange}
            />
            <ToggableRow
              label="Flashing contents"
              name="enable_flashing"
              checked={preference.enableFlashing}
              onChange={onFlashingContentsChange}
            />
            <ToggableRow
              label="Sound"
              name="enable_sound"
              checked={preference.enableSound}
              onChange={onSoundChange}
            />
            <ToggableRow
              label="Filter adult contents"
              name="adult_filter"
              checked={preference.adultFilter}
              onChange={onAdultFilterChange}
            />
          </BlockBody>
        </Block>

        <Block>
          <BlockTitle>Consent</BlockTitle>
          <BlockBody $gap>
            <ToggableRow
              label="Allow non-essential cookies"
              name="allow_cookies"
              checked={consent.allowCookies}
              onChange={onAllowCookiesChange}
            />
            <ToggableRow
              label="Allow notification"
              name="allow_notification"
              checked={consent.allowNotification || false}
              onChange={onAlowNotificationChange}
            />
            <ToggableRow
              label="Allow location"
              name="enable_location"
              checked={consent.allowLocation || false}
              onChange={onAllowLocationChange}
            />
          </BlockBody>
        </Block>

        <Block>
          <BlockTitle>Experience</BlockTitle>
          <BlockBody $gap>
            <ToggableRow
              label="Mock chat"
              name="mock_chat"
              checked={experience.mockChat}
              onChange={onAlowMockChatChange}
            />
            <ToggableRow
              label="Wheel of fortune"
              name="wheel_of_fortune"
              checked={experience.wheelOfFortune}
              onChange={onWheelOfFortuneChange}
            />
            <ToggableRow
              label="Exit prompt"
              name="exit_prompt"
              checked={experience.exitPrompt}
              onChange={onExitPromptChange}
            />
            <ToggableRow
              label="Content paywall"
              name="content_paywall"
              checked={experience.contentPaywall}
              onChange={onContentPaywallChange}
            />
          </BlockBody>
        </Block>

        <Block>
          <BlockTitle>About this session</BlockTitle>
          <BlockBody>
            <small>These values reset every single visit.</small>
            <p>
              Started at <ReactTimeAgo date={runtime.startTime} />
            </p>
            <p>
              Elapsed seconds: <span>{runtime.inFocusSeconds}</span>
            </p>
            <p>
              Is in focus: <span>{runtime.isInFocus ? 'Yes' : 'No'}</span>
            </p>
            <p>
              Had first interaction:{' '}
              <span>{runtime.hasInteracted ? 'Yes' : 'No'}</span>
            </p>
          </BlockBody>
        </Block>
      </Blocks>
    </main>
  );
}
