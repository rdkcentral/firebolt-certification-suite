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
const { _ } = Cypress;
const MESSAGE = 'message';
const Validator = require('jsonschema').Validator;
const validator = new Validator();

/**
 * @module utils
 * @function replaceJsonStringWithEnvVar
 * @description This method will replace the env variable if string has <any value> operator.
 * Internally it will look for '<' and '>' operator and read the value between those operand.
 * This value needs to be added in .env or cypress env file.
 * If variable not found, it will return same value
 * @example
 * replaceJsonStringWithEnvVar('{ "result": { "type": "device", "value": "PD54331.." } }')
 * @return {String} { "result": { "type": "device", "value": "PD54331.." } }
 * Note: Add 'XACT Token=PD54..' in .env file or update via cypress config file, i.e; "XACT Token": "PD54.."
 **/
function replaceJsonStringWithEnvVar(jsonString) {
  if (jsonString.includes('<') && jsonString.includes('>')) {
    const splitString = jsonString.split('<')[1].split('>')[0];
    if (getEnvVariable(`${splitString}`, false) !== undefined) {
      jsonString = jsonString.replaceAll(`<${splitString}>`, getEnvVariable(splitString));
    }
  }
  return jsonString;
}

/**
 * @module utils
 * @function createIntentMessage
 * @description build intent message based on json input provided
 * @param {String} task - Task/Handler name that needs to be sent to App to perform corresponding function
 * @param {Object} jsonParams - Params that needs to be sent to App(Ex: methodName and methodParams to invoke)
 * @param {Object} map - additional params that needs to be sent(Ex: communicationMode, action etc)
 * @example
 * createIntentMessage('runTest',{ "certification": true}, {"asynchronous": "false","communicationMode": "SDK","isAsync": false,"action": "CORE"})
 * @return {Object} { "result":{
 * "action": "search",
 * "data": {"query": "{\"task\":\"runTest\",\"params\":{\"certification\":true},\"action\":\"CORE\",\"context\":{\"communicationMode\":\"SDK\"},\"asynchronous\":false}"},
 * "context": {"source": "device"}
 * } }
 **/
function createIntentMessage(task, jsonParams, map = null) {
  const jsonQueryParams = {};
  const queryParams = {};
  // Task is not passed, taking runTest as default
  jsonQueryParams.task = task || CONSTANTS.TASK.RUNTEST;
  queryParams.context = map && map.hasOwnProperty(CONSTANTS.SOURCE) ? map.source : CONSTANTS.DEVICE;
  queryParams.action = CONSTANTS.SEARCH;

  typeof jsonParams === CONSTANTS.OBJECT &&
  jsonParams !== null &&
  Object.keys(jsonParams).length > 0
    ? (jsonQueryParams.params = jsonParams)
    : null;
  jsonQueryParams.action = map && map.hasOwnProperty(CONSTANTS.ACTION) ? map.action : 'NA';

  map && map.hasOwnProperty(CONSTANTS.COMMUNICATION_MODE)
    ? (jsonQueryParams.context = { communicationMode: map.communicationMode })
    : null;
  map && map.hasOwnProperty(CONSTANTS.METADATA) ? (jsonQueryParams.metadata = map.metadata) : null;
  map && map.hasOwnProperty(CONSTANTS.IS_NOT_SUPPORTED_API)
    ? (jsonQueryParams.isNotSupportedApi = map.isNotSupportedApi)
    : false;
  const intent = {
    action: queryParams.action,
    data: { query: JSON.stringify(jsonQueryParams) },
    context: { source: queryParams.context },
  };
  return intent;
}

/**
 * @module utils
 * @function parseExceptionList
 * @description Function is to parse the exception methods (NOT_SUPPORTED_METHODS, NOT_AVAILABLE_METHODS, NOT_PERMITTED_METHODS) from configModule.
 **/
