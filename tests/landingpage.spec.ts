import { test, expect } from '@playwright/test';

test('Go to landingpage', async ({ page }) => {
  await page.screenshot({ path: 'landing.png' });
});
