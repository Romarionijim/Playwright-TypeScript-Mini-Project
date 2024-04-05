import { test } from '@playwright/test'
import { LumaMainPage } from '../../pages/LumaMainPage'
import { LoginPage } from '../../pages/loginPage/LoginPage';

test.describe('sanity login tests for Luma shopping website', async () => {
  let lumaMainPage: LumaMainPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    lumaMainPage = new LumaMainPage(page);
    loginPage = new LoginPage(page);
  })

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  })

  test('login to Luma shopping website', { tag: ['@LOGIN'] }, async () => {
    await test.step('login to luma shopping website by filling all mandatory fields', async () => {
      await lumaMainPage.loadApp();
      await loginPage.login()
    })
  })
})