// @ts-check
import { PlaywrightTestConfig, defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.TEST_ENV}` });

interface TestConfig extends PlaywrightTestConfig {
  baseUrl: string;
  cartApiUrl: string;
}

const defaultConfig: PlaywrightTestConfig = {
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
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'https://api.practitest.com/api/v2',
    // extraHTTPHeaders: {
    //   "Authorization": "Basic cmF2aS5tZW5uZW5pQHRjZ3BsYXllci5jb206NTVhZjQ1MTgzOTc0ZGYzZmIwYzE2ZmM5N2YzMmVjMjk5YTcxMjgzYQ=="
    // },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
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
    }
  ]
};

const qaConfig: TestConfig = {
  baseUrl: 'https://www.tcgplayer-qa.com',
  cartApiUrl: 'https://capi-awsqa.tcgplayer-qa.com'
}

const stgConfig: TestConfig = {
  baseUrl: 'https://www.tcgplayer-stg.com',
  cartApiUrl: 'https://capi-awsstg.tcgplayer-stg.com'
}

const environment = process.env.TEST_ENV || 'qa';

const config: TestConfig = {
  ...defaultConfig,
  ...(
    environment === 'stg' ? stgConfig : qaConfig
  )
};

export default defineConfig(config);