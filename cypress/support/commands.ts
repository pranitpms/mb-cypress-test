Cypress.Commands.add('visitTo', (path = '', options?: Partial<Cypress.VisitOptions>) => {
    const url = path === '' || path === '/' ? Cypress.config('baseUrl')! : path;
    cy.visit(url, {timeout: 60000, ...options});
    cy.get('body', {timeout: 20000}).should('exist');
    cy.get('body').should('be.visible').click(10, 10, {force: true});
});