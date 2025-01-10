import { Page } from "@playwright/test";
import { SFPage } from "@pages/page";
export class DropdownPage extends SFPage {
    xpathDropdownVisible = "(//select[@id='dropdown']//option[not(@disabled= 'disabled')])";
    xpathSelectDropdown = "//select[@id='dropdown']";
    constructor(page: Page, domain: string) {
        super(page, domain);
    }

}