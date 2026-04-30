import {test, expect} from '@playwright/test'
import {LoginPageDataD} from '../pages/LoginPageDataD'
import loginData from '../test-data/loginData.json' 


const data = loginData as { 
    validUser: { username: string; password: string };
    invalidUser: { username: string; password: string };
};


test ('Valid Login', async ({page}) => {
    const loginPage = new LoginPageDataD(page);
    await loginPage.gotoLoginPage();
    await loginPage.loginFunctionality(data.validUser.username,data.validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    //await loginPage.loginFunctionality('standard_user', 'secret_sauce');
    //await loginPage.verifyLoginSuccess();

});

test('Invalid login',async ({page}) => {
    const loginPage = new LoginPageDataD(page);
    await loginPage.gotoLoginPage();
    await loginPage.loginFunctionality(data.invalidUser.username,data.invalidUser.password);
    await expect(loginPage.errorMessage).toBeVisible();
    
    
})