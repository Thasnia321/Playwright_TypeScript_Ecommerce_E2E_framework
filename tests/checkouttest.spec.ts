import { test, expect } from '../fixtures/sauceFixtures'
import { CheckoutPage } from '../pages/checkoutPage';


test.describe('Checkout Page Tests', () => {

    test.beforeEach(async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack')
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
    })
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'failed') {
            await testInfo.attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png'
            })
        }
    })

    test('Verify the page title', async ({ checkoutPage, page }) => {
        await expect(checkoutPage.title).toHaveText('Checkout: Your Information')
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    })
    test('Verify checkout functionality', async ({ checkoutPage, page }) => {
        await checkoutPage.fillCheckoutInfo('Thasni', 'Althayil', '234345');
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')

    })
    test('Verify Error message is displayed when one field is missing', async ({ checkoutPage }) => {
        await checkoutPage.fillCheckoutInfo('Thasni', 'Althayil', '');
        await expect(checkoutPage.errorMessage).toBeVisible();
    })
    test('Verify Error message is displayed when directly clicked on continue without entering any field', async ({ checkoutPage }) => {
        await checkoutPage.clickContinue();
        await expect(checkoutPage.errorMessage).toBeVisible();
    })

    test('Verify the functionality of cancel button', async ({ checkoutPage, page }) => {
        await checkoutPage.clickCancel();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

    })
    test('Verify finish Order', async ({ checkoutPage, page }) => {
        await checkoutPage.fillCheckoutInfo('Thasni', 'Althayil', '234345');
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')

    })
    test('Verify cancelling the order', async ({ checkoutPage, page }) => {
        await checkoutPage.fillCheckoutInfo('Thasni', 'Althayil', '234345');
        await checkoutPage.clickCancel();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })
    test('Verify the items in summary page', async ({ checkoutPage })=>{
        await checkoutPage.fillCheckoutInfo('Thasni', 'Althayil', '234345')
        const name = await checkoutPage.getSummaryItems();
        const expectedItem = ['Sauce Labs Backpack'];
        expect(name).toEqual(expectedItem);
    })
    test('Verify the total price', async ({ checkoutPage })=>{
        await checkoutPage.fillCheckoutInfo('Thasni', 'Althayil', '234345')
        const price = await checkoutPage.getTotalPrice()
        expect(price).toContain('$32.39')
    })








})