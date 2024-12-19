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
import UTILS from '../cypress-support/src/utils';
const CONSTANTS = require('../constants/constants');
const sdkVersion = UTILS.getEnvVariable(CONSTANTS.SDK_VERSION) || 'latest';
const REGEXFORMATS = require(`../../fixtures/${sdkVersion}/regexformats`);
const RegexParser = require('regex-parser');

/**
 * @module decodeValidation
 * @function decodeValidation
 * @description Decode validation is to validate the content based on decoding the result obtained
 * @param {String} Method - Method name needs to be send eg. Account.id
 * @param {String} decodeType - decodeType needs to be numeric,string,decimal
 * @param {Object} result - result
 * @param {Object} contentData - Details of which fields to validate, regex type of validation,
 * @param {Object} field - Feild to be validated in response
 *
 * @example
 * cy.decodeValidation('Authentication.token','jwt',{'value': '13asd2'},{"field": "iat","mode": "regex","format": "TOKEN_JWTREGEXP","type": "NUMERIC_REGEXP"})
 */
Cypress.Commands.add('decodeValidation', (method, decodeType, result, contentData, field) => {
  const decodeExpressionValidation = new decodeValidations();
  let fieldName, regexTokenFormat, regexType;

  // Extracting the required data from contentObject
  if (contentData) {
    fieldName = contentData.field;
    regexType = contentData.type;
    regexTokenFormat = contentData.format;
  } else {
    assert(false, `Decode Validation: Expected Validation Object contentData Not found`);
  }

  regexType = RegexParser(regexType);

  // Checks for the extracted api object
  if (result) {
    cy.fixture(CONSTANTS.DECODEVALUE_JSON_PATH).then((data) => {
      const responseObject = data[method];

      // Checks for field to validate exact field in response
      if (field) {
        decodeExpressionValidation.decodeBase64AndJwtToken(
          result[field],
          fieldName,
          regexType,
          decodeType
        );
      } else {
        // Validate multiple fields in a response by looping through the data fetched from decodeValue.json.
        for (let i = 0; i < responseObject.length; i++) {
          let validationResult;

          if (result[responseObject[i]]) {
            validationResult = REGEXFORMATS[regexTokenFormat].test(result[responseObject[i]]);

            cy.log('Decode Validation' + `: expected ******* to be in a ${decodeType} format`).then(
              () => {
                assert.equal(true, validationResult, 'Decode Validation');
              }
            );
            decodeExpressionValidation.decodeBase64AndJwtToken(
              result[responseObject[i]],
              fieldName,
              regexType,
              decodeType
            );
          } else {
            // If extracted response object has single response field, validating that response
            validationResult = REGEXFORMATS[regexTokenFormat].test(result);
            cy.log('Decode Validation' + `: expected ******* to be in a ${decodeType} format`).then(
              () => {
                assert.equal(true, validationResult, 'Decode Validation');
              }
            );
            decodeExpressionValidation.decodeBase64AndJwtToken(
              result,
              fieldName,
              regexType,
              decodeType
            );
          }
        }
      }
    });
  } else {
    // Fail if response is not found in the global object list for the validating method
    assert(false, `Decode Validation: Expected response Not found for ${method} to decode`);
  }
});

/**
 * @module decodeValidation
 * @class decodeValidations
 * @description Decode validation is to validate the tokens
 * @example
 * const validation = new decodeValidations()
 */
class decodeValidations {
  /**
   * @module decodeValidation
   * @function decodeBase64AndJwtToken
   * @description Regex validation is to validate the content based on the regular expression
   * @param {String} token - The response that needs to be validate
   * @param {Object} param - Data that needs to be validated
   * @param {String} regexFormat - Describes the format that to data to be validated in.
   * @param {String} decodeType - decodeType needs to be numeric,string,decimal
   * @example
   * validation.decodeBase64AndJwtToken('Authentication.token','iat','TOKEN_JWTREGEXP','jwt')
   */
  decodeBase64AndJwtToken(token, param, regexFormat, decodeType) {
    if (token) {
      // Check whether decodeType is BASE64 and decode the token and get the param values from decoded object and validating it
      if (decodeType == CONSTANTS.BASE64) {
        const decode = atob(token);
        let extractedData;

        if (decode.includes(param)) {
          const indexOfParam = decode.indexOf(param);

          if (decode.startsWith('<?')) {
            // Handle XML data extraction
            const start = decode.indexOf('>', indexOfParam) + 1;
            const end = decode.indexOf('</', start);
            extractedData = decode.slice(start, end).trim();
          } else {
            // Handle JSON data extraction
            const start = decode.indexOf(':', indexOfParam) + 1;
            const end = decode.indexOf(',', start);
            extractedData = decode.slice(start, end).trim().replace(/"/g, '');
          }

          // Clean up the extracted data. Remove any whitespaces, quotes or curly braces
          extractedData = extractedData.replace(/^[\s"']+|[\s"'}]+$/g, '');
          const resultSet = regexFormat.test(extractedData);

          cy.log(
            `Regular Expression Validation: expected ${param} to be in a valid ${regexFormat} format`,
            'decodeBase64AndJwtToken'
          ).then(() => {
            if (resultSet == false) {
              throw new Error(`RegEx Validation failed for ${param} value`);
            } else {
              fireLog.info(`RegEx Validation passed for ${param} value`);
            }
          });
        } else {
          cy.log(`Decode base64: Expected ${param} field not present in Decoded data`).then(() => {
            assert(false, `Decode base64: Expected ${param} field not present in Decoded data`);
          });
        }
      } else if (decodeType == CONSTANTS.JWT) {
        // Check whether decodeType is JWT and decode the token and get the param values from decoded object and validating it
        const decode = JSON.parse(atob(token.split('.')[1]));

        if (decode[param]) {
          const extractedData = decode[param];
          const resultSet = regexFormat.test(extractedData);

          cy.log(
            `Regular Expression Validation: expected ${param} to be in a valid ${regexFormat} format`,
            'decodeBase64AndJwtToken'
          ).then(() => {
            if (resultSet == false) {
              throw new Error(`RegEx Validation failed for ${param} value`);
            } else {
              fireLog.info(`RegEx Validation passed for ${param} value`);
            }
          });
        } else {
          cy.log(`Decode jwt: Expected ${param} field not present in Decoded data`).then(() => {
            assert(false, ` Decode jwt:Expected ${param} field not present in Decoded data`);
          });
        }
      }
    }
  }
}
