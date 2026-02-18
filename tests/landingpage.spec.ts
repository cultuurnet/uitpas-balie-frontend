import { test, expect } from '@playwright/test';

const MUNTPUNT_ID = '28808C2F-0DB2-D2CF-F508ECB994D2505F';

test('Go to landingpage', async ({ page, baseURL }) => {
  test.setTimeout(120000); // 120 seconds (2 minutes)

  await page.goto(`${baseURL}/app`);
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await page.waitForTimeout(3000);

  await expect(
    page.getByRole('heading', { name: 'selecteer je balie' })
  ).toBeVisible();

  // Go to Muntpunt hardcoded:
  await page.goto(`${baseURL}/app/mobile/counters/${MUNTPUNT_ID}/activities`);

  // Select counter

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
