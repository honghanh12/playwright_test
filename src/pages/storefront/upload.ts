import { Page } from "@playwright/test";
import { SFPage } from "@pages/page";
export class uploadPage extends SFPage {
    xpathFileInput = "//input[@id='file-upload']";
    xpathBtnUpload = "//input[@id='file-submit']";
    xpathFileName = "//div[@id='uploaded-files']";
    constructor(page: Page, domain: string) {
        super(page, domain);
    }

}