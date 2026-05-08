import {Page, Locator} from '@playwright/test'

export class CartPage{
    readonly page: Page;
    readonly title: Locator;
    readonly cartBadge: Locator;
    readonly continueButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartItem: Locator;
    readonly cartItemName: Locator; 


constructor(page:Page){
    this.page = page;
    this.title = page.locator('[data-test="title"]')
    this.continueButton = page.locator('[data-test="continue-shopping"]')
    this.checkoutButton = page.locator('[data-test="checkout"]')
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
    this.cartItem = page.locator('[data-test="inventory-item"]');
    this.cartItemName = page.locator('[data-test="inventory-item-name"]')

   
}
async continueShopping(){
    await this.continueButton.click();
}
async proceedToCheckout(){
    await this.checkoutButton.click();
}
async getCartBadgeCount(): Promise <number> {
   const count = await this.cartBadge.textContent();
   return  parseInt(count || '0');
}
async getCartItemsCount(): Promise <number>{
    const count = await this.cartItem.count();
    return count;
}
async getCartItemsNames(): Promise <string[]>{
    const names = await this.cartItemName.allTextContents();
    return names;
}
async removeItem(productName: string){
    await this.cartItem.filter({hasText:productName}).getByRole('button').click();

}

}