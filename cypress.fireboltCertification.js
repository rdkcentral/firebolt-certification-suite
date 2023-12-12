const { defineConfig } = require('cypress');
const setupNodeEvents = require('./cypress/plugins/cucumber.js');
const {
  reporter,
  reporterOptions,
  env,
  e2e,
  chromeWebSecurity,
} = require('./cypress/support/common');

module.exports = defineConfig({
  reporter,
  reporterOptions,
  env,
  e2e: {
    ...e2e,
    setupNodeEvents,
    specPattern: '**/Sanity/*.feature',
  },
  chromeWebSecurity,
  video: false,
  screenshotOnRunFailure: false,
});
