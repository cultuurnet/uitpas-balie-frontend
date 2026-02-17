import { test, expect } from '@playwright/test';

test('Go to landingpage', async ({ page, baseURL }) => {
  if (!baseURL) {
    return;
  }

  await page.goto(`${baseURL}/login?redirectTo=/`);

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await expect(
    page.getByRole('heading', { name: 'mobiele balie' })
  ).toBeVisible();
});
