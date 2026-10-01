import { test } from '@playwright/test'

test('get_employees', async ({ page }) => {

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
    const employee_list: string[] = []

    for (let i = 1; i < number_rows; i++) {

        const cell = rows.nth(i).getByRole('cell').nth(3)
        const employee = await cell.textContent()
        if (employee) {
            employee_list.push(employee)
        }
    }
    console.log(employee_list)
})