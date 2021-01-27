import CartPage from "../support/pageObjects/cart.js";
import LoginPage from "../support/pageObjects/login.js";
import ProductPage from "../support/pageObjects/prodList.js";

describe("Page Object exercise", () => {
  it("try Page Object", () => {
    const loginPage = new LoginPage();
    const productPage = new ProductPage();
    const cartPage = new CartPage();

    loginPage.visit();
    loginPage.Login("standard_user", "secret_sauce");
    productPage.addToCart(2);
    productPage.goToCart();
    cartPage.clearCart(1);
    cartPage.goToShopping();
    productPage.addToCart(1);
    productPage.goToCart();
    cartPage.goToCheckout();
  });
});
