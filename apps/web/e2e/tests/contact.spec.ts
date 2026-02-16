import { expect, test } from '@playwright/test';

import { getContactPage } from '../pages/ContactPage';
import { setupE2eTestState } from '../utils/setup';

test.beforeEach(async ({ page }) => {
  await setupE2eTestState(page);
});

test(
  'contact page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    const contactPage = getContactPage(page);
    await contactPage.goto();

    await expect(contactPage.activeMenuItem).toHaveText('Contact');
    await expect(contactPage.headline).toBeVisible();
  },
);

test('contact form generates correct mailto link', async ({ page }) => {
  const contactPage = getContactPage(page);
  await contactPage.goto();

  const subject = 'Test Subject';
  const message = 'Test Message Content';

  await contactPage.subjectInput.fill(subject);
  await contactPage.messageInput.fill(message);

  const href = await contactPage.sendLink.getAttribute('href');
  expect(href).toContain('mailto:info@themostannoyingwebsite.com');
  expect(href).toContain(`subject=${encodeURIComponent(subject)}`);
  expect(href).toContain(`body=${encodeURIComponent(message)}`);
});

test('alternative email link is present', async ({ page }) => {
  const contactPage = getContactPage(page);
  await contactPage.goto();

  await expect(contactPage.emailLink).toBeVisible();
  await expect(contactPage.emailLink).toHaveAttribute(
    'href',
    'mailto:info@themostannoyingwebsite.com',
  );
});
