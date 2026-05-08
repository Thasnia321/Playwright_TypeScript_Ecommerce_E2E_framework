import {Page, Locator} from '@playwright/test'

export class InventoryPage{
    readonly page: Page;
    readonly title: Locator;
    readonly productItems: Locator;
    readonly productNames: Locator;
    readonly cartBadge: Locator;
    readonly cartIcon: Locator; 


constructor (page: Page){
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]')
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]') 
    this.cartIcon = this.page.locator('[data-test="shopping-cart-link"]')

}
//ACTIONS TO PERFORM
async addProductToCart(productName:string){
    await this.productItems.filter({hasText:productName}).getByRole('button', {name: 'Add to cart' }).click();
}
async removeProduct(productName: string){
    await this.productItems.filter({hasText:productName}).getByRole('button', {name: 'Remove'}).click();

}
async getCartBadgeCount(): Promise <number> {
    const count = await this.cartBadge.textContent();
    return parseInt(count || '0');
}
async goToCartPage(){
    await this.cartIcon.click();
}
async getProductCount(): Promise <number>{
    const prdcount = await this.productItems.count();
    return prdcount;
}
async getAllProductNames(): Promise <string[]>{
    const names = await this.productNames.allTextContents();
    return names;
}
async refreshPage() {
    await this.page.reload();
}
async goToCart(){
    await this.cartIcon.click();
}

}
