import { expect, type Page } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/cart");
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async waitForCartItems() {
    const cartItem = this.page.getByTestId("cart-item");
    await expect(cartItem).toBeVisible();
  }

  async checkout() {
    const checkoutButton = this.page.getByTestId("checkout-button");
    await expect(checkoutButton).toBeEnabled();
    await checkoutButton.click();
  }

  async waitForCheckoutSuccess() {
    await expect(
      this.page.getByText("주문이 완료되었어요. 감사합니다!"),
    ).toBeVisible({ timeout: 10000 });
  }

  async waitForEmptyCart() {
    await expect(
      this.page.getByText("장바구니가 비어 있어요. 상품을 담아보세요."),
    ).toBeVisible();
  }
}
