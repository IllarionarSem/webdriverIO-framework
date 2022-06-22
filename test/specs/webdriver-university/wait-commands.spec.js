describe('wait commands examples', () => {

    beforeEach(async () => {
        await browser.url("/Ajax-Loader/index.html");
    });

    it('pause command', async () => {
        const clickMe_Button = await $("//*[text()='CLICK ME!']/..");
        await browser.pause(6000);
        clickMe_Button.click();
        await browser.pause(1500);
    });

    it('wait for clickable', async () => {
        const clickMe_Button = await $('#button1');
        await clickMe_Button.waitForClickable({timeout: 3000}); // or use wdio config timeout
        await clickMe_Button.click();
        await browser.pause(1500);
    });

    it('wait for displayed', async () => {
        const clickMe_Button = await $('#button1');
        await clickMe_Button.waitForDisplayed();
    });

    it('wait for exist', async () => {
        const clickMe_Button = await $('#button1');
        await clickMe_Button.waitForExist(); // wait for elemet exist in DOM
    });

    it('wait until', async () => {
        await browser.url("/Accordion/index.html");
        const loadingStatus_UI = $('#text-appear-box');

        await loadingStatus_UI.waitUntil(async function(){
            return (await this.getText()) === 'LOADING COMPLETE.';
        },
        {
            timeout: 15000,
            timeoutMsg: 'expected text to be different after 15 seconds.'
        })
    });
});