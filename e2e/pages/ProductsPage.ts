import { expect, type Page } from "@playwright/test";

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/products");
    await expect(this.page).toHaveURL(/\/products/);
  }

  async waitForProducts() {
    await expect(this.page.getByText("오늘의 추천 상품")).toBeVisible();
  }

  async getFirstProductId(): Promise<string> {
    const productCards = this.page.locator('[data-testid^="product-card-"]');
    await expect(productCards.first()).toBeVisible();
    const firstProductCard = productCards.first();
    const productCardId =
      (await firstProductCard.getAttribute("data-testid")) || "";
    return productCardId.replace("product-card-", "");
  }

  async addToCart(productId: string) {
    const addToCartButton = this.page.getByTestId(`add-to-cart-${productId}`);
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
  }

  async addFirstProductToCart() {
    const productId = await this.getFirstProductId();
    await this.addToCart(productId);
    return productId;
  }
}
