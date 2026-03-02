import type { Page } from '@playwright/test';

/**
 * Dismisses the currently open modal by emitting the 'ui:modal:dismiss-signaled' event.
 * This comes handy when multiple dialogs are open at the same time.
 * Please note that dismiss is being handled as per dialogs rather than universally.
 * @param page The Playwright page object.
 */
export async function dismissModal(page: Page) {
  await page.evaluate(() => {
    if (window.maw?._emit) {
      window.maw._emit('ui:modal:dismiss-signaled');
    }
  });
}
