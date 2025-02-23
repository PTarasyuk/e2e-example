# Example Cypress E2E Testing with PostgreSQL

A demonstration project showing how to implement end-to-end testing combining database operations and UI interactions using Cypress.

## Project Overview

This example project demonstrates:

- Database Testing with Cypress:
  - PostgreSQL connection and query execution
  - Database schema verification
  - Data manipulation (SELECT, INSERT)
  - Foreign key relationship testing using Pagila database
  - Custom Cypress commands for database operations

- UI Testing Examples:
  - Login scenarios (successful/unsuccessful)
  - Shopping cart operations (add/remove items)
  - Screenshot capturing
  - Custom commands for common actions

- Infrastructure Setup:
  - Docker-based PostgreSQL deployment
  - Pagila sample database integration
  - Environment configuration with dotenv

- Test Organization:
  - Structured test scenarios
  - Fixture-based test data
  - Sequential test execution
  - Test reporting and error handling

## Prerequisites

Before starting, make sure you have the following software installed:

- Node.js (version 14 or higher)
- PostgreSQL
- Git

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   # Create database
   ./scripts/create-db.sh
   
   # If you need to clean the database
   ./scripts/cleanup-db.sh
   ```

## Running Tests

To run the tests, use the command:

```bash
npm test
```

Or to run Cypress in interactive mode:

```bash
npm run cypress
```

## Project Structure

```txt
├── cypress/
│   ├── e2e/           # Test scenarios
│   ├── fixtures/      # Test data
│   └── support/       # Helper commands and functions
├── scripts/           # Database management scripts
├── pagila/            # Pagila PostgreSQL database files
└── cypress.config.js  # Cypress configuration
```

## Test Data

The project uses fixtures for testing:

- `cypress/fixtures/city.json` - City data
- `cypress/fixtures/country.json` - Country data

## Useful Commands

- `npm run test` - Run all tests
- `npm run cypress:open` - Open Cypress Test Runner
- `./scripts/create-db.sh` - Create database
- `./scripts/cleanup-db.sh` - Clean database

## Contributing

1. Create a new branch for your changes
2. Make necessary changes
3. Write tests for new functionality
4. Submit a pull request
