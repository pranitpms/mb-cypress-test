import {spec} from "../helpers/spec-helper";
import {NavItems, NavMenu} from "../fixtures/navbar";


spec.describe('Page Render', () => {
    beforeEach(() => {
        cy.visitTo();
        cy.contains('Crypto for everyone').should('be.visible');
    });

    spec.it('Should render Navbar', ({page}) => {
        const navbarPage = page.homePage;
        navbarPage.Locator.navbar.header().should('be.visible');
        navbarPage.Locator.navbar.menu(NavMenu.Explore).should('be.visible');
        navbarPage.Locator.navbar.menu(NavMenu.Features).should('be.visible');
        navbarPage.Locator.navbar.menu(NavMenu.OTCDesk).should('be.visible');
        navbarPage.Locator.navbar.menu(NavMenu.Company).should('be.visible');
        navbarPage.Locator.navbar.menu(NavMenu.Support).should('be.visible');
        navbarPage.Locator.navbar.menu(NavMenu.Blog).should('be.visible');
        navbarPage.Locator.navbar.menu(NavMenu.MBG).should('be.visible');
    });

    spec.it('Should have Action menus', ({page}) => {
        const navbarPage = page.homePage;
        navbarPage.Locator.navbar.header().within(() => {
            navbarPage.Locator.navbar.languageBtn().should('be.visible');
            navbarPage.Locator.navbar.downloadBtn().should('be.visible');
            navbarPage.Locator.navbar.signIn().should('be.visible');
            navbarPage.Locator.navbar.signUp().should('be.visible');
        });
    });
});

spec.describe('Page Actions', () => {
    beforeEach(() => {
        cy.visitTo();
    });

    spec.testDataProvider(NavItems, 'label');

    spec.it('Should navigate to', ({page, data}) => {
        page.homePage.gotTo(data.label);
        cy.location('pathname').should('eq', page.homePage.path(data.path));
        cy.contains('h1', data.h1).should('be.visible');
    });

    spec.it('$MBG Should points to token.multibankgroup.com', ({page}) => {
        page.homePage.Locator.navbar.menu(NavMenu.MBG).should('be.visible');
        page.homePage.Locator.navbar.menu(NavMenu.MBG).should('have.attr', 'href')
            .and('include', 'token.multibankgroup.com');
    });

    spec.it('Sign in / Sign up target trade.mb.io (href only, no click)', ({page}) => {
        page.homePage.Locator.navbar.signIn().should('have.attr', 'href').and('include', 'trade.mb.io');
        page.homePage.Locator.navbar.signUp().should('have.attr', 'href').and('include', 'trade.mb.io');
    });
});