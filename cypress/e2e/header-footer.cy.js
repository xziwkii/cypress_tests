describe("qauto: header and footer elements", () => {
  beforeEach(() => {
    cy.visit("/", { auth: { username: "guest", password: "welcome2qauto" } });
  });

  it('shows the "Sign In" button in the header', () => {
    cy.get("header").contains("button", /sign in/i).should("be.visible");
  });

  ["Home", "About", "Contacts"].forEach((name) => {
    it(`shows the "${name}" button in the header`, () => {
      cy.get("header").contains("a, button", name).should("be.visible");
    });
  });

  it("shows the copyright text in the footer", () => {
    cy.get("footer").should("contain.text", "© 2021 Hillel IT school");
  });
});