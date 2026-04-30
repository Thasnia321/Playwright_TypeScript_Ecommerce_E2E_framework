import { expect, test } from '@playwright/test'
import loginData from '../test-data/loginDataNew.json'
import { LoginPageDataD } from '../pages/LoginPageDataD';

loginData.forEach((data) => {

    if (!data.run) return;

    test(`Login Test - ${data.username}`, async ({ page }) => {

        const loginPage = new LoginPageDataD(page);
        await loginPage.gotoLoginPage();
        await loginPage.loginFunctionality(data.username, data.password);

        if (data.expected === 'success') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        } else {
            await expect(loginPage.errorMessage).toBeVisible();
        }

    });
});






// import { test, expect } from '@playwright/test'
// import { LoginPageDataD } from '../pages/LoginPageDataD'
// import loginDataRaw from '../test-data/loginDataNew.json'

// type LoginData = {
//     run: boolean;
//     username: string;
//     password: string;
//     expected: string;
// }

// const loginData = loginDataRaw as LoginData[];

// loginData.forEach((data: LoginData) => {
//     if (!data.run) return;

//     test(`Login test - ${data.username}`, async ({ page }) => {
//         const loginPage = new LoginPageDataD(page);
//         await loginPage.gotoLoginPage();
//         await loginPage.loginFunctionality(data.username, data.password);

//         if (data.expected === "success") {
//             await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//         } else {
//             await expect(loginPage.errorMessage).toBeVisible();
//         }
//     });
// });