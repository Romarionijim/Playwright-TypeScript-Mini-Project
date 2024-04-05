import { test as base } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage/LoginPage';
import { LumaMainPage } from '../../../pages/LumaMainPage';
import { CreateAnAccountPage } from '../../../pages/createNewAccountPage/CreateAnAccountPage';

type MyFixtures = {
  loginPage: LoginPage;
  loadAppAndLogin: LoginPage;
  lumaMainPage: LumaMainPage;
  createAnAccountPage: CreateAnAccountPage;
  loadApplication: LumaMainPage;
}

/**
 * @description custom fixtures to promote reusability and prevent repeating same workflows in each test file
 */
export const test = base.extend<MyFixtures>({
  loadAppAndLogin: async ({ page }, use) => {
    let loginPage = new LoginPage(page);
    await loginPage.loadApp();
    await loginPage.login();
    await use(loginPage);
  },
  loadApplication: async ({ page }, use) => {
    let lumaMainPage = new LumaMainPage(page);
    await lumaMainPage.loadApp();
    await use(lumaMainPage);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  lumaMainPage: async ({ page }, use) => {
    await use(new LumaMainPage(page));
  },
  createAnAccountPage: async ({ page }, use) => {
    await use(new CreateAnAccountPage(page));
  },
})