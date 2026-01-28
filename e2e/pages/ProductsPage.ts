import type { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/products');
  }

  async expectVisible() {
    await this.page.getByRole('heading', { name: '오늘의 추천 상품' }).waitFor({ state: 'visible' });
  }

  async getFirstProductCard() {
    return this.page.getByTestId(/^product-card-/).first();
  }

  async getFirstProductId(): Promise<string> {
    const firstProductCard = await this.getFirstProductCard();
    const productId = await firstProductCard.getAttribute('data-testid');
    return productId?.replace('product-card-', '') || '';
  }

  async addFirstProductToCart() {
    const productId = await this.getFirstProductId();
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  async addProductToCart(productId: string) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }
}
