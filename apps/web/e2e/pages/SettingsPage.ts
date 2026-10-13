import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getSettingsPage = (page: Page) => {
  const shared = getSharedLocators(page);
  const painPreferencesSection = page.getByTestId('pain-preferences');

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Settings' }),

    painPreferenceFlags: {
      section: painPreferencesSection,
      disableAllButton: painPreferencesSection.getByRole('button', {
        name: 'Disable all',
      }),
      enableAllButton: painPreferencesSection.getByRole('button', {
        name: 'Enable all',
      }),
      togglesAll: painPreferencesSection.getByRole('switch'),
      togglesChecked: painPreferencesSection.getByRole('switch', {
        checked: true,
      }),
      togglesUnchecked: painPreferencesSection.getByRole('switch', {
        checked: false,
      }),
      detectAdblocker: painPreferencesSection.getByRole('switch', {
        name: 'Detect adblocker',
      }),
      backgroundAdFlap: painPreferencesSection.getByRole('switch', {
        name: 'Background ad flaps',
      }),
      oneByOne: painPreferencesSection.getByRole('switch', {
        name: 'Flaim a phone survey campaign',
      }),
      clipboardMarker: painPreferencesSection.getByRole('switch', {
        name: 'Clipboard branding mark',
      }),
      contentPaywall: painPreferencesSection.getByRole('switch', {
        name: 'Content paywall',
      }),
      deadPixel: painPreferencesSection.getByRole('switch', {
        name: 'Dead pixels',
      }),
      disableContextMenu: painPreferencesSection.getByRole('switch', {
        name: 'Disable context (right click) menu',
      }),
      exitPrompt: painPreferencesSection.getByRole('switch', {
        name: 'Exit prompt',
      }),
      historySpam: painPreferencesSection.getByRole('switch', {
        name: 'Browser History spam',
      }),
      mockChat: painPreferencesSection.getByRole('switch', {
        name: 'Mock support chat',
      }),
      newsletterModal: painPreferencesSection.getByRole('switch', {
        name: 'Newsletter popup modal',
      }),
      notifications: painPreferencesSection.getByRole('switch', {
        name: 'Notifications',
      }),
      pageTitleInactiveArrayPaged: painPreferencesSection.getByRole('switch', {
        name: 'Alternating title when tab is inactive',
      }),
      searchDelay: painPreferencesSection.getByRole('switch', {
        name: 'Artificial search delay',
      }),
      searchDelayLabel: painPreferencesSection.getByText(
        'Artificial search delay',
        { exact: true },
      ),
      wheelOfFortune: painPreferencesSection.getByRole('switch', {
        name: 'Wheel of fortune',
      }),
      stickyVideo: painPreferencesSection.getByRole('switch', {
        name: 'Sticky video player',
      }),
    },

    goto: async () => {
      await page.goto('/en/settings');
    },
  };
};
