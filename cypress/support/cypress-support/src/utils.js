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
const logger = require('../../Logger')('utils.js');
const { _ } = Cypress;
import { apiObject } from '../../appObjectConfigs';
const MESSAGE = 'message';
const Validator = require('jsonschema').Validator;
const validator = new Validator();
const jsonFile = CONSTANTS.JSON_FILE_EXTENSION;
let clientCreated = false;

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
 * createIntentMessage('runTest',{ "certification": true}, {"communicationMode": "SDK","action": "CORE"})
 * @return {Object} { "result":{
 * "action": "search",
 * "data": {"query": "{\"task\":\"runTest\",\"params\":{\"certification\":true},\"action\":\"CORE\",\"context\":{\"communicationMode\":\"SDK\"}}"},
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

  Cypress.env('isRpcOnlyValidation')
    ? (jsonQueryParams.responseTimeout = CONSTANTS.RPC_ONLY_TIMEOUT)
    : null;
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
 * @function generateCombinedExceptionList
 * @description Function to combine all the exception list to send to FCA for sanity suite runs.
 * @returns exemptedListForSanity
 */
function generateCombinedExceptionList() {
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
    : CONSTANTS.EXCLUDED_MODULES;
  return overrideParams;
}

/**
 * @module utils
 * @function getTopic
 * @description Function to fetch the required topics.
 */
function getTopic(
  appIdentifier = null,
  operation = null,
  deviceIdentifier,
  subscribeSuffix = null
) {
  let topic;
  let deviceMac = deviceIdentifier ? deviceIdentifier : getEnvVariable(CONSTANTS.DEVICE_MAC);
  if (!deviceMac || deviceMac == undefined) {
    assert(
      false,
      'deviceMac was not provided. Please make sure to add this to your cypress.config.js file or in the env section of your cli arguments when running a test.'
    );
  }
  // DeviceMac should be in proper format either XX:XX:XX:XX:XX:XX or XXXXXXXXXXXX
  const deviceMacRegex = new RegExp(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$|^[0-9A-Fa-f]{12}$/);
  if (!deviceMacRegex.test(deviceMac)) {
    assert(
      false,
      `Provided deviceMac ${deviceMac} is in improper format. Expected format: XX:XX:XX:XX:XX:XX or XXXXXXXXXXXX.`
    );
  }
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
    return subscribeSuffix
      ? topic + subscribeSuffix
      : topic + getEnvVariable(CONSTANTS.PUB_SUB_SUBSCRIBE_SUFFIX);
  } else {
    return topic + getEnvVariable(CONSTANTS.PUB_SUB_PUBLISH_SUFFIX);
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
 * @module utils
 * @function skipCurrentTest
 * @description Skip the currently executing scenario
 * @example
 * skipCurrentTest()
 */
function skipCurrentTest() {
  fireLog.info('The current test has been intentionally skipped by the test runner');
  mocha.suite.ctx.test?.skip();
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
  if (filteredObjectList.length < 1) {
    fireLog.info('Could not find the api response in api list');
    fireLog.isNotEmpty(filteredObjectList, 'filteredObjectList is not to be empty');
  }

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
    fireLog.info(CONSTANTS.NO_APP_OR_EVENT_OBJECT);
    fireLog.assert(false, CONSTANTS.NO_APP_OR_EVENT_OBJECT);
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
  logger.info('Websocket connection closed Successfully', 'unsubscribe');
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
  let exceptionType;
  const exceptionMethods = getEnvVariable(CONSTANTS.EXCEPTION_METHODS, false);

  // If no exceptionMethods defined, it is not exempted.
  if (!exceptionMethods) {
    return false;
  }

  for (const [type, list] of Object.entries(exceptionMethods)) {
    // Looking for the method and params in each list, if matched returning that exception method.
    methodInExceptionList = list.find((object) => {
      if (
        object.hasOwnProperty(CONSTANTS.PARAM) &&
        object.method.toLowerCase() === method.toLowerCase() &&
        _.isEqual(object.param, param)
      ) {
        return true;
      } else if (
        !object.hasOwnProperty(CONSTANTS.PARAM) &&
        object.method &&
        object.method.toLowerCase() === method.toLowerCase()
      ) {
        return true;
      } else {
        return false;
      }
    });
    // If method is prsent in the list, exiting the loop.
    if (methodInExceptionList) {
      exceptionType = type;
      break;
    }
  }
  return exceptionType;
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
    logger.error(errorMessage, 'getEnvVariable');
    // To include stackTrace in the console
    logger.error(stackTrace());
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
 * @function assertWithRequirementLogs
 * @description Asserts the equality of expected and actual values and logs the result with additional information.
 * If an error object is provided, the assertion fails with the error object logged.
 * @param {string} pretext - Additional information to be logged before the assertion result.
 * @param {*} expected - The expected value for comparison.
 * @param {*} actual - The actual value for comparison.
 * @param {boolean} [equateDeep=false] - Optional. If true, performs a deep equality check using assert.deepEqual(), otherwise uses assert.equal().
 * @param {*} errorObject - Optional. Error object for which assertion should fail
 * @example
 * assertWithRequirementLogs('Checking foreground state', 'foreground', 'foreground', true, { message: 'Invalid state' });
 */
function assertWithRequirementLogs(pretext, actual, expected, equateDeep = false, errorObject) {
  if (errorObject) {
    cy.log(pretext + ': ' + JSON.stringify(errorObject)).then(() => {
      assert(false, pretext + ': ' + JSON.stringify(errorObject));
    });
  } else {
    let expectedLog = expected;
    let actualLog = actual;
    if (Array.isArray(actual) && actual.length < 1) {
      actualLog = JSON.stringify(actual);
    }
    if (Array.isArray(expected) && expected.length < 1) {
      expectedLog = JSON.stringify(expected);
    }

    const logMessage = pretext + ': Expected : ' + expectedLog + ' , Actual : ' + actualLog;
    if (equateDeep) {
      fireLog.deepEqual(actual, expected, logMessage);
    } else {
      fireLog.equal(actual, expected, logMessage);
    }
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
      `${CONSTANTS.DEVICE_IP} environment variable not defined. Update the DEVICE_IP in cypress.config.js or pass in command line. Ip address of the device under test to be updated here`
    ).then(() => {
      assert(
        false,
        `${CONSTANTS.DEVICE_IP} environment variable not defined. Update the DEVICE_IP in cypress.config.js or pass in command line. Ip address of the device under test to be updated here`
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

/**
 * @module utils
 * @function pubSubClientCreation
 * @description Establishing the pubsub connection and subscribing to the response topic.
 * @example
 * pubSubClientCreation()
 */
function pubSubClientCreation(appTransport) {
  return new Promise(async (resolve, reject) => {
    if (!clientCreated && appTransport.init) {
      try {
        const responseTopic = getTopic(null, CONSTANTS.SUBSCRIBE);

        // Initialize required client
        await appTransport.init();

        if (
          responseTopic != undefined &&
          !getEnvVariable(CONSTANTS.RESPONSE_TOPIC_LIST).includes(responseTopic)
        ) {
          // Subscribe to topic and pass the results to the callback function
          appTransport.subscribe(responseTopic, subscribeResults);
          getEnvVariable(CONSTANTS.RESPONSE_TOPIC_LIST).push(responseTopic);
        }
        clientCreated = true;
        resolve(true);
      } catch (error) {
        if (getEnvVariable(CONSTANTS.FAIL_ON_PUBSUB_CONNECTION_ERROR, false)) {
          // If an error occurs, reject the promise with the error
          reject('Failed to initiate PubSubClient' + error);
        } else {
          resolve(false);
        }
      }
    } else {
      resolve(false);
    }
  });
}

/**
 * @module utils
 * @function subscribeResults
 * @description Callback function to fetch the required response from subscribe and push it to a global queue
 * @param {object} data - Response payload from subscribe call
 * @param {object} metaData - Response headers from subscribe call
 * @example
 * subscribeResults('{ "result": { "type": "device", "value": "PD54331.." } }', headers:{id:1232435, client:fca})
 **/
function subscribeResults(data, metaData) {
  const queueInput = {};
  queueInput.data = data;
  queueInput.metaData = metaData;
  // Push the data and metadata as an object to queue
  getEnvVariable(CONSTANTS.MESSAGE_QUEUE).enqueue(queueInput);
}

/**
 * @module utils
 * @function destroyGlobalObjects
 * @description Destroy global objects and recursively clear the environment variables whose name is stored in the list if present, before test execution. List of names of global object to be cleared can be passed
 *  @param {object} objectNameList - list of objects to be cleared
 *  @example
 * destroyGlobalObjects(['lifecycleAppObjectList'])
 **/
function destroyGlobalObjects(objectNameList) {
  for (const objectName of objectNameList) {
    const objectListEnv = Cypress.env(objectName);
    for (const appObject in objectListEnv) {
      Cypress.env(objectListEnv[appObject], null);
    }
    Cypress.env(objectName, []);
  }
}

/**
 * @module utils
 * @function writeJsonToFileForReporting
 * @description Write JSON to the file
 * @example
 * writeJsonToFileForReporting({ "key": "value" }, "/path/to/directory/", "report_")
 */
async function writeJsonToFileForReporting(jsonData, defaultDirectory, fileNamePrefix) {
  const jsonObj = jsonData;
  const jsonContent = JSON.stringify(jsonObj, null, 4);
  const fileName = fileNamePrefix + jsonFile;

  cy.task(CONSTANTS.WRITE_TO_FILE, {
    fileName: defaultDirectory + fileName,
    data: jsonContent,
  }).then((isWritten) => {
    return isWritten;
  });
}

/**
 * @module utils
 * @function checkForTags
 * @description Check whether the tags in beforeOperation object and tag passed in cli has anything common
 * @example
 * checkForTags(["TAG1","TAG2"])
 */
function checkForTags(tags) {
  if (Cypress.env(CONSTANTS.BEFORE_OPERATION_TAGS)) {
    const beforeOperationTags = Cypress.env(CONSTANTS.BEFORE_OPERATION_TAGS).split(',');
    return tags.some((tag) => beforeOperationTags.includes(tag));
  } else {
    return false;
  }
}

/**
 * @module utils
 * @function checkForSecondaryAppId
 * @description Checks whether the appId is available in env
 * @example
 * checkForSecondaryAppId("appIdKey")
 */
function checkForSecondaryAppId(appId) {
  let envAppIdKey;
  try {
    if (appId === CONSTANTS.SECONDARY_THIRD_PARTY_APP) {
      envAppIdKey = CONSTANTS.SECONDARY_THIRD_PARTY_APP_ID;
      return getEnvVariable(CONSTANTS.SECONDARY_THIRD_PARTY_APP_ID);
    } else if (
      getEnvVariable(appId, false) !== null &&
      getEnvVariable(appId, false) !== undefined
    ) {
      envAppIdKey = appId;
      return getEnvVariable(appId);
    } else {
      return appId;
    }
  } catch (err) {
    fireLog.info(eval(CONSTANTS.SECONDARY_APPID_MISSING_ERROR)).then(() => {
      throw new Error(eval(CONSTANTS.SECONDARY_APPID_MISSING_ERROR));
    });
  }
}

/**
 * @module utils
 * @globalfunction resolveDeviceVariable
 * @description Resolve the device variable from the preprocessed data for the given key
 * @example
 * resolveDeviceVariable("deviceId")
 */

global.resolveDeviceVariable = function (key) {
  const resolvedDeviceData = Cypress.env('resolvedDeviceData');
  if (!(key in resolvedDeviceData)) {
    logger.error(`Key ${key} not found in preprocessed data.`);
    return null;
  }
  logger.debug(`Resolved value for key ${key} is ${resolvedDeviceData[key]}`);
  return resolvedDeviceData[key];
};

/**
 * FireLog class provides assertion methods with logging using Cypress's cy.log().
 * It wraps Cypress's assertion methods, allowing logging of messages for each assertion.
 * @class
 *
 * @example
 * // Usage example
 * fireLog.isNotNull(someValue, "Some message");
 * fireLog.isTrue(isTrueValue, "True message");
 * fireLog.isFalse(isFalseValue, "False message");
 * fireLog.deepEqual(actual, expected, "deepEqual message");
 *
 * fireLog.info('Discovery launch intent: ' + JSON.stringify(parsedIntent));
 * fireLog.info() is being used to log the message without any assertion.
 * Removing cy.log and replacing with fireLog.info() to get a cleaner report.
 *
 *
 */

class FireLog extends Function {
  constructor() {
    // Creating the function body dynamically
    const functionBody = `
      return function (...args) {
        return this.log(...args);
      }
    `;
    super('...args', functionBody);

    const handler = {
      apply: function (target, thisArg, argumentsList) {
        let message;
        const methodName = target.name;
        if (target.hasOwnLog) {
          // If the method has its own logging, just apply it
          return Reflect.apply(target, thisArg, argumentsList);
        } else {
          if (argumentsList.length > 3)
            message =
              'Expected: ' +
              JSON.stringify(argumentsList[0]) +
              ' Actual: ' +
              'Expected : ' +
              JSON.stringify(argumentsList[2]) +
              ' Actual : ' +
              JSON.stringify(argumentsList[1]);
          else if (argumentsList.length == 3) message = argumentsList[2];
          else if (argumentsList.length == 1) message = argumentsList[0];
          else if (argumentsList.length == 2) message = argumentsList[1];
          else
            message =
              argumentsList[argumentsList.length - 1] +
              ' Actual: ' +
              JSON.stringify(argumentsList[0]);
          return cy.log(message).then(() => {
            return Reflect.apply(target, thisArg, argumentsList);
          });
        }
      },
    };
    // Proxy for the fireLog method
    const instanceProxy = new Proxy(this, handler);
    const fireLogProxy = new Proxy(instanceProxy, {
      apply: function (target, thisArg, argumentsList) {
        const message = argumentsList[argumentsList.length - 1];
        return cy.log(message);
      },
    });

    // Use cy.log(message) for every method in the class
    const prototype = Object.getPrototypeOf(instanceProxy);
    Object.getOwnPropertyNames(prototype).forEach((method) => {
      if (
        method !== 'constructor' &&
        method !== 'fireLog' &&
        typeof instanceProxy[method] === 'function'
      ) {
        instanceProxy[method] = new Proxy(instanceProxy[method], handler);
        const methodSource = instanceProxy[method].toString();
        instanceProxy[method].hasOwnLog = methodSource.includes('cy.log');
      }
    });

    return fireLogProxy;
  }

  // Method to log a message without any assertion
  log(message) {
    return cy.log(message);
  }

  isNull(value, message) {
    assert.isNull(value, message);
  }

  isNotNull(value, message) {
    assert.isNotNull(value, message);
  }

  isUndefined(value, message) {
    assert.isUndefined(value, message);
  }

  isTrue(value, message) {
    assert.isTrue(value, message);
  }

  isFalse(value, message) {
    assert.isFalse(value, message);
  }

  isOk(value, message) {
    assert.isOk(value, message);
  }

  isNotEmpty(object, message) {
    assert.isNotEmpty(object, message);
  }

  isBoolean(value, message) {
    assert.isBoolean(value, message);
  }

  deepEqual(actual, expected, message) {
    assert.deepEqual(actual, expected, message);
  }

  equal(actual, expected, message) {
    assert.equal(actual, expected, message);
  }

  strictEqual(actual, expected, message) {
    assert.strictEqual(actual, expected, message);
  }

  include(haystack, needle, message) {
    cy.log(
      message + ' ' + JSON.stringify(needle) + ' expected to be in ' + JSON.stringify(haystack)
    );
    assert.include(haystack, needle, message);
  }
  exists(value, message) {
    assert.exists(value, message);
  }

  assert(expression, message) {
    assert(expression, message);
  }

  fail(message) {
    cy.log(message);
    assert.fail(message);
  }

  info(message) {}

  error(message) {
    throw new Error(message);
  }
}

const fireLog = new FireLog();
global.fireLog = fireLog;

/**
 * @module utils
 * @function parseValue
 * @description Function to parse the passed string
 * @param {String}
 *
 * @example
 * - parseValue('123')
 * - parseValue('true')
 *
 * @returns
 * 123
 * true
 */
function parseValue(str) {
  if (str === null || str === undefined) return str;

  if (typeof str === 'string') {
    if (str === 'true') return true;
    if (str === 'false') return false;
    if (str === 'null') return null;

    if (!isNaN(str)) return Number(str);

    // If the string contains comma, split it into an array
    if (str.includes(',')) {
      return str.split(',');
    }
  }

  return str;
}

/**
 * @module utils
 * @globalfunction extractEnvValue
 * @description Extracts a value from environment variable or device data.
 * @param {String} attribute - The value to extract from the environment variables or device data.
 * @example
 * extractEnvValue('DEVICEID')
 * extractEnvValue('CYPRESSENV-defaultTestData-deviceResolution')
 * @returns
 * 1234
 * [[1280, 720], [1920, 1080], [3840, 2160]]
 */
global.extractEnvValue = function (attribute) {
  // Get the device data from env variable
  const deviceData = Cypress.env(CONSTANTS.DEVICE_DATA);
  if (!deviceData) {
    logger.info('deviceData environment variable is not found');
  }

  // If the attribute starts with 'CYPRESSENV', extract nested property from env variable.
  if (/CYPRESSENV/.test(attribute)) {
    const parts = attribute.split('-').slice(1);
    let envValue;

    if (parts.length > 1) {
      const objectName = parts[0];
      const propertyName = parts[1];
      envValue = Cypress.env(objectName) ? Cypress.env(objectName)[propertyName] : undefined;
    } else {
      const envKey = parts[0];
      envValue = Cypress.env(envKey);
    }

    if (envValue !== undefined) {
      attribute = envValue;
    } else {
      logger.info(`Cypress env variable '${attribute}' does not exist`);
    }
  }
  // Return the extracted value from device data or environment variable
  return deviceData?.[attribute] ?? attribute;
};

/**
 * @module utils
 * @globalfunction resolveAtRuntime
 * @description Return the function which is having logic to resolve the value for the passed input at runtime.
 * @param {String || Array}
 * @example
 * resolveAtRuntime(["result.{{attribute}}", "result.styles.{{attribute}}"])
 * resolveAtRuntime("manage_closedcaptions.set{{attribute.uppercaseFirstChar}}")
 * resolveAtRuntime("value")
 *
 * @returns
 * ['result.fontSize', 'result.styles.fontSize']
 * "manage_closedcaptions.setFontSize"
 * 1.5
 */
global.resolveAtRuntime = function (input) {
  return function () {
    const functions = {
      uppercaseFirstChar: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      lowercaseFirstChar: function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
      },
    };

    const runtimeEnv = getEnvVariable(CONSTANTS.RUNTIME);

    // Function to check the occurrence of the pattern and updating the actual value
    function replacingPatternOccurrenceWithValue(text) {
      return text.replace(/{{(.*?)}}/g, (match, pattern) => {
        let functionName;

        // Separating the function name from the pattern, if it exists.
        if (pattern.includes('.')) {
          [pattern, functionName] = pattern.split('.');
        }

        let value;
        // If the input contains '->', Consdering it as an object path and extracting the value from the object
        if (pattern.includes('->')) {
          value = extractValueFromObjectPath(pattern);
        } else {
          // Reading the pattern content from the runtime environment variable
          value = runtimeEnv[pattern] !== undefined ? runtimeEnv[pattern] : match;
        }
        // If a function name is present in the pattern, call the function with pattern content as input.
        return functionName && functions[functionName] ? functions[functionName](value) : value;
      });
    }

    // Retrieve the value from the object using the path specified by the "->" separator
    function extractValueFromObjectPath(inputText) {
      const [objectName, ...pathParts] = inputText.split('->');
      const jsonPath = pathParts.join('.');
      const object = runtimeEnv[objectName];
      if (!object) {
        throw new Error(`Object "${objectName}" not found in runtime environment.`);
      }
      const value = jsonPath.split('.').reduce((acc, key) => acc && acc[key], object);
      if (value === undefined) {
        throw new Error(`"${jsonPath}" field not found in "${objectName}" object.`);
      }
      return value;
    }

    if (typeof input === CONSTANTS.TYPE_STRING) {
      // Replace pattern content for each occurrence of "{{" from the runtime environment variable
      let resolvedValue;
      if (input.includes('{{')) {
        resolvedValue = replacingPatternOccurrenceWithValue(input);
      } else if (input.includes('->')) {
        // If the input contains '->', Consdering it as an object path and extracting the value from the object
        resolvedValue = extractValueFromObjectPath(input);
      } else if (runtimeEnv[input] !== undefined) {
        resolvedValue = runtimeEnv[input];
      } else {
        resolvedValue = input;
      }

      // Check if the resolvedValue contains any item from the list
      if (
        resolvedValue &&
        typeof resolvedValue === CONSTANTS.TYPE_STRING &&
        Cypress.env(CONSTANTS.VARIABLES_PREFIX_LIST).some((item) => resolvedValue.includes(item))
      ) {
        const fireboltCallsData = getEnvVariable(CONSTANTS.COMBINEDFIREBOLTCALLS);
        // Extract the prefix and the JSON path
        const [prefix, ...pathParts] = resolvedValue.split('.');
        const jsonPath = pathParts.join('.');

        // Get the corresponding object based on the prefix
        const variableObject = fireboltCallsData[prefix];

        if (!variableObject) {
          throw new Error(`Firebolt call object "${prefix}" not found in data.`);
        }

        // Resolve the value from the object using the JSON path
        let value = variableObject;
        for (const key of jsonPath.split('.')) {
          if (value[key] !== undefined) {
            value = value[key];
          } else {
            value = undefined; // Set value to undefined if the path is invalid
            break;
          }
        }
        if (value === undefined) {
          throw new Error(`Path "${jsonPath}" not found in "${prefix}" object.`);
        }

        return resolveRecursiveValues(value);
      } else {
        return resolvedValue;
      }
    } else if (Array.isArray(input) && input.length > 0) {
      // input is an array; iterating through each element, it updates the actual value for that pattern if there is an occurrence of "{{".
      return input.map((element) =>
        element.includes('{{') ? replacingPatternOccurrenceWithValue(element) : element
      );
    } else {
      logger.info(`Passed input - ${input} must be an array or a string.`);
    }
  };
};

/**
 * @module utils
 * @function resolveRecursiveValues
 * @description A Function that recursively check each fields and invoke if it is a function within an array or object.
 * @param {*} input - value which need to resolved and it may be string/object/array/function
 * @example
 * resolveRecursiveValues(function())
 */
function resolveRecursiveValues(input) {
  if (Array.isArray(input)) {
    return input.map((item) => resolveRecursiveValues(item));
  } else if (typeof input == CONSTANTS.TYPE_OBJECT && input !== null) {
    const newObj = {};
    for (const key in input) {
      if (Object.hasOwnProperty.call(input, key)) {
        newObj[key] = resolveRecursiveValues(input[key]);
      }
    }
    return newObj;
  } else if (input && typeof input === CONSTANTS.TYPE_FUNCTION) {
    return input();
  } else {
    return input;
  }
}

/**
 * @module utils
 * @function fireboltCallObjectHasField
 * @description A function to verify if the provided field is present in the object, and to fail the step if the field is missing.
 * @param {*} object - Object for which we need to look for a specific key
 * @param {*} field - key name, which must be looked up in the object
 * @param {*} skipCheck - skipping the check when this flag is enabled
 * @example
 * fireboltCallObjectHasField({abc: 123}, abc)
 * fireboltCallObjectHasField({abc: 123}, xyz, true)
 */
function fireboltCallObjectHasField(object, field, skipCheck = false) {
  if (!skipCheck) {
    if ((object?.hasOwnProperty(field) && object[field] !== undefined) || skipCheck) {
      return true;
    } else {
      fireLog.fail(`Could not found "${field}" field in fireboltCall object`);
    }
  }
}

/**
 * @module utils
 * @function fetchAppIdentifierFromEnv
 * @description A Function to retrieve the appId from the environment variable based on the provided name.
 * @param {*} appId - app identifier name
 * @example
 * fetchAppIdentifierFromEnv('1st party app')
 * fetchAppIdentifierFromEnv('test.test)
 */
function fetchAppIdentifierFromEnv(appId) {
  return (appId = !appId
    ? getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
    : appId === CONSTANTS.THIRD_PARTY_APP
      ? getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : appId === CONSTANTS.FIRST_PARTY_APP
        ? getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
        : checkForSecondaryAppId(appId));
}

/**
 * @module utils
 * @function censorPubSubToken
 * @description A Function to sensor the pubSubToken from the launch intent.
 * @param {String} data - The intent to be parsed and censored.
 * @example
 * censorPubSubToken('{"method: "launch", "params": {"intent": {"data": {"query": '{"params": {"pubSubToken": "12456789, "pubSubUrl": "https://dummy.com"}'}}}}')
 * @returns
 * {"method: "launch", "params": {"intent": {"data": {"query": '{"params": {"pubSubToken": "12#####89", "pubSubUrl": "ht#####om"}'}}}})
 */
function censorPubSubToken(data) {
  data = JSON.parse(data);
  if (data?.params?.intent?.data?.query && typeof data.params.intent.data.query === 'string') {
    const queryData = JSON.parse(data.params.intent.data.query);
    if (queryData?.params?.pubSubUrl) {
      const url = queryData.params.pubSubUrl;
      const urlLength = url.length;
      queryData.params.pubSubUrl = url.replace(url.substring(2, urlLength - 2), '########');
    }
    if (queryData?.params?.pubSubToken) {
      const token = queryData.params.pubSubToken;
      const tokenLength = token.length;
      queryData.params.pubSubToken = token.replace(token.substring(2, tokenLength - 2), '########');
    }
    data.params.intent.data.query = JSON.stringify(queryData);
  }
  return JSON.stringify(data);
}

/**
 * @module utils
 * @function applyOverrides
 * @description A function to check Override Object,if exist append overrida data to the fireboltData,Otherwise return fireboltData as is.
 * @param {*} fireboltCallObject - fireboltObject to which overrides needs to be applied
 * @example
 * applyOverrides(fireboltCallObject)
 */
function applyOverrides(fireboltCallObject) {
  try {
    if (!fireboltCallObject.overrides) return fireboltCallObject;

    // Ensure overrides is an array
    const overrides = Array.isArray(fireboltCallObject.overrides)
      ? fireboltCallObject.overrides
      : [fireboltCallObject.overrides];

    for (const override of overrides) {
      if (typeof override.applyWhen !== 'function') {
        fireLog.info('Ignoring override: Missing applyWhen() function', override);
        continue;
      }

      if (!override.applyWhen()) {
        fireLog.info('Ignoring override: applyWhen() returned false', override);
        continue;
      }
      // Appending Override content to the fireboltCallObject if applyWhen() returns true
      Object.assign(fireboltCallObject, override);
    }
  } catch (error) {
    fireLog.info(
      'Error in applyOverrides - Override key in the fireboltObject was not as expected::',
      error
    );
  }
  return fireboltCallObject; // Return the original or modified object based on the override
}

/**
 * @module utils
 * @function addToEnvLabelMap
 * @description Merges a given partial label-to-environment map into the existing LABEL_TO_ENVMAP stored in Cypress environment.
 * @param {Object} partialMap - An object containing key-value pairs where the key is the label and the value is either a direct string value or a Cypress.env key.
 * @example
 * addToEnvLabelMap({
 *   DEVICE: 'DEVICE_IP',
 *   PARTNER: 'DEVICE_MODEL',
 * });
 */

global.addToEnvLabelMap = (partialMap) => {
  const existing = Cypress.env(CONSTANTS.LABEL_TO_ENVMAP) || {};
  Cypress.env(CONSTANTS.LABEL_TO_ENVMAP, { ...existing, ...partialMap });
};

/**
 * @module utils
 * @function captureScreenshot
 * @description A function to capture the screenshot of the device screen.
 * @example
 * captureScreenshot()
 */
function captureScreenshot() {
  // Only take a screenshot if the enableScreenshots environment variable is set to true
  if (getEnvVariable('enableScreenshots')) {
    const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.SCREENSHOT;
    const param = {};
    const appId = Cypress.env(CONSTANTS.CURRENT_APP_ID);

    const screenshotRequest = {
      method: method,
      params: param,
    };
    fireLog.info(`Sending request to capture screenshot: ${JSON.stringify(screenshotRequest)}`);

    try {
      cy.sendMessagetoPlatforms(screenshotRequest, 70000).then((response) => {
        fireLog.info(`Screenshot capture response: ${JSON.stringify(response)}`);

        const apiResponse = {
          response: response,
        };

        const apiAppObject = new apiObject(method, param, {}, apiResponse, {}, appId);
        getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
      });
    } catch (error) {
      console.error('Error handling screenshot capture request:', error);
    }
  }
}

/**
 * Determines the SDK action type based on the feature file name
 * from the current test's title path.
 *
 * @param {Object} testRunnable - The current test context from Cypress (e.g., cy.state("runnable")).
 * @returns {string|null} The action type: "CORE", "MANAGE", "DISCOVERY", or null if no match is found.
 */
function determineActionFromFeatureFile(testRunnable) {
  const testTitlePath = testRunnable.titlePath();
  const featureFile = testTitlePath[0] || '';

  if (/Firebolt Certification Manage-SDK validation/i.test(featureFile)) {
    console.log("Matched Manage-SDK suite. Action: 'MANAGE'");
    return 'MANAGE';
  } else if (/Firebolt Certification Discovery-SDK validation/i.test(featureFile)) {
    console.log("Matched Discovery-SDK suite. Action: 'DISCOVERY'");
    return 'DISCOVERY';
  }

  console.log('Return default Action: CORE');
  return 'CORE';
}

module.exports = {
  replaceJsonStringWithEnvVar,
  createIntentMessage,
  parseExceptionList,
  generateCombinedExceptionList,
  overideParamsFromConfigModule,
  getTopic,
  getCommunicationMode,
  extractModuleName,
  getApiOrEventObjectFromGlobalList,
  unsubscribe,
  isScenarioExempted,
  getEnvVariable,
  lifecycleHistorySchemaValidation,
  assertWithRequirementLogs,
  getSetupDetails,
  pubSubClientCreation,
  subscribeResults,
  destroyGlobalObjects,
  writeJsonToFileForReporting,
  checkForTags,
  fireLog,
  parseValue,
  checkForSecondaryAppId,
  resolveRecursiveValues,
  fireboltCallObjectHasField,
  fetchAppIdentifierFromEnv,
  skipCurrentTest,
  censorPubSubToken,
  applyOverrides,
  captureScreenshot,
  addToEnvLabelMap,
  determineActionFromFeatureFile,
};
