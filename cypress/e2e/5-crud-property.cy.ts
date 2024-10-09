import "cypress-real-events";

describe("CRUD on property", () => {
  beforeEach(() => {
    cy.login("properties");
  });

  it("should create a property", () => {
    //click form button
    cy.get('div[data-id="header-div"] button[data-id="form-btn"]').click();

    // validate form and send
    const isRequired = "is required";
    const mustBeAnumber = "must be a number";
    const noNegative = "Cannot be negative value";
    const notMoreThan50 = "Cannot be more than 50 characters";

    // name
    cy.get('input[name="name"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(`Property name ${isRequired}`).should("be.visible");
    cy.get('input[name="name"]').type("         ");
    cy.realPress("Tab");
    cy.get("p").contains(`Property name ${isRequired}`).should("be.visible");
    cy.get('input[name="name"]').type(
      "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm"
    );
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50).should("be.visible");
    cy.get('input[name="name"]').clear().type("Cypress Tower");
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50).should("not.exist");
    cy.get("p").contains(`Property name ${isRequired}`).should("not.exist");

    // address
    cy.get('input[name="address"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(`Address ${isRequired}`).should("be.visible");
    cy.get('input[name="address"]').type("         ");
    cy.realPress("Tab");
    cy.get("p").contains(`Address ${isRequired}`).should("be.visible");
    cy.get('input[name="address"]').type(
      "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm"
    );
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50).should("be.visible");
    cy.get('input[name="address"]').clear().type("0521 Perpetual St. Earth");
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50).should("not.exist");
    cy.get("p").contains(`Address ${isRequired}`).should("not.exist");

    // owner
    cy.get('input[name="owner"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(`Owner ${isRequired}`).should("be.visible");
    cy.get('input[name="owner"]').type("         ");
    cy.realPress("Tab");
    cy.get("p").contains(`Owner ${isRequired}`).should("be.visible");
    cy.get('input[name="owner"]').type(
      "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm"
    );
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50).should("be.visible");
    cy.get('input[name="owner"]').clear().type("John Doe");
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50).should("not.exist");
    cy.get("p").contains(`Owner ${isRequired}`).should("not.exist");

    // contactInfo
    cy.get('input[name="contactInfo"]').click();
    cy.realPress("Tab");
    cy.get("p")
      .contains(`Contact information ${isRequired}`)
      .should("be.visible");
    cy.get('input[name="contactInfo"]').type("         ");
    cy.realPress("Tab");
    cy.get("p")
      .contains(`Contact information ${isRequired}`)
      .should("be.visible");
    cy.get('input[name="contactInfo"]').type(
      "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm"
    );
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50).should("be.visible");
    cy.get('input[name="contactInfo"]').clear().type("johndoe@gmail.com");
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50).should("not.exist");
    cy.get("p")
      .contains(`Contact information ${isRequired}`)
      .should("not.exist");

    // purchase price
    cy.get('input[name="purchasePrice"]').type("abcd");
    cy.realPress("Tab");
    cy.get("p")
      .contains(`Purchase price ${mustBeAnumber}`)
      .should("be.visible");
    cy.get('input[name="purchasePrice"]').clear().type("-1000000");
    cy.realPress("Tab");
    cy.get("p").contains(noNegative).should("be.visible");
    cy.get('input[name="purchasePrice"]').clear().type("1000000");
    cy.realPress("Tab");
    cy.get("p").contains(`Purchase price ${mustBeAnumber}`).should("not.exist");
    cy.get("p").contains(noNegative).should("not.exist");

    // monthly expenses
    cy.get('input[name="monthlyExpense"]').type("abcd");
    cy.realPress("Tab");
    cy.get("p")
      .contains(`Monthly expense ${mustBeAnumber}`)
      .should("be.visible");
    cy.get('input[name="monthlyExpense"]').clear().type("-20000");
    cy.realPress("Tab");
    cy.get("p").contains(noNegative).should("be.visible");
    cy.get('input[name="monthlyExpense"]').clear().type("20000");
    cy.realPress("Tab");
    cy.get("p")
      .contains(`Monthly expense ${mustBeAnumber}`)
      .should("not.exist");
    cy.get("p").contains(noNegative).should("not.exist");

    // mortgage payment
    cy.get('input[name="mortgagePayment"]').type("abcd");
    cy.realPress("Tab");
    cy.get("p")
      .contains(`Mortgage payment ${mustBeAnumber}`)
      .should("be.visible");
    cy.get('input[name="mortgagePayment"]').clear().type("-80000");
    cy.realPress("Tab");
    cy.get("p").contains(noNegative).should("be.visible");
    cy.get('input[name="mortgagePayment"]').clear().type("80000");
    cy.realPress("Tab");
    cy.get("p")
      .contains(`Monthly expense ${mustBeAnumber}`)
      .should("not.exist");
    cy.get("p").contains(noNegative).should("not.exist");

    // units
    cy.get('input[name="units"]').clear().type("-10");
    cy.realPress("Tab");
    cy.get("p").contains("There must be at least 1 unit").should("be.visible");
    cy.get('input[name="units"]').clear().type("10");
    cy.realPress("Tab");
    cy.get("p").contains("There must be at least 1 unit").should("not.exist");

    //submit and display
    cy.get('button[type="submit"]').click();
    cy.contains("h3", "Cypress Tower").scrollIntoView().should("be.visible");
  });

  it("should be able to edit property", () => {
    // edit property
    cy.contains("h3", "Cypress Tower")
      .scrollIntoView()
      .parents('div[data-id="properties-card-div"]')
      .find('button[data-id="form-btn"]')
      .click();
    cy.realPress("Tab");
    cy.get('input[name="name"]').clear().type("name edited");
    cy.get('input[name="address"]').clear().type("address edited");
    cy.get('input[name="owner"]').clear().type("owner edited");
    cy.get('input[name="contactInfo"]').clear().type("contact info edited");
    cy.get('input[name="purchasePrice"]').clear().type("2000000");
    cy.get('input[name="monthlyExpense"]').clear().type("40000");
    cy.get('input[name="mortgagePayment"]').clear().type("160000");

    // submit and display
    cy.get('button[type="submit"]').click();
    cy.get("h3").contains("name edited").scrollIntoView().should("be.visible");
  });

  it("should be able to delete property", () => {
    // delete property
    cy.contains("h3", "name edited")
      .scrollIntoView()
      .parents('div[data-id="properties-card-div"]')
      .find('button[data-id="alert-delete-btn"]')
      .click();
    cy.get('button[data-id="confirm-delete-btn"]').click();
    cy.contains("h3", "name edited").should("not.exist");
  });
});
