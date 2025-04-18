import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  /* See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /*
   * Shared settings for all the projects below.
   * See https://playwright.dev/docs/api/class-testoptions.
   */
  use: {
    baseURL: 'http://127.0.0.1:3000',
    ignoreHTTPSErrors: true,
    headless: true,
    trace: 'on-first-retry',
    viewport: {
      width: 1280,
      height: 720,
    },
    video: {
      mode: process.env.CI ? 'retain-on-failure' : 'on',
      size: {
        width: 640,
        height: 360,
      },
    },
    screenshot: {
      mode: process.env.CI ? 'only-on-failure' : 'on',
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
    reuseExistingServer: !process.env.CI,
  },
});
