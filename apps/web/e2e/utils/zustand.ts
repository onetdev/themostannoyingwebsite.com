import type { Page } from '@playwright/test';
import {
  ACHIEVEMENTS_STORAGE_KEY,
  type AchievementsState,
} from '@/features/achievements/stores';
import {
  PAIN_PREFERENCES_STORAGE_KEY,
  type PainPreferencesState,
  USER_GRANTS_STORAGE_KEY,
  type UserGrantsState,
} from '@/stores';

/**
 * Sets the state for the pain preferences store in localStorage.
 * This script runs before the page loads.
 * @param page The Playwright page object.
 * @param state A partial state to merge with the initial state.
 */
export async function setPainPreferences(
  page: Page,
  state: PainPreferencesState,
) {
  const valueToStore = {
    state,
    version: 1, // This version must match the one in the store config
  };

  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, value);
    },
    {
      key: PAIN_PREFERENCES_STORAGE_KEY,
      value: JSON.stringify(valueToStore),
    },
  );
}

/**
 * Gets the state for the pain preferences store from localStorage.
 * @param page The Playwright page object.
 */
export async function getPainPreferences(page: Page) {
  return page.evaluate(() => {
    const item = localStorage.getItem(PAIN_PREFERENCES_STORAGE_KEY);
    return item ? (JSON.parse(item) as { state: PainPreferencesState }) : null;
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
      key: USER_GRANTS_STORAGE_KEY,
      value: JSON.stringify(valueToStore),
    },
  );
}

/**
 * Sets the state for the achievements store in localStorage.
 * This script runs before the page loads.
 * @param page The Playwright page object.
 * @param state A full or partial state to set.
 */
export async function setAchievements(
  page: Page,
  state: Partial<AchievementsState>,
) {
  const valueToStore = {
    state,
    version: 1, // This version must match the one in the store config
  };

  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, value);
    },
    {
      key: ACHIEVEMENTS_STORAGE_KEY,
      value: JSON.stringify(valueToStore),
    },
  );
}

/**
 * Gets the state for the achievements store from localStorage.
 * @param page The Playwright page object.
 */
export async function getAchievements(page: Page) {
  return page.evaluate((key) => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as { state: AchievementsState }) : null;
  }, ACHIEVEMENTS_STORAGE_KEY);
}
