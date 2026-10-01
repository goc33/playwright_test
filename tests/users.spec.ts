import { expect, test } from '@playwright/test'

test('get_usernames', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('heading', { name: 'Dashboard' }).isVisible()
    await page.getByRole('link', { name: 'Admin' }).click()
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText("User Management").click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row')
    const number_rows = await rows.count()
    const username_list: string[] = []

    for (let i = 1; i < number_rows; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()
        if (username) {
            username_list.push(username)
        }
    }

    console.log(username_list)
})