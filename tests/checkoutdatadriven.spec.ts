import { test, expect } from '../fixtures/sauceFixtures'
import { readData } from '../utils/unified_dataReader'

const testData = readData('./test-data/CheckoutData.csv')
console.log(testData)

test.describe('DATA DRIVEN TESTING OF CHECKOUT FILE', () => {
    test.beforeEach(async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
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
    for (const data of testData) {
        test(`Checkout form test with ${data.firstname || 'empty'} ${data.lastname || 'empty'} ${data.zipcode || 'empty'}`, async ({ checkoutPage, page }) => {
            test.skip(data.run !== 'yes', 'Run Flag = NO');

            await checkoutPage.fillCheckoutInfo(data.firstname, data.lastname, data.zipcode)

            await test.step('Validate Result', async () => {
                if (data.expected === 'success') {
                    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
                }
                else {
                    await expect(checkoutPage.errorMessage).toBeVisible();
                }

            })
        })
    }
})
