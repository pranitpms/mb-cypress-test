import {HomePage} from "../../pages/home.page";
import {ExplorePage} from "../../pages/explore.page";
import {CompanyPage} from "../../pages/company.page";

export class PageObject {
    public readonly homePage: HomePage;
    public readonly explorePage: ExplorePage;
    public readonly companyPage: CompanyPage;

    constructor() {
        this.homePage = new HomePage();
        this.explorePage = new ExplorePage();
        this.companyPage = new CompanyPage();
    }
}


export const Page = new PageObject();