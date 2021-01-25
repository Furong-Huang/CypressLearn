describe("contional testing", () => {
  it("contional testing", () => {
    cy.visit(
      "https://www.calculator.net/random-number-generator.html?slower=1&supper=100&ctype=1&s=7323&submit1=Generate"
    );

    // cy.get('[name="slower"]').clear().type("1");
    // cy.get('[name="supper"]').clear().type("100");
    // cy.get('[name="submit1"]').first().click();

    cy.get(".verybigtext")
      .invoke("text")
      .then((text) => {
        if (parseInt(text) < 50) {
          cy.log("the value is less than 50");
        } else {
          cy.log("the value is greater than 49");
        }
      });
  });
});
