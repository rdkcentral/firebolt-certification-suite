import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I say {string}', (echo) => {
  console.log(`You said ${echo}`);
  cy.log(`You said ${echo}!`);
});

Given('Pass', () => {
  console.log('Sample pass');
});

Given('Fail', () => {
  throw new Error('Sample failure');
});
