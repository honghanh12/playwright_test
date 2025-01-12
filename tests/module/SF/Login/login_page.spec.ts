import { expect } from '@playwright/test';
import { test } from "@core/fixtures";
import { LoginPage } from '@pages/storefront/login';

test.describe("Login form", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ conf, page }, testInfo) => {
        testInfo.snapshotSuffix = "";
        loginPage = new LoginPage(page, conf.suiteConf.domain);
        await loginPage.goto(conf.suiteConf.domain);
        await loginPage.clickOptionVisible("Form Authentication");
        expect(await loginPage.isDBPageDisplay("Login Page")).toBeTruthy();

    });

    test('Login false @DV_01', async ({ conf }) => {
        await test.step("Verify form login", async () => {
            await loginPage.checkButtonVisible("Login");
            await loginPage.page.waitForTimeout(1000);
            expect(await loginPage.page.locator(loginPage.xpathLogin).screenshot()).toMatchSnapshot(conf.caseConf.picture_form_input,
                {
                    maxDiffPixelRatio: 0.05,
                    threshold: 0.1,
                    maxDiffPixels: 2000,
                }
            );
        });

        await test.step("Verify message ", async () => {
            await loginPage.loginDashboard(conf.caseConf.infor_acc);
            const textMessage = await loginPage.getTextContent(loginPage.xpathMessageError);
            expect(textMessage).toContain(conf.caseConf.message);
        })
    });
});