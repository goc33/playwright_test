import { test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

test('get_employees', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

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