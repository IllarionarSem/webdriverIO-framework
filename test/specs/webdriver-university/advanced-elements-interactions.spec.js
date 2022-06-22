describe('advanced element interactions - examples', () => {

    it('inputs', async () => {
        await browser.url("/Contact-Us/contactus.html");
        const firstNameTextField = $("[name='first_name']");

        await firstNameTextField.addValue('Add some text');
        await firstNameTextField.addValue('Add some text'); // adding a text into a field, not clearing text field

        await firstNameTextField.setValue('Set some value'); // clearing field and set value

        await firstNameTextField.clearValue();
    });

    it('dropdown list', async () => {
        await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");
        const programmingLanguageDrp = await $('#dropdown-menu-1');
        await programmingLanguageDrp.selectByAttribute('value', 'python');
        await expect(programmingLanguageDrp).toHaveValueContaining('python');
        await browser.pause(2000);
        
        const techDrp = await $('#dropdown-menu-2');
        await techDrp.selectByIndex(2);
        await expect(techDrp).toHaveValueContaining('TestNG', { ignoreCase: true});
        await browser.pause(2000);

        const frontEndLanguageDrp = await $('#dropdown-menu-3');
        await frontEndLanguageDrp.selectByVisibleText('CSS');
        await expect(frontEndLanguageDrp).toHaveValueContaining('CSS', { ignoreCase: true});
        await browser.pause(2000);
    });

    it('state commands', async () => {
        await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");

        const lettuceRadioButton = await $('[value="lettuce"');
        const lettuceRadioButton_isDisplayed = await lettuceRadioButton.isDisplayed();
        await expect(lettuceRadioButton_isDisplayed).toEqual(true);
        await expect(lettuceRadioButton).toBeEnabled();

        const lettuceRadioButton_isClickable = await lettuceRadioButton.isClickable();
        await expect(lettuceRadioButton_isClickable).toEqual(true);

        const cabbageRadioButton = await $('[value="cabbage"');
        const cabbageRadioButton_isEnabled = await cabbageRadioButton.isEnabled();
        await expect(cabbageRadioButton_isEnabled).toEqual(false);
        await expect(cabbageRadioButton).toBeDisabled();
    });

    it('actions', async () => {
        await browser.url('/Actions/index.html');

        // Drag & Drop
        const elem = await $('#draggable');
        const target = await $('#droppable');
        await elem.dragAndDrop(target);
        await browser.pause(3000);

        // double click
        const doubleClickButton = await $('#double-click');
        await doubleClickButton.doubleClick();
        await browser.pause(3000);

        // mouse over
        await $("//button[text()='Hover Over Me First!'").moveTo();
        const firstLink = await $("(//*[text()='Link 1'])[1]");
        await firstLink.click();
        await browser.pause(3000);
    });

    it('handling windows', async () => {
        await browser.url('https://www.webdriveruniversity.com');
        await browser.newWindow('https://www.automationteststore.com/');
        let currentWindowTitle = await browser.getTitle();
        console.log(`>>Current Window Title: ${currentWindowTitle}`);
        await browser.pause(3000);

        await expect(browser).toHaveUrlContaining('automationteststore');
        await browser.pause(3000);

        await browser.switchWindow('webdriveruniversity.com');
        let parentWindowTitle = await browser.getTitle();
        console.log(`>>Parent Window Title: ${parentWindowTitle}`);
        await browser.pause(3000);

        await expect(browser).toHaveUrlContaining('webdriveruniversity');
        await browser.pause(3000);

        await $('#contact-us').click();
        await browser.switchWindow('automationteststore');
        await browser.closeWindow(); // need to switch window back

        await browser.switchWindow('contactus');
        await browser.closeWindow();

        await browser.switchWindow('webdriveruni');
        console.log(await browser.getTitle());
        await browser.pause(3000);
    });

    it('Iframe', async () => {
        await browser.url('/IFrame/index.html');
        const iframe = await $('#frame');
        await browser.switchToFrame(iframe);
        await $("//a[text()='Our Products']").click();
        await browser.switchToParentFrame();
    });

    it('alerts', async () => {
        await browser.url("/Popup-Alerts/index.html");
        await $('#button1').click();
        await browser.acceptAlert(); // acceptin alert

        await $('#button4').click();
        const alertText = await browser.getAlertText();
        await expect(alertText).toEqual('Press a button!');
        await browser.acceptAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed OK!');

        await $('#button4').click();
        await browser.dismissAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed Cancel!');
    });

    it('File upload', async () => {
        await browser.url("/File-Upload/index.html");
        await $('#myFile').addValue(`${process.cwd()}\\data\\dummy_file.txt`);
        await browser.pause(3000);
        await $('#submit-button').click();
        await browser.pause(2000);
    });

    it('JS execute', async () => {
        await browser.url("/Hidden-Elements/index.html");
        await browser.execute(() => {
            return document.getElementById('not-displayed').setAttribute('id', '');
        });

        await browser.execute(() => {
            return document.body.style.backgroundColor = "tomato";
        })
        await browser.pause(3000);
    });
});