const user = {
  name: "Test",
  lastName: "User",
  // unique email on every run to avoid collisions
  email: `autotest_${Date.now()}@example.com`,
  password: "Passw0rdTest",
};

const ids = {
  name: "#signupName",
  lastName: "#signupLastName",
  email: "#signupEmail",
  password: "#signupPassword",
  repeat: "#signupRepeatPassword",
};

const RED = "rgb(220, 53, 69)";
const PASSWORD_ERROR =
  "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

function openRegistration() {
  cy.openApp();
  cy.contains("button", "Sign up").click();
  cy.get(ids.name).should("be.visible");
}

function fill(selector, value, sensitive = false) {
  if (value === "") {
    cy.get(selector).focus().blur();
  } else {
    cy.get(selector).clear().type(value, { sensitive }).blur();
  }
}

function expectError(selector, message) {
  cy.get(selector)
    .should("have.class", "is-invalid")
    .and("have.css", "border-color", RED);
  cy.get(selector).siblings(".invalid-feedback").should("contain.text", message);
}

function fillValidForm() {
  fill(ids.name, user.name);
  fill(ids.lastName, user.lastName);
  fill(ids.email, user.email);
  fill(ids.password, user.password, true);
  fill(ids.repeat, user.password, true);
}

describe("qauto: registration", () => {
  beforeEach(() => {
    openRegistration();
  });

  it("shows the registration form with all fields", () => {
    cy.contains(".modal-title", "Registration").should("be.visible");
    Object.values(ids).forEach((selector) => {
      cy.get(selector).should("be.visible");
    });
    cy.contains(".modal-footer button", "Register").should("be.visible");
  });

  [
    ["Name", ids.name],
    ["Last name", ids.lastName],
  ].forEach(([label, selector]) => {
    context(`field "${label}"`, () => {
      it("shows an error for an empty field", () => {
        fill(selector, "");
        expectError(selector, `${label} required`); 
      });

      it("shows an error for invalid data", () => {
        fill(selector, "12345");
        expectError(selector, `${label} is invalid`);
      });

      it("shows an error when shorter than 2 characters", () => {
        fill(selector, "A");
        expectError(selector, `${label} has to be from 2 to 20 characters long`);
      });

      it("shows an error when longer than 20 characters", () => {
        fill(selector, "A".repeat(21));
        expectError(selector, `${label} has to be from 2 to 20 characters long`);
      });

      it.skip("ignores spaces around the value (trim)", () => {
        fill(selector, "  Test  ");
        cy.get(selector).should("not.have.class", "is-invalid");
      });
    });
  });

  context('field "Email"', () => {
    it("shows an error for an empty field", () => {
      fill(ids.email, "");
      expectError(ids.email, "Email required");
    });

    it("shows an error for an incorrect email", () => {
      fill(ids.email, "not-an-email");
      expectError(ids.email, "Email is incorrect");
    });
  });

  context('field "Password"', () => {
    it("shows an error for an empty field", () => {
      fill(ids.password, "");
      expectError(ids.password, "Password required");
    });

    it("shows an error for a weak password", () => {
      fill(ids.password, "password", true);
      expectError(ids.password, PASSWORD_ERROR);
    });
  });

  context('field "Re-enter password"', () => {
    it("shows an error for an empty field", () => {
      fill(ids.repeat, "");
      expectError(ids.repeat, "Re-enter password required");
    });

    it("shows an error when passwords do not match", () => {
      fill(ids.password, user.password, true);
      fill(ids.repeat, "Different1Pass", true);
      expectError(ids.repeat, "Passwords do not match");
    });
  });

  it('keeps the "Register" button disabled while the form is invalid', () => {
    cy.contains(".modal-footer button", "Register").should("be.disabled");
    fill(ids.name, "A");
    cy.contains(".modal-footer button", "Register").should("be.disabled");
  });

  it("registers a new user with valid data", () => {
    fillValidForm();
    cy.contains(".modal-footer button", "Register")
      .should("not.be.disabled")
      .click();
    cy.url().should("include", "/panel/garage");
  });
});

describe("qauto: login with the registered user", () => {
  it("logs in through the UI with the custom login() command", () => {
    cy.login(user.email, user.password);
    cy.url().should("include", "/panel/garage");
  });
});