describe("homepage navigation while not logged in", () => {
  beforeEach(() => cy.visit("/"));
  const baseUrl = Cypress.config("baseUrl");

  it("should show homepage", () => {
    cy.get("h3").contains(/rental property dashboard/i);
    cy.get("a").contains(/login/i);
  });

  it("should show login page and register page", () => {
    cy.get("a").click();
    cy.url().should("eq", `${baseUrl}/auth/login`);
    cy.get("a").click();
    cy.url().should("eq", `${baseUrl}/auth/register`);
  });

  it("should redirect to home for other paths", () => {
    cy.visit("/unreachable");
    cy.url().should("eq", `${baseUrl}/`);
  });

  it("should redirect to login for protected paths", () => {
    cy.visit("/dashboard");
    cy.url().should("eq", `${baseUrl}/auth/login`);
    cy.visit("/dashboard/properties");
    cy.url().should("eq", `${baseUrl}/auth/login`);
    cy.visit("/dashboard/units");
    cy.url().should("eq", `${baseUrl}/auth/login`);
    cy.visit("/dashboard/tenants");
    cy.url().should("eq", `${baseUrl}/auth/login`);
  });
});
