/// <reference types="cypress" />

describe("visitCommandTest",()=>{
    
    beforeEach(() => {
        cy.visit('https://www.acme.com/')
      })

    it("test cy.visit with options",()=>{
        cy.visit('https://www.acme.com/',{timeout: 30000})
    })


    it("test cy.visit with auth",()=>{
        cy.visit('https://www.acme.com/',{
            auth: {
                username: 'wile',
                password: 'coyote'
            }
        })

        cy.visit('https://wile:coyote@www.acme.com')

    })

    it("test cy.visit with an onBeforeLoad callback function",()=>{

        cy.visit('https://www.acme.com/', {
            onbeforeunload: (contentWindow) =>{

            }
        })
    })

    it("test cy.visit by passing qs to options",()=>{

        cy.visit('https://www.acme.com/', {
            qs: {
                page: '1',
                role: 'admin'
            }
        })
    })

    it("test cy.visit by passing qs to options",()=>{

        cy.visit('https://www.acme.com/', {
            qs: {
                page: '1',
                role: 'admin'
            }
        })
    })

    it.only("test cy.visit by configuring baseUrl",()=>{

        cy.visit('/')
    })
})