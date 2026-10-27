import {MainPage} from "./base/main.page";
import {CompanyLocator} from "../locators/company.locator";
import {NavMenu} from "../fixtures/navbar";

export class CompanyPage extends MainPage<CompanyLocator> {
    constructor() {
        super(new CompanyLocator());
    }

    navigateToPage = () => {
        this.gotTo(NavMenu.Company);
    }
}