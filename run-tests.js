const cypress = require('cypress');

async function runTests() {
  try {
    console.log('➡️ Running login test...');
    let result = await cypress.run({ spec: 'cypress/e2e/login.cy.js', video: true });
    if (result.totalFailed > 0) {
      console.error('❌ Login test failed. Stopping execution.');
      process.exit(1);
    }

    console.log('➡️ Running database check test...');
    result = await cypress.run({ spec: 'cypress/e2e/db-check.cy.js' });
    if (result.totalFailed > 0) {
      console.error('❌ Database check test failed. Stopping execution.');
      process.exit(1);
    }

    console.log('➡️ Running cart test...');
    result = await cypress.run({ spec: 'cypress/e2e/cart.cy.js', video: true });
    if (result.totalFailed > 0) {
      console.error('❌ cart test failed.');
      process.exit(1);
    }

    console.log('✅ All tests passed successfully!');
  } catch (error) {
    console.error('❌ Error running tests:', error);
    process.exit(1);
  }
}

runTests();