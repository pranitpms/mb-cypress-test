import {BasePage} from "./base/base.page";
import {NavbarLocator} from "../locators/navigation/navbar.locator";
import {NavMenu} from "../fixtures/navbar";

export class NavbarPage extends BasePage<NavbarLocator>{
    constructor() {
        super(new NavbarLocator());
    }

    public gotTo = (navMenu:NavMenu) =>{
        this.locator.menu(navMenu).should('be.visible');
        this.locator.menu(navMenu).click();
    }
}