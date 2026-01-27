import type { Page } from "@playwright/test";

export class SignupPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/signup");
  }

  async signup(payload: { name: string; email: string; password: string }) {
    await this.page.getByLabel("이름").fill(payload.name);
    await this.page.getByLabel("이메일").fill(payload.email);
    await this.page.getByLabel("비밀번호").fill(payload.password);
    await this.page.getByRole("button", { name: "회원가입 완료하기" }).click();
  }
}

