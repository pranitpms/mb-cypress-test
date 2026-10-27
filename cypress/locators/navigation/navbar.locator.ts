import {BaseLocator} from "../common/base.locator";
import {NavMenu} from "../../fixtures/navbar";

export class NavbarLocator extends BaseLocator{
    navbar = () => cy.get('header');
    menu = (menuName: NavMenu) => this.byLink(menuName);
    signIn = () => this.byLink('Sign in');
    signUp = () => this.byLink('Sign up');
    languageBtn = () => cy.get('[data-slot="popover-trigger"]:has(svg[viewBox="-0.2 0 18.5 18.2"])');
    downloadBtn = () => cy.get( '[data-slot="popover-trigger"]:has(svg[viewBox="0 0 17 17"])');
}