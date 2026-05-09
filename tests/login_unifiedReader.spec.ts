import { test, expect } from '@playwright/test'
import { LoginPageDataD } from '../pages/LoginPageDataD'
import { readData } from '../utils/unified_dataReader'

//const testData = readData('./test-data/LoginData.csv');
//const testData = readData('./test-data/LoginData.xlsx', 'Sheet');
const testData = readData('./test-data/loginDataNew.json')
console.log('Loaded test data:', testData);

test.describe('Login PAge tests', () => {
  
   for (const data of testData) { 


        test(`Login test case - ${data.username}`, async ({ page }) => {

            test.skip(data.run !== 'yes', 'Run Flag=NO');

            const LoginPage = new LoginPageDataD(page);
            await test.step('Go to login page', async () => {
                await LoginPage.gotoLoginPage();
            });
            await test.step('Perform Login', async () => {
                await LoginPage.loginFunctionality(data.username, data.password);
            });

            await test.step('Validate Result', async () => {
            if (data.expected === 'success') {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            }

            else {
                await expect(LoginPage.errorMessage).toBeVisible();
            }
        })
        })
    }
    })
