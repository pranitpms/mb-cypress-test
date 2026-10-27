import {spec} from "../../helpers/spec-helper";

spec.describe('API and network responses', () => {
    beforeEach(() => cy.visitTo());

    spec.it('Should not return failing responses', ({page}) => {
        const failures: any[] = [];
        cy.intercept('**', (req) => {
            req.on('response', (res) => {
                if (res.statusCode >= 500) failures.push(`${res.statusCode} ${req.url}`);
            });
        });
        page.explorePage.navigateToPage();
        page.explorePage.Locator.marketRow().should('exist');
        cy.then(() => expect(failures, '5xx responses').to.be.empty);
    });

    spec.it('market data XHR/fetch calls succeed with JSON bodies', ({page}) => {
        cy.intercept({resourceType: /xhr|fetch/}, (req) => {
            req.on('response', (res) => {
                // collect JSON API calls for assertion below
                const type = String(res.headers['content-type'] || '');
                if (type.includes('json')) {
                    Cypress.expose('lastJson', (Cypress.expose('lastJson') || 0) + 1);
                    expect(res.statusCode, req.url).to.be.lessThan(400);
                }
            });
        });
        page.explorePage.navigateToPage();
        page.explorePage.Locator.marketRow().should('have.length.greaterThan', 0);
        cy.then(() => expect(Cypress.expose('lastJson') || 0, 'JSON API calls seen').to.be.greaterThan(0));
    });
});