import { Page } from "@playwright/test";
import { SFPage } from "@pages/page";
export class CheckboxPage extends SFPage {
    xpathCheckboxs = "//form[@id='checkboxes']//input";
    constructor(page: Page, domain: string) {
        super(page, domain);
    }

}