import 'dotenv/config';
import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ baseURL, page }) => {
  await page.goto(`${baseURL}/login?redirectTo=/`);

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await expect(
    page.getByRole('heading', { name: 'mobiele balie' })
  ).toBeVisible();

  await page.getByRole('link', { name: 'aanmelden' }).click();

  await page.waitForURL(/account-test.uitid.be\/*/);

  await page
    .locator('input[name="username"]')
    .fill(process.env.E2E_TEST_ADMIN_EMAIL ?? '');
  await page
    .getByLabel('Je wachtwoord')
    .fill(process.env.E2E_TEST_ADMIN_PASSWORD ?? '');

  await page.getByRole('button', { name: 'Meld je aan', exact: true }).click();

  await page.waitForLoadState('networkidle');

  // Modify cookies after login
  const cookies = await page.context().cookies();
  const phpSession = cookies.find((c) => c.name === 'PHPSESSID');

  if (phpSession) {
    await page.context().addCookies([
      {
        ...phpSession,
        sameSite: 'None',
        secure: true,
      },
    ]);
  }

  // Wait for network to be idle, if we save storage too early, needed storage values might not yet be available
  await page.context().storageState({ path: authFile });
});
