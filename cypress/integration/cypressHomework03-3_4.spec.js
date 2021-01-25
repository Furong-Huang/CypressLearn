describe("test Login Feature with happy path",()=>{

    beforeEach('Before each case to run below code',()=>{

        cy.visit('/',{timeout:10000})
        cy.url().should('contain','saucedemo')
        cy.window().then( win =>{
            win.sessionStorage.clear()
        })
    })

    it.only("Login with valid username and password",()=>{

        //login with valid username and password
        cy.get('#user-name').clear().type("standard_user")
        cy.get('#password').clear().type("secret_sauce")
        cy.get('input[type="submit"]').should('be.visible').click()

        //Check login success
        cy.url().should('contain','inventory')
        cy.get('#item_4_img_link').find('[src="./img/sauce-backpack-1200x1500.jpg"]',{timeout:10000}).should('be.exist')
        cy.get('.inventory_item').should('have.length',6)

        //Add number items to cart and check quantity whether equal to number
        cy.addToCart(5)
        cy.clearCart()
        cy.get('#shopping_cart_container').click()

        //cy.get('.cart_quantity').first().invoke('text').should('eq','1')

        //Continue to finish the checkout process
        cy.get('.btn_action').contains('CHECKOUT').click()
        cy.get('#first-name').clear().type('Don')
        cy.get('#last-name').clear().type('Huang')
        cy.get('#postal-code').clear().type('0629')
        cy.get('input[type="submit"]').click()
        cy.get('.btn_action').contains('FINISH').click()
        cy.url().should('contain','checkout-complete')
        cy.contains('THANK YOU FOR YOUR ORDER',{timeout:10000}).should('be.visible')

    })

})

describe("test Login Feature with negative path",()=>{

    beforeEach('Before each case to run below code',()=>{

        cy.visit('/',{timeout:10000})
        cy.url().should('contain','saucedemo')

    })


    it("Login with empty username and correct password",()=>{
        cy.get('#user-name').clear()
        cy.get('#password').clear().type("secret_sauce")
        cy.get('input[type="submit"]').should('be.visible').click()
        cy.get('h3[data-test="error"]',{timeout:10000}).should('contain','Username is required')
        cy.checkContain
    })

    it("Login with empty username and empty password",()=>{
        cy.get('#user-name').clear()
        cy.get('#password').clear()
        cy.get('input[type="submit"]').should('be.visible').click()
        cy.get('h3[data-test="error"]',{timeout:10000}).should('contain','Username is required')

    })

    it("Login with correct username and empty password",()=>{
        cy.get('#user-name').clear().type("standard_user")
        cy.get('#password').clear()
        cy.get('input[type="submit"]').should('be.visible').click()
        cy.get('h3[data-test="error"]',{timeout:10000}).should('contain','Password is required')
    })

    it("Login with invalid username and correct password",()=>{
        cy.get('#user-name').clear().type("standa@#rd_user1212")
        cy.get('#password').clear().type("secret_sauce")
        cy.get('input[type="submit"]').should('be.visible').click()
        cy.get('h3[data-test="error"]',{timeout:10000}).should('contain','Username and password do not match any user in this service')
    })

    it("Login with correct username and invalid password",()=>{
        cy.get('#user-name').clear().type("standard_user")
        cy.get('#password').clear().type("se@#$$cret_sauce1212")
        cy.get('input[type="submit"]').should('be.visible').click()
        cy.get('h3[data-test="error"]',{timeout:10000}).should('contain','Username and password do not match any user in this service')
    })

    it("Login with locked out user",()=>{
        cy.get('#user-name').clear().type("locked_out_user")
        cy.get('#password').clear().type("secret_sauce")
        cy.get('input[type="submit"]').should('be.visible').click()
        cy.get('h3[data-test="error"]',{timeout:10000}).should('contain','Sorry, this user has been locked out.')
    })

    it("Login with problem user",()=>{
        cy.get('#user-name').clear().type("problem_user")
        cy.get('#password').clear().type("secret_sauce")
        cy.get('input[type="submit"]').should('be.visible').click()
        cy.get('#item_4_img_link').find('[src="./img/sauce-backpack-1200x1500.jpg"]',{timeout:10000}).should('not.exist')
    })

    it("Login with performance glitch user",()=>{
        cy.xpath('//*[@id="user-name"]').clear().type("performance_glitch_user")
        cy.xpath('//*[@id="password"]').clear().type("secret_sauce")
        cy.xpath('//*[@id="login-button"]').should('be.visible').click()
        cy.xpath('//*[@id="item_4_img_link"]/img').should('exist',{timeout:10000})
    })

})