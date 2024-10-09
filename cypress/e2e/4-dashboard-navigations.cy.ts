import "cypress-real-events";

describe("dashboard navigations", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.login("none");
  });

  it("should go to properties page", () => {
    // properties
    cy.contains("a", /properties/i).click();
    cy.url().should("eq", `${baseUrl}/dashboard/properties`);
    cy.contains("h1", /properties/i).should("be.visible");
  });

  it("should go to units page", () => {
    // units
    cy.contains("a", /units/i).click();
    cy.url().should("eq", `${baseUrl}/dashboard/units`);
    cy.contains("h1", /units/i).should("be.visible");
  });

  it("should go to tenants page", () => {
    // tenants
    cy.contains("a", /tenants/i).click();
    cy.url().should("eq", `${baseUrl}/dashboard/tenants`);
    cy.contains("h1", /tenants/i).should("be.visible");
  });

  it("should go to user settings page", () => {
    // user settings
    cy.contains("a", /settings/i).click();
    cy.url().should("eq", `${baseUrl}/dashboard/user-settings`);
    cy.contains("h1", /user settings/i).should("be.visible");
  });
});
