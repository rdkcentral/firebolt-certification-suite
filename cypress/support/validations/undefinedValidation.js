/**
 * @module undefinedValidation
 * @function undefinedValidation
 * @description To validate the content of the response if undefined
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @param {String} validationType - To check whether to validate event or method
 * @example
 * cy.undefinedValidation(validationTypeObject, apiOrEventObject, validationType)
 */

const CONSTANTS = require('../constants/constants');
const { fireLog } = require('../cypress-support/src/fireLog');

Cypress.Commands.add(
  'undefinedValidation',
  (validationTypeObject, apiOrEventObject, validationType) => {
    if (validationTypeObject != null && apiOrEventObject != null) {
      try {
        const methodOrEventResponse =
          validationType == CONSTANTS.EVENT
            ? apiOrEventObject.eventResponse
            : validationType == CONSTANTS.METHOD
              ? apiOrEventObject.apiResponse.result
              : null;
        const methodOrEventName =
          validationType == CONSTANTS.EVENT
            ? apiOrEventObject.eventObjectId
            : validationType == CONSTANTS.METHOD
              ? apiOrEventObject.apiName
              : null;
        // Loop through each item of validations array of validation object
        validationTypeObject.validations.forEach((validation) => {
          // If the field to be validated is result, directly assert if result stored in response is undefined
          if (
            validation.field === CONSTANTS.RESULT ||
            validation.field === CONSTANTS.EVENT_RESPONSE
          ) {
            fireLog.isUndefined(
              methodOrEventResponse,
              `Undefined Validation : Expected ${methodOrEventName} response to have the field ${validation.field} as undefined`
            );
          } else {
            // Else recursively access the nested field properties
            const fieldParts = validation.field.split('.');
            fieldParts.shift();
            let currentObject = methodOrEventResponse;
            // Throw error if any properties other than the last field is undefined
            for (let i = 0; i < fieldParts.length - 1; i++) {
              const part = fieldParts[i];
              if (!currentObject || typeof currentObject[part] === CONSTANTS.UNDEFINED) {
                fireLog.assert(
                  false,
                  `Undefined Validation : Expected ${methodOrEventName} response to have property ${part}`
                );
              }
              currentObject = currentObject[part];
            }
            // Else assert that the last field is undefined
            const finalPart = fieldParts[fieldParts.length - 1];
            fireLog.isUndefined(
              currentObject[finalPart],
              `Undefined Validation : Expected ${methodOrEventName} response to have the field ${validation.field} as undefined`
            );
          }
        });
      } catch (error) {
        fireLog.assert(
          false,
          `Undefined Validation : Received following error while performing validation',
          ${JSON.stringify(error)}`
        );
      }
    } else {
      fireLog.assert(
        false,
        `Undefined Validation :  Unable to find ${methodOrEventName} object stored in global list`
      );
    }
  }
);
