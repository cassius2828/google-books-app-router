import { test, expect } from "@playwright/test";

test.describe("Reading list page (anonymous)", () => {
  test("loads without crashing and shows sign-in content", async ({ page }) => {
    const response = await page.goto("/reading-list");
    expect(response?.status()).toBe(200);

    await expect(
      page.getByRole("heading", { name: /reading list/i })
    ).toBeVisible();
  });

  test("shows a sign-in call to action", async ({ page }) => {
    await page.goto("/reading-list");
    await expect(
      page.getByRole("button", { name: "Sign In to LibrisList" })
    ).toBeVisible();
  });
});
