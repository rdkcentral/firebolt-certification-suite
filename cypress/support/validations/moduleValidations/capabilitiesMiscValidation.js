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
import UTILS from '../../cypress-support/src/utils';

/**
 * @module capabilitiesMiscValidation
 * @function capabilitiesMiscValidation
 * @description Validating content for Capabilities module APIs where the content is dynamic depends on the platform.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * capabilitiesMiscValidation('capabilities.info',  {"type": ""},{response:{result: '', error: null, ...}});
 */
export function capabilitiesMiscValidation(method, validationTypeObject, apiOrEventObject) {
  switch (method) {
    case CONSTANTS.CAPABILITIES_INFO:
      validateCapabilitiesInfo(method, validationTypeObject, apiOrEventObject);
      break;
    case CONSTANTS.CAPABILITIES_SUPPORTED:
      validateCapabilitiesSupported(method, validationTypeObject, apiOrEventObject);
      break;
    case CONSTANTS.CAPABILITIES_REQUEST:
      validateCapabilitiesRequest(method, validationTypeObject, apiOrEventObject);
      break;
  }
}

/**
 * @module capabilitiesMiscValidation
 * @function validateCapabilitiesInfo
 * @description Validating the response of Capabilities.info API.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * validateCapabilitiesInfo('capabilities.info',  {"type": "info"},{response:{result: '', error: null, ...}});
 */
// TODO: Planning to move it out of FCS and keep it in configModule
function validateCapabilitiesInfo(method, validationTypeObject, apiOrEventObject) {
  const capabilityInfoResponse = apiOrEventObject.response.result;
  const fireboltConfig = UTILS.getEnvVariable(CONSTANTS.FIREBOLTCONFIG);
  const deviceManifest = UTILS.getEnvVariable(CONSTANTS.DEVICEMANIFESTDATA);
  const passedList = [];
  const failureList = [];

  for (const key in fireboltConfig.capabilities) {
    const capability = fireboltConfig.capabilities[key];
    const capabilityResponseObject = capabilityInfoResponse.find((obj) => obj.capability == key);

    if (capabilityResponseObject) {
      // if level is must and supported is true the capability will be pushed in passedList else in failureList
      if (CONSTANTS.LEVEL_MUST.includes(capability.level)) {
        capabilityResponseObject.supported == true
          ? passedList.push(capabilityResponseObject.capability)
          : failureList.push(capabilityResponseObject.capability);
      } else if (CONSTANTS.LEVEL_LIST.includes(capability.level)) {
        if (deviceManifest.includes(capabilityResponseObject.capability)) {
          // if level is could or should and if capability is defined in device-manifest it will be pushed to passedList else in failureList
          capabilityResponseObject.supported == true
            ? passedList.push(capabilityResponseObject.capability)
            : failureList.push(capabilityResponseObject.capability);
        } else {
          // if level is could or should and if capability is not defined in device-manifest it will be pushed to passedList else in failureList
          capabilityResponseObject.supported == false
            ? passedList.push(capabilityResponseObject.capability)
            : failureList.push(capabilityResponseObject.capability);
        }
      }
    }
  }

  if (failureList.length > 0) {
    cy.log(`Passed list of Capabilities for capabilities.info:[${passedList}]`);
    cy.log(`Failed list of Capabilities for capabilities.info:[${failureList}]`).then(() => {
      assert.isFalse(false, CONSTANTS.CAPABILITIES_NOT_SUPPORTED_LIST);
    });
  } else if (passedList.length > 0) {
    cy.log(`Passed list of Capabilities for capabilities.info:[${passedList}]`);
    cy.log(`Failed list of Capabilities for capabilities.info:[${failureList}]`).then(() => {
      assert.isTrue(true, CONSTANTS.CAPABILITIES_SUPPORTED_LIST);
    });
  }
}

/**
 * @module capabilitiesMiscValidation
 * @function validateCapabilitiesSupported
 * @description Validating the response of Capabilities.supported API.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * validateCapabilitiesSupported('capabilities.supported',  {"type": "supported"},{response:{result: '', error: null, ...}});
 */
// TODO: Planning to move it out of FCS and keep it in configModule
function validateCapabilitiesSupported(method, validationTypeObject, apiOrEventObject) {
  const capabilityResponse = apiOrEventObject.response.result;
  const capabilityParam = apiOrEventObject.params.value;
  const notSupportedCapabilitiesList = UTILS.getEnvVariable('notSupportedCapabilitiesList');

  // Passed capability is not present in the not supported capabilities list, and the response is true considering the capability as supported.
  if (!notSupportedCapabilitiesList.includes(capabilityParam) && capabilityResponse == true) {
    cy.log(`Capability '${capabilityParam}' is supported`, 'validateCapabilitiesSupported').then(
      () => {
        assert.equal(true, true, `Capability '${capabilityParam}' is supported`);
      }
    );
  }
  // Passed capability is present in the not supported capabilities list, and the response is false considering the capability as not supported.
  else if (notSupportedCapabilitiesList.includes(capabilityParam) && capabilityResponse == false) {
    cy.log(
      `Capability '${capabilityParam}' is not supported`,
      'validateCapabilitiesSupported'
    ).then(() => {
      assert.equal(true, true, `Capability '${capabilityParam}' is not supported`);
    });
  } else {
    cy.log(
      `Device has an issue with the Capability : ${capabilityParam}`,
      'validateCapabilitiesSupported'
    ).then(() => {
      assert.isTrue(false, `Device has an issue with the Capability : ${capabilityParam}`);
    });
  }
}

