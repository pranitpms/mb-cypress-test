import {spec} from "../../helpers/spec-helper";
import {InvalidRoutes} from "../../fixtures/navbar";

spec.describe('Invalid route handling', () => {
    spec.testDataProvider(InvalidRoutes, 'path');
    spec.it(`Should handled 4xx/redirect, never a 5xx for path`, ({page, data}) => {
        cy.request({url: data.path, failOnStatusCode: false}).then((res) => {
            expect(res.status, 'status').to.be.lessThan(500);
            expect(res.body, 'no stack trace').not.to.match(
                /Traceback|at\s+\S+\s+\(.*:\d+:\d+\)|Internal Server Error/i
            );
        });
    });

    spec.it('Should show page does not exist', () => {
        cy.visitTo('/en/this-page-does-not-exist-123', {failOnStatusCode: false});
        cy.get('body').invoke('text').should('not.be.empty');
        cy.get('header').should('be.visible');
        cy.get('footer').should('exist');
        cy.contains(/404|not found|doesn.t exist|page.*(missing|found)/i).should('exist');
    });

    spec.it('Should returns HTTP 404 (or redirects to a valid page)', () => {
        cy.request({url: '/en/this-page-does-not-exist-123', failOnStatusCode: false}).then(
            (res) => {
                expect([200, 404], 'final status').to.include(res.status);
                if (res.status === 200) {
                    expect(res.redirects, 'redirect chain').to.have.length.greaterThan(0);
                }
            }
        );
    });
});
