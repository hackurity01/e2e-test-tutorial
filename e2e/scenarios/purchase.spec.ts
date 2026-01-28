import { expect } from "@playwright/test";
import {
  API_BASE_URL,
  resetCartForUser,
  resetOrdersForUser,
  test,
} from "../helper";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { Navbar } from "../pages/Navbar";
import { ProductsPage } from "../pages/ProductsPage";
import { TEST_USERS } from "../fixtures/testUsers";

test.describe("구매 시나리오", () => {
  const testEmail = TEST_USERS.demo.email;
  const testPassword = TEST_USERS.demo.password;
  let userId: string;

  test.beforeEach(async ({ page, request }) => {
    // 사용자 정보 가져오기 (API 호출)
    const userResponse = await request.get(
      `${API_BASE_URL}/users?email=${testEmail}`,
    );
    const users = (await userResponse.json()) as Array<{ id: string }>;
    userId = users[0]?.id || "";

    // 테스트 전 장바구니와 주문 내역 초기화
    if (userId) {
      await resetCartForUser(request, userId);
      await resetOrdersForUser(request, userId);
    }

    // 로그인
    const loginPage = new LoginPage(page);
    await loginPage.login(testEmail, testPassword);
  });

  test.afterEach(async ({ request }) => {
    // 테스트 후 장바구니와 주문 내역 초기화
    if (userId) {
      await resetCartForUser(request, userId);
      await resetOrdersForUser(request, userId);
    }
  });

  test("로그인 -> 상품 보기 -> 장바구니 담기 -> 구매하기", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const navbar = new Navbar(page);
    const cartPage = new CartPage(page);

    // 1. 상품 보기
    await productsPage.waitForProducts();
    const productId = await productsPage.addFirstProductToCart();

    // 2. 장바구니에 추가 확인
    await navbar.verifyCartCount(1);

    // 3. 장바구니 페이지로 이동
    await navbar.gotoCart();
    await cartPage.waitForCartItems();

    // 4. 구매하기
    await cartPage.checkout();
    await cartPage.waitForCheckoutSuccess();

    // 5. 장바구니가 비어있는지 확인
    await cartPage.waitForEmptyCart();
  });
});
