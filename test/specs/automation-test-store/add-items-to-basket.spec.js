import HomePage from "../../pageObjects/automation-test-store/home.page";

describe('add items to basket', () => {

    it('add specific "skincare products" to basket & validate cart total', async () => {

        await HomePage.open();
        const skincareLinks = await $$("//a[contains(text(),'Skincare')]");
        await skincareLinks[1].click();

        const skincareProducts_HeaderLinks = await $$('.fixed_wrapper .prdocutname');

        const itemPrices = [];
        
        for (const header of skincareProducts_HeaderLinks) {
            const tempHeaderText = await header.getText();
            if(tempHeaderText.toLocaleLowerCase() == "creme precieuse nuit 50ml" || 
                tempHeaderText.toLocaleLowerCase() == "total moisture facial cream") {
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

        await $('//span[text()="Cart"]').click();
        await expect(browser).toHaveUrlContaining('checkout');

        let tmpShippingRate = await $('//span[text()="Flat Shipping Rate:"]/../following-sibling::td').getText();
        let shippingRate = tmpShippingRate.replace('$', '');
        totalPrice += parseFloat(shippingRate);

        let cartTotal = parseFloat((await $("//span[text()='Total:']/../following-sibling::td").getText()).replace('$', ''));
        await expect(totalPrice).toEqual(cartTotal);
    });
});