import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage'


test ('Login functionality', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.loginFunctionality('standard_user', 'secret_sauce');
    await loginPage.verifyLoginSuccess();

})
    