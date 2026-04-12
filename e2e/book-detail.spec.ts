import { test, expect } from "@playwright/test";

const STABLE_VOLUME_ID = "zyTCAlFPjgYC";

test.describe("Book detail page", () => {
  test("loads without crashing", async ({ page }) => {
    const response = await page.goto(`/books/${STABLE_VOLUME_ID}`);
    expect(response?.status()).toBe(200);
  });

  test("shows a loading state or book content", async ({ page }) => {
    await page.goto(`/books/${STABLE_VOLUME_ID}`);
    const hasContent = await page
      .locator("h1, h2, [alt]")
      .first()
      .waitFor({ timeout: 15_000 })
      .then(() => true)
      .catch(() => false);
    expect(hasContent).toBe(true);
  });
});
