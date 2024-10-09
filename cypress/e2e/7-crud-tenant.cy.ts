import "cypress-real-events";

describe("CRUD on tenant", () => {
  beforeEach(() => {
    cy.login("tenants");
  });

  it("should create a tenant", () => {
    //click form button
    cy.get('div[data-id="header-div"] button[data-id="form-btn"]').click();

    // validate and send
    const isRequired = /is required/i;
    const notValidEmail = /not a valid email/i;
    const onlyNumbers = /contain only numbers/i;
    const mustBeNumber = /must be a number/i;
    const between = /between 1-60/i;

    //first name
    cy.get('input[name="firstName"]').click();
    cy.realPress("Tab");
    cy.contains("p", isRequired).should("be.visible");
    cy.get('input[name="firstName"]').clear().type("    ");
    cy.realPress("Tab");
    cy.contains("p", isRequired).should("be.visible");
    cy.get('input[name="firstName"]').clear().type("Walter");
    cy.realPress("Tab");
    cy.contains("p", "First name " + isRequired).should("not.exist");

    //last name
    cy.get('input[name="lastName"]').click();
    cy.realPress("Tab");
    cy.contains("p", isRequired).should("be.visible");
    cy.get('input[name="lastName"]').clear().type("    ");
    cy.realPress("Tab");
    cy.contains("p", isRequired).should("be.visible");
    cy.get('input[name="lastName"]').clear().type("White");
    cy.realPress("Tab");
    cy.contains("p", "Last name " + isRequired).should("not.exist");

    //email
    cy.get('input[name="email"]').click();
    cy.realPress("Tab");
    cy.contains("p", isRequired).should("be.visible");
    cy.get('input[name="email"]').clear().type("    ");
    cy.realPress("Tab");
    cy.contains("p", isRequired).should("be.visible");
    cy.get('input[name="email"]').clear().type("walterwhite");
    cy.realPress("Tab");
    cy.contains("p", notValidEmail).should("be.visible");
    cy.get('input[name="email"]').clear().type("walterwhite@gmail.com");
    cy.realPress("Tab");
    cy.contains("p", notValidEmail).should("not.exist");
    cy.contains("p", "Email " + isRequired).should("not.exist");

    // phone number
    cy.get('input[name="phoneNumber"]').click();
    cy.realPress("Tab");
    cy.contains("p", isRequired).should("be.visible");
    cy.get('input[name="phoneNumber"]').clear().type("abcdefg");
    cy.realPress("Tab");
    cy.contains("p", onlyNumbers).should("be.visible");
    cy.get('input[name="phoneNumber"]').clear().type("123456789");
    cy.realPress("Tab");
    cy.contains("p", onlyNumbers).should("not.exist");
    cy.contains("p", "Phone number " + isRequired).should("not.exist");

    // terms
    cy.get('input[name="termInMonths"]').click();
    cy.realPress("Tab");
    cy.contains("p", mustBeNumber).should("be.visible");
    cy.get('input[name="termInMonths"]').clear().type("-12");
    cy.realPress("Tab");
    cy.contains("p", between).should("be.visible");
    cy.get('input[name="termInMonths"]').clear().type("72");
    cy.realPress("Tab");
    cy.contains("p", between).should("be.visible");
    cy.get('input[name="termInMonths"]').clear().type("21");
    cy.realPress("Tab");
    cy.contains("p", mustBeNumber).should("not.exist");
    cy.contains("p", between).should("not.exist");

    //lease start - end
    cy.get('button[type="submit"]').click();
    cy.contains("p", isRequired).should("be.visible");
    cy.contains("button", "Pick a date").click();
    cy.contains("button", "21").click();
    cy.contains("p", isRequired).should("not.exist");

    // submit
    cy.get('button[type="submit"]').click();
  });

  it("should edit tenant", () => {
    //go to units
    cy.get("a")
      .contains(/tenants/i)
      .click();
    // edit tenant and submit
    cy.contains("td", "Walter White")
      .parent("tr")
      .find('button[data-id="form-btn"]')
      .click();
    cy.get('input[name="firstName"]').clear().type("first name edited");
    cy.get('input[name="lastName"]').clear().type("last name edited");
    cy.get('input[name="email"]').clear().type("emailedited@gmail.com");
    cy.get('input[name="phoneNumber"]').clear().type("987654321");
    cy.get('input[name="termInMonths"]').clear().type("24");
    cy.contains("label", "Lease Start").click();
    cy.contains("button", "12").click();
    cy.get('button[type="submit"]').click();
    cy.contains("td", "first name edited").should("be.visible");
  });

  it("should not create tenant with same email", () => {
    // no duplicate email
    cy.get('div[data-id="header-div"] button[data-id="form-btn"]').click();
    cy.get('input[name="firstName"]').clear().type("duplicate");
    cy.get('input[name="lastName"]').clear().type("email");
    cy.get('input[name="email"]').clear().type("emailedited@gmail.com");
    cy.get('input[name="phoneNumber"]').clear().type("123456789");
    cy.get('input[name="termInMonths"]').clear().type("24");
    cy.contains("label", "Lease Start").click();
    cy.contains("button", "12").click();
    cy.get('button[type="submit"]').click();
    cy.contains("td", "duplicate email").should("not.exist");
    cy.get('button[data-id="dialog-close-btn"]').click();
  });

  it("should be able to delete tenant", () => {
    // delete tenant
    cy.contains("td", "first name edited")
      .parent("tr")
      .find('button[data-id="alert-delete-btn"]')
      .click();
    cy.get('button[data-id="confirm-delete-btn"]').click();
    cy.contains("td", "first name edited").should("not.exist");
  });
});
