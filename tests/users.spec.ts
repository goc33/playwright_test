import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

test('get_usernames', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

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

test('edit_hardcoded_user', async ({ page }) => {

    const user = 'Jobinsam@6742'
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await page.getByRole('heading', { name: 'Dashboard' }).isVisible()
    await page.getByRole('link', { name: 'Admin' }).click()
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText("User Management").click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const edit_button = page.getByRole('table').getByRole('row').filter({ hasText: user }).locator('button').filter({ has: page.locator('i.bi-pencil-fill') })
    await edit_button.click()

    await expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(user)
})

test('edit_random_user', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await page.getByRole('heading', { name: 'Dashboard' }).isVisible()
    await page.getByRole('link', { name: 'Admin' }).click()
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText("User Management").click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row')
    await rows.first().waitFor({ state: 'visible' })
    const number_rows = await rows.count()
    let random_index = Math.floor(Math.random() * (number_rows - 1)) + 1
    let row_selected = rows.nth(random_index)
    let user = await row_selected.getByRole('cell').nth(1).innerText()
    let attempts = 0

    while (user == 'Admin' && attempts < (number_rows - 1)) {
        random_index = Math.floor(Math.random() * (number_rows - 1)) + 1
        row_selected = rows.nth(random_index)
        user = await row_selected.getByRole('cell').nth(1).innerText()
    }
    if (user === 'Admin') {
        throw new Error('No se encontró ningún usuario diferente de "Admin" en la tabla.')
    }

    const edit_button = page.getByRole('table').getByRole('row').filter({ hasText: user }).locator('button').filter({ has: page.locator('i.bi-pencil-fill') })
    await edit_button.click()

    await expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(user)
})