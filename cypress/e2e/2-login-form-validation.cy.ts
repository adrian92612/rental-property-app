import "cypress-real-events";

describe("user login validation", () => {
  it("should validate login client side", () => {
    // email
    cy.visit("/auth/login");
    cy.get('input[name="email"]').type("cypress");
    cy.realPress("Tab");
    cy.get("p")
      .contains(/email address is invalid/i)
      .as("errorMsg");
    cy.get('input[name="email"]').clear().type("cypress@test.com");
    cy.realPress("Tab");
    cy.get("errorMsg").should("not.exist");

    // password
    cy.get('input[name="password"]').click();
    cy.realPress("Tab");
    cy.get("p").contains("Password is required").as("errorMsg");
    cy.get('input[name="password"]').clear().type("Password123!");
    cy.realPress("Tab");
    cy.get("errorMsg").should("not.exist");
  });
});
