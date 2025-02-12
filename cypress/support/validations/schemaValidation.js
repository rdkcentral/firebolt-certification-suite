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
const CONSTANTS = require('../constants/constants');
const Validator = require('jsonschema').Validator;
const validator = new Validator();
import UTILS, { fireLog } from '../cypress-support/src/utils';

/**
 * @module schemaValidation
 * @function updateResponseForFCS
 * @description Update raw response received from platform (specifically those not coming from FCA), with schema validation and other fields to comply with original response format that FCS expects.
 * @param {String} method - method name in the format <module.method>
 * @param {*} params - API params
 * @param {Object} response - API response received
 * @param {boolean} isValidation - flag to determine if response is updated as part of invocation or validation glue step. For former case, flag is set to false by default, else for latter case flag is set to true
 * @example
 * cy.updateResponseForFCS(method, params, response)
 */
Cypress.Commands.add(
  'updateResponseForFCS',
  (methodOrEvent, params, response, isValidation = false, isNullCase = false) => {
    const responseType = response.error ? CONSTANTS.ERROR : CONSTANTS.RESULT;

    if (response.hasOwnProperty(CONSTANTS.RESULT) || response.hasOwnProperty(CONSTANTS.ERROR)) {
      let formattedResponse = {};
      let result;

      cy.validateSchema(
        response[responseType],
        methodOrEvent,
        params,
        responseType,
        isValidation
      ).then((schemaValidation) => {
        // Retrieving the pattern string from the env variable to differentiate if the method is an an event or a getter/setter
        const regexPattern = UTILS.getEnvVariable(CONSTANTS.REGEX_EVENT_VALIDATION, true);
        const regex = new RegExp(regexPattern.replace(/^\/|\/$/g, '')); // No need to replace slashes
        if (regex.test(methodOrEvent)) {
          let formattedSchemaValidationResult;

          if (
            schemaValidation.errors &&
            schemaValidation.errors.length > 0 &&
            schemaValidation.errors[0].message
          ) {
            formattedSchemaValidationResult = {
              status: CONSTANTS.FAIL,
              eventSchemaResult: schemaValidation,
            };
          } else {
            formattedSchemaValidationResult = {
              status: CONSTANTS.PASS,
              eventSchemaResult: schemaValidation,
            };
          }
          if (response.hasOwnProperty(CONSTANTS.RESULT)) {
            if (
              response &&
              response.result != undefined &&
              response.result.hasOwnProperty(CONSTANTS.EVENT_LISTENER_RESPONSE)
            ) {
              formattedResponse = Object.assign(formattedResponse, response.result);
              formattedResponse.eventListenerSchemaResult = formattedSchemaValidationResult;
            } else if (
              (response &&
                response.result != undefined &&
                !response.result.hasOwnProperty(CONSTANTS.EVENT_LISTENER_RESPONSE)) ||
              isNullCase == true
            ) {
              formattedResponse.eventResponse = response.result;
              formattedResponse.eventSchemaResult = formattedSchemaValidationResult;
              formattedResponse.eventTime = null;
            }
          } else if (response.hasOwnProperty(CONSTANTS.ERROR)) {
            if (
              response &&
              response.result != undefined &&
              response.result.hasOwnProperty(CONSTANTS.EVENT_LISTENER_RESPONSE)
            ) {
              formattedResponse = Object.assign(formattedResponse, response.error);
              formattedResponse.eventListenerSchemaResult = formattedSchemaValidationResult;
            } else if (!response?.result?.hasOwnProperty(CONSTANTS.EVENT_LISTENER_RESPONSE)) {
              formattedResponse = response.error;
            }
          }
        } else {
          if (response.hasOwnProperty(CONSTANTS.ERROR)) {
            result = { result: null, error: response.error };
          } else if (response.hasOwnProperty(CONSTANTS.RESULT)) {
            result = { result: response.result, error: null };
          }

          if (
            schemaValidation.errors &&
            schemaValidation.errors.length > 0 &&
            schemaValidation.errors[0].message
          ) {
            formattedResponse[CONSTANTS.SCHEMA_VALIDATION_STATUS] = CONSTANTS.FAIL;
            formattedResponse[CONSTANTS.SCHEMA_VALIDATION_RESPONSE] = schemaValidation;
          } else {
            formattedResponse[CONSTANTS.SCHEMA_VALIDATION_STATUS] = CONSTANTS.PASS;
            formattedResponse[CONSTANTS.SCHEMA_VALIDATION_RESPONSE] = schemaValidation;
          }

          formattedResponse.response = result;
        }
        return formattedResponse;
      });
    } else {
      cy.log(`Response does not have a valid result or error field - ${JSON.stringify(response)}`);
    }
  }
);

