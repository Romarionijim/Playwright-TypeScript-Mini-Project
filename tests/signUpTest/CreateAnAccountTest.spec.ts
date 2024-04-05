import { test } from '@playwright/test'
import { LumaMainPage } from '../../pages/LumaMainPage'
import { CreateAnAccountPage } from '../../pages/signUpPage/CreateAnAccountPage';
import Randomizer from '../../helpers/faker/FakeDataRandomizer';

test.describe('sign up to luma shopping website', async () => {
  let lumaMainPage: LumaMainPage;
  let createAnAccountPage: CreateAnAccountPage;
  let firstname = Randomizer.getRandomFirstName();
  let lastname = Randomizer.getRandomLastName();
  let email = Randomizer.getRandomEmail();
  let strongPasswordStrength = 'Password Strength: Strong';


  test.beforeEach(async ({ page }) => {
    lumaMainPage = new LumaMainPage(page);
    createAnAccountPage = new CreateAnAccountPage(page);
    await test.step('go to luma shopping website', async () => {
      await lumaMainPage.loadApp();
    })
  })

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  })

  test('sign up to luma website', { tag: ['@SIGN_UP'] }, async () => {
    await test.step('sign up to luma website with all mandatory credentials and validate password is strong', async () => {
      // let strongPassword = 'loginLumaPassword5588!@#'
      await createAnAccountPage.createNewCustomerAccount(firstname, lastname, email, strongPasswordStrength);
    })
  })
})