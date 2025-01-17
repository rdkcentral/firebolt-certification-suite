const UTILS = require('./utils');
const CONSTANTS = require('../../constants/constants');

global.setterSuccess = (message = 'Setter Method is success') => {
  const methodName = UTILS.getEnvVariable(CONSTANTS.REQUEST_OVERRIDE_METHOD);
  console.log(`[${methodName}] ${message}`);
  return { jsonrpc: '2.0', result: null, id: 0 };
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
  const userMessage = `Setter Method fcs.${methodName} ${
    message || `Setter Method fcs.${methodName} does not have an implementation`
  }`;
  const docLink = `Please see the fcsSetters.${methodName} documentation for implementation details: https://github.com/rdkcentral/firebolt-certification-suite/blob/main/defaultModule/requestModules/fcsSetters.md#${methodName}`;
  const errorMessage = `${userMessage}\n${docLink}`;
  // Return the error message for proper rejection handling
  return new Error(errorMessage);
};
