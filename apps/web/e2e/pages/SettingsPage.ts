import type { Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getSettingsPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);
  const painPreferencesSection = page.getByTestId('pain-preferences');

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Settings' }),

    painPreferenceFlags: {
      section: painPreferencesSection,
      disableAllButton: painPreferencesSection.getByRole('button', {
        name: 'Disable all',
      }),
      enableAllButton: painPreferencesSection.getByRole('button', {
        name: 'Enable all',
      }),
      checkboxesAll: painPreferencesSection.getByRole('checkbox'),
      checkboxesChecked: painPreferencesSection.getByRole('checkbox', {
        checked: true,
      }),
      checkboxesUnchecked: painPreferencesSection.getByRole('checkbox', {
        checked: false,
      }),
      detectAdblocker: painPreferencesSection.getByRole('checkbox', {
        name: 'Detect adblocker',
      }),
      backgroundAdFlap: painPreferencesSection.getByRole('checkbox', {
        name: 'Background ad flaps',
      }),
      oneByOne: painPreferencesSection.getByRole('checkbox', {
        name: 'One by one ad blocks',
      }),
      clipboardMarker: painPreferencesSection.getByRole('checkbox', {
        name: 'Clipboard marker',
      }),
      contentPaywall: painPreferencesSection.getByRole('checkbox', {
        name: 'Content paywall',
      }),
      deadPixel: painPreferencesSection.getByRole('checkbox', {
        name: 'Dead pixel',
      }),
      disableContextMenu: painPreferencesSection.getByRole('checkbox', {
        name: 'Disable context (right click) menu',
      }),
      exitPrompt: painPreferencesSection.getByRole('checkbox', {
        name: 'Exit prompt',
      }),
      historySpam: painPreferencesSection.getByRole('checkbox', {
        name: 'History spam',
      }),
      mockChat: painPreferencesSection.getByRole('checkbox', {
        name: 'Bubble chat',
      }),
      newsletterModal: painPreferencesSection.getByRole('checkbox', {
        name: 'Newsletter popup modal',
      }),
      notifications: painPreferencesSection.getByRole('checkbox', {
        name: 'Notifications',
      }),
      pageTitleInactiveArrayPaged: painPreferencesSection.getByRole(
        'checkbox',
        {
          name: 'Alternative title when tab is inactive',
        },
      ),
      searchDelay: painPreferencesSection.getByRole('checkbox', {
        name: 'Fake search delay',
      }),
      wheelOfFortune: painPreferencesSection.getByRole('checkbox', {
        name: 'Wheel of fortune',
      }),
      stickyVideo: painPreferencesSection.getByRole('checkbox', {
        name: 'Sticky video',
      }),
    },

    goto: async () => {
      await page.goto('/en/settings');
    },
  };
};
