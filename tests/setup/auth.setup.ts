import 'dotenv/config';

import { test as setup } from '@playwright/test';

import { authenticate } from './authenticate';

setup('authenticate', async ({ baseURL, page }) => {
  await authenticate(
    page,
    baseURL,
    {
      email: process.env.E2E_TEST_BASE_EMAIL ?? '',
      password: process.env.E2E_TEST_BASE_PASSWORD ?? '',
    },
    'playwright/.auth/user.json'
  );
});
