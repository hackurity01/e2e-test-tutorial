import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage, CartPage } from '../pages';
import { resetCartForUser, resetOrdersForUser } from '../helpers';
import { DEMO_USER } from '../fixtures/users';

test.describe('구매 플로우', () => {
  test.beforeEach(async ({ request }) => {
    // 테스트 전 장바구니와 주문 초기화
    await resetCartForUser(request, DEMO_USER.id);
    await resetOrdersForUser(request, DEMO_USER.id);
  });

  test.afterEach(async ({ request }) => {
    // 테스트 후 장바구니와 주문 정리
    await resetCartForUser(request, DEMO_USER.id);
    await resetOrdersForUser(request, DEMO_USER.id);
  });

  test('로그인 -> 상품 보기 -> 장바구니 담기 -> 구매하기', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // 1. 로그인
    await loginPage.goto();
    await loginPage.expectVisible();
    await loginPage.login(DEMO_USER.email, DEMO_USER.password);
    await loginPage.expectRedirectToProducts();

    // 2. 상품 목록 확인
    await productsPage.expectVisible();
    await productsPage.getFirstProductCard().waitFor({ state: 'visible' });

    // 3. 첫 번째 상품을 장바구니에 담기
    await productsPage.addFirstProductToCart();

    // 4. 장바구니 페이지로 이동
    await cartPage.goto();
    await cartPage.expectVisible();

    // 5. 장바구니에 상품이 담겼는지 확인
    await cartPage.expectCartItemVisible();

    // 6. 구매하기
    await cartPage.expectCheckoutButtonEnabled();
    await cartPage.clickCheckout();

    // 7. 구매 완료 메시지 확인
    await cartPage.expectOrderCompleteMessage();
  });
});
