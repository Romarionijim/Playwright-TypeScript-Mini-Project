import { test as base } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage/LoginPage';
import { LumaMainPage } from '../../../pages/LumaMainPage';
import { CreateAnAccountPage } from '../../../pages/createNewAccountPage/CreateAnAccountPage';
import { MenCategoryPage } from '../../../pages/men/MenCategoryPage';
import { CheckoutShippingPage } from '../../../pages/checkoutPage/CheckOutShippingPage';
import { CheckoutReviewAndPaymentPage } from '../../../pages/checkoutPage/CheckoutReviewAndPaymentPage';
import { ShoppingCartPage } from '../../../pages/cartPage/ShoppingCartPage';
import { WomenCategoryPage } from '../../../pages/women/WomenCategoryPage';

type MyFixtures = {
  loginPage: LoginPage;
  loadAppAndLogin: LoginPage;
  lumaMainPage: LumaMainPage;
  createAnAccountPage: CreateAnAccountPage;
  loadApplication: LumaMainPage;
  menCategoryPage: MenCategoryPage;
  checkoutShippingPage: CheckoutShippingPage;
  checkoutPaymentPage: CheckoutReviewAndPaymentPage;
  shoppingCartPage: ShoppingCartPage;
  womenCategoryPage: WomenCategoryPage;
}

/**
 * @description custom fixtures to promote reusability and prevent repeating same workflows in each test file
 */
export const test = base.extend<MyFixtures>({
  loadAppAndLogin: async ({ page, context }, use) => {
    let loginPage = new LoginPage(page);
    await loginPage.loadApp();
    await loginPage.login();
    await use(loginPage);
    await context.clearCookies()
  },
  loadApplication: async ({ page, context }, use) => {
    let lumaMainPage = new LumaMainPage(page);
    await lumaMainPage.loadApp();
    await use(lumaMainPage);
    await context.clearCookies();
  },
  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page));
    await context.clearCookies();
  },
  lumaMainPage: async ({ page, context }, use) => {
    await use(new LumaMainPage(page));
    await context.clearCookies();
  },
  createAnAccountPage: async ({ page, context }, use) => {
    await use(new CreateAnAccountPage(page));
    await context.clearCookies();
  },
  menCategoryPage: async ({ page, context }, use) => {
    await use(new MenCategoryPage(page));
    await context.clearCookies();
  },
  checkoutShippingPage: async ({ page, context }, use) => {
    await use(new CheckoutShippingPage(page))
    await context.clearCookies();
  },
  checkoutPaymentPage: async ({ page, context }, use) => {
    await use(new CheckoutReviewAndPaymentPage(page))
    await context.clearCookies();
  },
  shoppingCartPage: async ({ page, context }, use) => {
    await use(new ShoppingCartPage(page));
    await context.clearCookies();
  },
  womenCategoryPage: async ({ page, context }, use) => {
    await use(new WomenCategoryPage(page));
    await context.clearCookies();
  }
})