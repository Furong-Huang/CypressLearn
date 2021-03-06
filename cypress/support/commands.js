// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

   //可以通过修改cy.visit()方法，等待Color Change
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => {

//   originalFn(url, options);
//   cy.get('#visibleAfter',{timeout:5000}).should('be.visible');

// })


Cypress.Commands.add("addToCart", (num)=>{

   cy.get('button.btn_primary').then(buttons =>{

      for(let count=0;count<num;count++)
      {
          cy.wrap(buttons).eq(count).click()
      }
      cy.get('.fa-layers-counter').invoke('text').should('eq',num.toString())  
      
  })
  
})

Cypress.Commands.add("clearCart", ()=>{

   cy.get('.btn_secondary').then(buttons =>{
      let count = buttons.length - 1
      for(;count>=0;count--)
      {
         cy.wrap(buttons).eq(count).click()
      }
      cy.get('.fa-layers-counter').should('not.exist')
  })
})

Cypress.Commands.add("loginAPIWeb", ()=>{

  cy.visit(Cypress.env('apiUrl'));
  cy.get('[ui-sref="app.login"]').click();
  cy.get('[placeholder="Email"]')
    .type(Cypress.env('username'));
  cy.get('[placeholder="Password"]')
    .type(Cypress.env('password'));
  cy.get('[type="submit"]').contains("Sign in").click();

  
})
