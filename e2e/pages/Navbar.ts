import { expect, type Page } from "@playwright/test";

export class Navbar {
  constructor(private readonly page: Page) {}

  async gotoProducts() {
    await this.page.getByTestId("nav-products").click();
    await expect(this.page).toHaveURL(/\/products/);
  }

  async gotoCart() {
    await this.page.getByTestId("nav-cart").click();
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async verifyCartCount(count: number) {
    await expect(this.page.getByTestId("nav-cart")).toContainText(
      count.toString(),
    );
  }

  async verifyLoggedIn(userName: string) {
    await expect(this.page.getByText(`${userName} 님`)).toBeVisible();
  }

  async logout() {
    const logoutButton = this.page.getByRole("button", { name: "로그아웃" });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
  }
}
