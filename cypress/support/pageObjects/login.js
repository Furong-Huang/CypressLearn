class LoginPage {
  visit() {
    cy.visit("/", { timeout: 10000 });
    cy.url().should("contain", "saucedemo");
    cy.title().should('eq','Swag Labs')
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  }

  Login(username, password) {
    cy.get("#user-name").clear().type(username);
    cy.get("#password").clear().type(password);
    cy.get('input[type="submit"]').should("be.visible").click();
  }
}

export default LoginPage;
