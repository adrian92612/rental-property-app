import "cypress-real-events";

describe("dashboard navigations", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.visit("/auth/login");
    cy.get('input[name="email"]').type("cypress@test.com");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('button[type="submit"]').click();
  });

  it("should go to each path correctly", () => {
    cy.visit("/dashboard");
    cy.get("h1")
      .contains(/overview/i)
      .should("be.visible");
    // properties
    cy.get("a")
      .contains(/properties/i)
      .click();
    cy.url().should("eq", `${baseUrl}/dashboard/properties`);
    cy.get("h1")
      .contains(/properties/i)
      .should("be.visible");

    // units
    cy.get("a").contains(/units/i).click();
    cy.url().should("eq", `${baseUrl}/dashboard/units`);
    cy.get("h1").contains(/units/i).should("be.visible");

    // tenants
    cy.get("a")
      .contains(/tenants/i)
      .click();
    cy.url().should("eq", `${baseUrl}/dashboard/tenants`);
    cy.get("h1")
      .contains(/tenants/i)
      .should("be.visible");

    // user settings
    cy.get("a")
      .contains(/settings/i)
      .click();
    cy.url().should("eq", `${baseUrl}/dashboard/user-settings`);
    cy.get("h1")
      .contains(/user settings/i)
      .should("be.visible");
  });
});
