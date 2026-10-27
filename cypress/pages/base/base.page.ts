import {BaseLocator} from "../../locators/common/base.locator";

export abstract class BasePage <TLocator extends BaseLocator> {

    public get Locator(){
        return this.locator;
    }
    
    protected constructor(protected locator :TLocator) {  }
}