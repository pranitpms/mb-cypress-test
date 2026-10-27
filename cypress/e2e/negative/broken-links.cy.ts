import {FooterPolicyLinks, LINK_CRAWL_PAGES} from "../../fixtures/navbar";
import {spec} from "../../helpers/spec-helper";

spec.describe('Broken link detection', () => {
    spec.it('Should not responds with 4xx/5xx for all the nav link', ({page}) => {
        cy.visitTo();
        const homePage = page.homePage;
        homePage.Locator.navbar.links().then(($links) => {
            const hrefs = homePage.extractNavLinks($links);
            expect(hrefs.length, 'nav links found').to.be.greaterThan(5);

            hrefs.forEach((href) => {
                homePage.getPageResponse(href).then((res: any) => {
                    const isInternal = href.startsWith(Cypress.config('baseUrl'));
                    if (isInternal) {
                        expect(res.status, `${href}`).to.be.lessThan(400);
                    } else {
                        expect([403, 429], `${href}`).to.satisfy(
                            (ok: any) => res.status < 400 || ok.includes(res.status)
                        );
                    }
                });
            });
        });
    });

    spec.testDataProvider(LINK_CRAWL_PAGES);
    spec.it(`internal links should not be broken`, ({page, data}) => {
        cy.visitTo(data);
        cy.get('a[href]').then(($links) => {
            const base = Cypress.config('baseUrl');
            const hrefs = [
                ...new Set(
                    [...$links]
                        .map((a: any) => a.href.split('#')[0])
                        .filter((h) => h.startsWith(base))
                ),
            ];
            cy.log(`Checking ${hrefs.length} internal links`);
            hrefs.forEach((href) => {
                page.homePage.getPageResponse(href).its('status').should('be.lessThan', 400);
            });
        });
    });

    spec.it('footer policy links load with status 200', ({page}) => {
        cy.visitTo();
        FooterPolicyLinks.forEach((text) => {
            cy.get('footer')
                .contains('a', text)
                .should('have.attr', 'href')
                .then((href: any) => {
                    const baseURL: string = String(Cypress.config('baseUrl'));
                    const url = new URL(href, baseURL).href;
                    page.homePage.getPageResponse(url).its('status').should('eq', 200);
                });
        });
    });
});