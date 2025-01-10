import { Page } from "@playwright/test";
import { SFPage } from "@pages/page";
import { Login } from "@types"
export class LoginPage extends SFPage {
    xpathMessageError = "//div[@id='flash-messages']//div[@id='flash']";
    xpathLogin = "//div[@id='content']";
    constructor(page: Page, domain: string) {
        super(page, domain);
    }

    /**
     * Input infor form login
     * @param infoLogin : infor login include email, pass
     */
    async inputForm(infoLogin: Login) {
        if (infoLogin.username) {
            await this.page.locator("//input[@id='username']").fill(infoLogin.username);
        }
        if (infoLogin.password) {
            await this.page.locator("//input[@id='password']").fill(infoLogin.password);
        }
    }
    async loginDashboard(infoLogin: Login) {
        await this.inputForm(infoLogin);
        await this.checkButtonVisible("Login");
        await this.clickButtonByName("Login");
        await this.page.waitForLoadState("load");
    }
}