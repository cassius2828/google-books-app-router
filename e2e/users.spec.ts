import { test, expect } from "@playwright/test";

test.describe("Users page", () => {
  test("loads and shows Find Readers heading", async ({ page }) => {
    await page.goto("/users");
    await expect(
      page.getByRole("heading", { name: /find readers/i })
    ).toBeVisible();
  });

  test("has a search input", async ({ page }) => {
    await page.goto("/users");
    await expect(
      page.getByPlaceholder(/search by name/i)
    ).toBeVisible();
  });
});
