import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  /* See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /*
   * Shared settings for all the projects below.
   * See https://playwright.dev/docs/api/class-testoptions.
   */
  use: {
    testIdAttribute: 'data-testid',
    actionTimeout: 5000,
    baseURL: 'http://127.0.0.1:3000',
    ignoreHTTPSErrors: true,
    headless: true,
    trace: 'on-first-retry',
    viewport: {
      width: 1280,
      height: 720,
    },
    video: {
      mode: isCI ? 'retain-on-failure' : 'on',
      size: {
        width: 640,
        height: 360,
      },
    },
    screenshot: {
      mode: isCI ? 'only-on-failure' : 'on',
      fullPage: true,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'pnpm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !isCI,
  },
});
