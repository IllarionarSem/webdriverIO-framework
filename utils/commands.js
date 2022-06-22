module.exports = {
    waitThenClick: async function (element) {
        console.log(`>> Executiong custom command: waitThenClick, against element: ${JSON.stringify(element)}`);
        await element.waitForExist();
        await element.waitForDisplayed();
        await element.click();
    }
}