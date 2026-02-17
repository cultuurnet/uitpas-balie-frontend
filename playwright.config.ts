import 'dotenv/config';

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
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    {
      name: 'setup-user',
      testMatch: /auth\.setup\.ts/,
      use: { ...devices['Pixel 5'] },
    },

    {
      name: 'Mobile Chrome',
      dependencies: ['setup-user'],
      use: {
        ...devices['Pixel 5'],
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000/app',
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_PUBLIC_LEGACY_APP_URL: 'https://balie-test.uitpas.be',
      NEXT_PUBLIC_LEGACY_TOKEN_ENDPOINT:
        'https://balie-test.uitpas.be/culturefeed/oauth/token',
      NEXT_PUBLIC_LEGACY_LOGOUT_ENDPOINT:
        'https://balie-test.uitpas.be/uitid/logout',
      NEXT_PUBLIC_LEGACY_API_PATH: 'https://balie-test.uitpas.be',
      NEXT_PUBLIC_API_PATH: 'https://api-test.uitpas.be',
      NEXT_PUBLIC_SEARCH_API_PATH: 'https://search-test.uitdatabank.be',
      NEXT_PUBLIC_ENTRY_API_PATH: 'https://io-test.uitdatabank.be',
      NEXT_PUBLIC_OAUTH_PATH:
        'https://balie-test.uitpas.be/culturefeed/oauth/connect',
      NEXT_PUBLIC_UITINVLAANDEREN_URL: 'https://test.uitinvlaanderen.be',
      NEXT_PUBLIC_UITDATABANK_URL: 'https://test.uitdatabank.be',
      NEXT_PUBLIC_OAUTH_USERINFO_PATH: 'https://account-test.uitid.be/userinfo',
      NEXT_PUBLIC_BASE_PATH: '/app',
    },
  },
});
