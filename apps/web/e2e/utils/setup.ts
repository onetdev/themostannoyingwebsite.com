import type { Page } from '@playwright/test';
import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { acceptedUserGrantsState } from '../fixtures/user-grants';
import { setPainPreferences, setUserGrants } from './zustand';

/**
 * Sets up the default E2E test state by disabling all annoyances and accepting cookies.
 * @param page The Playwright page object.
 */
export async function setupE2eTestState(page: Page) {
  await setPainPreferences(page, allDisabledPainPreferencesState);
  await setUserGrants(page, acceptedUserGrantsState);
}