function parseExceptionList() {
  // Cypress.env('exceptionMethods') env having exception methods list defined in configModule.
  const exceptionListForSanity = getEnvVariable('exceptionMethods', false);
  if (exceptionListForSanity != null && exceptionListForSanity != undefined) {
    try {
      // Cypress.env('exceptionMethods') list may having (NOT_SUPPORTED_METHODS, NOT_AVAILABLE_METHODS, NOT_PERMITTED_METHODS), if present assigning the values to corresponding env variable.
      if (exceptionListForSanity.hasOwnProperty('NOT_SUPPORTED_METHODS')) {
        Cypress.env('NOT_SUPPORTED_METHODS', exceptionListForSanity.NOT_SUPPORTED_METHODS);
      }
      if (exceptionListForSanity.hasOwnProperty('NOT_AVAILABLE_METHODS')) {
        Cypress.env('NOT_AVAILABLE_METHODS', exceptionListForSanity.NOT_AVAILABLE_METHODS);
      }
      if (exceptionListForSanity.hasOwnProperty('NOT_PERMITTED_METHODS')) {
        Cypress.env('NOT_PERMITTED_METHODS', exceptionListForSanity.NOT_PERMITTED_METHODS);
      }
    } catch (error) {
      cy.log('Error occured during exception list parsing -' + error);
    }
  }
  // If the above different exception lists not there, overriding with empty value.
  if (getEnvVariable('NOT_SUPPORTED_METHODS', false) === undefined) {
    Cypress.env('NOT_SUPPORTED_METHODS', []);
  }
  if (getEnvVariable('NOT_AVAILABLE_METHODS', false) === undefined) {
    Cypress.env('NOT_AVAILABLE_METHODS', []);
  }
  if (getEnvVariable('NOT_PERMITTED_METHODS', false) === undefined) {
    Cypress.env('NOT_PERMITTED_METHODS', []);
  }
}

/**
 * @module utils
 * @function generateExceptionListForSanity
 * @description Function to combine all the exception list to send to FCA for sanity suite runs.
 * @returns exemptedListForSanity
 */
function generateExceptionListForSanity() {
  // After parseExceptionList() concatenating (Not Supported, Not Available and Not Permitted) list and passing concatenated list while creating intent message sanity runs.
  let exemptedListForSanity = getEnvVariable('NOT_SUPPORTED_METHODS', false)
    ? getEnvVariable('NOT_SUPPORTED_METHODS')
    : [];
  try {
    exemptedListForSanity = exemptedListForSanity
      .concat(
        getEnvVariable('NOT_AVAILABLE_METHODS', false)
          ? getEnvVariable('NOT_AVAILABLE_METHODS')
          : []
      )
      .concat(
        getEnvVariable('NOT_PERMITTED_METHODS', false)
          ? getEnvVariable('NOT_PERMITTED_METHODS')
          : []
      );
  } catch (err) {
    cy.log('Error occured during exception list parsing -' + error);
  }
  return exemptedListForSanity;
}

/**
 * @module utils
 * @function overideParamsFromConfigModule
 * @description Function to override excluded methods and modules from config module if it is present.
 */
function overideParamsFromConfigModule(overrideParams) {
  // If excluded methods and modules list present in configModule, overriding it else using the existing one defined in constants.
  overrideParams.methodsToBeExcluded = getEnvVariable('excludedMethods', false)
    ? getEnvVariable('excludedMethods')
    : CONSTANTS.EXCLUDED_METHODS;
  overrideParams.modulesToBeExcluded = getEnvVariable('excludedModules', false)
    ? getEnvVariable('excludedModules')
    : CONSTANTS.EXCLUDED_METHODS;
  return overrideParams;
}

/**
 * @module utils
 * @function getTopic
 * @description Function to fetch the required topics.
 */

function getTopic(appIdentifier = null, operation = null) {
  let topic;
  let deviceMac = getEnvVariable(CONSTANTS.DEVICE_MAC);
  expect(deviceMac.length).to.be.greaterThan(5);
  // Remove colons from mac address if not removed
  deviceMac = deviceMac.replaceAll(':', '');
  if (appIdentifier) {
    // Appending passed appId to device mac
    topic = deviceMac + '_' + appIdentifier;
  } else {
    // Appending default appId to device mac
    topic = deviceMac + '_' + getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);
  }
  if (operation == CONSTANTS.SUBSCRIBE) {
    return topic + CONSTANTS.TOPIC_SUBSCRIBE_SUFFIX;
  } else {
    return topic + CONSTANTS.TOPIC_PUBLISH_SUFFIX;
  }
}

/**
 * @module utils
 * @function getCommunicationMode
 * @description Get communication mode.
 * @example
 * getCommunicationMode()
 */
function getCommunicationMode() {
  let mode = CONSTANTS.MODE_SDK;

  if (getEnvVariable(CONSTANTS.COMMUNICATION_MODE, false)) {
    mode = getEnvVariable(CONSTANTS.COMMUNICATION_MODE);
  }
  return mode;
}

/**
 * @module main
 * @function extractModuleName
 * @description Parsing the module name from the dataIdentifier passed.
 * @param {*} dataIdentifier - Key to be used to fetch module name.
 * @example
 * cy.extractModuleName("ACCESSIBILITY_CLOSEDCAPTIONS_TRUE")
 * cy.extractModuleName({method: accessibility.closedCaptionsSettings, ...})
 * @result
 * accessibility
 */
