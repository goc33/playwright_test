import { expect, test } from '@playwright/test'

test('valid_login', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible
})

test('invalid_login', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByRole('alert')).toBeVisible
})