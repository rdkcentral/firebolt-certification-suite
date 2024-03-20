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
const { _ } = Cypress;
const Validator = require('jsonschema').Validator;
const errorSchema = require('./errorSchema.json');
const validator = new Validator();
import axios from 'axios';
const $RefParser = require('@apidevtools/json-schema-ref-parser');

/**
 * @module schemaValidation
 * @function getAndDeferenceOpenRPC
 * @description To get and dereference the OpenRPC json. If version is provided, get version specific openRPC from URL (https://rdkcentral.github.io/firebolt/requirements/${version}/specifications/firebolt-open-rpc.json) and dereference it.
 * Else, get the latest openRPC from URL (https://rdkcentral.github.io/firebolt/requirements/latest/specifications/firebolt-open-rpc.json) by default and dereference it
 * Note: Currently, the openRPC supports both core and manage sdk modules
 * @param {String} version- version
 * @example
 * getAndDeferenceOpenRPC('0.17.0')
 * getAndDeferenceOpenRPC()
 * @return {Object} Dereferenced OpenRPC json
 **/
async function getAndDeferenceOpenRPC(version) {
  try {
    let url;
    if (version) {
      url = `https://rdkcentral.github.io/firebolt/requirements/${version}/specifications/firebolt-open-rpc.json`;
    } else {
      // If no version is provided, get the latest
      url = `https://rdkcentral.github.io/firebolt/requirements/latest/specifications/firebolt-open-rpc.json`;
    }
    const response = await axios.get(url);
    const deSchemaList = await $RefParser.dereference(response.data);
    return deSchemaList;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

/**
 * @module schemaValidation
 * @function updateResponseForFCS
 * @description Update raw response received from platform (specifically those not coming from FCA), with schema validation and other fields to comply with original response format that FCS expects.
 * @param {String} result - API response received
 * @param {String} sdkVersion - version of SDK
 * @param {String} method - method name in the format <module.method>
 * @param {String} task - Task/Handler name provided in incoming message that needs to be sent to subscriber to perform corresponding function
 * @param {String} param - param
 * @example
 * cy.updateResponseForFCS(result, sdkVersion = null, method, task, param)
 */
Cypress.Commands.add('updateResponseForFCS', (response, sdkVersion, methodOrEvent, param, task) => {
  cy.wrap(response).then(async (response) => {
    return new Promise(async (resolve, reject) => {
      let validateSchemaResult;
      const updatedResult = {};

      if (response.includes('result') || response.includes('error')) {
        response = JSON.parse(response);
        if (typeof response != 'object') {
          response = JSON.parse(response);
        }
        // event schema validation
        if (methodOrEvent.includes('.on')) {
          updatedResult.report = {};

          // success scenario
          // update response with schema validation and other fields for listener event response, as in the response when event registration occurs
          if (response?.result?.hasOwnProperty('listening')) {
            updatedResult.report.eventName = response.result.event;
            updatedResult.report.eventListenerResponse = {
              listenerResponse: response.id,
              error: null,
            };
            const schemaValidationStatus = CONSTANTS.PASS;
            updatedResult.report.eventListenerSchemaResult = {
              status: schemaValidationStatus,
              eventSchemaResult: {},
            };
            updatedResult.report.eventListenerId = response.result.event + '-' + response.id;

            // update response with schema validation and other fields for trigger event response, as in the response when actual event gets triggered
          } else if (!response?.result?.hasOwnProperty('listening')) {
            // validate event result with schema to generate schema validation result
            validateSchemaResult = await validateSchema(
              response.result.eventResponse,
              sdkVersion,
              methodOrEvent
            );
            updatedResult.report = {};
            updatedResult.report.eventName = response.result.eventName;
            updatedResult.report.eventListenerId = response.result.eventListenerId;
            updatedResult.report.eventResponse =
              response.result.eventResponse !== undefined ? response.result.eventResponse : null;
            updatedResult.report.eventSchemaResult = validateSchemaResult.schemaValidationResult;
            updatedResult.report.eventTime =
              response.result.eventTime !== undefined ? response.result.eventTime : null;
          }

          // error scenario
          else if (response.error) {
            // update response with schema validation and other fields for trigger event response, as in the response when actual event gets triggered
            if (response.error.message.includes(CONSTANTS.GETEVENTRESPONSE_ERROR_MSG)) {
              updatedResult.report.error = response.error;
            }

            // update response with schema validation and other fields for listener event response, as in the response when event registration occurs
            else {
              updatedResult.report.eventListenerResponse = {
                result: null,
                error: response.error,
              };
              const schemaValidationResult = errorSchemaCheck(error);
              if (
                schemaValidationResult &&
                schemaValidationResult.errors &&
                schemaValidationResult.errors.length > 0
              ) {
                updatedResult.report.eventListenerSchemaResult = {
                  status: CONSTANTS.FAIL,
                  eventSchemaResult: {},
                };
              } else {
                updatedResult.report.eventListenerSchemaResult = {
                  status: CONSTANTS.PASS,
                  eventSchemaResult: schemaValidationResult,
                };
              }
              updatedResult.report.eventListenerId = null;
            }
          }
        }

        // method schema validation
        else {
          // validate method result with schema to generate schema validation result
          validateSchemaResult = await validateSchema(response.result, sdkVersion, methodOrEvent);
          // update response with schema validation and other fields for method
          updatedResult.report = await formatResultAfterSchemaValidation(
            task,
            response.result,
            response.error,
            validateSchemaResult.schemaValidationResult,
            param,
            validateSchemaResult.schemaMap
          );
        }
        resolve(updatedResult);
      } else {
        console.log('raw response does not have a valid result ot error field');
        reject('Invalid response');
      }
    });
  });
});

/**
 * @module schemaValidation
 * @function errorSchemaCheck
 * @description Validate error against error schema
 * @param {Object} err - error
 * @example
 * cy.errorSchemaCheck(err)
 */
async function errorSchemaCheck(err) {
  let schemaValidationResult;
  if (errorSchema) {
    schemaValidationResult = validator.validate(err, errorSchema);
  }
  return schemaValidationResult;
}

/**
 * @module schemaValidation
 * @function formatResultAfterSchemaValidation
 * @description Format result with the fields required to be sent back to publisher
 * @param {String} task - Task/Handler name provided in incoming message that needs to be sent to subscriber to perform corresponding function
 * @param {Object} response - Response
 * @param {Object} err - Error
 * @param {Object} schemaValidationResult - Result obtained on validating response with corresponding schema map
 * @param {Object} params - params
 * @param {Object} schemaMap - Schema map
 * @example
 * cy.formatResultAfterSchemaValidation(task, response, err, schemaValidationResult, params, schemaMap)
 */
async function formatResultAfterSchemaValidation(
  task,
  response,
  err,
  schemaValidationResult,
  params,
  schemaMap
) {
  let apiResponse, responseCode, schemaValidationStatus;
  if (err) {
    apiResponse = { result: null, error: err };
    schemaValidationResult = await errorSchemaCheck(err);
    if (
      schemaValidationResult &&
      schemaValidationResult.errors &&
      schemaValidationResult.errors.length > 0
    ) {
      if (err.message != undefined && CONSTANTS.ERROR_LIST.includes(err.message)) {
        responseCode = CONSTANTS.STATUS_CODE[3];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[1];
      } else {
        responseCode = CONSTANTS.STATUS_CODE[1];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[1];
      }
    } else {
      if (err.message != undefined && CONSTANTS.ERROR_LIST.includes(err.message)) {
        responseCode = CONSTANTS.STATUS_CODE[3];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
      } else {
        responseCode = CONSTANTS.STATUS_CODE[0];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
      }
    }
  } else {
    if (
      response == undefined ||
      (schemaValidationResult &&
        schemaValidationResult.errors &&
        schemaValidationResult.errors.length > 0)
    ) {
      // Handling expected null scenarios from Open RPC
      if (
        response === null &&
        schemaMap &&
        (Object.values(schemaMap).includes('null') ||
          Object.values(schemaMap).includes(null) ||
          findTypeInOneOF(schemaMap))
      ) {
        apiResponse = { result: response, error: null };
        responseCode = CONSTANTS.STATUS_CODE[0];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
      } else if (schemaMap == undefined) {
        apiResponse = { result: response, error: null };
        responseCode = CONSTANTS.STATUS_CODE[0];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
      } else if (response == undefined) {
        apiResponse = { result: null, error: 'undefined' };
        responseCode = CONSTANTS.STATUS_CODE[2];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[2];
      } else {
        apiResponse = { result: response, error: null };
        responseCode = CONSTANTS.STATUS_CODE[1];
        schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[1];
      }
    } else {
      apiResponse = { result: response, error: null };
      responseCode = CONSTANTS.STATUS_CODE[0];
      schemaValidationStatus = CONSTANTS.SCHEMA_VALIDATION_STATUS_CODE[0];
    }
  }
  return {
    method: task,
    params: params,
    responseCode: responseCode,
    apiResponse: apiResponse,
    schemaValidationStatus: schemaValidationStatus,
    schemaValidationResponse: schemaValidationResult,
  };
}

/**
   * @module schemaValidation
   * @function validateSchema
   * @description validate json response string received when invoking method/event, against corresponding schema
   * @param {string} validationSchemaJSONString - JSON response string
   * @param {string} sdkVersion - SDK version
   * @param {string} methodOrEvent - String containing the method/event in the format "<Module.Method>" or "<Module.Event>"(Ex: accessibility.closedCaptionsSettings, 'accessibility.onClosedCaptionsSettingsChanged')
   * @example
   * validateSchema('{"enabled":true,"styles":{"fontFamily":"Monospace sans-serif","fontSize":1,"fontColor":"#ffffff","fontEdge":"none","fontEdgeColor":"#7F7F7F","fontOpacity":100,"backgroundColor":"#000000","backgroundOpacity":100,"textAlign":"center","textAlignVertical":"middle"}}'
  , "0.17.0", "accessibility.closedCaptionsSettings")
   */
async function validateSchema(validationSchemaJSONString, sdkVersion = null, methodOrEvent) {
  let schemaMap;

  const response = { status: true, message: '', schemaValidationResult: '', schemaMap: '' };
  try {
    schemaMap = await getSchema(methodOrEvent, sdkVersion);
  } catch (error) {
    response.status = false;
    response.message = 'Following error occurred while getting schema - ' + JSON.stringify(error);
    return response;
  }
  const schemaValidationResult = validator.validate(validationSchemaJSONString, schemaMap);
  if (methodOrEvent.includes('.on')) {
    // For event schema validation for trigger event
    const eventSchemaResult = {};
    if (
      schemaValidationResult.errors &&
      schemaValidationResult.errors.length > 0 &&
      schemaValidationResult.errors[0].message
    ) {
      eventSchemaResult['status'] = CONSTANTS.FAIL;
      eventSchemaResult['eventSchemaResult'] = schemaValidationResult.errors[0].message;
    } else {
      eventSchemaResult['status'] = CONSTANTS.PASS;
      eventSchemaResult['eventSchemaResult'] = schemaValidationResult.errors;
    }
    response.schemaValidationResult = eventSchemaResult;
    response.schemaMap = '';
  } else {
    // For method schema validation
    response.schemaValidationResult = schemaValidationResult;
    response.schemaMap = schemaMap;
    if (JSON.stringify(schemaValidationResult.errors) !== '[]') {
      response.status = false;
      response.message =
        'Following error received during schema validation - ' +
        JSON.stringify(schemaValidationResult.errors);
      return response;
    }
  }
  return response;
}

/**
 * @module schemaValidation
 * @function getSchema
 * @description get schema for a method or event from dereferenced openRPC
 * @param {string} methodOrEvent - String containing the method/event in the format "<Module.Method>" or "<Module.Event>"(Ex: accessibility.closedCaptionsSettings, 'accessibility.onClosedCaptionsSettingsChanged')
 * @param {string} sdkVersion - SDK version
 * @example
 * getSchema("accessibility.closedCaptionsSettings", "0.17.0")
 * getSchema("accessibility.onClosedCaptionsSettingsChanged", null)
 */
async function getSchema(methodOrEvent, sdkVersion = null) {
  const schemaList = await getAndDeferenceOpenRPC(sdkVersion);
  let schemaMap = null;
  // For ex: when event or method is of the form 'manage_<module>.<method or event>', the prefix needs to be removed to extract required value
  if (methodOrEvent.includes('_')) {
    methodOrEvent = methodOrEvent.split('_')[1];
  }
  for (
    let methodIndex = 0;
    schemaList != undefined && schemaList.methods && methodIndex < schemaList.methods.length;
    methodIndex++
  ) {
    const eventName = schemaList.methods[methodIndex].name;
    if (eventName.toLowerCase() == methodOrEvent.toLowerCase()) {
      const methodObj = schemaList.methods[methodIndex];
      schemaMap = methodObj.result.schema;
    }
  }
  return schemaMap;
}
