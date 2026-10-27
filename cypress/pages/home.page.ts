import {HomeLocator} from "../locators/home.locator";
import {MobileAppAPI} from "../helpers/apis/mobile-app.api";
import {MainPage} from "./base/main.page";
import {visitPageByURL} from "../helpers/apis/page.api";


export class HomePage extends MainPage<HomeLocator> {
    constructor() {
        super(new HomeLocator());
    }

    public downloadAndroidApp() {
        const agent = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Mobile Safari/537.36';
        return MobileAppAPI.getDownLoadLink(agent);
    }

    public downloadIOSApp() {
        const agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148';
        return MobileAppAPI.getDownLoadLink(agent);
    }

    public clickOnExploreAllAssets() {
        cy.scrollTo('bottom', {duration: 1000});
        this.locator.exploreAllAssetsBtn().should('exist').scrollIntoView();
        this.locator.exploreAllAssetsBtn().should('be.visible').click();
    }

    public getPageResponse = (url: string) => {
        return visitPageByURL(url);
    }
}