const GaragePage = require("../../pages/GaragePage");
const ExpensesPage = require("../../pages/ExpensesPage");

const garagePage = new GaragePage();
const expensesPage = new ExpensesPage();

const car = { brand: "Audi", model: "TT", mileage: 100 };
const expense = { car: "Audi TT", mileage: 150, liters: 20, totalCost: 50 };

describe("Garage and fuel expenses", () => {
  beforeEach(() => {
    cy.login();
    cy.cleanupCars();
    garagePage.open();
  });

  it("adds a new car to the garage", () => {
    garagePage.addCar(car).shouldHaveCar("Audi TT");
  });

  it("adds a fuel expense to the created car", () => {
    garagePage.addCar(car).shouldHaveCar("Audi TT");
    expensesPage.open().addExpense(expense).shouldHaveExpense(expense);
  });
});