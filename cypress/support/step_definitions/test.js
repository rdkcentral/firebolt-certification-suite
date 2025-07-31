import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
const CONSTANTS = require('../constants/constants');
const { _ } = Cypress;
import UTILS, { fireLog } from '../cypress-support/src/utils';

Given('I have loaded dynamic data', () => {
  console.log('Loading dynamic data...');
  cy.log('Loading dynamic data...');
});

Then('the value for {string} should be one', (key) => {
    console.log(`Validating value for ${key}...`);
    cy.log(`Validating value for ${key}...`);
});

