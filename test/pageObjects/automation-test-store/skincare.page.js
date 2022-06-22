import BasePage from "./base.page";
import ItemComponent from '../automation-test-store/components/item.comp';
import userNavigationMenu from "./components/user-navigation-menu.comp";
import CartPage from "./cart.page";

class SkinCarePage extends BasePage {
    get itemComponent() {
        return ItemComponent;
    }

    async addSpecificItems_ValidateTotal(...items) {
        const skincareProducts_HeaderLinks = await ItemComponent.itemHeaderLinks;

        const itemPrices = [];
        
        for (const header of skincareProducts_HeaderLinks) {
            const tempHeaderText = await header.getText();
            if (items.some(item => tempHeaderText.toLocaleLowerCase() == item.toLocaleLowerCase())) {
                const attr = await header.getAttribute('href');
                const itemID = attr.split('id=').pop();

                let locator = `//a[@data-id='${itemID}']`;
                await $(locator).click();
                itemPrices.push(
                    await $("//a[@data-id='" + itemID + "']/following-sibling::div/div[@class='pricenew'] "
                    + "| //a[@data-id='" + itemID + "']/following-sibling::div/div[@class='oneprice']").getText()
                ); 
            }
        }

        let totalPrice = 0;
        itemPrices.forEach(item => {
            totalPrice += parseFloat(item.replace('$', ''));
        });

        await userNavigationMenu.userMenuLink('Cart').click();
        
        expect(browser).toHaveUrlContaining('checkout');

        let tmpShippingRate = await CartPage.shippingRate.getText();
        let shippingRate = tmpShippingRate.replace('$', '');
        totalPrice += parseFloat(shippingRate);

        let cartTotal = parseFloat((await CartPage.cartTotalPrice.getText()).replace('$', ''));
        expect(totalPrice).toEqual(cartTotal);
    }
}
export default new SkinCarePage();