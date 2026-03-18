import { expect, test } from '@playwright/test';

test('Go to organizers page', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveURL('/organizers');
  await expect(
    page.getByRole('heading', { name: 'selecteer een balie' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'muntpunt' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'publiq vzw' })).toBeVisible();

  const searchInput = page.getByPlaceholder('Zoek balie');
  await searchInput.fill('Munt');
  await expect(page.getByRole('button', { name: 'muntpunt' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'publiq vzw' }),
  ).not.toBeVisible();

  await searchInput.fill('blah');
  await expect(
    page.getByText("Er werden geen balies gevonden met de zoekterm 'blah'."),
  ).toBeVisible();

  await searchInput.clear();
  await expect(page.getByRole('button', { name: 'muntpunt' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'publiq vzw' })).toBeVisible();

  await page.getByRole('button', { name: 'muntpunt' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { name: 'homepage' })).toBeVisible();

  await page.goto('/organizers');

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL('/organizers');

  const organizerList = page
    .locator('ul')
    .filter({ hasText: 'Laatst gebruikt' });
  await expect(organizerList).toBeVisible();
  await expect(
    organizerList.getByRole('button', { name: 'Muntpunt' }),
  ).toBeVisible();
  await expect(page.getByText('Andere balies')).toBeVisible();
});
