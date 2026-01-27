import type { Page } from "@playwright/test";

export class Navbar {
  constructor(private readonly page: Page) {}

  async goToCart() {
    await this.page.getByTestId("nav-cart").click();
  }

  async goToProducts() {
    await this.page.getByTestId("nav-products").click();
  }

  async logoutIfVisible() {
    const logoutButton = this.page.getByRole("button", { name: "로그아웃" });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    }
  }
}

