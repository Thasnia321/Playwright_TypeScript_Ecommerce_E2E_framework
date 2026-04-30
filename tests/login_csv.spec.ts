import { expect, test } from '@playwright/test'
import { LoginPageDataD } from '../pages/LoginPageDataD';
import { readCSV } from '../utils/csvReader'

const loginData = readCSV('test-data/LoginData.csv');

loginData.forEach((data: any) => {
    if (data.run !== 'true') return;

    test(`Login test - ${data.username}`, async ({ page }) => {

        const LoginPage = new LoginPageDataD(page);
        await LoginPage.gotoLoginPage();
        await LoginPage.loginFunctionality(data.username, data.password);

        if (data.expected === 'success') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        }
        else {
            await expect(LoginPage.errorMessage).toBeVisible();
        }
    });
});

