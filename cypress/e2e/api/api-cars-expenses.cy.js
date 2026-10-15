const GaragePage = require("../../pages/GaragePage");
const ExpensesPage = require("../../pages/ExpensesPage");

const garagePage = new GaragePage();
const expensesPage = new ExpensesPage();

const car = { brand: "Audi", model: "TT", mileage: 100 };
const expense = { reportedAt: new Date().toISOString().slice(0, 10), mileage: 150, liters: 20, totalCost: 50 };

// id of the car, saved from the intercepted response and shared between tests
let carId;

describe("API testing: cars and expenses", () => {
  beforeEach(() => {
    cy.login();
  });

  it("creates a car via UI and intercepts POST /api/cars", () => {
    cy.cleanupCars();
    cy.intercept("POST", "/api/cars").as("createCar");

    garagePage.open().addCar(car);

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.status).to.eq("ok");
      expect(response.body.data).to.include({
        brand: car.brand,
        model: car.model,
        mileage: car.mileage,
      });
      carId = response.body.data.id;
      expect(carId).to.be.a("number");
    });
  });

  it("GET /api/cars returns the created car", () => {
    expect(carId, "carId saved by the previous test").to.be.a("number");

    cy.getCars().then((res) => {
      expect(res.status, JSON.stringify(res.body).slice(0, 300)).to.eq(200);
      const created = res.body.data.find((c) => c.id === carId);
      expect(created, "created car in the list").to.exist;
      expect(created).to.include({
        brand: car.brand,
        model: car.model,
        mileage: car.mileage,
      });
    });
  });

  it("creates an expense via API with the custom command", () => {
    expect(carId, "carId saved by the first test").to.be.a("number");

    cy.createExpense(carId, expense).then((res) => {
      expect(res.status, JSON.stringify(res.body).slice(0, 300)).to.eq(200);
      expect(res.body.status).to.eq("ok");
      expect(res.body.data).to.include({
        carId,
        mileage: expense.mileage,
        liters: expense.liters,
        totalCost: expense.totalCost,
      });
      expect(res.body.data.id).to.be.a("number");
    });
  });

  it("shows the expense created via API in the UI", () => {
    expensesPage.open().selectCar("Audi TT").shouldHaveExpense(expense);
  });
});