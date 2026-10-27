import {BaseLocator} from "./base.locator";
import {NavMenu} from "../../fixtures/navbar";

export abstract class MainLocator extends BaseLocator {
    navbar = {
        links: () => cy.get('header a[href]'),
        header: () => cy.get('header'),
        menu: (menuName: NavMenu) => this.byLink(menuName, {timeout: 2000}),
        signIn: () => this.byLink('Sign in'),
        signUp: () => this.byLink('Sign up'),
        languageBtn: () => cy.get('[data-slot="popover-trigger"]:has(svg[viewBox="-0.2 0 18.5 18.2"])'),
        downloadBtn: () => cy.get('[data-slot="popover-trigger"]:has(svg[viewBox="0 0 17 17"])'),
    }
}