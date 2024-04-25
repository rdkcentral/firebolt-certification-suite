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
 * @module advertisingMiscValidation
 * @function advertisingMiscValidation
 * @description Validating content for Advertising module APIs where the content is dynamic depends on the platform.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * advertisingMiscValidation('advertising.advertisingId',  {"type": "limitAdTrackingON"},{response:{result: '', error: null, ...}});
 */
export function advertisingMiscValidation(method, validationTypeObject, apiOrEventObject) {
  switch (method) {
    case CONSTANTS.ADVERTISING_ADVERTISINGID:
      validateAdvertisingAdvertisingId(method, validationTypeObject, apiOrEventObject);
      break;
  }
}

/**
 * @module advertisingMiscValidation
 * @function validateAdvertisingAdvertisingId
 * @description Validating the response of Advertising.advertisingId API.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * validateAdvertisingAdvertisingId('advertising.advertisingId',  {"type": "limitAdTrackingON"},{response:{result: '', error: null, ...}});
 */
function validateAdvertisingAdvertisingId(method, validationTypeObject, apiOrEventObject) {
  const response = apiOrEventObject.response.result;
  const ScenarioType = validationTypeObject.type;
  const pretext = `${CONSTANTS.METHOD_CONTENT} for ${method} : `;

  // Ifa is an advertising identifier and it should not be empty.
  cy.log(
    `${pretext} Ifa is not null or undefined: *******`,
    'validateAdvertisingAdvertisingId'
  ).then(() => {
    assert.exists(response.ifa, `${pretext} Is not null or undefined`);
  });

  switch (ScenarioType) {
    case CONSTANTS.LIMITADTRACKING_ON:
      // lmt value equal to 1 when limitAdTracking is on
      cy.log(
        `${pretext} Expected lmt value: 1, Actual value: ` + response.lmt,
        'validateAdvertisingAdvertisingId'
      ).then(() => {
        assert.equal(response.lmt, CONSTANTS.ADVERTISING_LIMITIADTRACKING_ON_LMT, `${pretext} `);
      });
      if (response.ifa_type) {
        cy.log(
          `${pretext} Expected Ifa_type value: sessionId, Actual value: ` + response.ifa_type,
          'validateAdvertisingAdvertisingId'
        ).then(() => {
          assert.equal(
            response.ifa_type,
            CONSTANTS.ADVERTISINGID_LIMITIADTRACKING_ON_IFA_TYPE,
            `${pretext} `
          );
        });
      }
      break;
    case CONSTANTS.LIMITADTRACKING_OFF:
      // lmt value equal to 0 when limitAdTracking is off
      cy.log(
        `${pretext} Expected lmt value: 0, Actual value:  ` + response.lmt,
        'validateAdvertisingAdvertisingId'
      ).then(() => {
        assert.equal(response.lmt, CONSTANTS.ADVERTISING_LIMITIADTRACKING_OFF_LMT, `${pretext} `);
      });
      if (response.ifa_type) {
        cy.log(
          `${pretext} Expected Ifa_type value: sessionId, Actual value:  ` + response.ifa_type,
          'validateAdvertisingAdvertisingId'
        ).then(() => {
          assert.equal(
            response.ifa_type,
            CONSTANTS.ADVERTISINGID_LIMITIADTRACKING_OFF_IFA_TYPE,
            `${pretext} `
          );
        });
      }
      break;
  }
}
