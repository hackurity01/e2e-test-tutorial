import type { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async expectVisible() {
    await this.page.getByRole('heading', { name: '로그인' }).waitFor({ state: 'visible' });
  }

  async fillEmail(email: string) {
    await this.page.getByTestId('login-email').fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByTestId('login-password').fill(password);
  }

  async submit() {
    await this.page.getByTestId('login-submit').click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectRedirectToProducts() {
    await this.page.waitForURL('/products');
  }
}
