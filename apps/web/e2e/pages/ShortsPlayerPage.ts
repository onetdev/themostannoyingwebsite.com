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
    commentsToggle: page.locator('[data-track="shorts:comments"]'),
    commentsPanel: page.getByTestId('shorts-comments-panel'),
    commentsDesktop: page.getByTestId('shorts-comments-desktop'),
    commentsDrawer: page.getByTestId('shorts-comments-drawer'),
    commentsBody: page.getByTestId('shorts-comments-body'),
    commentsClose: page.locator('[data-track="shorts:comments:close"]'),
    commentItems: page.locator('[data-track-section="comments:item"]'),
    commentComposer: page.getByPlaceholder('Add a comment...'),

    goto: async (slug: string) => {
      await page.goto(`/en/shorts/${slug}/`);
    },
  };
};
