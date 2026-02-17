import { test, expect } from '@playwright/test';

test('Go to landingpage', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/app`);

  await page.screenshot({ path: 'landing-start.png' });

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await expect(
    page.getByRole('heading', { name: 'selecteer je balie' })
  ).toBeVisible();

  await expect(page.getByRole('button', { name: 'publiq vzw' })).toBeVisible();

  // Select counter
  await page.getByRole('button', { name: 'muntpunt' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await page.screenshot({ path: 'activity.png' });

  // Counter detail
  await expect(
    page.getByRole('heading', { name: 'kies een activiteit' })
  ).toBeVisible();

  await page.getByRole('button', { name: 'kom naar muntpunt' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  // Event detail
  await expect(
    page.getByRole('heading', { name: 'gekozen activiteit' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'kom naar muntpunt' })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'barcode scannen' })
  ).toBeVisible();

  // TODO make the pass number configurable
  await page.getByPlaceholder('Kaartnummer of RRN').fill('55100100130');

  await page.getByRole('button', { name: 'bevestig' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await expect(
    page.getByRole('heading', { name: 'Jean-Marie Hoffelinck' })
  ).toBeVisible();

  await expect(page.getByText('punt gespaard')).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Volgende uitpas scannen' })
  ).toBeVisible();
});
