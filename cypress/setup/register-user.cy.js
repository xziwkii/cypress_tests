// One-time setup: registers the user from the active config.
// Run once per environment: npm run register:qauto / npm run register:qauto2
describe("setup: register user", () => {
  it("registers the user for the current environment", () => {
    cy.task("getCreds", null, { log: false }).then(({ user }) => {
      cy.openApp();
      cy.contains("button", "Sign up").click();
      cy.get("#signupName").type(user.name);
      cy.get("#signupLastName").type(user.lastName);
      cy.get("#signupEmail").type(user.email);
      cy.get("#signupPassword").type(user.password, { sensitive: true });
      cy.get("#signupRepeatPassword").type(user.password, { sensitive: true });
      cy.contains(".modal-footer button", "Register").should("not.be.disabled").click();
      cy.url().should("include", "/panel/garage");
    });
  });
});