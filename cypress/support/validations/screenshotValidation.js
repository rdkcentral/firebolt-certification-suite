const CONSTANTS = require('../constants/constants');
const UTILS = require('../cypress-support/src/utils');

/**
 * @module screenshotValidation
 * @function screenshotValidation
 * @description To validate the content of the response if undefined
 * @param {Object} object - The object to validate
 * @example
 * cy.screenshotValidation()
 */
Cypress.Commands.add('screenshotValidation', (object) => {
  if (UTILS.getEnvVariable('enableScreenshots')) {
    console.log('object', object);
    if (object && object.validations && object.validations.length > 0) {
      const requestMap = {
        method: 'fcs.screenshot',
        params: {
          addToReport: true,
          validations: object.validations,
        },
      };

      cy.sendMessagetoPlatforms(requestMap).then((response) => {
        cy.log('Screenshot validation response: ', response).then(() => {
          fireLog.equal('pass', response.status, 'Screenshot validation status');
        });
      });
    } else {
      fireLog.fail('No validations found for screenshot.');
    }
  } else {
    fireLog.info('Screenshots are disabled.');
  }
});
