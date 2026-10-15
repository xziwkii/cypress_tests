const { defineConfig } = require("cypress");

const basicAuth = { username: "guest", password: "welcome2qauto" };
const user = {
  name: "Illia",
  lastName: "Tester",
  email: "illia.hw21.qauto@example.com",
  password: "Passw0rdTest",
};

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/default",
    reportFilename: "[name]",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
  },
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    specPattern: ["cypress/e2e/garage/**/*.cy.js", "cypress/setup/**/*.cy.js"],
    setupNodeEvents(on) {
      on("task", { getCreds: () => ({ basicAuth, user }) });
    },
  },
});