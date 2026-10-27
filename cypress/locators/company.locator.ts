import {MainLocator} from "./common/locator";

export class CompanyLocator extends MainLocator {
    section = () => cy.get('section').find('div.flex.flex-col.items-center.text-center');
    componentContainer = (index: number) => this.section().eq(index).next('div.flex.flex-col');
    component = () => cy.get('.flex.flex-1.flex-col.items-center.justify-center');
    pageContent = () => cy.get('section').find('.flex.flex-col.w-full.relative.items-start', {timeout: 4000});
    strengthComponent = () => cy.get('.flex.basis-full.flex-col');
}