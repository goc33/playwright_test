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

test('navigate_left_panel', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('heading', { name: 'Dashboard' }).isVisible()

    const list = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('list').getByRole('listitem')
    await list.first().waitFor({ state: 'visible' })
    const number_options = await list.count()

    for (let i = 0; i < number_options; i++) {
        const item = await list.nth(i).innerText()
        await list.getByText(item).click()
        if (item == 'My Info') {
            expect(await page.getByRole('heading', { name: 'Personal Details' }).isVisible())
        }
        else if (item == 'Maintenance') {
            expect(await page.getByRole('heading', { name: 'Administrator Access' }).isVisible())
            await page.getByRole('button', { name: 'Cancel' }).click()
            await list.first().waitFor({ state: 'visible' })
        }
        else {
            await expect(page.getByRole('heading', { name: item, level: 6, exact: true })).toBeVisible()
        }
    }
})

test('check_qualifications_urls', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('heading', { name: 'Dashboard' }).isVisible()
    await page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('list').getByRole('listitem').getByText('Admin').click()

    const dropdown_menu = page.getByRole('listitem').filter({ hasText: 'Qualifications' })
    await dropdown_menu.click()
    await dropdown_menu.first().waitFor({ state: 'visible' })
    const number_items = await dropdown_menu.getByRole('menu').getByRole('menuitem').count()

    for (let i = 0; i < number_items; i++) {
        if (i != 0) {
            await dropdown_menu.click()
            await dropdown_menu.first().waitFor({ state: 'visible' })
        }
        const menu_option = await dropdown_menu.getByRole('menu').getByRole('menuitem').nth(i).innerText()
        await dropdown_menu.getByRole('menu').getByRole('menuitem', { name: menu_option }).click()
        switch (menu_option) {
            case "Skills":
                await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSkills')
                break
            case "Education":
                await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewEducation')
                break
            case "Licenses":
                await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewLicenses')
                break
            case "Languages":
                await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewLanguages')
                break
            case "Memberships":
                await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/membership')
                break
        }
    }
})

test('check_organization_urls', async ({ page }) => {

    const expected_pages = [
        {
            menu: 'General Information',
            url: '/web/index.php/admin/viewOrganizationGeneralInformation'
        },
        {
            menu: 'Locations',
            url: '/web/index.php/admin/viewLocations'
        },
        {
            menu: 'Structure',
            url: '/web/index.php/admin/viewCompanyStructure'
        }
    ]

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('heading', { name: 'Dashboard' }).isVisible()
    await page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('list').getByRole('listitem').getByText('Admin').click()

    await page.getByRole('listitem').filter({ hasText: 'Organization' }).click()
    const menu_items = page.getByRole('menu').locator('li')

    for (let expected_page of expected_pages) {
        const menu_option = menu_items.filter({ hasText: expected_page.menu })
        await menu_option.click()
        await expect(page).toHaveURL(new RegExp(expected_page.url))
        await page.getByRole('listitem').filter({ hasText: 'Organization' }).click()
    }
})