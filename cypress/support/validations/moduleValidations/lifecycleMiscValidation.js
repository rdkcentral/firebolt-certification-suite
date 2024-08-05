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
const UTILS = require('../../cypress-support/src/utils');

/**
 * @module lifecycleMiscValidation
 * @function lifecycleMiscValidation
 * @description Validating content for Lifecycle module APIs where the content is dynamic depends on the platform.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * lifecycleMiscValidation('lifecycle.finished',  {"type": "lifecycleFinishedError"},{response:{result: '', error: null, ...}});
 */
export function lifecycleMiscValidation(method, validationTypeObject, apiOrEventObject) {
  switch (method) {
    case CONSTANTS.LIFECYCLE_APIS.FINISHED.toLowerCase():
      validateLifecycleFinished(method, validationTypeObject, apiOrEventObject);
      break;
  }
}

/**
 * @module lifecycleMiscValidation
 * @function validateLifecycleFinished
 * @description Validating the response of Lifecycle.finished API.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * validateLifecycleFinished('lifecycle.finished',  {"type": "lifecycleFinishedError"},{response:{result: '', error: null, ...}});
 */
function validateLifecycleFinished(method, validationTypeObject, apiOrEventObject) {
  const communicationMode = UTILS.getEnvVariable(CONSTANTS.COMMUNICATION_MODE);
  const apiErrorResponse = apiOrEventObject.apiResponse.error;
  const errorContentObject = validationTypeObject.type;

  switch (validationTypeObject.mode) {
    case CONSTANTS.LIFECYCLE_FINISHED_ERROR:
      try {
        if (communicationMode && communicationMode == CONSTANTS.MODE_TRANSPORT) {
          cy.log(
            `Actual error code for ${method}: ${apiErrorResponse.code} expected to be present in list of expected error codes`
          ).then(() => {
            assert.include(
              errorContentObject.errorCode,
              apiErrorResponse.code,
              `Expected Errorcode for ${method}`
            );
          });
          const checkErrorMessage = errorContentObject.errorMessage.some((errorMessage) =>
            apiErrorResponse.message.includes(errorMessage)
          );
          cy.log(
            `Actual error message ${apiErrorResponse.message} expected to be present in list of expected error messages`
          ).then(() => {
            assert.equal(checkErrorMessage, true, 'Error Message Validation: ');
          });
        } else {
          const checkErrorMessage = errorContentObject.errorMessage.some((errorMessage) =>
            apiErrorResponse.includes(errorMessage)
          );
          cy.log(
            `Expected Error Message for ${method}: ${apiErrorResponse} to be oneof [${errorContentObject.errorMessage}] `
          ).then(() => {
            assert.equal(checkErrorMessage, true, 'Error Message Validation: ');
          });
        }
      } catch (error) {
        cy.log('Failed to validate Lifecycle.finished', error).then(() => {
          assert(false, `Failed to validate Lifecycle.finished - ${error}`);
        });
      }
  }
}
