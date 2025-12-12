import { type Page } from '@playwright/test';

export const getFooter = (page: Page) => {
  const footer = page.getByRole('contentinfo');

  return {
    footer,
    copyrightLink: footer.getByRole('link', { name: 'Konrád Koller' }),
    githubLink: footer.getByRole('link', { name: 'GitHub' }),
  };
};
