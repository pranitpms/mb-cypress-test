# mb-cypress-test

Web UI automation for the public pages of [mb.io](https://mb.io/en-AE) (MultiBank), built with Cypress.
No login, personal data, or form submission is used anywhere in the suite.

[![Cypress Tests](https://github.com/pranitpms/mb-cypress-test/actions/workflows/cypress.yml/badge.svg)](https://github.com/pranitpms/mb-cypress-test/actions/workflows/cypress.yml)

---

## Contents

1. [Quick start (single command)](#1-quick-start-single-command)
2. [What is covered](#2-what-is-covered)
3. [Project structure](#3-project-structure)
4. [Running the suite](#4-running-the-suite)
5. [Sample execution report and cross-browser evidence](#5-sample-execution-report-and-cross-browser-evidence)
6. [Framework and design decisions](#6-framework-and-design-decisions)
7. [Assumptions](#7-assumptions)
8. [Test plan](#8-test-plan)
9. [Release readiness checklist](#9-release-readiness-checklist)
10. [Risk matrix](#10-risk-matrix)
11. [Task 2: written responses](#11-task-2-written-responses)
12. [Commit history convention](#12-commit-history-convention)
13. [Known limitations](#13-known-limitations)

---

## 1. Quick start (single command)

Requirements: Node.js 20 or newer, and Google Chrome installed.

```bash
git clone https://github.com/pranitpms/mb-cypress-test.git
cd mb-cypress-test
npm ci && npm test
```

`npm test` runs the whole suite headless in Chrome. Videos, screenshots and logs are written to `run-log/`.

---

## 2. What is covered

| Area                                                                       | Spec                                         | Required item it satisfies |
|----------------------------------------------------------------------------|----------------------------------------------|----------------------------|
| Invalid route handling                                                     | `cypress/e2e/negative/invalid-routes.cy.ts`  | Required (pick 2 of 4)     |
| Broken link detection across navigation links                              | `cypress/e2e/negative/broken-links.cy.ts`    | Required (pick 2 of 4)     |
| Viewport regression at a mobile breakpoint (375x812) and tablet (768x1024) | `cypress/e2e/negative/viewport.cy.ts`        | Required (pick 2 of 4)     |
| Content loading timeout handling                                           | `cypress/e2e/negative/loading-timeout.cy.ts` | Required (pick 2 of 4)     |
| Navigation (links, logo, auth link targets)                                | `cypress/e2e/navbar.cy.ts`                   | Core                       |
| Content (hero, banners, stats, footer)                                     | `cypress/e2e/content.cy.ts`                  | Core                       |
| Spot market (table, rows, field validity)                                  | `cypress/e2e/trading.cy.ts`                  | Core                       |
| API / network response validation                                          | `cypress/e2e/explore/api.cy.ts`              | Bonus                      |
| Parameterized test data                                                    | `cypress/fixtures`                           | Bonus                      |
| Basic CI (GitHub Actions)                                                  | `.github/workflows/cypress.yml`              | Bonus                      |

---

## 3. Project structure

```
mb-cypress-test/
├── .github/workflows/cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── explore/
│   │       ├── api.cy.ts
│   │       ├── trading.cy.ts
│   │   └── negative/
│   │       ├── invalid-routes.cy.ts
│   │       ├── broken-links.cy.ts
│   │       ├── viewport.cy.ts
│   │       └── loading-timeout.cy.ts
│   │   ├── company.cy.ts
│   │   ├── home.cy.ts
│   │   ├── navbar.cy.ts
│   ├── fixtures        # nav items, invalid routes, viewports, pages to crawl
│   ├── helpers    
│       ├── api/
│       ├── factory/   
│   ├── locators/ 
│       ├── common/   
│          └── base.locators.ts
│       ├── company.locators.ts
│       ├── explore.locators.ts
│       ├── home.locators.ts
│   ├── pages/ 
│       ├── base/   
│          └── base.page.ts
│          └── main.page.ts
│       ├── company.page.ts
│       ├── explore.page.ts
│       ├── home.page.ts
│   └── support/
│       ├── e2e.ts                # global hooks, imports commands
│       └── commands.ts           # shared helpers (checkLink, etc.)
├── run-log/                      # generated: videos, screenshots, logs (git-ignored)
├── cypress.config.ts
├── package.json
└── README.md
```

---

## 4. Running the suite

| Goal                         | Command                                                              |
|------------------------------|----------------------------------------------------------------------|
| Everything, Chrome, headless | `npm test`                                                           |
| Open the interactive runner  | `npm run cy:open`                                                    |
| Firefox                      | `npm run cy:run:firefox`                                             |
| Edge                         | `npm run cy:run:edge`                                                |
| All browsers in sequence     | `npm run test:all-browsers`                                          |
| One spec                     | `npx cypress run --spec "cypress/e2e/negative/invalid-routes.cy.js"` |
| Only the negative suite      | `npx cypress run --spec "cypress/e2e/negative/**/*.cy.js"`           |
| Against another environment  | `CYPRESS_BASE_URL=https://staging.example.com npm test`              |

Recommended `scripts` block for `package.json` (adds `test`, `edge` and the all-browsers runner to what you already
have):

```json
"scripts": {
  "test": "cypress run --browser chrome",
  "cy:open": "cypress open",
  "cy:run": "cypress run --browser chrome",
  "cy:run:firefox": "cypress run --browser firefox",
  "cy:run:edge": "cypress run --browser edge",
  "test:all-browsers": "npm run cy:run; npm run cy:run:firefox; npm run cy:run:edge"
}
```

Outputs:

| Path                                       | Contents                                                  |
|--------------------------------------------|-----------------------------------------------------------|
| `run-log/videos/`                          | One video per spec                                        |
| `run-log/screenshots/`                     | Failure screenshots and per-viewport captures             |
| `run-log/logs/cypress.log`, `cypress.json` | Browser console and command log (cypress-terminal-report) |

---

## 5. Sample execution report and cross-browser evidence

How to generate the evidence:

```bash
npm run cy:run            # Chrome
npm run cy:run:firefox    # Firefox
npm run cy:run:edge       # Edge
```

## 6. Framework and design decisions

| Decision                                                               | Reason                                                                                                                                                                                               |
|------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Cypress with plain JavaScript specs**                                | Fast to run, built-in network interception (needed for the timeout and API tests), and a low barrier for reviewers. TypeScript is installed so specs can be migrated later without a tooling change. |
| **Test IDs mirror the manual test case document**                      | Gives traceability from each automated test back to the written case.                                                                                                                                |
| **Test data in `fixtures`**                                            | Nav items, invalid routes, viewports and crawl pages are data, so adding a case means adding a row, not a new test. This covers the "parameterize test data" bonus.                                  |
| **`cy.intercept` for timeout and failure simulation**                  | Delays and blocks real XHR/fetch calls to prove the page does not go blank, without needing a flaky real slow network.                                                                               |
| **Link checks use `cy.request`, not clicking**                         | Roughly 10x faster than visiting each page, and does not trigger page side effects. Internal links must be below 400. External links tolerate 403/429 because many sites block bots.                 |
| **Wait for rows, not page load, on the market table**                  | The table is rendered after the page shell, so assertions use `should('have.length.at.least', n)` with an explicit timeout instead of fixed waits. No `cy.wait(ms)` sleeps.                          |
| **Never click Sign in / Sign up beyond reading the `href`**            | Keeps the suite free of account data and safe to run against production.                                                                                                                             |
| **Third-party script noise ignored**                                   | `uncaught:exception` ignores a short allowlist (ResizeObserver, hydration, chunk errors). Any other application error still fails the test.                                                          |
| **Retries: 2 in run mode, 0 in open mode**                             | Absorbs network flake in CI without hiding failures during local debugging.                                                                                                                          |
| **Video and failure screenshots on, logs via cypress-terminal-report** | Gives a reviewer evidence without having to rerun the suite.                                                                                                                                         |
| **`@testing-library/cypress`**                                         | Available for accessible, user-facing queries (`findByRole`, `findByText`) where markup is unstable.                                                                                                 |
| **`CYPRESS_BASE_URL` override**                                        | The same suite runs against staging or production with no code change.                                                                                                                               |

---

## 7. Assumptions

1. The site under test is the public marketing and market pages of `https://mb.io/en-AE`. No authenticated areas are in
   scope.
2. The top navigation contains: Explore, Features, OTC Desk, Company, Support, Blog and $MBG, plus Sign in and Sign up.
3. "Why MultiBank" lives at `/company`. There is no separate About Us menu item.
4. The $MBG link goes to an external domain (`token.multibankgroup.com`).
5. There is one app download smart link (`https://mbio.go.link/6OW91`) and no separate store badges.
6. The spot market table loads asynchronously after the page shell.

---

## 8. Test plan

### 8.1 Objective

Confirm that the public pages of mb.io load, navigate, render content, and degrade gracefully, across the supported
browsers and at desktop, tablet and mobile widths.

### 8.2 Scope

| In scope                                                        | Out of scope                              |
|-----------------------------------------------------------------|-------------------------------------------|
| Header navigation and logo                                      | Login and registration flows              |
| Homepage, Explore, Features, Company, Blog, Support pages       | Trading, orders, deposits, withdrawals    |
| Spot market table (rendering and data validity)                 | Price accuracy against an exchange        |
| Banners, images, footer and policy links                        | Load, stress and performance benchmarking |
| Invalid routes, broken links, mobile viewport, loading timeouts | Penetration and security testing          |
| API response status and shape for data calls the page makes     | Native mobile apps                        |

### 8.3 Approach

| Layer                   | Technique                                                      |
|-------------------------|----------------------------------------------------------------|
| Functional UI           | Cypress specs, one per feature area                            |
| Negative and resilience | `cy.intercept` to delay or block network, invalid URL requests |
| Link integrity          | `cy.request` on collected `href` values                        |
| Responsive              | `cy.viewport` at 375x812, 768x1024 and four desktop widths     |
| Network/API             | Intercept XHR/fetch, assert status and JSON content type       |

### 8.4 Environments and browsers

| Item      | Value                                                      |
|-----------|------------------------------------------------------------|
| Target    | `https://mb.io/en-AE` (production, read-only)              |
| Browsers  | Chrome, Firefox, Edge                                      |
| Viewports | 375x812, 768x1024, 1280x720, 1366x768, 1440x900, 1920x1080 |
| CI        | GitHub Actions on `ubuntu-latest`                          |

### 8.5 Entry and exit criteria

| Entry                             | Exit                                              |
|-----------------------------------|---------------------------------------------------|
| Site reachable, `npm ci` succeeds | All High priority tests pass on Chrome            |
| Test data and selectors reviewed  | No open Critical or High defects                  |
|                                   | Medium/Low failures triaged and documented        |
|                                   | Cross-browser run completed and evidence attached |

### 8.6 Prioritisation

| Priority | Examples                                                                                                  |
|----------|-----------------------------------------------------------------------------------------------------------|
| High     | Nav renders and routes, spot table loads, invalid route handled, mobile layout, loading failure not blank |
| Medium   | OTC/Support/Blog load, banner images, footer links                                                        |
| Low      | Colour coding of change %, sentiment widget, live refresh                                                 |

### 8.7 Deliverables

Spec files, fixtures, CI workflow, run videos and screenshots, this README, and the run summary in section 5.

---

## 9. Release readiness checklist

Tick each item before declaring a build ready.

### Functional

- [ ] All 7 nav items render in order and route correctly
- [ ] Sign in / Sign up point to `trade.mb.io`
- [ ] Spot market table loads with at least 10 rows and no `NaN` or blank cells
- [ ] Homepage movers (Top Gainers, Trending Now, Top Losers) populated
- [ ] Hero, promo banner and company stats display

### Resilience

- [ ] Unknown routes return 404 or redirect, with header and footer intact
- [ ] No 5xx on invalid locale or malformed URLs
- [ ] Market table shows a loading or error state when data is delayed or blocked
- [ ] Page recovers on reload after a failed data call
- [ ] Page remains usable with images blocked

### Links

- [ ] No broken internal links on Home, Explore, Features, Company
- [ ] Footer policy links return 200
- [ ] App download link resolves
- [ ] External link failures reviewed (403/429 treated as warnings)

### Responsive

- [ ] No horizontal scroll at 375 and 768 wide
- [ ] Mobile menu opens and lists all items
- [ ] Market table fits or scrolls inside its own container on mobile

### API / network

- [ ] No 5xx responses while loading Explore
- [ ] Data calls return JSON with status below 400

### Pipeline and hygiene

- [ ] GitHub Actions run is green on the release commit
- [ ] No `cy.wait(<ms>)` sleeps or `.only` left in specs
- [ ] No secrets, tokens or personal data committed
- [ ] README and run evidence are up to date

### Sign-off

| Role     | Name               | Date | Decision   |
|----------|--------------------|------|------------|
| QA       | Pranit Bardapurkar |      | Go / No-go |
| Reviewer |                    |      | Go / No-go |

---

## 10. Risk matrix

Likelihood and impact are rated 1 (low) to 3 (high). Score = likelihood x impact.

| #   | Risk                                                                              | Likelihood | Impact | Score | Mitigation                                                                                                | Owner  |
|-----|-----------------------------------------------------------------------------------|------------|--------|-------|-----------------------------------------------------------------------------------------------------------|--------|
| R1  | Generic selectors break when the DOM changes (site is JS-rendered)                | 3          | 2      | 6     | Keep selectors in one place, prefer `data-testid` or role-based queries, ask dev team for stable test ids | QA     |
| R2  | Live market data changes between runs, causing flaky assertions                   | 3          | 2      | 6     | Assert shape and validity, never exact values; explicit timeouts, no fixed sleeps                         | QA     |
| R3  | Third-party sites block bots (403/429) and fail link checks                       | 3          | 1      | 3     | Treat external 403/429 as warnings; fail only on real breakage                                            | QA     |
| R4  | Tests run against production and could be affected by site changes or rate limits | 2          | 3      | 6     | Read-only tests, no form submission, `CYPRESS_BASE_URL` for staging, modest request volume                | QA     |
| R5  | Behaviour differs between browsers (Firefox/Edge)                                 | 2          | 2      | 4     | Run all three in CI, document differences in section 5.3                                                  | QA     |
| R6  | Mobile menu breakpoint or pattern differs from assumption                         | 2          | 2      | 4     | Confirm in browser, keep toggle selector configurable                                                     | QA     |
| R9  | Real slow-network behaviour not fully covered by simulated delay                  | 2          | 2      | 4     | Combine `cy.intercept` delay with a periodic manual throttled run                                         | QA     |
| R10 | CI environment cannot reach the site or has a different region/geo behaviour      | 1          | 3      | 3     | Run from a runner in an allowed region; retry once; alert on network-level failure                        | DevOps |
| R11 | Dependency versions (Cypress, TypeScript) change behaviour                        | 1          | 2      | 2     | Lock with `package-lock.json`, use `npm ci`                                                               | QA     |

---

## 11. Task 2 - QA Strategy & Thinking

The Scenario
You've just joined a fintech startup as a QA Engineer. On day one you're handed a mobile
trading app, for both iOS and Android, that's two weeks from its first public release. There's
no existing test suite, no QA documentation, and the dev team has been shipping fast.
Assume real user funds are involved.

### Question 1

_Where do you start?_

**Answer:**

1. Talk to the PO and devs to understand the architecture, critical features, and known issues.
2. Walk through the core flows end to end.
3. Use the app on real iOS and Android devices as a customer would
4. Find out what already exists: unit tests, CI, staging, sandbox
5. Set up test environments, test data, and a risk-based test plan.
6. Since the release is only two weeks away, focus on critical risks first rather than trying to test everything. Also
   inform Scrum master about what I can and can’t give confidence for the release.

### Question 2

_How would you approach testing this app?_

**Answer:**

1. **Money paths first** - test the workflows where real money is involved.
2. **Security and access**: login, biometrics, 2FA, session timeout, data stored on device
3. Test on both iOS and Android, covering different devices, network interruptions, app restarts, and session expiry.
4. Run the existing Automation regression suite.
5. Exploratory testing: Try unexpected user actions, repeated taps, timeouts, and interrupted transactions.

### Question 3

_What does QA look like inside a sprint, from ticket creation through to regression?_

**Answer:**

1. Requirement stage: Review acceptance criteria, clarify gaps, and identify risks early.
2. Development: write test scenarios while devs build, and test early builds
3. Ready for QA: verify against acceptance criteria, then explore around the edges
4. Defect stage: Report clear reproduction steps, logs, actual versus expected results, and retest fixes.
5. End of sprint: regression on the release candidate
6. Release: go/no-go checklist, staged rollout

### Question 4

_What does your ideal regression suite look like?_

**Answer:**
I would organize regression into these layers:

1. API Regression (every merge): Run API tests for fees,P&L, order validation
2. Regression (every release candidate): Small set of critical tests like 15 to 25 automated UI smoke tests on both
   platforms:
3. short manual checklist for real-device behavior, biometrics, push, bad networks
4. Stable test accounts in known states and a reliable sandbox
5. Regularly refactor or fix flaky and useless tests

### Question 5

_What would keep you up at night about this app specifically and releasing to the
public?_

**Answer:**

1. Wrong or duplicated money: double orders, balance mismatches, repeated withdrawals
2. Real market conditions: load spikes, price lag, users trading on stale prices
3. Security: account takeover, token leaks, weak sessions
4. Third-party failures: broker, KYC, custody, market data outages
5. Compliance: disclosures, KYC rules, regional restrictions
6. No instant rollback on mobile: need staged rollout, kill switch, monitoring, on-call plan
7. Deadline pressure: if the money paths aren’t trustworthy, I’d recommend a limited beta over a full public launch

---

## Author

Pranit Bardapurkar