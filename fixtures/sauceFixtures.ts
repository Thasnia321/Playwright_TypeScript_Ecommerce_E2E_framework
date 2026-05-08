import {test as base, Page} from '@playwright/test'
import { LoginPageDataD } from '../pages/LoginPageDataD'
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/cartPage'
import {CheckoutPage} from '../pages/checkoutPage'
import { CheckoutCompletePage } from '../pages/checkoutCompletePage'

type SauceFixtures = {
loginPage: LoginPageDataD,
inventoryPage: InventoryPage,
cartPage: CartPage,
checkoutPage: CheckoutPage,
checkoutCompletePage: CheckoutCompletePage,
authenticatedPage: Page,
 
}

export const test = base.extend<SauceFixtures>({
    loginPage: async({page}, use) =>{
        await use(new LoginPageDataD(page)) 
    },
    inventoryPage: async({page},use)=>{
        await use(new InventoryPage(page))
    },
     // Logs in and gives the test an already logged-in page
    authenticatedPage: async({page},use)=>{
        const loginPage = new LoginPageDataD(page);
        await loginPage.gotoLoginPage();
        await loginPage.loginFunctionality('standard_user', 'secret_sauce')
        await use(page);
        await page.close();
    },
    cartPage: async({authenticatedPage}, use)=>{
        await use(new CartPage(authenticatedPage))
    },
    checkoutPage: async({authenticatedPage}, use)=>{
        await use(new CheckoutPage(authenticatedPage))
    },
    checkoutCompletePage: async({authenticatedPage},use)=>{
        await use(new CheckoutCompletePage(authenticatedPage))
    }

    })

export {expect} from '@playwright/test'
     
