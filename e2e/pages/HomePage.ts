import type { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async clickBrowseProducts() {
    await this.page.getByRole('link', { name: '상품 둘러보기' }).click();
  }

  async clickSignup() {
    await this.page.getByRole('link', { name: '회원가입하기' }).click();
  }
}
