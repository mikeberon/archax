const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1440,  // Standard width
    viewportHeight: 720,  // Standard height
    watchForFileChangs: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Global timeout settings
    defaultCommandTimeout: 10000, // Default timeout for all commands
    responseTimeout: 10000, // Timeout for HTTP requests
    pageLoadTimeout: 10000, // Timeout for page loads
  },
});
