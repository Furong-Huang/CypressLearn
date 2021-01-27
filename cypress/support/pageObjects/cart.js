class CartPage {
  clearCart(num) {
    cy.get(".btn_secondary").then(() => {
      for (let count = num - 1; count >= 0; count--) {
        cy.get(".btn_secondary").eq(count).click();
      }
    });
  }

  goToShopping() {
    cy.contains("Continue Shopping").click();
    cy.url().should("contain", "inventory");
  }

  goToCheckout() {
    cy.contains("CHECKOUT").click();
    cy.url().should("contain", "checkout-step-one");
  }
}

export default CartPage;
