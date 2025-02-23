const { defineConfig } = require('cypress');
const { Client } = require('pg');
require('dotenv').config();

module.exports = defineConfig({
  projectId: "8e38ew",
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env
      };
      on('task', {
        async queryDb(query) {
          const client = new Client({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DB,
            password: process.env.PG_PASSWORD,
            port: parseInt(process.env.PG_PORT),
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
