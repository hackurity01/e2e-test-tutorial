import { expect, test } from "@playwright/test";
import { createUniqueSignupUser } from "../fixtures/users";
import { deleteAllByQuery } from "../helpers/api";
import { LoginPage } from "../pages/LoginPage";
import { Navbar } from "../pages/Navbar";
import { SignupPage } from "../pages/SignupPage";

test("회원가입 -> 로그인", async ({ page, request }) => {
  const user = createUniqueSignupUser();

  // cleanup (just in case)
  await deleteAllByQuery(request, `/users?email=${encodeURIComponent(user.email)}`);

  const signupPage = new SignupPage(page);
  const loginPage = new LoginPage(page);
  const navbar = new Navbar(page);

  await signupPage.goto();
  await signupPage.signup(user);
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByText(`${user.name} 님`)).toBeVisible();

  // verify login works separately
  await navbar.logoutIfVisible();
  await loginPage.goto();
  await loginPage.login(user.email, user.password);
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByText(`${user.name} 님`)).toBeVisible();

  // cleanup: remove created user for repeated runs
  await deleteAllByQuery(request, `/users?email=${encodeURIComponent(user.email)}`);
});

