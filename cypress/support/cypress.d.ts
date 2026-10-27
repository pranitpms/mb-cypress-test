declare global {
    namespace Cypress {
        interface Chainable {
            visitTo(path?: string, options?: Partial<Cypress.VisitOptions>): Chainable<AUTWindow>;
        }
    }
}

export {};




