describe("Intro to Cypress", () => {
  it("opens the home page", () => {
    cy.visit("/");
    cy.contains("Kitchen Sink");
  });

  it("types into an input on the Actions page", () => {
    cy.visit("/commands/actions");
    cy.get(".action-email")
      .type("test@example.com")
      .should("have.value", "test@example.com");
  });
});