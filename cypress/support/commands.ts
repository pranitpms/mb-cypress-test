Cypress.Commands.add('visitTo',(path = "/")=>{
    return cy.visit(path);
});