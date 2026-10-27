import {BasePage} from "./base.page";
import {MainLocator} from "../../locators/common/locator";
import {NavMenu} from "../../fixtures/navbar";

export abstract class MainPage<T extends MainLocator> extends BasePage<T> {
    protected constructor(locator: T) {
        super(locator);
    }

    public gotTo = (navMenu: NavMenu) => {
        this.locator.navbar.menu(navMenu).should('be.visible');
        this.locator.navbar.menu(navMenu).click();
    }

    public extractNavLinks = ($links: any) => {
        return [
            ...new Set(
                [...$links]
                    .map((a: any) => a.href)
                    .filter((h) => /^https?:/.test(h) && !h.includes('#'))
            ),
        ];
    }
}