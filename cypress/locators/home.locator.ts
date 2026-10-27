import {BaseLocator} from "./common/base.locator";

export class HomeLocator extends BaseLocator {
    downloadAppBtn = () => this.byLink('Download the app');
    openAccountBtn = () => this.byLink('Open an account');
}