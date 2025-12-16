import { test } from '@playwright/test';

import { getFlaimAPhonePage } from '../pages/FlaimAPhonePage';
import { setupE2eTestState } from '../utils/setup';

test(
  'can get to the flaim a phone survey result screen',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const flaimAPhonePage = getFlaimAPhonePage(page);
    await flaimAPhonePage.goto();

    const maxIterations = 7;
    let iterations = 0;

    while (iterations < maxIterations) {
      await flaimAPhonePage.getSurveyOption(0).click();
      await flaimAPhonePage.nextButton.click();
      await page.waitForTimeout(1000);
      iterations++;
    }

    await flaimAPhonePage.backToHomeButton.waitFor();
  },
);
