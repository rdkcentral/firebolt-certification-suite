/**
 * Copyright 2024 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const REGEXFORMATS = require('../../fixtures/regexformats');
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
        `RegEx Validation : Expected ${method} response ${
          extractedResponse ? extractedResponse : response
        } to be in ${expression} regex format`,
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
 * @param {String} validationType - validationType needs to be numeric,string,decimal
 * @example
 * cy.regExValidation('Account.uid', 'UID', 'result', '12a3g')
 */
Cypress.Commands.add('regExValidation', (method, validationType, validationPath, response) => {
  const regularExpressionValidation = new regExValidations();
  const regexType = validationType + '_REGEXP';

  if (REGEXFORMATS[regexType]) {
    regularExpressionValidation.regexResultValidator(
      method,
      REGEXFORMATS[regexType],
      validationType,
      validationPath,
      response
    );
  } else {
    const reg = new RegExp(validationType);
    regularExpressionValidation.regexResultValidator(
      method,
      reg,
      validationType,
      validationPath,
      response
    );
  }
});
