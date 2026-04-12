import { test, expect } from "@playwright/test";

test.describe("Search page", () => {
  test("loads and shows the search heading", async ({ page }) => {
    await page.goto("/search");
    await expect(
      page.getByRole("heading", { name: /find your next read/i })
    ).toBeVisible();
  });

  test("has a search input", async ({ page }) => {
    await page.goto("/search");
    await expect(
      page.getByRole("textbox").or(page.locator("input[type='search'], input[type='text']")).first()
    ).toBeVisible();
  });

  test("has an Advanced Search link that navigates correctly", async ({ page }) => {
    await page.goto("/search");
    const link = page.getByRole("link", { name: /advanced search/i });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/search\/advanced/);
  });
});

test.describe("Advanced Search page", () => {
  test("loads and renders form sections", async ({ page }) => {
    await page.goto("/search/advanced");

    await expect(page.getByText("Find results")).toBeVisible();
    await expect(page.getByText("Narrow your results by")).toBeVisible();
    await expect(page.getByText("Search options")).toBeVisible();
  });
});
