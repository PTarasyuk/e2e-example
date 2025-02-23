describe('Cart', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.fixture('users').then((users) => {
      const { username, password } = users.validUser;
      cy.login(username, password);
    });
  });

  it('Add product to cart successfully', () => {
    // Action #1
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Assertion #1
    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .should('have.text', '1');
    // Action #2
    cy.get('#shopping_cart_container').click();
    // Assertion #2
    cy.contains('Sauce Labs Backpack').should('be.visible');
    // Screenshot
    cy.screenshot('product-added');
  });

  it('Remove product from cart successfully', () => {
    // Action #1
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Assertion #1
    cy.get('.shopping_cart_badge')
      .should('be.visible');
    // Action #2
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    // Assertion #2
    cy.get('.shopping_cart_badge')
      .should('not.exist');
    // Screenshot 
    cy.screenshot('product-removed');
  });
});