function extractModuleName(dataIdentifier) {
  let moduleName = dataIdentifier;

  // Extracting module name from object/string
  if (dataIdentifier.method != undefined) {
    moduleName = dataIdentifier.method.split('.')[0];
  } else if (moduleName.includes('_')) {
    moduleName = dataIdentifier.split('_')[0];
  } else if (moduleName.includes('.')) {
    moduleName = dataIdentifier.split('.')[0];
  } else {
    return moduleName;
  }

  moduleName = moduleName.toLowerCase();
  return moduleName;
}

/**
 * @module main
 * @function getApiOrEventObjectFromGlobalList
 * @description Extracting a method or event object from the global list
 * @param {String} method - Name of the API to be used to retrieve the object from the global list.
 * @param {String} context - The context value that was used to retrieve the exact object
 * @param {String} appId - appId
 * @param {String} validationType - The validationType has a method or event
 * @example
 * cy.getApiOrEventObjectFromGlobalList('device.id', {}, 'test.test.test', 'method')
 * cy.getApiOrEventObjectFromGlobalList('accessibility.closedCaptionsSettings', {}, 'test.test.test', 'event)
 */
function getApiOrEventObjectFromGlobalList(method, context, appId, validationType) {
  // Obtaining a method or event object list based on the validationType
  const methodOrEventObjectList =
    validationType === CONSTANTS.EVENT
      ? getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST)
      : getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST);

  let extractedObject;

  // The key can be taken as either 'eventName' or 'apiName' according to validationType.
  const methodOrEventKey =
    validationType === CONSTANTS.EVENT ? CONSTANTS.EVENT_NAME : CONSTANTS.API_NAME;
  appId = appId == undefined ? getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID) : appId;

  // Retrieve the response from the methodOrEventObjectList based on the method or event name and appId.
  const filteredObjectList = methodOrEventObjectList.filter(
    (apiOrEventObject) =>
      apiOrEventObject[methodOrEventKey] === method && apiOrEventObject.app === appId
  );

  // Failing when the filteredObjectList is empty.
  assert.isNotEmpty(filteredObjectList, 'filteredObjectList is not to be empty');

  // When the context is empty, the most recent apiOrEventObject is obtained from the filtered list.
  // If the context is not empty, the filtered list is iterated, and the API object that has the same context is retrieved.
  if (context == undefined) {
    extractedObject = filteredObjectList[filteredObjectList.length - 1];
  } else {
    for (let i = 0; i < filteredObjectList.length; i++) {
      const apiOrEventObject = filteredObjectList[i];
      if (_.isEqual(apiOrEventObject.context, context)) {
        extractedObject = apiOrEventObject;
      }
    }
  }

  // If no response is found, fail with no appObject found.
  if (!extractedObject) {
    cy.log(CONSTANTS.NO_APP_OR_EVENT_OBJECT);
    assert(false, CONSTANTS.NO_APP_OR_EVENT_OBJECT);
  }
  return extractedObject;
}

/**
 * @function unsubscribe
 * @description Unsubscribes from a WebSocket channel using the provided WebSocket client.
 * @param {WebSocket|null} webSocketClient - The WebSocket client instance to use for unsubscribing.
 * @throws {Error} Throws an error if the WebSocket client is not established.
 * @example
 * unsubscribe(myWebSocketClient);
 **/

function unsubscribe(webSocketClient = null) {
  if (!webSocketClient) {
    throw new Error('Websocket client not established');
  }
  webSocketClient.unsubscribe(MESSAGE);
  console.log('Websocket connection closed Successfully');
}

/**
 * @function isScenarioExempted
 * @description Function to check if method and param combination is part of exception list.
 * @param {String} method - The method to be checked in exception list.
 * @param {String} param - The corresponding parameters for method to be checked in exception list.
 * @example
 * isScenarioExempted("advertising.setSkipRestriction");
 **/
