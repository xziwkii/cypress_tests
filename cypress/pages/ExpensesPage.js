class ExpensesPage {
  open() {
    cy.openApp("/panel/expenses");
    return this;
  }

  addExpense({ car, mileage, liters, totalCost }) {
    cy.contains("button", /add (an )?expense/i).click();
    cy.get(".modal-content").should("be.visible");
    cy.get("#addExpenseCar").select(car);
    cy.get("#addExpenseMileage").clear().type(String(mileage));
    cy.get("#addExpenseLiters").type(String(liters));
    cy.get("#addExpenseTotalCost").type(String(totalCost));
    cy.contains(".modal-footer button", "Add").click();
    cy.get(".modal-content").should("not.exist");
    return this;
  }

  shouldHaveExpense({ mileage, liters, totalCost }) {
    cy.contains("tr", String(mileage))
      .should("contain.text", String(liters))
      .and("contain.text", String(totalCost));
    return this;
  }
}

module.exports = ExpensesPage;