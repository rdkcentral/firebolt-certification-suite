const CONSTANTS = require('../constants/constants');
const UTILS = require('../cypress-support/src/utils');

/**
 * @module screenshotValidation
 * @function screenshotValidation
 * @description To validate the content of the response if undefined
 * @param {Object} object - The object to validate
 * @example
 * cy.screenshotValidation({})
 */
Cypress.Commands.add('screenshotValidation', (object) => {
  if (UTILS.getEnvVariable('enableScreenshots')) {
    if (object && object.validations) {
      const requestMap = {
        method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SCREENSHOT,
        params: {
          validations: object.validations,
        },
      };

      fireLog.info('Screenshot validation has started');
      fireLog.info('Screenshot Validation Object: ' + JSON.stringify(object.validations));
      cy.sendMessagetoPlatforms(requestMap).then((response) => {
        if (object.validations.length > 0 || response.validations.length > 0) {
          fireLog.info('Screenshot Validation Response: ' + JSON.stringify(response));
          if (response && response.status === 'fail') {
            const failedOne = response.validations.find((valObject) => valObject.status === 'fail');
            fireLog.fail(`Screenshot Validation Failed: ${failedOne.message}`);
          }
        }
      });
    } else {
      fireLog.fail('No validations found for screenshot.');
    }
  } else {
    fireLog.info('Screenshots are disabled.');
  }
});
