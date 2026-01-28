import { expect, type Page } from "@playwright/test";

export class SignupPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/signup");
    await expect(this.page).toHaveURL(/\/signup/);
    await this.page.waitForLoadState("networkidle");
    await expect(
      this.page.getByRole("heading", { name: "회원가입" }),
    ).toBeVisible();
  }

  async fillName(name: string) {
    const nameInput = this.page.locator('input[type="text"]').first();
    await expect(nameInput).toBeVisible();
    await nameInput.fill(name);
  }

  async fillEmail(email: string) {
    const emailInput = this.page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill(email);
  }

  async fillPassword(password: string) {
    const passwordInput = this.page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(password);
  }

  async submit() {
    const signupButton = this.page.getByRole("button", {
      name: "회원가입 완료하기",
    });
    await expect(signupButton).toBeVisible();
    await signupButton.click();
  }

  async signup(name: string, email: string, password: string) {
    await this.goto();
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
    await expect(this.page).toHaveURL(/\/products/, { timeout: 10000 });
  }
}
