import type { Page } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/signup');
  }

  async expectVisible() {
    await this.page.getByRole('heading', { name: '회원가입' }).waitFor({ state: 'visible' });
  }

  async fillName(name: string) {
    await this.page.getByLabel('이름').fill(name);
  }

  async fillEmail(email: string) {
    await this.page.getByLabel('이메일').fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByLabel('비밀번호').fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: '회원가입 완료하기' }).click();
  }

  async signup(name: string, email: string, password: string) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectRedirectToProducts() {
    await this.page.waitForURL('/products');
  }
}
