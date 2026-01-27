import type { Page } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {}

  async checkout() {
    await this.page.getByTestId("checkout-button").click();
  }
}

