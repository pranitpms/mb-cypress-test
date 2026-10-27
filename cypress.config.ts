import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {

        baseUrl: process.env.CYPRESS_BASE_URL || "https://mb.io/en",
        viewportWidth: 1440,
        viewportHeight: 900,
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        setupNodeEvents(on, config) {

            // implement node event listeners here
        },
    },
});
