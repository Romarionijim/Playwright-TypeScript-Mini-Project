import { test } from '../../helpers/fixtures/customFixtures/CustomFixtures'

let clientSideValidationErrorsCount: number

test('login to Luma shopping website', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  await test.step('login to luma shopping website by providing email and password and validate user is logged in', async () => {
    const expecetdLoggedInUser: string = 'John Doe'
    await loginPage.loadApp();
    await loginPage.login();
    await loginPage.validateLoggedInUser(expecetdLoggedInUser);
  })
})

test('login with empty email', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  clientSideValidationErrorsCount = 1
  await test.step('login to luma by typing an empty email', async () => {
    await loginPage.loadApp();
    await loginPage.login('', undefined);
  })
})

test('login with empty password', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  await test.step('login to luma by typing an empty password', async () => {
    await loginPage.loadApp();
    await loginPage.login(undefined, '');
  })
})