import {spec} from "../helpers/spec-helper";
import {Content} from "../fixtures/home";


spec.describe('Page Render', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    spec.it('Should load the page content', ({page}) => {
        const homePage = page.homePage;
        cy.contains(Content.h1).should('be.visible');
        cy.contains(Content.info).should('be.visible');
        homePage.Locator.downloadAppBtn().should('be.visible');
        homePage.Locator.openAccountBtn().should('be.visible');
    });

    spec.it('Should use smart link for app download button', ({page}) => {
        page.homePage.Locator.downloadAppBtn().should('have.attr', 'href')
            .and('include', 'mbio.go.link/6OW91');
    });

    spec.it('Should resolve app link based on user agent', ({page}) => {
        page.homePage.downloadIOSApp().its('status').should('be.lessThan', 400);
        page.homePage.downloadAndroidApp().its('status').should('be.lessThan', 400);
    });

    spec.it('Should show movers column list', ({page}) => {
        ['Top Gainers', 'Trending Now', 'Top Losers'].forEach((t) =>
            cy.contains(t).scrollIntoView().should('be.visible')
        );
    });

});

spec.describe('Page Action', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    spec.it('Should Navigate to explore page on click of Explore all assets', ({page}) => {
        cy.reload();
        page.homePage.clickOnExploreAllAssets();
        cy.location('pathname').should('eq', page.homePage.path('/explore'));
    });
});