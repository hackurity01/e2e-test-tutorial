import type { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/cart');
  }

  async expectVisible() {
    await this.page.getByRole('heading', { name: '장바구니 목록' }).waitFor({ state: 'visible' });
  }

  async getFirstCartItem() {
    return this.page.getByTestId('cart-item').first();
  }

  async expectCartItemVisible() {
    await this.getFirstCartItem().waitFor({ state: 'visible' });
  }

  async clickCheckout() {
    await this.page.getByTestId('checkout-button').click();
  }

  async expectCheckoutButtonEnabled() {
    await this.page.getByTestId('checkout-button').waitFor({ state: 'visible' });
    const isEnabled = await this.page.getByTestId('checkout-button').isEnabled();
    if (!isEnabled) {
      throw new Error('Checkout button is not enabled');
    }
  }

  async expectOrderCompleteMessage() {
    await this.page.getByText('주문이 완료되었어요. 감사합니다!').waitFor({ state: 'visible' });
  }
}
