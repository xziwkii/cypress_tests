describe("qauto: header and footer elements", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: { username: "guest", password: "welcome2qauto" },
    });
  });

  context("header", () => {
    ["Home", "About", "Contacts"].forEach((name) => {
      it(`shows the "${name}" button`, () => {
        cy.get("header").contains("a, button", name).should("be.visible");
      });
    });

    it('shows the "Guest log in" button', () => {
      cy.get("header")
        .contains("button", /guest log in/i)
        .should("be.visible");
    });

    it('shows the "Sign In" button', () => {
      cy.get("header")
        .contains("button", /sign in/i)
        .should("be.visible");
    });
  });

  context("footer and contacts block", () => {
    const socials = [
      ["Facebook", 'a[href*="facebook"]'],
      ["Telegram", 'a[href*="t.me"], a[href*="telegram"]'],
      ["YouTube", 'a[href*="youtube"]'],
      ["Instagram", 'a[href*="instagram"]'],
      ["LinkedIn", 'a[href*="linkedin"]'],
    ];

    socials.forEach(([name, selector]) => {
      it(`shows the ${name} link`, () => {
        cy.get(selector).should("be.visible");
      });
    });

    it("shows the ithillel.ua link", () => {
      cy.get('a[href*="ithillel.ua"]').should("be.visible");
    });

    it("shows the support email link", () => {
      cy.contains("support@ithillel.ua").should("be.visible");
    });

    it("shows the copyright text in the footer", () => {
      cy.get("footer").should("contain.text", "© 2021 Hillel IT school");
    });
  });
});