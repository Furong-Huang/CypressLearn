describe("CypressHomework03", () => {

  it("Wait for Color Change", () => {

    //Method 1, set the defaultCommandTimeout to 5000ms in cypress.json file
    //Method 2, customize cy.visit command to wait 5000ms in commands.js file
    cy.visit("https://demoqa.com/dynamic-properties");

  });

  it("Fill the information in the form with profile file", () => {

    cy.visit("https://demoqa.com/automation-practice-form");

    //fill the information in the form with profile file and summit form
    cy.fixture("profile").then((fillInfo) => {

      cy.get("#firstName").clear().type(fillInfo.firstName);

      cy.get("#lastName").clear().type(fillInfo.lastName);

      cy.get("#userEmail").clear().type(fillInfo.Email);

      cy.get("#gender-radio-1")
        .should("have.value", fillInfo.Gender)
        .click({ force: true });

      cy.get('[placeholder="Mobile Number"]').clear().type(fillInfo.Mobile);

      cy.get("#state").click();
      cy.get(".css-11unzgr").contains(fillInfo.State).click();

      cy.get("#city").click();
      cy.get(".css-11unzgr").contains(fillInfo.City).click();

      cy.get("#submit").click();

      //Check whether the info correct or wrong in the form and close form
      cy.get("tbody tr").then((rows) => {
        cy.wrap(rows)
          .first()
          .should("contain", fillInfo.firstName + " " + fillInfo.lastName);
        cy.wrap(rows).eq(1).should("contain", fillInfo.Email);
        cy.wrap(rows).eq(2).should("contain", fillInfo.Gender);
        cy.wrap(rows).eq(3).should("contain", fillInfo.Mobile);
        cy.wrap(rows)
          .last()
          .should("contain", fillInfo.State + " " + fillInfo.City);
        cy.get("#closeLargeModal").click();

      });
    });
  });
});
