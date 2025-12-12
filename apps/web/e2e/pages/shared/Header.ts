import { type Page } from '@playwright/test';

export const getHeader = (page: Page) => {
  const header = page.getByRole('banner');

  return {
    header,
    activeMenuItem: header.locator('[aria-current="page"]'),
    searchForm: header.getByRole('search'),
    darkModeToggle: header.locator('button[data-dark]'),

    menuItem: {
      // Main menu
      home: header.getByRole('link', { name: 'Home' }),
      hotThings: header.getByRole('link', { name: 'Hot things' }),
      contact: header.getByRole('link', { name: 'Contact' }),
      dilf: header.getByRole('link', { name: 'DILF' }),
      privacyPolicy: header.getByRole('link', { name: 'Privacy Policy' }),
      about: header.getByRole('link', { name: 'About' }),
      donate: header.getByRole('link', { name: 'Donate' }),

      // Account menu
      settings: header.getByRole('link', { name: 'Settings' }),
      login: header.getByRole('link', { name: 'Login' }),
    },
  };
};
