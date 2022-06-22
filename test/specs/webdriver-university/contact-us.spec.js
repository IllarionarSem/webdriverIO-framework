import allureReporter from '@wdio/allure-reporter';

describe('webdriveruniversity - contact us page', function () {
    this.retries(1); // retry all failed tests !! note that the action couldn't be performed inside arrow function, retires starts from 0
    // to open allure report npx allure open

    beforeEach(async () => {
        await browser.url('/Contact-Us/contactus.html');
        console.log(`>> Browser object: +${JSON.stringify(browser)}`);
    });

    it('valid submission - submit all information', async function() {
        this.retries(2); // retrirs current tets if it fails
        allureReporter.addFeature("Contact us page - valid submission");
        allureReporter.addDescription("Validate contact us page by submitting all data");
        allureReporter.addSeverity('critical');
        const firstName = await $('//*[@name="first_name"]');
        const lastName = await $('//*[@name="last_name"]');
        const emailAddress = await $('//*[@name="email"]');
        const message = await $('//*[@name="message"]');
        const submitButton = await $('//input[@value="SUBMIT"]');

        await firstName.setValue('Joe');
        await lastName.setValue('Blogs');
        await emailAddress.setValue('joe_blogs123@mail.com');
        await message.setValue('Hello, how are you');

        await browser.debug(); // or command npx wdio repl chrome

        await browser.waitThenClick(submitButton); // custom command from utils
        // await submitButton.click();

        const successfullSubmissionHeader = await $('#contact_reply > h1');
        console.log(`successfullSubmissionHeader Element: ` + JSON.stringify(await successfullSubmissionHeader));
        await expect(successfullSubmissionHeader).toHaveText('Thank You for your Message!');
        await browser.pause(5000);
    });

    it('invalid submission - dont submit all information', async() => {
        allureReporter.addFeature("Contact us page - invalid submission");
        allureReporter.addDescription("Validate contact us page by not submitting all data");
        allureReporter.addSeverity('normal');
        const firstName = await $('//*[@name="first_name"]');
        const lastName = await $('//*[@name="last_name"]');
        const message = await $('//*[@name="message"]');
        const submitButton = await $('//input[@value="SUBMIT"]');

        await firstName.setValue('Joe');
        await lastName.setValue('Blogs');
        await message.setValue('Hello, how are you');
        await submitButton.click();

        const invalidMessageLabel = await $('body');

        await expect(invalidMessageLabel).toHaveTextContaining(['Error: all fields are required', 'Error: Invalid email address']);

        await browser.pause(5000);
    });
});