import { Page } from '@playwright/test';

async function authenticate(
  page: Page,
  baseURL: string | undefined,
  credentials: { email: string; password: string },
  authFile: string,
) {
  await page.goto(`${baseURL}/login?redirectTo=/`);

  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('button', { name: 'aanmelden' }).click();

  await page.waitForURL(/account-test.uitid.be\/*/);

  await page.locator('input[name="username"]').fill(credentials.email);
  await page.getByLabel('Je wachtwoord').fill(credentials.password);

  await page.getByRole('button', { name: 'Meld je aan', exact: true }).click();

  await page.waitForLoadState('networkidle');

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

  await page.context().storageState({ path: authFile });
}

export { authenticate };
