import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getSettingsPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);
  const experienceSection = page.getByTestId('experience-settings');

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Settings' }),

    experienceFlags: {
      section: experienceSection,
      disableAllButton: experienceSection.getByRole('button', {
        name: 'Disable all',
      }),
      enableAllButton: experienceSection.getByRole('button', {
        name: 'Enable all',
      }),
      checkboxesAll: experienceSection.getByRole('checkbox'),
      checkboxesChecked: experienceSection.getByRole('checkbox', {
        checked: true,
      }),
      checkboxesUnchecked: experienceSection.getByRole('checkbox', {
        checked: false,
      }),
      detectAdblocker: experienceSection.getByRole('checkbox', {
        name: 'Detect adblocker',
      }),
      backgroundAdFlap: experienceSection.getByRole('checkbox', {
        name: 'Background ad flaps',
      }),
      oneByOne: experienceSection.getByRole('checkbox', {
        name: 'One by one ad blocks',
      }),
      clipboardMarker: experienceSection.getByRole('checkbox', {
        name: 'Clipboard marker',
      }),
      contentPaywall: experienceSection.getByRole('checkbox', {
        name: 'Content paywall',
      }),
      deadPixel: experienceSection.getByRole('checkbox', {
        name: 'Dead pixel',
      }),
      disableContextMenu: experienceSection.getByRole('checkbox', {
        name: 'Disable context (right click) menu',
      }),
      exitPrompt: experienceSection.getByRole('checkbox', {
        name: 'Exit prompt',
      }),
      historySpam: experienceSection.getByRole('checkbox', {
        name: 'History spam',
      }),
      mockChat: experienceSection.getByRole('checkbox', {
        name: 'Bubble chat',
      }),
      newsletterModal: experienceSection.getByRole('checkbox', {
        name: 'Newsletter popup modal',
      }),
      notifications: experienceSection.getByRole('checkbox', {
        name: 'Notifications',
      }),
      pageTitleInactiveArrayPaged: experienceSection.getByRole('checkbox', {
        name: 'Alternative title when tab is inactive',
      }),
      searchDelay: experienceSection.getByRole('checkbox', {
        name: 'Fake search delay',
      }),
      wheelOfFortune: experienceSection.getByRole('checkbox', {
        name: 'Wheel of fortune',
      }),
      stickyVideo: experienceSection.getByRole('checkbox', {
        name: 'Sticky video',
      }),
    },

    goto: async () => {
      await page.goto('/en/settings');
    },
  };
};
