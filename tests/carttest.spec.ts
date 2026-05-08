import {test, expect} from '../fixtures/sauceFixtures'

test.describe('CART PAGE TESTS', ()=>{
    test.beforeEach(async ({inventoryPage, cartPage}) => {
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
        await inventoryPage.addProductToCart('Sauce Labs Onesie');
        await inventoryPage.goToCart();
    
    })
    test('Verify the Title of the page', async ({cartPage})=>{
        await expect(cartPage.title).toHaveText('Your Cart') 

    })
    test('Verify the Cart Badge Count', async ({cartPage})=>{
        const count = await cartPage.getCartBadgeCount();
        expect(count).toBe(3)
    })
    test('Verify the items Count in the Cart Page', async ({cartPage})=>{
        const count = await cartPage.getCartItemsCount();
        expect(count).toBe(3)
    })
    test('Verify the item names in the cart', async ({cartPage})=>{
        const names = await cartPage.getCartItemsNames()
        const expectedNames = [ 
            'Sauce Labs Bike Light',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie']
        expect(names).toEqual(expectedNames)

    })
    test('Verify Continue Shopping button functionality', async ({cartPage, page}) =>{
        await cartPage.continueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    } )
    test('Verify Checkout fucntionality', async({cartPage,page}) =>{
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    } )
    test('Verify Remove item from cart', async({cartPage})=>{
        await cartPage.removeItem('Sauce Labs Fleece Jacket')

        const count = await cartPage.getCartItemsCount();
        expect(count).toBe(2);

        const names = await cartPage.getCartItemsNames();
        await expect(names).not.toContain('Sauce Labs Fleece Jacket')
        })
       

    })
