import {NavbarPage} from "../../pages/navbar.page";

export class PageObject{
    public readonly navbarPage: NavbarPage;

    constructor() {
        this.navbarPage = new NavbarPage();
    }
}


export const Page = new PageObject();