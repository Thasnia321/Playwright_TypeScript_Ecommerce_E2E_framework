import {test,expect} from '../fixtures/sauceFixtures'

test.describe('End To End Testing of Saucedemo Ecommerce website',() =>{
       test('End to end flow', async ({page,loginPage,inventoryPage,cartPage,checkoutPage,checkoutCompletePage}) =>{

        await loginPage.gotoLoginPage();
        await loginPage.loginFunctionality('standard_user','secret_sauce')
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

        await inventoryPage.addProductToCart('Sauce Labs Backpack')
        await inventoryPage.addProductToCart('Sauce Labs Bike Light')
        const count = await inventoryPage.getCartBadgeCount()
        expect(count).toBe(2)
        await inventoryPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

        const itemcount = await cartPage.getCartItemsCount();
        expect(itemcount).toBe(2)
        await cartPage.removeItem('Sauce Labs Bike Light')
        const name = await cartPage.getCartItemsNames()
        const expectedName = ['Sauce Labs Backpack']
        expect(name).toEqual(expectedName)
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')

        await checkoutPage.fillCheckoutInfo('Thasni','Alathayil','23434')
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
        const header = "Thank you for your order!";
        await expect(checkoutCompletePage.headerMessage).toHaveText(header)
        await checkoutCompletePage.goHome();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        




    })
})


    
    
    