function isScenarioExempted(method, param) {
  let isInList = false;
  const methodInExceptionList = getEnvVariable('NOT_SUPPORTED_METHODS').find((object) => {
    if (
      object.hasOwnProperty('param') &&
      object.method.toLowerCase() === method.toLowerCase() &&
      _.isEqual(object.param, param)
    ) {
      return true;
    } else if (
      !object.hasOwnProperty('param') &&
      object.method &&
      object.method.toLowerCase() === method.toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  });
  if (methodInExceptionList) {
    isInList = true;
  }
  return isInList;
}

/**
 * @module utils
 * @function getEnvVariable
 * @description Get the value of an environment variable
 * @param {string} variable - The name of the environment variable
 * @param {boolean} isRequired - Whether the variable is required (defaults to true)
 * @return {string | null | undefined} - The value of the environment variable
 * @throws {Error} - If the variable is required and not found or undefined
 **/

function getEnvVariable(variable, isRequired = true) {
  const envValue = Cypress.env(variable);

  if (envValue !== null && envValue !== undefined) {
    return envValue;
  }

  if (isRequired) {
    const errorMessage = `Required environment variable "${variable}" is missing or undefined.`;
    console.error(errorMessage);
    // To include stackTrace in the console
    console.error(stackTrace());
    throw new Error(errorMessage);
  }
  return envValue;
}

/**
 * @module utils
 * @function stackTrace
 * @description Returns the stack trace of an Error object.
 * @returns {string} - The stack trace as a string.
 */
function stackTrace() {
  const err = new Error();
  return err.stack;
}

/**
 * @module utils
 * @function lifecycleHistorySchemaValidation
 * @description Function to do schema validation for lifecycle history recording
 * @param {object} result - Response to do schema validation
 * @param {object} schema - Lifecycle history schema
 * @param {string} lifecycleHistoryRecordType - record task type name startLifecycleRecording/stopLifecycleRecording
 * @param {string} envKey - The name of the environment variable
 */
function lifecycleHistorySchemaValidation(result, schema, lifecycleHistoryRecordType, envKey) {
  const schemaValidationResult = validator.validate(result, schema);

  if (
    lifecycleHistoryRecordType == CONSTANTS.TASK.STOPLIFECYCLERECORDING &&
    schemaValidationResult &&
    schemaValidationResult.valid == false &&
    schemaValidationResult.errors &&
    schemaValidationResult.errors.length > 0
  ) {
    assert(
      false,
      `Schema Validation Failed: Response must follow the format specified in "cypress/fixtures/schemas/lifecycleHistorySchema.json", Errors: ${schemaValidationResult.errors} `
    );
  }

  // Assigning history value to envirnoment variable for further validation
  if (result.appId && result.history) {
    Cypress.env(envKey, result.history);
  }
}

/**
 * @module utils
 * @function getSetupDetails
 * @description Function to check if the env variables and params are provided in the required format for testing
 */
function getSetupDetails() {
  // To check if deviceIp environment variable is defined
  const deviceIp = getEnvVariable(CONSTANTS.DEVICE_IP);
  if (!deviceIp || deviceIp == undefined) {
    cy.log(
      `${CONSTANTS.DEVICE_IP} environment variable not defined. Update the DEVICE_IP in cypress/support/common.js or pass in command line. Ip address of the device under test to be updated here`
    ).then(() => {
      assert(
        false,
        `${CONSTANTS.DEVICE_IP} environment variable not defined. Update the DEVICE_IP in cypress/support/common.js or pass in command line. Ip address of the device under test to be updated here`
      );
    });
  } else {
    cy.log(
      `Checking mandatory configuration values - ${CONSTANTS.DEVICE_IP} environment variable is defined.`
    );
  }

  // To check if setUpValues json is present and it's corresponding params are defined
  const undefinedParams = [];
  cy.task(CONSTANTS.READFILEIFEXISTS, CONSTANTS.SETUPVALUES_FILEPATH).then((setupValuesJson) => {
    if (setupValuesJson) {
      setupValues = JSON.parse(setupValuesJson);
      setupValues.param.forEach(function (param) {
        if (!getEnvVariable(param.name, false) || getEnvVariable(param.name, false) == undefined) {
          undefinedParams.push(param.name);
        } else {
          cy.log(`Checking mandatory configuration values - ${param.name} is defined.`);
        }
      });
      if (undefinedParams.length > 0) {
        cy.log(`${undefinedParams} should be defined. `).then(() => {
          assert(false, `${undefinedParams} should be defined. `);
        });
      }
    } else {
      cy.log(`setupValues json is not present in Firebolt Certification Suite. `);
    }
  });
}

module.exports = {
  replaceJsonStringWithEnvVar,
  createIntentMessage,
  parseExceptionList,
  generateExceptionListForSanity,
  overideParamsFromConfigModule,
  getTopic,
  getCommunicationMode,
  extractModuleName,
  getApiOrEventObjectFromGlobalList,
  unsubscribe,
  isScenarioExempted,
  getEnvVariable,
  lifecycleHistorySchemaValidation,
  getSetupDetails,
};
