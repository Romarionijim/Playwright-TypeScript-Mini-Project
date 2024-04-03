import { test } from '@playwright/test'
import { BasePage } from '../pages/BasePage'

test.describe('simple', async () => {
  let basePage: BasePage

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page)
    await test.step('load website', async () => {
      await basePage.goto()
    })
  })

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  })

  test('login to sauce demo', { tag: ['@login'] }, async ({ page }) => {
    await test.step('login to sauce', async () => {

    })
  })
})