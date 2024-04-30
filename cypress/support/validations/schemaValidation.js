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
import axios from 'axios';
const $RefParser = require('@apidevtools/json-schema-ref-parser');
import UTILS from '../cypress-support/src/utils';

/**
 * @module schemaValidation
 * @function getAndDeferenceOpenRPC
 * @description To get and dereference the OpenRPC json. If version is provided, get version specific openRPC from URL (https://rdkcentral.github.io/firebolt/requirements/${version}/specifications/firebolt-open-rpc.json) and dereference it.
 * Else, get the latest openRPC from URL (https://rdkcentral.github.io/firebolt/requirements/latest/specifications/firebolt-open-rpc.json) by default and dereference it.
 * Additionally, it loads OpenRPC documents from external URLs specified in the "externalOpenRpcUrls" environment variable and from JSON files in the "constants/openRPC" directory of the config module.
 * Note: Currently, the openRPC supports both core and manage sdk modules
 * @param {String} version- version
 * @example
 * getAndDeferenceOpenRPC('0.17.0')
 * getAndDeferenceOpenRPC()
 * @return {Array} Array of dereferenced OpenRPC json
 **/
async function getAndDeferenceOpenRPC(version) {
  const openRpcDocuments = [];

  try {
    // Load default or version-specific openRPC
    const url = version
      ? `https://rdkcentral.github.io/firebolt/requirements/${version}/specifications/firebolt-open-rpc.json`
      : 'https://rdkcentral.github.io/firebolt/requirements/latest/specifications/firebolt-open-rpc.json';

    const response = await axios.get(url);
    const deSchemaList = await $RefParser.dereference(response.data);
    openRpcDocuments.push(deSchemaList);

    // Load external openRPCs
    const externalUrls = Cypress.env('externalOpenRpcUrls');
    if (externalUrls && externalUrls.length > 0) {
      console.log(externalUrls);
      for (const url of externalUrls) {
        const externalResponse = await axios.get(url.trim());
        const externalDeSchemaList = await $RefParser.dereference(externalResponse.data);
        openRpcDocuments.push(externalDeSchemaList);
      }
    }

    // Load openRPCs from local files
    // const openRpcDir = '../../../node_modules/configModule/constants/openRPC';
    // if (fs.existsSync(openRpcDir)) {
    //   console.log('DIR DIR DIR');
    //   const files = await fs.readdir(openRpcDir);
    //   for (const file of files) {
    //     if (file.endsWith('.json')) {
    //       const filePath = path.join(openRpcDir, file);
    //       const fileData = await fs.readFile(filePath, 'utf8');
    //       const localDeSchemaList = await $RefParser.dereference(JSON.parse(fileData));
    //       openRpcDocuments.push(localDeSchemaList);
    //     }
    //   }
    // }

    Cypress.env(CONSTANTS.DEREFERENCE_OPENRPC, openRpcDocuments);
    console.log('============================================');
    console.log(openRpcDocuments);
    return openRpcDocuments;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

/**
 * @module schemaValidation
 * @function updateResponseForFCS
 * @description Update raw response received from platform (specifically those not coming from FCA), with schema validation and other fields to comply with original response format that FCS expects.
 * @param {String} method - method name in the format <module.method>
 * @param {*} params - API params
 * @param {Object} response - API response received
 * @param {String} sdkVersion - version of SDK
 * @example
 * cy.updateResponseForFCS(method, params, response, sdkVersion = null)
 */
Cypress.Commands.add(
  'updateResponseForFCS',
  (methodOrEvent, params, response, sdkVersion = null) => {
    if (response.hasOwnProperty(CONSTANTS.RESULT) || response.hasOwnProperty(CONSTANTS.ERROR)) {
      let formattedResponse = {};
      let result;
      const responseType = response.hasOwnProperty(CONSTANTS.ERROR)
        ? CONSTANTS.ERROR
        : CONSTANTS.RESULT;

      cy.validateSchema(
        response[responseType],
        methodOrEvent,
        params,
        sdkVersion,
        responseType
      ).then((schemaValidation) => {
        if (methodOrEvent.includes('.on')) {
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
            if (response?.result?.hasOwnProperty(CONSTANTS.EVENT_LISTENER_RESPONSE)) {
              formattedResponse = Object.assign(formattedResponse, response.result);
              formattedResponse.eventListenerSchemaResult = formattedSchemaValidationResult;
            } else if (!response?.result?.hasOwnProperty(CONSTANTS.EVENT_LISTENER_RESPONSE)) {
              formattedResponse.eventResponse = response.result;
              formattedResponse.eventSchemaResult = formattedSchemaValidationResult;
              formattedResponse.eventTime = null;
            }
          } else if (response.hasOwnProperty(CONSTANTS.ERROR)) {
            if (response?.result?.hasOwnProperty(CONSTANTS.EVENT_LISTENER_RESPONSE)) {
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

          formattedResponse.apiResponse = result;
        }

        return formattedResponse;
      });
    } else {
      cy.log(`Response does not have a valid result or error field - ${response}`);
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
  * @param {string} sdkVersion - SDK version
  * @param {string} schemaType - schema type determines which schema should fetch result/error
  * @example
  * validateSchema('"accessibility.closedCaptionsSettings",{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#ffffff","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}'
   {}, "0.17.0", "result")
  */
Cypress.Commands.add(
  'validateSchema',
  (response, methodOrEvent, params, sdkVersion = null, schemaType) => {
    cy.getSchema(methodOrEvent, params, sdkVersion, schemaType).then((schemaMap) => {
      if (schemaMap) {
        return validator.validate(response, schemaMap);
      } else {
        cy.log(`Failed to fetch schema, validateSchema`).then(() => {
          assert(false, 'Failed to fetch schema, validateSchema');
        });
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
 * @param {string} sdkVersion - SDK version
 * @param {string} schemaType - schema type determines which schema should fetch result/error
 * @example
 * getSchema("accessibility.closedCaptionsSettings", {}, "0.17.0", "result")
 * getSchema("accessibility.onClosedCaptionsSettingsChanged", {}, null, "result")
 */
Cypress.Commands.add('getSchema', (methodOrEvent, params, sdkVersion = null, schemaType) => {
  cy.wrap().then(async () => {
    let schemaList;
    if (UTILS.getEnvVariable(CONSTANTS.DEREFERENCE_OPENRPC, false)) {
      schemaList = UTILS.getEnvVariable(CONSTANTS.DEREFERENCE_OPENRPC, false);
    } else {
      schemaList = await getAndDeferenceOpenRPC(sdkVersion);
    }

    let schemaMap = null;

    if (schemaType == CONSTANTS.ERROR) {
      cy.fixture(CONSTANTS.OPENRPC_ERROR_SCHEMA_PATH).then((errorSchema) => {
        const communicationMode = UTILS.getCommunicationMode();
        const errorSchemaBasedOnMode =
          communicationMode == CONSTANTS.MODE_TRANSPORT
            ? errorSchema[CONSTANTS.ERROR_SCHEMA_TRANSPORT]
            : errorSchema[CONSTANTS.ERROR_SCHEMA_SDK];
        return errorSchemaBasedOnMode;
      });
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
        console.log('1st loop');

        for (
          let methodIndex = 0;
          doc != undefined && doc.methods && methodIndex < doc.methods.length;
          methodIndex++
        ) {
          console.log('2nd loop');
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

      console.log('#########################');
      console.log(schemaMap);
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
