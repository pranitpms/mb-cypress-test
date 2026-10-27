declare global {
    namespace Cypress {
        interface Chainable {
            visitTo(path?: string): Chainable<AUTWindow>;
        }
    }
}

export {};




