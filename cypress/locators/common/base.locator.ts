export abstract class BaseLocator {

   protected byLink  = (name?: string| RegExp, options?: any) => this.getByRole('link',name,options);

   private getByRole (role:string,name?: string | RegExp, options?: any) {
       options = options || {};
       options.name = name;
       return cy.getByRole(role,options);
   };
}