import type { Locator, Page } from '@playwright/test';

// Since Shadcn uses custom HTML elements for select dropdowns, we can't use
// build in combobox selector :( Thus we need this alrenative wrapper.
export async function selectOption(
  page: Page,
  comboboxSelector: Locator,
  value: string,
) {
  await comboboxSelector.click();
  await page.getByRole('option', { name: value, exact: true }).click();
}
