// Credentials live in the config files and are read through a Node task
const getCreds = () => cy.task("getCreds", null, { log: false });

Cypress.Commands.add("openApp", (path = "/") => {
  getCreds().then(({ basicAuth }) => {
    cy.visit(path, { auth: basicAuth });
  });
});

// Login through the UI; defaults to the user from the active config
Cypress.Commands.add("login", (email, password) => {
  cy.openApp();
  getCreds().then(({ user }) => {
    cy.contains("header button", /sign in/i).click();
    cy.get("#signinEmail").type(email || user.email);
    cy.get("#signinPassword").type(password || user.password, { sensitive: true });
    cy.contains(".modal-footer button", "Login").click();
    cy.url().should("include", "/panel/garage");
  });
});

// Best effort: remove cars left from previous runs via API
Cypress.Commands.add("cleanupCars", () => {
  getCreds().then(({ basicAuth }) => {
    cy.request({ url: "/api/cars", auth: basicAuth, failOnStatusCode: false }).then((res) => {
      const cars = res.status === 200 && res.body && res.body.data ? res.body.data : [];
      cars.forEach((car) => {
        cy.request({
          method: "DELETE",
          url: `/api/cars/${car.id}`,
          auth: basicAuth,
          failOnStatusCode: false,
        });
      });
    });
  });
});

// Mask sensitive text in the Cypress command log
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
// GET /api/cars: list of cars of the logged-in user
Cypress.Commands.add("getCars", () => {
  return getCreds().then(({ basicAuth }) => {
    return cy.request({ url: "/api/cars", auth: basicAuth });
  });
});

// POST /api/expenses: creates an expense for the given car and returns the response
Cypress.Commands.add("createExpense", (carId, expense) => {
  return getCreds().then(({ basicAuth }) => {
    return cy.request({
      method: "POST",
      url: "/api/expenses",
      auth: basicAuth,
      failOnStatusCode: false,
      body: {
        carId,
        reportedAt: expense.reportedAt,
        mileage: expense.mileage,
        liters: expense.liters,
        totalCost: expense.totalCost,
        forceMileage: false,
      },
    });
  });
});