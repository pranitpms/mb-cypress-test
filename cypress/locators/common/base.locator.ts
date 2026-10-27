export abstract class BaseLocator {
    h1 = () => cy.get('h1');
    h2 = () => cy.get('h2');
    h3 = () => cy.get('h3');
    p = () => cy.get('p');
    byLink = (name?: string | RegExp, options?: any) => this.getByRole('link', name, options);
    byImage = (name?: string | RegExp, options?: any) => this.getByRole('img', name, options);

    private getByRole(role: string, name?: string | RegExp, options?: any) {
        options = options || {};
        options.name = name;
        return cy.getByRole(role, options);
    };
}