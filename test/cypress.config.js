const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Charger les variables d'environnement depuis cypress.env.json
      config.env = config.env || {};
      
      // Permettre de désactiver les appels API réels en CI/CD
      if (process.env.CYPRESS_SKIP_API_CALLS) {
        config.env.SKIP_API_CALLS = true;
      }
      
      return config;
    },
    // Configuration pour le CI/CD
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
  },
});
