import { expect, test } from "@playwright/test";

test("article can be view from the home page", async ({ page }) => {
  await page.goto("/");

  const selector = page.getByTestId("cover-article").locator("a");
  await expect(selector).toBeVisible();
  await selector.click();

  await expect(page).toHaveURL(/\/en\/articles\/.*/);

  await page.getByTestId("article-item").isVisible();
  await page.getByTestId("article-item-content").isVisible();
  await page.getByTestId("paywall-overlay-confirm").isVisible();
  await page.getByTestId("paywall-overlay-cancel").isVisible();
});
