import {test, expect} from '../fixtures/sauceFixtures'

test.describe('Checkout Complete Page Tests', ()=>{
    
    test.beforeEach(async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack')
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCheckoutInfo('Thasni', 'Althayil', '234345');
        await checkoutPage.finishOrder();

    })
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'failed') {
            await testInfo.attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png'
            })
        }
    })
    test('Verify the Page title', async({checkoutCompletePage,page})=>{
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
        await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!')
        
    })
    test('Verify the Message header', async({checkoutCompletePage})=>{
        const header = "Thank you for your order!";
        await expect(checkoutCompletePage.headerMessage).toHaveText(header)

    })

    test('Verify the Message text', async({checkoutCompletePage})=>{
        const messageText = "Your order has been dispatched, and will arrive just as fast as the pony can get there!";
        await expect(checkoutCompletePage.completetext).toHaveText(messageText)
        
    })
    test('Verify the Back home button fucntionality', async({checkoutCompletePage,page})=>{
        await checkoutCompletePage.goHome();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        
    })
    
})