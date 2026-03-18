import { expect, test } from '@playwright/test';

test('Logout clears session and redirects to login', async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('button', { name: 'muntpunt' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('button', { name: 'dev tester' }).click();
  await page.getByRole('menuitem', { name: 'afmelden' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveURL('/login');

  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find((c) =>
    c.name.includes('next-auth.session-token'),
  );
  expect(sessionCookie).toBeUndefined();

  await page.goto(`${baseURL}/organizers`);
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveURL('/login');
});
