const REGEXFORMATS = require('../constants/regexformats');
const CONSTANTS = require('../constants/constants');

/**
 * @module regExValidations
 * @class regExValidations
 * @description Regex validation is to validate the content based on the regular expression
 * @example
 * const regexValidation = new regExValidations()
 */
class regExValidations {
  /**
   * @module regExValidations
   * @class regExValidations
   * @description Regex validation is to validate the content based on the regular expression
   * @param {String} method - Method name needs to be send eg. Account.id
   * @param {String} expression - Expression describes the type to validate response
   * @param {String} scenario - Scenario needs to be numeric,string,decimal
   * @param {String} validationPath - Path in the response object
   * @param {Object} response - API or Event response to validate
   * @example
   * regexValidation.regexResultValidator('Account.uid', new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{2,}$/), 'uniqueid', 'result', {})
   */
  regexResultValidator(method, expression, scenario, validationPath, response) {
    if (response) {
      // Get the response from the provided path
      const extractedResponse = validationPath ? eval('response.' + validationPath) : null;

      // Validate the response with the mentioned expression
      const validationResult = extractedResponse
        ? expression.test(extractedResponse)
        : expression.test(response);

      cy.log(
        `RegEx Validation ${method}: expected ${
          extractedResponse ? extractedResponse : response
        } to be a ${scenario}`,
        'regexResultValidator'
      ).then(() => {
        assert.equal(true, validationResult, 'RegEx Validation:');
      });
    } else {
      assert(false, `RegEx Validation: Expected response Not Found for ${method}`);
    }
  }
}

/**
 * @module commands
 * @function regExValidation
 * @description Regex validation is to validate the content based on the regular expression
 * @param {String} Method - Method name needs to be send eg. Account.id
 * @param {String} scenario - scenario needs to be numeric,string,decimal
 * @example
 * cy.regExValidation('Account.uid', 'UID', 'result', '12a3g')
 */
Cypress.Commands.add('regExValidation', (method, scenario, validationPath, response) => {
  const regularExpressionValidation = new regExValidations();
  let regexType = scenario + '_REGEXP';

  if (REGEXFORMATS[regexType]) {
    regularExpressionValidation.regexResultValidator(
      method,
      REGEXFORMATS[regexType],
      scenario,
      validationPath,
      response
    );
  } else {
    cy.log('Regular Expression Not Found', 'regExValidation').then(() => {
      assert(false, 'Regular Expression Not Found');
    });
  }
});
