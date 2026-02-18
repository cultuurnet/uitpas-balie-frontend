import { test, expect } from '@playwright/test';

test('Go to landingpage', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/app`);
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

  // Counter detail
  await expect(
    page.getByRole('heading', { name: 'kies een activiteit' })
  ).toBeVisible();

  await page.getByRole('button', { name: 'schaken in het muntpunt' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  // Event detail
  await expect(
    page.getByRole('heading', { name: 'gekozen activiteit' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'schaken in het muntpunt' })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'barcode scannen' })
  ).toBeVisible();

  await page.getByRole('button', { name: 'bevestig' }).click();
  // Get validation error
  await expect(page.getByText('Dit veld is verplicht')).toBeVisible();

  // TODO make the pass number configurable
  await page.getByPlaceholder('Kaartnummer of RRN').fill('55100100130');

  await page.getByRole('button', { name: 'bevestig' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await expect(
    page.getByRole('heading', { name: 'Jean-Marie Hoffelinck' })
  ).toBeVisible();

  await expect(page.getByText('punt gespaard')).toBeVisible();

  await page.getByRole('button', { name: 'kies tarief' }).click();

  await expect(
    page.getByText('Er zijn momenteel geen kortingen beschikbaar')
  ).toBeVisible();

  await page.getByRole('button', { name: 'sluiten' }).click();

  await page.getByRole('button', { name: 'voordeel omruilen' }).click();

  await expect(
    page.getByText('eerlijk kopje koffie in Muntpunt')
  ).toBeVisible();

  await page.getByRole('button', { name: 'Omruilen (2 punten)' }).click();

  await expect(page.getByText('voordeel omgeruild')).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Volgende uitpas scannen' })
  ).toBeVisible();

  // Scan MIA card
  await page.getByPlaceholder('Kaartnummer of RRN').fill('0900011354819');

  await page.getByRole('button', { name: 'bevestig' }).click();

  await expect(
    page.getByRole('heading', { name: 'Bernadette De Los Palmas' })
  ).toBeVisible();

  // Should have kansenstatuut
  await expect(page.getByText('kansenstatuut geldig')).toBeVisible();

  await page.getByRole('button', { name: 'kies tarief' }).click();

  await expect(
    page.getByRole('heading', { name: 'kansentarief' })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'tarief toekennen (€  2)' })
  ).toBeVisible();

  await expect(page.getByText('korting geregistreerd (€ 2)')).toBeVisible();
});
