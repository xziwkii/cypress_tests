const { defineConfig } = require("cypress");
const base = require("./cypress.config");

const basicAuth = { username: "guest", password: "welcome2qauto" };
const user = {
  name: "Illia",
  lastName: "Tester",
  email: "illia.hw21.qauto@example.com",
  password: "Passw0rdTest",
};

module.exports = defineConfig({
  ...base,
  reporterOptions: { ...base.reporterOptions, reportDir: "cypress/reports/qauto" },
  e2e: {
    ...base.e2e,
    baseUrl: "https://qauto.forstudy.space",
    setupNodeEvents(on) {
      on("task", { getCreds: () => ({ basicAuth, user }) });
    },
  },
});