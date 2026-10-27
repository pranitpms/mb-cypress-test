import {spec} from "../../helpers/spec-helper";

spec.describe('Page Renderer', () => {
    spec.beforeEach(({page}) => {
        cy.visitTo();
        page.explorePage.navigateToPage();
    });

    spec.it('Should renders spot section with at least 10 rows', ({page}) => {
        cy.contains(/Spot market/i).should('be.visible');
        page.explorePage.Locator.marketRow().should('have.length.at.least', 10);
    });

    spec.it('Should not have NaN / undefined / empty cells in the first 5 rows', ({page}) => {
        page.explorePage.Locator.marketRow().should('have.length.at.least', 5);
        page.explorePage.Locator.marketRow().then(($rows) => {
            [...$rows].slice(0, 5).forEach((row) => {
                expect(row.innerText, 'row text').not.to.match(/NaN|undefined|null/);
                expect(row.innerText.trim(), 'row not empty').not.to.be.empty;
            });
        });
    });
});

describe