import type { Page } from '@playwright/test';

/**
 * The player is a full-screen route without the shared header/footer chrome,
 * so it only exposes player-specific locators.
 */
export const getShortsPlayerPage = (page: Page) => {
  return {
    pageShell: page.getByTestId('short-player-page'),
    player: page.getByTestId('shorts-player'),
    overlay: page.getByTestId('short-player-overlay'),
    slides: page.getByTestId('short-player-slide'),
    tapLayer: page.getByTestId('short-player-tap-layer').first(),
    video: page.locator('video').first(),

    goto: async (slug: string) => {
      await page.goto(`/en/shorts/${slug}/`);
    },
  };
};
