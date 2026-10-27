export function visitPageByURL(url: string) {
    return cy.request({
        url,
        failOnStatusCode: false,
        timeout: 20000,
        headers: {'user-agent': 'Mozilla/5.0 (Cypress link checker)'},
    });
}