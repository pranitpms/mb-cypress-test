import {defineConfig} from "cypress";

const installLogsPrinter =
    require("cypress-terminal-report/src/installLogsPrinter").default
    ?? require("cypress-terminal-report/src/installLogsPrinter");
export default defineConfig({
    viewportWidth: 1280,
    viewportHeight: 900,
    retries: {runMode: 2, openMode: 0},
    defaultCommandTimeout: 60000,
    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL || "https://mb.io/en-AE",
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        video: true,
        videosFolder: "run-log/videos",
        screenshotsFolder: "run-log/screenshots",
        setupNodeEvents(on, config) {

            installLogsPrinter(on, {
                outputRoot: `${config.projectRoot}/run-log/logs/`,
                outputTarget: {
                    "cypress.log": "txt",
                    "cypress.json": "json",
                },
            });
            return config;
        },
    },
});
