export function assignAliasesforProfile(fileName){
    cy.fixture(fileName).as('userInfo')
}