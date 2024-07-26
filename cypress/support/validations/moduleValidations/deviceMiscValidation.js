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
import { fireLog } from '../../cypress-support/src/utils';

/**
 * @module deviceMiscValidation
 * @function deviceMiscValidation
 * @description Validating content for device module APIs where the content is dynamic depends on the platform.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * deviceMiscValidation('device.verion',  {"mode": "fixture", "type": "APIVERSION", "description": "Validation of the Device version  API Format"},{response:{result: '', error: null, ...}});
 */
export function deviceMiscValidation(method, validationTypeObject, apiOrEventObject) {
  const response = apiOrEventObject.apiResponse.result;

  switch (method) {
    case CONSTANTS.DEVICE_VERSION:
      validateDeviceVersion(method, validationTypeObject, apiOrEventObject);
      break;
    case CONSTANTS.DEVICE_AUDIO:
    case CONSTANTS.DEVICE_HDCP:
    case CONSTANTS.DEVICE_HDR:
      for (const key in response) {
        fireLog
          .info(`Miscellaneous Validation for ${method}: Expected ${key} value to be boolean`)
          .then(() => {
            assert.isBoolean(response[key], 'Expected to be');
          });
      }
      break;
    case CONSTANTS.DEVICE_SCREENRESOLUTION:
    case CONSTANTS.DEVICE_VIDEORESOLUTION:
      const deviceResolution = validationTypeObject.type
        .map((resolution) => `[${resolution.join(',')}]`)
        .join(',');
      const isPresent = validationTypeObject.type.some((resolution) => {
        return resolution[0] === response[0] && resolution[1] === response[1];
      });
      fireLog
        .info(
          `Miscellaneous Validation for ${method}: Expected [${response}] to be present in [${deviceResolution}]`
        )
        .then(() => {
          assert.equal(true, isPresent, 'Expected to be present');
        });
      break;
  }
}

/**
 * @module deviceMiscValidation
 * @function validateDeviceVersion
 * @description Validating the device.version content.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * validateDeviceVersion('device.verion',  {"mode": "fixture", "type": "APIVERSION", "description": "Validation of the Device version  API Format"},{response:{result: '', error: null, ...}});
 */
function validateDeviceVersion(method, validationTypeObject, apiOrEventObject) {
  const expected = validationTypeObject.type;
  const response = apiOrEventObject.apiResponse.result;
  const apiVersionvalue = UTILS.getEnvVariable(CONSTANTS.API_VERSION, false);

  // The APIVersionValue contains any value, directly validating with the obtained response.
  if (apiVersionvalue) {
    assert.equal(
      response.api.major + '.' + response.api.minor + '.' + response.api.patch,
      apiVersionvalue
    );
    fireLog.info(
      'Miscellaneous Validation for ' +
        method +
        ': Expected value: ' +
        apiVersionvalue +
        ', Actual value: ' +
        response.api.major +
        '.' +
        response.api.minor +
        '.' +
        response.api.patch
    );
  } else {
    // Validating the current response against the default value.
    assert.equal(
      response.api.major + '.' + response.api.minor + '.' + response.api.patch,
      expected
    );
    fireLog.info(
      'Miscellaneous Validation for ' +
        method +
        ': Expected value: ' +
        expected +
        ', Actual value: ' +
        response.api.major +
        '.' +
        response.api.minor +
        '.' +
        response.api.patch
    );
  }
}
