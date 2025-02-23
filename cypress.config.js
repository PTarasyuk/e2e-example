const { defineConfig } = require('cypress');
const { Client } = require('pg');
require('dotenv').config();

module.exports = defineConfig({
  video: true,
  trashAssetsBeforeRuns: false,
  browser: 'firefox',
  defaultBrowser: 'chrome',
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async queryDb(query) {
          const client = new Client({
            user: process.env.PG_USER,
            host: 'localhost',
            database: process.env.PG_DB,
            password: process.env.PG_PASSWORD,
            port: process.env.PG_PORT,
          });
          
          try {
            await client.connect();
            const res = await client.query(query);
            await client.end();
            return res.rows;
          } catch (error) {
            throw error;
          }
        },
      });

      return config;
    },
  },
});
