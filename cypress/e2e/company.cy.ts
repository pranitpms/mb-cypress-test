import {spec} from "../helpers/spec-helper";
import {AboutUs, PageContent, StrengthSection} from "../fixtures/company";

spec.describe('About Us Page Renderer', () => {
    spec.beforeEach(({page}) => {
        cy.visitTo();
        cy.contains('Crypto for everyone').should('be.visible');
        page.companyPage.navigateToPage();
    });
    spec.it('Should show about us section', ({page}) => {
        const companyPage = page.companyPage;
        companyPage.Locator.section().eq(0).should('be.visible').within(() => {
            companyPage.Locator.h1().should('be.visible').and('contain.text', AboutUs.heading);
            companyPage.Locator.h2().should('be.visible').and('contain.text', AboutUs.content);
        });
        AboutUs.components.forEach((component: any, index) => {
            companyPage.Locator.componentContainer(0).scrollIntoView().within(() => {
                companyPage.Locator.component().eq(index).should('be.visible');
                companyPage.Locator.component().eq(index).within(() => {
                    cy.contains(component.heading).should('be.visible');
                    cy.contains(component.content).should('be.visible');
                });
            });
        });
    });

    spec.testDataProvider(PageContent, 'name');
    spec.it('Should have page content', ({page, data, index}) => {
        const {heading, content, image} = data;
        const companyPage = page.companyPage;
        companyPage.Locator.pageContent().eq(Number(index)).scrollIntoView().should('be.visible');
        companyPage.Locator.pageContent().eq(Number(index)).within(() => {
            companyPage.Locator.h2().should('be.visible').and('contain.text', heading);
            companyPage.Locator.p().should('be.visible').and('contain.text', content);
            companyPage.Locator.byImage(image).should('be.visible');
        });
    });

    spec.it('Should show StrengthSection section', ({page}) => {
        const companyPage = page.companyPage;
        companyPage.Locator.section().eq(1, {timeout: 4000}).scrollIntoView();
        companyPage.Locator.section().eq(1).should('be.visible').within(() => {
            companyPage.Locator.h3().should('be.visible').and('contain.text', StrengthSection.heading);
        });
        StrengthSection.components.forEach((component: any, index) => {
            companyPage.Locator.componentContainer(1).scrollIntoView().within(() => {
                companyPage.Locator.strengthComponent().eq(index).should('be.visible');
                companyPage.Locator.strengthComponent().eq(index).within(() => {
                    cy.contains(component.heading).should('be.visible');
                    cy.contains(component.content).should('be.visible');
                });
            });
        });
    });
});