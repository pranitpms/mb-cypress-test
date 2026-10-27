import {BaseLocator} from "../../locators/common/base.locator";

export abstract class BasePage<TLocator extends BaseLocator> {
    public get Locator(): TLocator {
        return this.locator;
    }

    protected constructor(protected locator: TLocator) {
    }

    private _locale = 'en-AE';
    public path = (path = '') => `/${this._locale}${path}`;
}