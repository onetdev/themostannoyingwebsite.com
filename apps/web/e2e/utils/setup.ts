import { Page } from '@playwright/test';

import { setExperienceFlags, setUserGrants } from './zustand';
import { allDisabledExperienceFlagsState } from '../fixtures/experience-flags';
import { acceptedUserGrantsState } from '../fixtures/user-grants';

/**
 * Sets up the default E2E test state by disabling all annoyances and accepting cookies.
 * @param page The Playwright page object.
 */
export async function setupE2eTestState(page: Page) {
  await setExperienceFlags(page, allDisabledExperienceFlagsState);
  await setUserGrants(page, acceptedUserGrantsState);
}
