import {spec} from "../../helpers/spec-helper";

spec.describe('Content loading timeout handling', () => {
    spec.it('Should renders page and does not go blank when market data is delayed', ({page}) => {
        cy.intercept({resourceType: /xhr|fetch/}, (req: any) => {
            req.on("response", (res: any) => res.setDelay(8000));
        }).as('slowData');

        cy.visitTo('/explore', {timeout: 60000});
        page.explorePage.Locator.navbar.header().should('be.visible');
        cy.contains('h1', /Markets at your fingertips/i).should('be.visible');
        cy.get('body').invoke('text').should('have.length.greaterThan', 100);
    });

    spec.it('Should shows a loading/error state, not a blank area', ({page}) => {
        cy.intercept({resourceType: /xhr|fetch/}, {forceNetworkError: true}).as('blocked');

        cy.visitTo('/explore', {timeout: 60000});
        page.explorePage.Locator.navbar.header().should('be.visible');
        cy.contains('h1', /Markets at your fingertips/i).should('be.visible');
        cy.get('body', {timeout: 10000}).should(($b) => {
            const txt = $b.text();
            const hasState =
                /loading|error|try again|unavailable|something went wrong|no data/i.test(txt) ||
                $b.find('[class*="skeleton" i], [class*="spinner" i], [aria-busy="true"]').length > 0 ||
                $b.find('table tbody tr, [role="table"] [role="row"]').length > 0;
            expect(hasState, 'loading, error state or rows present').to.be.true;
        });
    });

    spec.it('Should reload once the network is back', ({page}) => {
        cy.intercept({resourceType: /xhr|fetch/}, {forceNetworkError: true});
        cy.visitTo('/explore', {timeout: 60000});

        cy.intercept({resourceType: /xhr|fetch/}, (req) => req.continue());
        cy.reload();
        page.explorePage.Locator.marketRow().should('have.length.greaterThan', 0);
    });
});