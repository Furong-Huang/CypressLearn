describe('test before or after hook',()=>{

    before(()=>{
        cy.visit('http://a.testaddressbook.com/sign_in')
        cy.get('#session_email').clear().type('374373925@qq.com')
        cy.get('#session_password').clear().type('Signup@4170')
        cy.get('[data-test="submit"]').click()
        cy.contains('Welcome to Address Book').should('be.visible')
    })

    afterEach(()=>{
        cy.visit('http://a.testaddressbook.com/addresses')
        cy.get('tbody tr').then(rows =>{
            let count = rows.length-1
            for(;count>=0;count--)
            {
                cy.get('tbody tr').eq(count).contains('Destroy').click()
                cy.on("window:alert", ()=>{
                    return true;
                })
            }
        })
        cy.get('tbody tr').should('not.exist')
    })

    after(()=>{
        cy.get('[data-test="sign-out"]').click()
        cy.get('[data-test="submit"]').should('be.visible')
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