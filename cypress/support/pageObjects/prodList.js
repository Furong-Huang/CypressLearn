class ProductPage {
  addToCart(num) {
    cy.get("button.btn_primary").then((buttons) => {
      for (let count = 0; count < num; count++) {
        cy.wrap(buttons).eq(count).contains("ADD TO CART").click();
      }
    });
  }

  goToCart() {
    cy.get("#shopping_cart_container").click();
    cy.url().should("contain", "cart");
  }
}

export default ProductPage;
