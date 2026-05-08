import {Page, Locator} from '@playwright/test'

export class CheckoutCompletePage{
    readonly page: Page;
    readonly title: Locator;
    readonly headerMessage: Locator;
    readonly completetext: Locator;
    readonly backHomeButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.headerMessage = page.locator('[data-test="complete-header"]');
        this.completetext = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');

    }
    async goHome(){
        await this.backHomeButton.click();
    }





}
