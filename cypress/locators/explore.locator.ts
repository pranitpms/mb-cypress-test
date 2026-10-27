import {MainLocator} from "./common/locator";

export class ExploreLocator extends MainLocator {
    marketTable = () => cy.get('table, [role="table"]', {timeout: 20000});
    marketRow = () => cy.get('table tbody tr, [role="table"] [role="row"]', {timeout: 20000});
}