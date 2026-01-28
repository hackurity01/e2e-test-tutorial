import { test, expect } from '@playwright/test';
import { SignupPage, LoginPage, ProductsPage } from '../pages';
import { deleteUser, findUserByEmail, resetCartForUser, resetOrdersForUser } from '../helpers';
import { generateTestUser } from '../fixtures/users';

test.describe('회원가입 플로우', () => {
  let createdUserId: string | null = null;

  test.beforeEach(async () => {
    // 테스트 전 초기화
    createdUserId = null;
  });

  test.afterEach(async ({ request }) => {
    // 테스트 후 생성한 사용자 데이터 정리
    if (createdUserId) {
      await resetCartForUser(request, createdUserId);
      await resetOrdersForUser(request, createdUserId);
      await deleteUser(request, createdUserId);
    }
  });

  test('회원가입 -> 로그인', async ({ page, request }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // 고유한 테스트 사용자 생성
    const testUser = generateTestUser();

    // 1. 회원가입
    await signupPage.goto();
    await signupPage.expectVisible();
    await signupPage.signup(testUser.name, testUser.email, testUser.password);
    await signupPage.expectRedirectToProducts();

    // 2. 회원가입 후 상품 목록 페이지 확인
    await productsPage.expectVisible();

    // 생성한 사용자 ID 저장 (정리용)
    const user = await findUserByEmail(request, testUser.email);
    if (user) {
      createdUserId = user.id;
    }

    // 3. 로그아웃 (다음 단계인 로그인 테스트를 위해)
    await page.getByRole('button', { name: '로그아웃' }).click();

    // 4. 로그인
    await loginPage.goto();
    await loginPage.expectVisible();
    await loginPage.login(testUser.email, testUser.password);
    await loginPage.expectRedirectToProducts();

    // 5. 로그인 후 상품 목록 페이지 확인
    await productsPage.expectVisible();

    // 6. 로그인 상태 확인 (네비게이션 바에 사용자 이름이 표시되는지 확인)
    await expect(page.getByText(`${testUser.name} 님`)).toBeVisible();
  });
});
