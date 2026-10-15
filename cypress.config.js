module.exports = {
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.js",
  },
};