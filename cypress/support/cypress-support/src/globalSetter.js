const UTILS = require('./utils');
const CONSTANTS = require('../../constants/constants');
const fcsSetterStack = require('./fcsSetterStack');
import { fcs } from 'configModule/requestModules/index.js';
import { apiObject } from '../../appObjectConfigs.js';

global.setterSuccess = async (message = 'Setter Method is success') => {
  const params = UTILS.getEnvVariable(CONSTANTS.REQUEST_OVERRIDE_PARAMS);
  const response = { jsonrpc: '2.0', result: null, id: 0 };
  // Validating the response
  await validateResponse(params, response);
  cy.log(`${message}`);
  return response;
};

global.setterFailure = (message, error) => {
  fcsSetterStack.popMethod();
  const methodName = fcsSetterStack.getCurrentMethod();
  const errorMessage = `Setter Method ${methodName} ${message || `Setter Method ${methodName} failed`}`;

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
  fcsSetterStack.popMethod();
  const methodName = fcsSetterStack.getCurrentMethod();
  const userMessage = message
    ? `Setter Method ${methodName} ${message}`
    : `Setter Method ${methodName} does not have an implementation`;
  const docLink = `Please see the ${methodName} documentation for implementation details: https://github.com/rdkcentral/firebolt-certification-suite/blob/main/defaultModule/requestModules/fcsSetters.md#${methodName}`;
  const errorMessage = `${userMessage}\n${docLink}`;
  // Ensure error message appears in the Cucumber report
  cy.log(errorMessage);
  // Allow the log to complete before failing the test
  cy.wrap(null).then(() => {
    throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
  });
};

/**
 * Validates the response and push API object to the global list.
 * @param {object} methodName - Method Name to be validated .
 * @param {object} params - The corresponding parameters for method.
 *  @param {string} response - The response object.
 */

const validateResponse = async (params, response) => {
  const methodName = fcsSetterStack.getCurrentMethod();
  const appId = UTILS.fetchAppIdentifierFromEnv(CONSTANTS.FIRST_PARTY_APP);
  fcsSetterStack.popMethod();
  const setterMethod = fcsSetterStack.getCurrentMethod();;
  cy.updateResponseForFCS(methodName, params, response).then((updatedResponse) => {
    const apiOrEventAppObject = new apiObject(
      setterMethod, // Use the dynamically retrieved function name
      params,
      {},
      updatedResponse,
      CONSTANTS.RESULT,
      appId
    );
    // Add the API object to the global list
    const globalList = CONSTANTS.GLOBAL_API_OBJECT_LIST;
    UTILS.getEnvVariable(globalList).push(apiOrEventAppObject);
  });
};
