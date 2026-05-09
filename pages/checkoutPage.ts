import { Page, Locator } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page;
    //step1 locators
    readonly title: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    //step2 locators
    readonly summaryItems: Locator;
    readonly totalPrice: Locator;
    readonly finishButton: Locator;
   


    constructor(page: Page) {
        this.page = page;
        //step1 
        this.title = page.locator('[data-test="title"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.zipCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]')
        this.errorMessage = page.locator('[data-test="error"]')

        //step2
        this.summaryItems =page.locator('[data-test="inventory-item-name"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
       
    }

//step1 actions
    async fillCheckoutInfo(firstName:string, lastName: string, zipCode: string) {
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.zipCode.fill(zipCode)
        await this.continueButton.click()

    }
    async clickCancel() {
        await this.cancelButton.click();
    }
    async clickContinue(){
        await this.continueButton.click();
    }

//step2 actions
 
    async finishOrder(){
        await this.finishButton.click();
    }
    async getSummaryItems(): Promise <string[]>{
        const names = await this.summaryItems.allTextContents();
        return names;
    }
    async getTotalPrice(): Promise <string>{
        return await this.totalPrice.textContent() || '0.00';
    }
  




}