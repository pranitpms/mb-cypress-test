import {spec} from "../helpers/spec-helper";
import {NavItems, NavMenu} from "../fixtures/navbar";


spec.describe('Page Render', () => {
    beforeEach(() => {
        cy.visitTo();
        cy.contains('Crypto for everyone').should('be.visible');
    });

    spec.it('Should render Navbar', ({page}) => {
        const navbarPage = page.navbarPage;
        navbarPage.Locator.navbar().should('be.visible');
        navbarPage.Locator.menu(NavMenu.Explore).should('be.visible');
        navbarPage.Locator.menu(NavMenu.Features).should('be.visible');
        navbarPage.Locator.menu(NavMenu.OTCDesk).should('be.visible');
        navbarPage.Locator.menu(NavMenu.Company).should('be.visible');
        navbarPage.Locator.menu(NavMenu.Support).should('be.visible');
        navbarPage.Locator.menu(NavMenu.Blog).should('be.visible');
        navbarPage.Locator.menu(NavMenu.MBG).should('be.visible');
    });

    spec.it('Should have Action menus', ({page}) => {
        const navbarPage = page.navbarPage;
        navbarPage.Locator.navbar().within(() => {
            navbarPage.Locator.languageBtn().should('be.visible');
            navbarPage.Locator.downloadBtn().should('be.visible');
            navbarPage.Locator.signIn().should('be.visible');
            navbarPage.Locator.signUp().should('be.visible');
        });
    });
});

spec.describe('Page Actions', () => {
    beforeEach(() => {
        cy.visitTo();
    });

    spec.testDataProvider(NavItems, 'label');

    spec.it('Should navigate to', ({page, data}) => {
        page.navbarPage.gotTo(data.label);
        cy.location('pathname').should('eq', page.navbarPage.path(data.path));
        cy.contains('h1', data.h1).should('be.visible');
    });

    spec.it('$MBG Should points to token.multibankgroup.com', ({page}) => {
        page.navbarPage.Locator.menu(NavMenu.MBG).should('be.visible');
        page.navbarPage.Locator.menu(NavMenu.MBG).should('have.attr', 'href')
            .and('include', 'token.multibankgroup.com');
    });

    spec.it('Sign in / Sign up target trade.mb.io (href only, no click)', ({page}) => {
        page.navbarPage.Locator.signIn().should('have.attr', 'href').and('include', 'trade.mb.io');
        page.navbarPage.Locator.signUp().should('have.attr', 'href').and('include', 'trade.mb.io');
    });
});