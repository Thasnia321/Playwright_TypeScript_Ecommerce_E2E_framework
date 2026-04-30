import {Page, Locator} from '@playwright/test';

export class LoginPageDataD{
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');

    }
     //actions to perform on the login page

    async gotoLoginPage(){
        await this.page.goto('https://www.saucedemo.com/'); }

    async loginFunctionality(user: string, pass: string){   
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click()
    }
    //commenting the below code as it an assertions and it should be in test file and not in the page object file
   // async verifyLoginSuccess(){
     //   await this.page.waitForURL('https://www.saucedemo.com/inventory.html');

    //}




}