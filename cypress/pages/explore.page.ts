import {ExploreLocator} from "../locators/explore.locator";
import {MainPage} from "./base/main.page";
import {NavMenu} from "../fixtures/navbar";

export class ExplorePage extends MainPage<ExploreLocator> {
    constructor() {
        super(new ExploreLocator());
    }

    navigateToPage = () => {
        this.gotTo(NavMenu.Explore);
        cy.location('pathname').should('include', 'explore');
        cy.contains('h1', /Markets at your fingertips/i).should('be.visible');
    }
}