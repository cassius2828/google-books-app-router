import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and displays hero content", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: /welcome to librislist/i })).toBeVisible();
  });

  test("has a Start Browsing link that navigates to /search", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const link = page.getByRole("link", { name: /start browsing/i });
    await expect(link).toBeVisible({ timeout: 15_000 });
    await link.click();
    await expect(page).toHaveURL(/\/search/);
  });
});
