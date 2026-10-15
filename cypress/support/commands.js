const APP_URL = "https://qauto.forstudy.space/";
const BASIC_AUTH = { username: "guest", password: "welcome2qauto" };

Cypress.Commands.add("openApp", () => {
  cy.visit(APP_URL, { auth: BASIC_AUTH });
});

Cypress.Commands.add("login", (email, password) => {
  cy.openApp();
  cy.contains("header button", /sign in/i).click();
  cy.get("#signinEmail").type(email);
  cy.get("#signinPassword").type(password, { sensitive: true });
  cy.contains(".modal-footer button", "Login").click();
});

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});