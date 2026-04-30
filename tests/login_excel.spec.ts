import { test, expect } from '@playwright/test'
import { LoginPageDataD } from '../pages/LoginPageDataD'
import { LoginData, readExcel } from '../utils/excelReader'


const testData: LoginData[] = readExcel('./test-data/LoginData.xlsx', 'Sheet');

test.describe('Login PAge tests', () => {
   // for (const data of testData as any[]) { 
   for (const data of testData) { 
        if (data.run !== 'yes') continue

        test(`Login test case - ${data.username}`, async ({ page }) => {
            const LoginPage = new LoginPageDataD(page);
            await LoginPage.gotoLoginPage();
            await LoginPage.loginFunctionality(data.username, data.password);

            if (data.expected === 'success') {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            }

            else {
                await expect(LoginPage.errorMessage).toBeVisible();
            }
        })
    }

})
