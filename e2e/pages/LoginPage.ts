import { expect, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/login");
    await expect(this.page).toHaveURL(/\/login/);
  }

  async fillEmail(email: string) {
    await this.page.getByTestId("login-email").fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByTestId("login-password").fill(password);
  }

  async submit() {
    await this.page.getByTestId("login-submit").click();
  }

  async login(email: string, password: string) {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
    await expect(this.page).toHaveURL(/\/products/);
  }

  async isLoggedIn() {
    return (await this.page.getByText("님").count()) > 0;
  }
}
