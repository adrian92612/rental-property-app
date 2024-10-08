import "cypress-real-events";

describe("user credential registration", () => {
  const emailRequired = /email is required/i;
  const emailInvalid = /invalid email/i;
  const firstNameRequired = /first name is required/i;
  const lastNameRequired = /last name is required/i;
  const notMoreThan50 = /cannot be more than 50 characters/i;
  const invalidPassword =
    /Password must be between 6 to 50 characters; have at least 1 lowercase, 1 uppercase, 1 number, and 1 special character/i;
  const notMatchPassword = /Password do not match/i;

  it("should show registration page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.get("a").click();
    cy.get("[data-id='registration-form']").should("be.visible");
  });

  it("should validate client side input", () => {
    cy.visit("/auth/register");
    // email
    cy.get('input[name="email"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(emailRequired);
    cy.get('input[name="email"]').type("invalid email");
    cy.realPress("Tab");
    cy.get("p").contains(emailInvalid);
    cy.get('input[name="email"]').clear().type("cypress@test.com");
    cy.realPress("Tab");
    cy.get("p").contains(emailInvalid).should("not.exist");
    cy.get("p").contains(emailRequired).should("not.exist");

    // first name
    cy.get('input[name="firstName"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(firstNameRequired);
    cy.get('input[name="firstName"]').type(
      "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm"
    );
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50);
    cy.get('input[name="firstName"]').clear().type("Cypress");
    cy.realPress("Tab");
    cy.get("p").contains(firstNameRequired).should("not.exist");
    cy.get("p").contains(notMoreThan50).should("not.exist");

    // last name
    cy.get('input[name="lastName"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(lastNameRequired);
    cy.get('input[name="lastName"]').type(
      "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm"
    );
    cy.realPress("Tab");
    cy.get("p").contains(notMoreThan50);
    cy.get('input[name="lastName"]').clear().type("Test");
    cy.realPress("Tab");
    cy.get("p").contains(lastNameRequired).should("not.exist");
    cy.get("p").contains(notMoreThan50).should("not.exist");

    // password
    cy.get('input[name="password"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(invalidPassword);
    cy.get('input[name="password"]').type("pass");
    cy.realPress("Tab");
    cy.get("p").contains(invalidPassword);
    cy.get('input[name="password"]')
      .clear()
      .type("qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm");
    cy.realPress("Tab");
    cy.get("p").contains(invalidPassword);
    cy.get('input[name="password"]').clear().type("Password");
    cy.realPress("Tab");
    cy.get("p").contains(invalidPassword);
    cy.get('input[name="password"]').clear().type("Password123");
    cy.realPress("Tab");
    cy.get("p").contains(invalidPassword);
    cy.get('input[name="password"]').clear().type("Password123!");
    cy.realPress("Tab");
    cy.get("p").contains(invalidPassword).should("not.exist");

    // confirm password
    cy.get('input[name="confirmPassword"]').click();
    cy.realPress("Tab");
    cy.get("p").contains(notMatchPassword);
    cy.get('input[name="confirmPassword"]').type("Password123");
    cy.realPress("Tab");
    cy.get("p").contains(notMatchPassword).as("p-element");
    cy.get('input[name="confirmPassword"]').clear().type("Password123!");
    cy.realPress("Tab");
    cy.get("p-element").should("not.exist");
  });
});
