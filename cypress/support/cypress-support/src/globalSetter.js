const UTILS = require('./utils');
const CONSTANTS = require('../../constants/constants');

global.setterSuccess = (message = 'Setter Method is success') => {
  const methodName = UTILS.getEnvVariable(CONSTANTS.REQUEST_OVERRIDE_METHOD);
  cy.log(`[${methodName}] ${message}`);
  return { status: 'success', message };
};

global.setterFailure = (message, error) => {
  const methodName = UTILS.getEnvVariable(CONSTANTS.REQUEST_OVERRIDE_METHOD);
  const errorMessage = `Setter Method fcs.${methodName} ${message || `Setter Method fcs.${methodName} failed`}`;

  // cy.then() added to handle the errors gracefully
  cy.then(() => {
    const thrownError = new Error(errorMessage);
    // Setting the cause property to retain the original error
    if (error) {
      thrownError.cause = error;
    }
    throw thrownError;
  });
};

global.setterNotImplemented = (message) => {
  const methodName = UTILS.getEnvVariable(CONSTANTS.REQUEST_OVERRIDE_METHOD);
  const errorMessage = `Setter Method fcs.${methodName} ${message || `Setter Method fcs.${methodName} does not have an implementation`}`;
  cy.then(() => {
    throw new Error(errorMessage);
  });
};
