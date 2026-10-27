import {BaseLocator} from "../common/base.locator";
import {NavMenu} from "../../fixtures/navbar";

export class NavbarLocator extends BaseLocator{
    menu = (menuName: NavMenu) => this.byLink(menuName);
    signIn = () => this.byLink('Sign in');
    signUp = () => this.byLink('Sign up');
}