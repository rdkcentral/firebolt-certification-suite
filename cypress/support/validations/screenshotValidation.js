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
        method: 'fcs.screenshot',
        params: {
          addToReport: true,
          validations: object.validations,
        },
      };

      cy.sendMessagetoPlatforms(requestMap)
    } else {
      fireLog.fail('No validations found for screenshot.');
    }
  } else {
    fireLog.info('Screenshots are disabled.');
  }
});
