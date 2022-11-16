// type definitions for Cypress object "cy"
/*The simplest way to see IntelliSense when typing a Cypress command or assertion 
is to add a triple-slash directive to the head of your JavaScript or TypeScript testing file. 
This will turn the IntelliSense on a per file basis.*/
/// <reference types="cypress" />

describe('Verify Product name in Cart', function () {
  it('Visit the Selenium Practice website and select user selected product', function () {
    //Visit the OrnageHRM Website
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

    // Search for product which start with Ca 
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)

    //Verify that total 4 products get displayed with word start with ca
    cy.get('.products').find('.product').should('have.length', 4)
    cy.get('.products').find('.product').each(($el, index, $list) => {
      const itemtext = $el.find('h4.product-name').text()
      const itemprice = $el.find('p.product-price').text()

      // search for cauliflower
      if (itemtext.includes('Cauliflower')) {
        $el.find('button').click()
        cy.get('.cart-icon').click()
        // should('have.contain') ==> DOM elements can contain more than the desired text and still match.
        cy.get('.cart-item').find('.product-name').should('have.contain', itemtext)
        cy.get('.cart-item').find('.product-price').should('have.contain', itemprice)
      }
    })
  })
})


