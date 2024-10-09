import "cypress-real-events";

describe("CRUD on unit", () => {
  beforeEach(() => {
    cy.login("units");
  });

  it("should create a unit", () => {
    //click form button
    cy.get('div[data-id="header-div"] button[data-id="form-btn"]').click();

    // validate form and send
    // number
    cy.get('input[name="number"]').click();
    cy.realPress("Tab");
    cy.contains("p", "Unit No. is required").should("be.visible");
    cy.get('input[name="number"]').type("qwertyuiopasdfghjklzxcvbnm");
    cy.realPress("Tab");
    cy.contains("p", "Cannot be more than 20 characters").should("be.visible");
    cy.get('input[name="number"]').clear().type("9999");
    cy.realPress("Tab");
    cy.contains("p", "Cannot be more than 20 characters").should("not.exist");
    cy.contains("p", "Unit No. is required").should("not.exist");

    // rent amount
    cy.get('input[name="rentAmount"]').clear().type("-100");
    cy.realPress("Tab");
    cy.contains("p", "Cannot be less than 0").should("be.visible");
    cy.get('input[name="rentAmount"]').clear().type("100");
    cy.realPress("Tab");
    cy.contains("p", "Cannot be less than 0").should("not.exist");

    // due date
    cy.get('input[name="dueDate"]').clear().type("1.5");
    cy.realPress("Tab");
    cy.contains("p", "Must be a whole number")
      .should("be.visible")
      .as("wholeNumber");
    cy.get('input[name="dueDate"]').clear().type("-1");
    cy.realPress("Tab");
    cy.contains("p", "Must be between 1-31").should("be.visible");
    cy.get('input[name="dueDate"]').clear().type("32");
    cy.realPress("Tab");
    cy.contains("p", "Must be between 1-31").should("be.visible").as("between");
    cy.get('input[name="dueDate"]').clear().type("21");
    cy.realPress("Tab");
    cy.get("wholeNumber").should("not.exist");
    cy.get("between").should("not.exist");

    // property id
    cy.get('button[type="submit"]').click();
    cy.contains("p", "Property Id is missing").should("be.visible");
    cy.contains("button", "Select a property").click();
    cy.get("select").select("Prima Tower", { force: true });

    // submit and display
    cy.get('button[type="submit"]').click();
    cy.contains("button", "Unit No.").scrollIntoView().click().click();
    cy.contains("td", "9999").should("be.visible");
  });

  it("should be able to edit unit", () => {
    // edit unit
    cy.contains("button", "Unit No.").scrollIntoView().click().click();
    cy.contains("td", "9999")
      .parent("tr")
      .find('button[data-id="form-btn"]')
      .click();
    cy.get('input[name="number"]').clear().type("unit number edited");
    cy.get('input[name="rentAmount"]').clear().type("200");
    cy.get('input[name="dueDate"]').clear().type("12");
    cy.get('button[type="submit"]').click();
    cy.contains("td", "unit number edited").should("be.visible");
  });

  it("should be able to delete unit", () => {
    // delete unit
    cy.contains("button", "Unit No.").scrollIntoView().click().click();
    cy.contains("td", "unit number edited")
      .parent("tr")
      .find('button[data-id="alert-delete-btn"]')
      .click();
    cy.get('button[data-id="confirm-delete-btn"]').click();
    cy.contains("td", "unit number edited").should("not.exist");
  });
});
