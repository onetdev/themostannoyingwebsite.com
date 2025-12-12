import { Page } from '@playwright/test';

import type { ExperienceFlagsState, UserGrantsState } from '@/kernel/domain';

/**
 * Sets the state for the experience flags store in localStorage.
 * This script runs before the page loads.
 * @param page The Playwright page object.
 * @param partialState A partial state to merge with the initial state.
 */
export async function setExperienceFlags(
  page: Page,
  partialState: Partial<ExperienceFlagsState>,
) {
  const valueToStore = {
    state: partialState,
    version: 11, // This version must match the one in the store config
  };

  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, value);
    },
    {
      key: 'zustand-experience-flags-storage',
      value: JSON.stringify(valueToStore),
    },
  );
}

/**
 * Gets the state for the experience flags store from localStorage.
 * @param page The Playwright page object.
 */
export async function getExperienceFlags(page: Page) {
  return page.evaluate(() => {
    const item = localStorage.getItem('zustand-experience-flags-storage');
    return item ? (JSON.parse(item) as { state: ExperienceFlagsState }) : null;
  });
}

/**
 * Sets the state for the user grants store in localStorage.
 * This script runs before the page loads.
 * @param page The Playwright page object.
 * @param partialState A partial state to merge with the initial state.
 */
export async function setUserGrants(
  page: Page,
  partialState: Partial<UserGrantsState>,
) {
  const valueToStore = {
    state: partialState,
    version: 1, // This version must match the one in the store config
  };

  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, value);
    },
    {
      key: 'zustand-user-grants-storage',
      value: JSON.stringify(valueToStore),
    },
  );
}