/**
  * @module schemaValidation
  * @function validateSchema
  * @description validate json response string received when invoking method/event, against corresponding schema
  * @param {Object} response - JSON response string
  * @param {string} methodOrEvent - String containing the method/event in the format "<Module.Method>" or "<Module.Event>"(Ex: accessibility.closedCaptionsSettings, 'accessibility.onClosedCaptionsSettingsChanged')
  * @param {*} params - API params
  * @param {string} schemaType - schema type determines which schema should fetch result/error
  * @param {boolean} isValidation - flag to determine if response is updated as part of invocation or validation glue. For former case, flag is set to false by default, else for latter case flag is set to true
  * @example
  * validateSchema('"accessibility.closedCaptionsSettings",{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#ffffff","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}'
   {}, "0.17.0", "result")
  */
Cypress.Commands.add(
  'validateSchema',
  (response, methodOrEvent, params, schemaType, isValidation) => {
    cy.getSchema(methodOrEvent, params, schemaType).then((schemaMap) => {
      if (schemaMap) {
        return validator.validate(response, schemaMap);
      } else {
        if (isValidation) {
          // Normal calls need to go through and response needs to get stored in global list even if they don't adhere to the schema. Schema failure should only be thrown during validation step
          fireLog.assert(false, 'Failed to fetch schema, validateSchema');
        }
      }
    });
  }
);

/**
 * @module schemaValidation
 * @function getSchema
 * @description get schema for a method or event from dereferenced openRPC
 * @param {string} methodOrEvent - String containing the method/event in the format "<Module.Method>" or "<Module.Event>"(Ex: accessibility.closedCaptionsSettings, 'accessibility.onClosedCaptionsSettingsChanged')
 * @param {*} params - API params
 * @param {string} schemaType - schema type determines which schema should fetch result/error
 * @example
 * getSchema("accessibility.closedCaptionsSettings", {}, "0.17.0", "result")
 * getSchema("accessibility.onClosedCaptionsSettingsChanged", {}, null, "result")
 */
Cypress.Commands.add('getSchema', (methodOrEvent, params, schemaType) => {
  cy.wrap().then(async () => {
    const schemaList = UTILS.getEnvVariable(CONSTANTS.DEREFERENCE_OPENRPC, true);
    let schemaMap = null;
    // Return dummy schema response for fcs setters inorder to pass schema validation
    if (schemaType == CONSTANTS.ERROR) {
      cy.fixture(CONSTANTS.OPENRPC_ERROR_SCHEMA_PATH).then((errorSchemaObject) => {
        return errorSchemaObject.errorSchema;
      });
    } else if (methodOrEvent.startsWith(CONSTANTS.FCS_SETTER)) {
      schemaMap = { type: 'null' };
      return schemaMap;
    } else {
      if (
        methodOrEvent.includes('set') &&
        Object.keys(params).length === 0 &&
        !CONSTANTS.METHODS_TO_IGNORE_WHICH_HAS_SET.includes(methodOrEvent)
      ) {
        methodOrEvent = removeSetInMethodName(methodOrEvent);
      }

      for (let docIndex = 0; docIndex < schemaList.length; docIndex++) {
        const doc = schemaList[docIndex];
        for (
          let methodIndex = 0;
          doc != undefined && doc.methods && methodIndex < doc.methods.length;
          methodIndex++
        ) {
          const eventName = doc.methods[methodIndex].name;
          if (eventName.toLowerCase() == methodOrEvent.toLowerCase()) {
            const methodObj = doc.methods[methodIndex];
            schemaMap = methodObj[schemaType].schema;
            break;
          }
        }

        if (schemaMap) {
          break;
        }
      }
      return schemaMap;
    }
  });
});

// Function to remmove set in api name
function removeSetInMethodName(apiName) {
  const method = apiName.split('.')[1];
  let updatedMethod;

  if (method.includes('set') && !CONSTANTS.METHODS_TO_IGNORE_WHICH_HAS_SET.includes(apiName)) {
    if (method.startsWith('set') && method !== 'set') {
      const splitMethod = method.replace('set', '');
      updatedMethod = splitMethod.charAt(0).toLowerCase() + splitMethod.slice(1);
    } else {
      updatedMethod = method;
    }
  } else {
    updatedMethod = method;
  }
  return apiName.split('.')[0] + '.' + updatedMethod;
}
