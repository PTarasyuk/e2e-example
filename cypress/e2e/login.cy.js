describe('Login', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('Login successfully', () => {
    cy.fixture('users').then((users) => {
      const user = users.validUser;
      cy.login(user.username, user.password);
      // Assertion
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
      // Screenshot
      cy.screenshot('login');
    });
  });

  it('Login unsuccessfully', () => {
    cy.fixture('users').then((users) => {
      const user = users.invalidUser;
      cy.login(user.username, user.password);
      // Assertion
      cy.get('[data-test="error"]')
        .should(
          'contain.text',
          'Username and password do not match any user in this service'
        );
      cy.url().should('eq', 'https://www.saucedemo.com/');
      // Screenshot
      cy.screenshot('login-error');
    });
  })
})