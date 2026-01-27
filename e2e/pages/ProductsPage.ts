import type { Page } from "@playwright/test";

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async addToCart(productId: number) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }
}

