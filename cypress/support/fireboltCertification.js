// ***********************************************************
// This example support/fireboltCertification.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Importing generic module
import * as genericModule from './cypress-support/src/main';
import * as configModule from 'configModule';
import addContext from 'mochawesome/addContext';
import { attach } from '@badeball/cypress-cucumber-preprocessor';
import './commands';
import './validations/regExValidation';
import './validations/decodeValidation';


configModule.cypressAddons.default()
genericModule.default(configModule); // Question: do i need this if i dont have a configModule? e.g. Mock firebolt? if not i should be allowed to just start genericModule.default()

// Alternatively you can use CommonJS syntax:
// require('./commands')

/**
 * @module index
 * @function addContext
 * @description Cypress command that adds context to the mochawesome report
 * @returns void
 * @example cy.addContext(text)
 */
Cypress.Commands.add('addContext', (context) => {
  cy.once('test:after:run', (test) => addContext({ test }, context));
});

/**
 * @module index
 * @function log
 * @description Cypress command to overwrite log, log and then add to mochawesome report
 * @returns void
 * @example cy.log(text, args)
 */
Cypress.Commands.overwrite('log', (orig, string, options) => {
  orig(string, options);
  const dateString = new Date().toLocaleString().replace(',', '');
  cy.addContext('[' + dateString + '][' + options + ']:[' + JSON.stringify(string) + ']');

  options
    ? attach('[' + dateString + '][' + options + '][' + JSON.stringify(string) + ']')
    : attach('[' + dateString + '][' + JSON.stringify(string) + ']');
});
