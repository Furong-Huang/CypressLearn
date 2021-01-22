describe('test before or after hook',()=>{

    before(()=>{
        // cy.visit('http://a.testaddressbook.com/sign_in')
        // cy.get('#session_email').clear().type('374373925@qq.com')
        // cy.get('#session_password').clear().type('Signup@4170')
    })

    afterEach(()=>{
        // cy.visit('http://a.testaddressbook.com/addresses')
        // cy.contains('Destroy').click()
        // cy.on("window:alert", ()=>{
        //     return true;
        // })
    })

    after(()=>{
        // cy.get('.navbar-toggler-icon').click()
        // cy.get('[data-test="sign-out"]').click()
    })
    
    it('add an address',()=>{

        cy.visit('http://a.testaddressbook.com/addresses')
        cy.get('[data-test="create"]').click()

        cy.get('#address_first_name').type('Sam')
        cy.get('#address_last_name').type('Sung')
        cy.get('#address_street_address').type('Korea')
        cy.get('#address_city').type('Seoul')
        cy.get('#address_zip_code').type('1002')
        cy.get('[data-test="submit"]').click()
        cy.get('[data-test="notice"]').invoke('text').should('eq','Address was successfully created.')


    })
})