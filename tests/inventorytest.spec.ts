
import { test, expect } from '../fixtures/sauceFixtures'


test.describe('Inventory Pages Tests', () => {
    test.beforeEach(async ({ authenticatedPage, inventoryPage }) => {
        await expect(inventoryPage.title).toHaveText('Products')

    })
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'failed') {
            await testInfo.attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png'
            })
        }
    })
    test('Verify the Product Count', async ({ inventoryPage }) => {
        const prdcount = await inventoryPage.getProductCount();
        expect(prdcount).toBe(6)

    })
    test('Verify the PageTitle', async ({ inventoryPage }) => {
        await expect(inventoryPage.title).toHaveText('Products')

    })
    test('Verify the Add to Cart action', async ({ inventoryPage }) => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack')
        expect(inventoryPage.cartBadge).toHaveCount(1)

    })
      test('Verify remove from cart action and badge count',async ({inventoryPage}) =>{
        await inventoryPage.addProductToCart('Sauce Labs Backpack')
        await inventoryPage.addProductToCart('Sauce Labs Bike Light')
        await inventoryPage.removeProduct('Sauce Labs Backpack')
        await expect(inventoryPage.cartBadge).toHaveText('1')

    })

    test('Verify Product names', async ({inventoryPage}) => {
        const names = await inventoryPage.getAllProductNames();
       // await expect(names).toContain('Sauce Labs Bike Light');
         const expectedNames = [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)']
         await expect(names).toEqual(expectedNames)
        
    })
    test('Verify cart badge count after refreshing the page', async ({inventoryPage}) => {
        await inventoryPage.addProductToCart('Test.allTheThings() T-Shirt (Red)');
        await inventoryPage.addProductToCart('Sauce Labs Onesie');
        await inventoryPage.refreshPage();
        await expect(inventoryPage.cartBadge).toHaveText('2')

    })
    test('Verify cart page is loaded', async({inventoryPage, page})=> {
        await inventoryPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    })
  
    

})
