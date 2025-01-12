import { expect } from '@playwright/test';
import { test } from "@core/fixtures";
import { CheckboxPage } from '@pages/storefront/checkbox';

test.describe("Checkboxs form", () => {
    let checkboxPage: CheckboxPage;

    test.beforeEach(async ({ conf, page }, testInfo) => {
        checkboxPage = new CheckboxPage(page, conf.suiteConf.domain);
        await page.goto(conf.suiteConf.domain);
        await checkboxPage.clickOptionVisible("Checkboxes");
        expect(await checkboxPage.isDBPageDisplay("Checkboxes")).toBeTruthy();

    });

    test('Checkbox form', async ({ conf }) => {
        await test.step("Verify checkbox check and uncheck", async () => {
            const countCheckbox = await checkboxPage.page.locator(checkboxPage.xpathCheckboxs).count();
            for (let i = 1; i <= countCheckbox; i++) {
                const checkbox = checkboxPage.page.locator(`(${checkboxPage.xpathCheckboxs})[${i}]`);
                const isCheckedInitially = await checkbox.isChecked();
                if (!isCheckedInitially) {
                    await checkbox.check();
                    expect(await checkbox.isChecked()).toBeTruthy();
                } else {
                    await checkbox.uncheck();
                    expect(await checkbox.isChecked()).toBeFalsy();
                }

                if (isCheckedInitially) {
                    await checkbox.check();
                    expect(await checkbox.isChecked()).toBeTruthy();
                } else {
                    await checkbox.uncheck();
                    expect(await checkbox.isChecked()).toBeFalsy();
                }

            }

        });
    });
});