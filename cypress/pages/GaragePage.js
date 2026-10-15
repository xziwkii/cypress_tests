class GaragePage {
  open() {
    cy.openApp("/panel/garage");
    return this;
  }

  addCar({ brand, model, mileage }) {
    cy.contains("button", "Add car").click();
    cy.get(".modal-content").should("be.visible");
    cy.get("#addCarBrand").select(brand);
    cy.get("#addCarModel").select(model);
    cy.get("#addCarMileage").type(String(mileage));
    cy.contains(".modal-footer button", "Add").click();
    cy.get(".modal-content").should("not.exist");
    return this;
  }

  shouldHaveCar(name) {
    cy.contains(name).should("be.visible");
    return this;
  }
}

module.exports = GaragePage;