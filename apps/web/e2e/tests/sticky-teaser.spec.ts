import { expect, test } from '@playwright/test';

import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { setupE2eTestState } from '../utils/setup';
import { setPainPreferences } from '../utils/zustand';

test('sticky teaser links to the Egg Tower page', async ({ page }) => {
  await setupE2eTestState(page);
  await setPainPreferences(page, {
    ...allDisabledPainPreferencesState,
    flags: {
      ...allDisabledPainPreferencesState.flags,
      stickyVideo: true,
    },
  });
  await page.goto('/en/');

  const teaser = page.getByTestId('sticky-short');
  await expect(teaser).toBeVisible();
  await expect(
    page.getByRole('contentinfo').getByRole('link', { name: 'Egg Tower' }),
  ).toBeVisible();

  const video = teaser.locator('video');
  await expect(video).toHaveAttribute(
    'src',
    '/assets/egg-tower/teaser-4x3.mp4',
  );
  await expect(video).toHaveAttribute(
    'poster',
    '/assets/egg-tower/teaser-4x3.webp',
  );

  await teaser.getByRole('link').click();
  await expect(page).toHaveURL(/\/en\/games\/egg-tower\/$/);
  await expect(page.getByTestId('egg-tower-page')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/i,
  );

  await teaser.getByRole('button', { name: 'Close' }).click();
  await expect(teaser).toBeHidden();
});

test('sticky teaser sits beside the chat bubble when both are enabled', async ({
  page,
}) => {
  await setupE2eTestState(page);
  await setPainPreferences(page, {
    ...allDisabledPainPreferencesState,
    flags: {
      ...allDisabledPainPreferencesState.flags,
      mockChat: true,
      stickyVideo: true,
    },
  });
  await page.goto('/en/');

  const teaser = page.getByTestId('sticky-short');
  const chatBubble = page.getByTestId('chat-bubble-trigger');

  await expect(teaser).toBeVisible();
  await expect(chatBubble).toBeVisible();

  const [teaserBox, chatBox] = await Promise.all([
    teaser.boundingBox(),
    chatBubble.boundingBox(),
  ]);

  expect(teaserBox).not.toBeNull();
  expect(chatBox).not.toBeNull();
  if (teaserBox && chatBox) {
    expect(teaserBox.x).toBeGreaterThanOrEqual(chatBox.x + chatBox.width);
  }
});
