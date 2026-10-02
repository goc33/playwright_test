import { expect, test } from '@playwright/test'

test('check_left_menu_options', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('heading', { name: 'Dashboard' }).isVisible()

    const list = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('list').getByRole('listitem')
    await list.first().waitFor({ state: 'visible' })
    const number_options = await list.count()
    const menu_options: string[] = []
    for (let i = 0; i < number_options; i++) {
        const item = await list.nth(i).innerText()
        menu_options.push(item)
    }

    console.log(menu_options)

    const expected_menu_items = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz']
    //Comparing that the menu options are the exected
    expect(menu_options).toEqual(expected_menu_items)
    //Comparing that the first menu option is Admin
    await expect(list.nth(0)).toHaveText('Admin')
})