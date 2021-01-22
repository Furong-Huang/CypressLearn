describe("CypressHomework03", () => {

  it("Wait for Color Change", () => {
    //Method 1, set the defaultCommandTimeout to 5000ms in cypress.json file
    //Method 2, customize cy.visit command to wait 5000ms in commands.js file
    cy.visit("https://demoqa.com/dynamic-properties");
  });


  it.only("Fill the information in the form with profile file", () => {

    cy.visit("https://demoqa.com/automation-practice-form");
    

    //fill the information in the form with profile file and summit form
    cy.fixture("profile").then((userInfo) => {
      cy.get("#firstName").clear().type(userInfo.firstName);
      cy.get("#lastName").clear().type(userInfo.lastName);
      cy.get("#userEmail").clear().type(userInfo.Email);
      cy.get("#gender-radio-1")
        .should("have.value", userInfo.Gender)
        .click({ force: true });
      cy.get('[placeholder="Mobile Number"]').clear().type(userInfo.Mobile);
      cy.get("#state").click();
      cy.get(".css-11unzgr").contains(userInfo.State).click();
      cy.get("#city").click();
      cy.get(".css-11unzgr").contains(userInfo.City).click();
      cy.get("#submit").click();
    });

    //Check whether the info correct or wrong in the form and close form
    cy.fixture("profile").then((userInfo) => {
      cy.get("tbody tr").then((rows) => {
        cy.wrap(rows)
          .first()
          .should("contain", userInfo.firstName + " " + userInfo.lastName);
        //cy.wrap(rows).eq(1).invoke('text').should('eq',userInfo.Email)
        cy.wrap(rows).eq(2).should("contain", userInfo.Gender);
        cy.wrap(rows).eq(3).should("contain", userInfo.Mobile);
        cy.wrap(rows)
          .last()
          .should("contain", userInfo.State + " " + userInfo.City);
        cy.get("#closeLargeModal").click();
      });
    });
  });
});

