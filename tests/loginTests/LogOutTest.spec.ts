import { expect } from '@playwright/test'
import { AccountHeaderOptions } from '@common'
import { test } from '@helpers'

test('logout basic test', { tag: ['@LOGIN'] }, async ({ loadAppAndLogin, loginPage }) => {
  let user: string = 'John Doe'
  let notLoggedInState: string = 'not-logged-in'
  await test.step('use the login fixture and validate user is logged in', async () => {
    await loginPage.validateLoggedInUser(user)
  })
  await test.step('sign out and validate user is signed out', async () => {
    await loginPage.clickAndChooseAccountOption(AccountHeaderOptions.SIGN_OUT);
    const loggedInState = await loginPage.getLoggedInState()
    expect(loggedInState).toBe(notLoggedInState);
  })
})