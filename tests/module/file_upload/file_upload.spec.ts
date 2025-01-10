import { expect } from '@playwright/test';
import { test } from "@core/fixtures";
import { uploadPage } from '@pages/storefront/upload';

test.describe("File uploads", () => {
    let uploadFiePage: uploadPage;

    test.beforeEach(async ({ conf, page }) => {
        uploadFiePage = new uploadPage(page, conf.suiteConf.domain);
        await page.goto(conf.suiteConf.domain);
        await uploadFiePage.clickOptionVisible("File Upload");
        expect(await uploadFiePage.isDBPageDisplay("File Uploader")).toBeTruthy();

    });

    test('Verify that a file can be successfully uploaded', async ({ conf }) => {
        await test.step(" Verify that a file can be successfully uploaded.", async () => {
            await uploadFiePage.page.setInputFiles(uploadFiePage.xpathFileInput, conf.suiteConf.file_upload);
            await uploadFiePage.page.locator(uploadFiePage.xpathBtnUpload).click();
            expect(await uploadFiePage.isDBPageDisplay("File Uploaded!")).toBeTruthy();
            const imageNameExpect = await uploadFiePage.getTextContent(uploadFiePage.xpathFileName);
            const imageNameArr = conf.suiteConf.file_upload.split("/");
            const imageNameActual = imageNameArr[imageNameArr.length - 1];
            expect(imageNameExpect).toBe(imageNameActual);



        });
    });
});