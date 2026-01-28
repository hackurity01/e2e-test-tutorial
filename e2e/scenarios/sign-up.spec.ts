import { expect } from "@playwright/test";
import { API_BASE_URL, test } from "../helper";
import { LoginPage } from "../pages/LoginPage";
import { Navbar } from "../pages/Navbar";
import { SignupPage } from "../pages/SignupPage";
import {
  generateTestEmail,
  TEST_USER_DATA,
} from "../fixtures/testUsers";

test.describe("회원가입 시나리오", () => {
  test.beforeEach(async ({ request }) => {
    // 테스트 전 기존 테스트 사용자 정리 (이전 테스트에서 남은 데이터)
    const testUsers = await request.get(
      `${API_BASE_URL}/users?email_like=test-`,
    );
    const users = (await testUsers.json()) as Array<{ id: string }>;
    if (users.length > 0) {
      await Promise.all(
        users.map((user) =>
          request.delete(`${API_BASE_URL}/users/${user.id}`),
        ),
      );
    }
  });

  test.afterEach(async ({ request }) => {
    // 테스트 후 생성된 테스트 사용자 삭제
    const testUsers = await request.get(
      `${API_BASE_URL}/users?email_like=test-`,
    );
    const users = (await testUsers.json()) as Array<{ id: string }>;
    if (users.length > 0) {
      await Promise.all(
        users.map((user) =>
          request.delete(`${API_BASE_URL}/users/${user.id}`),
        ),
      );
    }
  });

  test("회원가입 -> 로그인", async ({ page }) => {
    const testEmail = generateTestEmail();
    const signupPage = new SignupPage(page);
    const navbar = new Navbar(page);
    const loginPage = new LoginPage(page);

    // 1. 회원가입
    await signupPage.signup(
      TEST_USER_DATA.name,
      testEmail,
      TEST_USER_DATA.password,
    );

    // 2. 회원가입 후 상품 페이지 확인
    await expect(page.getByText("오늘의 추천 상품")).toBeVisible();

    // 3. 로그인 상태 확인
    await navbar.verifyLoggedIn(TEST_USER_DATA.name);

    // 4. 로그아웃
    await navbar.logout();

    // 5. 다시 로그인
    await loginPage.login(testEmail, TEST_USER_DATA.password);

    // 6. 로그인 후 상품 페이지 확인
    await expect(page.getByText("오늘의 추천 상품")).toBeVisible();

    // 7. 로그인 상태 확인
    await navbar.verifyLoggedIn(TEST_USER_DATA.name);
  });
});
