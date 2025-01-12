import { expect } from '@playwright/test';
import { test } from "@core/fixtures";
import { DropdownPage } from '@pages/storefront/dropdown';

test.describe("Checkboxs form", () => {
    let dropdownPage: DropdownPage;

    test.beforeEach(async ({ conf, page }) => {
        dropdownPage = new DropdownPage(page, conf.suiteConf.domain);
        await page.goto(conf.suiteConf.domain);
        await dropdownPage.clickOptionVisible("Dropdown");
        expect(await dropdownPage.isDBPageDisplay("Dropdown List")).toBeTruthy();

    });

    test('Dropdown form', async ({ conf }) => {
        await test.step("Verify that each option in a dropdown can be selected.", async () => {
            const optionsCount = await dropdownPage.page.locator(dropdownPage.xpathDropdownVisible).count();
            for (let i = 1; i <= optionsCount; i++) {
                const xpathOption = `(${dropdownPage.xpathDropdownVisible})[${i}]`;
                const option = dropdownPage.page.locator(xpathOption);
                const optionValue = await option.getAttribute('value');
                const optionText = await option.textContent();
                await dropdownPage.page.selectOption(dropdownPage.xpathSelectDropdown, optionValue);
                const selectedValue = await dropdownPage.page.locator(dropdownPage.xpathSelectDropdown).inputValue();
                expect(selectedValue).toBe(optionValue);
            }
        });
    });
});