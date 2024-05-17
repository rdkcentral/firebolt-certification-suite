/**
 * @module undefinedValidation
 * @function undefinedValidation
 * @description To validate the content of the response if undefined
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * cy.undefinedValidation(validationTypeObject, apiOrEventObject)
 */

Cypress.Commands.add('undefinedValidation', (validationTypeObject, apiOrEventObject) => {
  if (validationTypeObject != null) {
    try {
      validationTypeObject.validations.forEach((validation) => {
        if (validation.field == 'result') {
          assert.isUndefined(apiOrEventObject, validation.description);
        } else {
          const fieldPath = validation.field.replace('result.', '');
          const fieldParts = fieldPath.split('.');
          const fieldValue = fieldParts.reduce((obj, part) => {
            return obj && obj[part];
          }, apiOrEventObject);
          assert.isUndefined(fieldValue, validation.description);
        }
      });
    } catch (error) {
      cy.log(
        'Received following error while performing validation of type undefined',
        JSON.stringify(error)
      );
    }
  } else {
    logger.info('Validation object is undefined', 'undefinedValidation');
  }
});
