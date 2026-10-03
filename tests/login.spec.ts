import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

test('valid_login', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('invalid_login', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', '123')
    await expect(page.getByRole('alert')).toBeVisible()
})