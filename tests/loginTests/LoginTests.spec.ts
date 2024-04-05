import { test } from '../../helpers/fixtures/customFixtures/CustomFixtures'


test('login to Luma shopping website', { tag: ['@LOGIN'] }, async ({ loginPage }) => {
  await test.step('login to luma shopping website by filling all mandatory fields', async () => {
    await loginPage.loadApp();
    await loginPage.login();
  })
})



