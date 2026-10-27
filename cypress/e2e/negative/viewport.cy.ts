import {spec} from "../../helpers/spec-helper";
import {ViewPorts} from "../../fixtures/home";
import {LAYOUT_PAGES, NavItems} from "../../fixtures/navbar";

spec.scenarioDataProvider(ViewPorts, 'name');

spec.describe('Viewport ', ({data}) => {
    const viewport = data;
    spec.testDataProvider(LAYOUT_PAGES);
    spec.it(`Should not have scroll for ${viewport.name} view ${viewport.width}x${viewport.height}: of page`, ({data}) => {
        const path: string = data;
        cy.viewport(viewport.width, viewport.height);
        cy.visitTo(path);
        cy.get('header').should('be.visible');
        cy.document().then((doc) => {
            const el = doc.documentElement;
            expect(el.scrollWidth, 'scrollWidth').to.be.at.most(el.clientWidth + 1);
        });
        cy.screenshot(`viewport-${viewport.name}${path.replace(/\//g, '-') || '-home'}`, {
            capture: 'viewport',
        });
    });
});

spec.describe('Mobile Viewport regression', () => {
    beforeEach(() => {
        cy.viewport(375, 812);
        cy.visitTo();
    })
    spec.it('Should collapse nav into menu list for mobile', () => {
        const toggle =
            'header button[aria-label*="menu" i], header button[aria-expanded], header [class*="burger" i], header [class*="hamburger" i]';
        cy.get(toggle).first().should('be.visible').click();
        NavItems.forEach(({label}) => {
            cy.contains('a', label).should('exist');
        });
    });

    spec.it('Should show table for the mobile viewport on Explore', ({page}) => {
        cy.visitTo('/explore');
        page.explorePage.Locator.marketTable().first().then(($t) => {
            const rect = $t[0].getBoundingClientRect();
            const scrollable = $t.parents().toArray().some((el) => {
                const o = getComputedStyle(el).overflowX;
                return (o === 'auto' || o === 'scroll') && el.scrollWidth > el.clientWidth;
            });
            expect(rect.right <= 376 || scrollable, 'table fits or scrolls internally').to.be.true;
        });
    });
});

spec.describe('Desktop Viewport regression', () => {
    spec.it('full desktop nav shown at common widths, no hamburger', ({page}) => {
        [[1280, 720], [1366, 768], [1440, 900], [1920, 1080]].forEach(([w, h]) => {
            cy.viewport(w, h);
            cy.visitTo();
            NavItems.forEach(({label}) => {
                page.homePage.Locator.navbar.header().contains('a', label).should('be.visible');
            });
            cy.document().then((doc) => {
                expect(doc.documentElement.scrollWidth).to.be.at.most(
                    doc.documentElement.clientWidth + 1
                );
            });
        });
    });
})