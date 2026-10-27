import {MainLocator} from "./common/locator";

export class HomeLocator extends MainLocator {
    downloadAppBtn = () => this.byLink('Download the app');
    openAccountBtn = () => this.byLink('Open an account');
    mobileDashBoardImg = () => this.byImage('Mobile Dashboard');
    exploreAllAssetsBtn = () => this.byLink('Explore all assets', {timeout: 10000});
}