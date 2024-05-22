/**
 * @module undefinedValidation
 * @function undefinedValidation
 * @description To validate the content of the response if undefined
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @param {String} validationType - To check whether to validate event or method
 * @example
 * cy.undefinedValidation(validationTypeObject, apiOrEventObject)
 */

const CONSTANTS = require('../constants/constants');

Cypress.Commands.add(
  'undefinedValidation',
  (validationTypeObject, apiOrEventObject, validationType) => {
    if (validationTypeObject != null && apiOrEventObject != null) {
      try {
        const methodOrEventResponse =
          validationType == CONSTANTS.EVENT
            ? apiOrEventObject.eventResponse
            : validationType == CONSTANTS.METHOD
              ? apiOrEventObject.response
              : null;
        const methodOrEventName =
          validationType == CONSTANTS.EVENT
            ? apiOrEventObject.eventName
            : validationType == CONSTANTS.METHOD
              ? apiOrEventObject.apiName
              : null;
        // Loop through each item of validations array of validation object
        validationTypeObject.validations.forEach((validation) => {
          // If the field to be validated is result, directly assert if result stored in response is undefined
          if (validation.field === CONSTANTS.RESULT) {
            firelog.isUndefined(
              methodOrEventResponse.result,
              `Expected ${methodOrEventName} response to have the field "${validation.field} as undefined`
            );
          } else {
            // Else recursilvely access the nested field properties and verify the corresponding value in response is undefined
            const fieldParts = validation.field.split('.');
            let currentObject = methodOrEventResponse;
            // Throw error if any properties other than the provided field is undefined
            for (let i = 0; i < fieldParts.length - 1; i++) {
              const part = fieldParts[i];
              if (!currentObject || typeof currentObject[part] === CONSTANTS.UNDEFINED) {
                logger.error(
                  `Expected ${methodOrEventName} response to have property ${part} in the field "${validation.field}`,
                  'undefinedValidation'
                );
              }
              currentObject = currentObject[part];
            }
            // Else assert if provided field is undefined
            const finalPart = fieldParts[fieldParts.length - 1];
            firelog.isUndefined(
              currentObject[finalPart],
              `Expected ${methodOrEventName} response to have the field "${validation.field} as undefined`
            );
          }
        });
      } catch (error) {
        cy.log(
          'Received following error while performing validation of type undefined on response',
          JSON.stringify(error)
        );
      }
    } else {
      logger.info('Validation object or object in global list is undefined', 'undefinedValidation');
    }
  }
);
