import "cypress-real-events";

describe("user credential registration", () => {
  it("should show registration page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.get("a").click();
    cy.get("[data-id='registration-form']").should("be.visible");
  });

  it("should register a user", () => {
    cy.visit("/auth/register");
    // email
    cy.get('input[name="email"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(/email is required/i);
    cy.get('input[name="email"]').click().type("invalid email");
    cy.realPress("Tab");
    cy.get("p").contains(/invalid email/i);
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').click().type("cypress@test.com");
    cy.realPress("Tab");
    cy.get("p")
      .contains(/invalid email/i)
      .should("not.exist");
    cy.get("p")
      .contains(/email is required/i)
      .should("not.exist");

    // first name
  });
});
