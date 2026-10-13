import { expect, test } from '@playwright/test';

import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { acceptedUserGrantsState } from '../fixtures/user-grants';
import { getHomePage } from '../pages/HomePage';
import { getChatBubble } from '../pages/shared/ChatBubble';
import { setPainPreferences, setUserGrants } from '../utils/zustand';

test.beforeEach(async ({ page }) => {
  // The chat bubble is a pain widget, so it must be explicitly enabled.
  await setPainPreferences(page, {
    ...allDisabledPainPreferencesState,
    flags: {
      ...allDisabledPainPreferencesState.flags,
      mockChat: true,
    },
  });
  await setUserGrants(page, acceptedUserGrantsState);
});

test('chat bubble trigger renders the animated gradient ring', async ({
  page,
}) => {
  const home = getHomePage(page);
  await home.goto();

  const { trigger } = getChatBubble(page);
  await expect(trigger).toBeVisible();

  // The reusable `border-spin` utility must actually land in the built CSS.
  const ringAnimation = await trigger.evaluate(
    (el) => getComputedStyle(el, '::after').animationName,
  );
  expect(ringAnimation).toContain('border-spin');
});

test('chat bubble trigger intensifies while it has unread messages', async ({
  page,
}) => {
  const home = getHomePage(page);
  await home.goto();

  const { trigger } = getChatBubble(page);

  // A fresh bubble starts with an unread badge, so it spins at the fast preset.
  await expect(trigger).toHaveClass(/spin-duration-2500/);
  // Guard against tailwind-merge dropping the base class alongside the knob.
  await expect(trigger).toHaveClass(/border-spin/);

  const intenseDuration = await trigger.evaluate(
    (el) => getComputedStyle(el, '::after').animationDuration,
  );
  expect(intenseDuration).toBe('2.5s');
});

test('chat bubble popup renders the animated gradient ring', async ({
  page,
}) => {
  const home = getHomePage(page);
  await home.goto();

  const { open, panel } = getChatBubble(page);
  await open();

  await expect(panel).toBeVisible();
  await expect(panel).toHaveClass(/border-spin/);
});