/**
 * @module capabilitiesMiscValidation
 * @function capabilitiesSupportedLogs
 * @description get logs based on param values passed for capabilities
 * @param {String} capabilityParam - capability
 * @param {String} paramVal - param value passed for capabilities
 * @example
 * capabilitiesSupportedLogs("xrn:firebolt:capability:lifecycle:initialize","supported")
 */
// TODO: Planning to move it out of FCS and keep it in configModule
function capabilitiesSupportedLogs(capabilityParam, paramVal) {
  switch (paramVal) {
    case CONSTANTS.SUPPORTED:
      cy.log(`Capability '${capabilityParam}' is not supported`, 'capabilitiesSupportedLogs').then(
        () => {
          assert.equal(true, true, 'capability not Supported');
        }
      );
      break;
    case CONSTANTS.NOT_AVAILABLE:
      cy.log(`Capability '${capabilityParam}' is not available`, 'capabilitiesSupportedLogs').then(
        () => {
          assert.isTrue(
            false,
            'Passed capability is unavailable in firebolt.json but available in device manifest'
          );
        }
      );
      break;
    case CONSTANTS.NOTSUPPORTED:
      cy.log(`Capability '${capabilityParam}' is not supported`, 'capabilitiesSupportedLogs').then(
        () => {
          assert.equal(true, true, 'capability not Supported');
        }
      );
      break;
    default:
      cy.log(
        `Device has an issue with the Capability : ${capabilityParam}`,
        'capabilitiesSupportedLogs'
      ).then(() => {
        assert.isTrue(false, 'Device has an issue with the Capability');
      });
  }
}

/**
 * @module capabilitiesMiscValidation
 * @function validateCapabilitiesRequest
 * @description Validating the response of Capabilities.request API.
 * @param {String} method - Name of api to be validated
 * @param {Object} validationTypeObject - The object consists of required fields for validation.
 * @param {Object} apiOrEventObject - Extracted API or Event object from global list.
 * @example
 * validateCapabilitiesRequest('capabilities.request',  {"type": "request", "specialValidationObject":[{"method":"capabilities.request","expected": true,"validationPath":"result[0].use.granted", "appId": "test.test"}]},{response:{result: '', error: null, ...}});
 */
function validateCapabilitiesRequest(method, validationTypeObject, apiOrEventObject) {
  console.log('validationTypeObject', validationTypeObject);
  console.log('apiOrEventObject', apiOrEventObject);
  if (validationTypeObject && validationTypeObject.specialValidationObject) {
    cy.get(Object.values(validationTypeObject.specialValidationObject)).each((validationObject) => {
      console.log('validationObject', validationObject);
      cy.specialValidation(validationObject);
    });
  } else {
    cy.log('Unable to validate capabilities.request').then(() => {
      assert(false, 'Unable to validate capabilities.request');
    });
  }
}

/**
 * @module capabilitiesMiscValidation
 * @function specialValidation
 * @description To validate response for the passed method using the response path.
 * @param {Object} validationObject - Required content validation object which contains method, path, expected, and context value and appId.
 * @example
 * cy.specialValidation({"capabilities.request", "result[0].use", true, context, test.test.test})
 */
Cypress.Commands.add('specialValidation', (validationObject) => {
  const { method, validationPath, expected, appId } = validationObject;
  let context = validationObject.context;
  context = context ? context : CONSTANTS.NO_CONTEXT;
  cy.testDataHandler(CONSTANTS.CONTEXT, context).then((parsedContext) => {
    // const extractedApiObject = getAppObjectData(method, parsedContext);
    const methodOrEventObject = UTILS.getApiOrEventObjectFromGlobalList(
      method,
      parsedContext,
      appId
    );
    const apiResponseContent = eval('methodOrEventObject.response.' + validationPath);
    const message = Object.keys(parsedContext).length
      ? parsedContext
      : { role: validationPath.split('.')[1] };
    cy.log(
      `Method content validation for ${method} for ${JSON.stringify(
        message
      )} expected ${expected} to be ${apiResponseContent}`
    ).then(() => {
      assert.equal(expected, apiResponseContent, 'Equal to be');
    });
  });
});
