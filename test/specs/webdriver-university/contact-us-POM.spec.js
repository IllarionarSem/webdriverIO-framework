import allureReporter from '@wdio/allure-reporter';
import ContactUsPage from "../../pageObjects/webdriver-university/contact-us.page";

describe('webdriveruniversity - contact us page', () => {
    beforeEach(async () => {
        await ContactUsPage.open();
        // console.log("CONFIG ENV: " + browser.config.environment);
        // console.log("CONFIG EMAIL: " + browser.config.email);
        // console.log("CONFIG NAME: " + browser.config.firstName);
    });

    it('valid submission - submit all information', async () => {
        allureReporter.addFeature("Contact us page - valid submission");
        allureReporter.addDescription("Validate contact us page by submitting all data");
        allureReporter.addSeverity('critical');

        ContactUsPage.submitForm('Joe', 'Blogs', 'joe_blogs123@mail.com', 'Hello, how are you');
        // ContactUsPage.submitForm(browser.config.firstName, browser.config.lastName, browser.config.email, 'Hello, how are you');

        await expect(ContactUsPage.successfullSubmissionHeader).toHaveText('Thank You for your Message!');
    });

    it('invalid submission - dont submit all information', async() => {
        allureReporter.addFeature("Contact us page - invalid submission");
        allureReporter.addDescription("Validate contact us page by not submitting all data");
        allureReporter.addSeverity('normal');

        ContactUsPage.submitForm('Joe', 'Blogs', '', 'Hello, how are you');

        await expect(ContactUsPage.unsuccessfullSubmissionHeader).toHaveTextContaining(['Error: all fields are required', 'Error: Invalid email address']);
    });

    it('valid submission using auto generated string', async() => {
        allureReporter.addFeature("Contact us page - invalid submission");
        allureReporter.addDescription("Validate contact us page by not submitting all data");
        allureReporter.addSeverity('normal');

        ContactUsPage.submitFormUsingRandomData('Joe', 'Blogs');

        await expect(ContactUsPage.unsuccessfullSubmissionHeader).toHaveTextContaining(['Error: all fields are required', 'Error: Invalid email address']);
    });
});