const UTILS = require('./utils');
const CONSTANTS = require('../../constants/constants');

global.setterSuccess = (message = 'successful response') => {
  const methodName = UTILS.getEnvVariable(CONSTANTS.REQUEST_OVERRIDE_METHOD);
  cy.log(`[${methodName}] Success: ${message}`);
  return { status: 'success', message };
};

global.setterFailure = (message, error) => {
  const methodName = UTILS.getEnvVariable(CONSTANTS.REQUEST_OVERRIDE_METHOD);
  const errorMessage = `${methodName} ${message || `FCS setter for fcsSetter.${methodName} failed`}`;

  // cy.then() added to handle the errors gracefully
  cy.then(() => {
    const thrownError = new Error(errorMessage);
    if (error) {
      thrownError.message += `error due to : ${JSON.stringify(error)}`;
    }

    throw thrownError;
  });
};

global.setterNotImplemented = (message) => {
  const methodName = UTILS.getEnvVariable(CONSTANTS.REQUEST_OVERRIDE_METHOD);
  const errorMessage = `${message || `FCS setter for fcsSetter.${methodName} does not have an implementation`}`;
  cy.then(() => {
    throw new Error(errorMessage);
  });
};
