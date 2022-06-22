import BasePage from "./base.page";
import DataGenerator from "../../../utils/data-generator";

class ContactUsPage extends BasePage {
    open() {
        return super.open("Contact-Us/contactus.html");
    }

    get inputFirstName() {
        return $('//*[@name="first_name"]');
    }

    get inputLastName() {
        return $('//*[@name="last_name"]');
    }

    get inputEmailAddress() {
        return $('//*[@name="email"]');
    }

    get inputMessage() {
        return $('//*[@name="message"]');
    }

    get buttonSubmit() {
        return $('//input[@value="SUBMIT"]');
    }

    get successfullSubmissionHeader() {
        return $('#contact_reply > h1');
    }

    get unsuccessfullSubmissionHeader() {
        return $('body');
    }

    async submitForm(firstName, lastName, emailAddress, message) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputEmailAddress.setValue(emailAddress);
        await this.inputMessage.setValue(message);
        await this.buttonSubmit.click();
    }

    async submitFormUsingRandomData(firstName, lastName) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputEmailAddress.setValue(`AutoEmail_${DataGenerator.generateRandomString()}@gmail.com`);
        await this.inputMessage.setValue(`Random message ${DataGenerator.generateRandomString()}`);
        await this.buttonSubmit.click();
    }
}

export default new ContactUsPage();