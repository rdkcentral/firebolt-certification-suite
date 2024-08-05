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
const CONSTANTS = require('../../constants/constants');

/**
 * @module parametersMiscValidation
 * @function parametersMiscValidation
 * @description Validating content for Parameters module APIs where the content is dynamic depends on the platform.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * parametersMiscValidation('parameters.initialization',  {"type": "limitAdTrackingON"},{response:{result: '', error: null, ...}});
 */
export function parametersMiscValidation(method, validationTypeObject, apiOrEventObject) {
  switch (method) {
    case CONSTANTS.PARAMETERS_INITIALIZATION:
      validateParametersInitialization(method, validationTypeObject, apiOrEventObject);
      break;
  }
}

/**
 * @module parametersMiscValidation
 * @function validateParametersInitialization
 * @description Validating the response of Parameters.initialization API.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * validateParametersInitialization('parameters.initialization',  {"type": "limitAdTrackingON"},{response:{result: '', error: null, ...}});
 */
function validateParametersInitialization(method, validationTypeObject, apiOrEventObject) {
  const response = apiOrEventObject.apiResponse.result;
  const ScenarioType = validationTypeObject.type;
  const pretext = `${CONSTANTS.METHOD_CONTENT} for ${method} :`;
  switch (ScenarioType) {
    case CONSTANTS.LIMITADTRACKING_ON:
      // lmt value equal to 1 and us_privacy value equal to 1-Y- when limitAdTracking is on
      cy.log(
        `${pretext} lmt value and us privacy : ` + JSON.stringify(response),
        'validateParametersInitialization'
      );
      cy.log(
        `Miscellaneous Validation for ${method}: Expected lmt value : ${CONSTANTS.ADVERTISING_LIMITIADTRACKING_ON_LMT}, Actual value : ${response.lmt}`
      ).then(() => {
        assert.equal(response.lmt, CONSTANTS.ADVERTISING_LIMITIADTRACKING_ON_LMT, `${pretext} `);
      });
      cy.log(
        `Miscellaneous Validation for ${method}: Expected us_privacy value : ${CONSTANTS.ADVERTISINGID_LIMITIADTRACKING_ON_US_PRIVACY}, Actual value : ${response.us_privacy}`
      ).then(() => {
        assert.equal(
          response.us_privacy,
          CONSTANTS.ADVERTISINGID_LIMITIADTRACKING_ON_US_PRIVACY,
          `${pretext} `
        );
      });
      break;
    case CONSTANTS.LIMITADTRACKING_OFF:
      // lmt value equal to 0 and us_privacy value equal to 1-N- when limitAdTracking is off
      cy.log(
        `${pretext} lmt value and us privacy ` + JSON.stringify(response),
        'validateParametersInitialization'
      );
      cy.log(
        `Miscellaneous Validation for ${method}: Expected lmt value : ${CONSTANTS.ADVERTISING_LIMITIADTRACKING_OFF_LMT}, Actual value ${response.lmt}`
      ).then(() => {
        assert.equal(response.lmt, CONSTANTS.ADVERTISING_LIMITIADTRACKING_OFF_LMT, `${pretext} `);
      });
      cy.log(
        `Miscellaneous Validation for ${method}: Expected us_privacy value : ${CONSTANTS.ADVERTISINGID_LIMITIADTRACKING_OFF_US_PRIVACY}, Actual value : ${response.us_privacy}`
      ).then(() => {
        assert.equal(
          response.us_privacy,
          CONSTANTS.ADVERTISINGID_LIMITIADTRACKING_OFF_US_PRIVACY,
          `${pretext} `
        );
      });
      break;
  }
}
