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
const RegexParser = require('regex-parser');
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
  regexResultValidator(method, expression, validationPath, response) {
    if (response) {
      // Get the response from the provided path
      const extractedResponse = validationPath ? eval('response.' + validationPath) : null;

      // Validate the response with the mentioned expression
      const validationResult = extractedResponse
        ? expression.test(extractedResponse)
        : expression.test(response);
      const stringifiedExtractedResponse =
        typeof extractedResponse === 'object'
          ? JSON.stringify(extractedResponse)
          : extractedResponse;
      const stringifiedResponse =
        typeof response === 'object' ? JSON.stringify(response) : response;

      cy.log(
        `RegEx Validation : Expected ${method} response ${
          stringifiedExtractedResponse ? stringifiedExtractedResponse : stringifiedResponse
        } to be in ${expression} regex format`,
        'regexResultValidator'
      ).then(() => {
        if (validationResult == false) {
          assert(false, `RegEx Validation failed for ${method}`);
        } else {
          assert(
            true,
            `RegEx Validation: Expected ${method} response ${stringifiedExtractedResponse ? stringifiedExtractedResponse : stringifiedResponse} to be in ${expression} regex format`
          );
        }
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
  regularExpressionValidation.regexResultValidator(
    method,
    RegexParser(validationType),
    validationPath,
    response
  );
});
