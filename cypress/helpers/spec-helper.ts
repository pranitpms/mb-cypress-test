import {Page, PageObject} from "./factory/page-object.factory";

type SpecFixture = {
    page: PageObject,
    data?: any
}
type SpecFunc = (this: Mocha.Context, specFixture: SpecFixture) => void;
type SuiteFunc = (this: Mocha.Suite, specFixture: SpecFixture) => void

class SpecHelper {
    private _scenarioDataProvider?: any[];
    private _testDataProvider?: any[];
    private _testDataKey?: string;
    private _scenarioTestDataKey?: string;

    public scenarioDataProvider = (data: any, key?: string) => {
        this._scenarioDataProvider = Array.isArray(data) ? data : [data];
        this._scenarioTestDataKey = key;
    }

    public testDataProvider = <TDataProvider>(data: TDataProvider, key?: string) => {
        this._testDataProvider = Array.isArray(data) ? data : [data];
        this._testDataKey = key;
    }

    public describe = (name: string, suiteFunc: SuiteFunc) => {
        if (this._scenarioDataProvider && this._scenarioDataProvider.length > 0) {
            this._scenarioDataProvider.forEach((data: any, index) => {
                const testName: string = this.resolveName(name, data, index);
                describe(testName, function (this: Mocha.Suite) {
                    const specFixture: SpecFixture = {
                        page: Page,
                        data: data
                    }
                    suiteFunc.call(this, specFixture);
                });
            });
            this._scenarioDataProvider = undefined;
            this._scenarioTestDataKey = undefined;
        } else {
            describe(name, function (this: Mocha.Suite) {
                const specFixture: SpecFixture = {page: Page}
                suiteFunc.call(this, specFixture);
            });
        }
    }

    public it = (name: string, testFunc: SpecFunc) => {
        if (this._testDataProvider && this._testDataProvider.length > 0) {
            this._testDataProvider.forEach((data: any, index) => {
                const testName: string = this.resolveName(name, data, index);
                it(testName, function (this: Mocha.Context) {
                    const specFixture: SpecFixture = {
                        page: Page,
                        data: data
                    }
                    testFunc.call(this, specFixture);
                });
            });
            this._testDataProvider = undefined;
            this._testDataKey = undefined;
        } else {
            it(name, function (this: Mocha.Context) {
                const specFixture: SpecFixture = {page: Page}
                testFunc.call(this, specFixture);
            });
        }
    }

    private resolveName(name: string, data: any | {}, index: number) {
        if (this._testDataKey && this.isObject(data)) {
            const value = data[this._testDataKey];
            return `${name} - ${value}`;
        }
        return `${index} - ${name}`;
    }

    private isObject(value: unknown): value is Record<string, unknown> {
        return (
            typeof value === "object" &&
            value !== null &&
            !(value instanceof Date)
        );
    }
}

export const spec = new SpecHelper();