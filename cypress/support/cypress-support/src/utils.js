const CONSTANTS = require('./constants.js');
const { _ } = Cypress;
import axios from 'axios';
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const MESSAGE = 'message'

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
    if (Cypress.env(`${splitString}`) !== undefined) {
      jsonString = jsonString.replaceAll(`<${splitString}>`, Cypress.env(splitString));
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
  const exceptionListForSanity = Cypress.env('exceptionMethods');
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
  // If the above different exception lists not there, overriding with empty value.
  if (Cypress.env('NOT_SUPPORTED_METHODS') === undefined) {
    Cypress.env('NOT_SUPPORTED_METHODS', []);
  }
  if (Cypress.env('NOT_AVAILABLE_METHODS') === undefined) {
    Cypress.env('NOT_AVAILABLE_METHODS', []);
  }
  if (Cypress.env('NOT_PERMITTED_METHODS') === undefined) {
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
  let exemptedListForSanity = Cypress.env('NOT_SUPPORTED_METHODS');
  try {
    exemptedListForSanity = exemptedListForSanity
      .concat(Cypress.env('NOT_AVAILABLE_METHODS'))
      .concat(Cypress.env('NOT_PERMITTED_METHODS'));
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
  overrideParams.methodsToBeExcluded = Cypress.env('excludedMethods')
    ? Cypress.env('excludedMethods')
    : CONSTANTS.EXCLUDED_METHODS;
  overrideParams.modulesToBeExcluded = Cypress.env('excludedModules')
    ? Cypress.env('excludedModules')
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
  let deviceMac = Cypress.env(CONSTANTS.DEVICE_MAC);
  expect(deviceMac.length).to.be.greaterThan(5);
  // Remove colons from mac address if not removed
  deviceMac = deviceMac.replaceAll(':', '');
  if (appIdentifier) {
    // Appending passed appId to device mac
    topic = deviceMac + '_' + appIdentifier;
  } else {
    // Appending default appId to device mac
    topic = deviceMac + '_' + Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID);
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

  if (Cypress.env(CONSTANTS.COMMUNICATION_MODE)) {
    mode = Cypress.env(CONSTANTS.COMMUNICATION_MODE);
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
  } else if(moduleName.includes('.')) {
    moduleName = dataIdentifier.split('.')[0];
  } else {
    return moduleName
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
      ? Cypress.env(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST)
      : Cypress.env(CONSTANTS.GLOBAL_API_OBJECT_LIST);

  let extractedObject;

  // The key can be taken as either 'eventName' or 'apiName' according to validationType.
  const methodOrEventKey =
    validationType === CONSTANTS.EVENT ? CONSTANTS.EVENT_NAME : CONSTANTS.API_NAME;

  // Retrieve the response from the methodOrEventObjectList based on the method or event name and appId.
  let filteredObjectList = methodOrEventObjectList.filter(
    (apiOrEventObject) => apiOrEventObject[methodOrEventKey] === method && apiOrEventObject.app === appId
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
 * @module utils
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
    let deSchemaList;
    let url;
    if (version) {
      url = `https://rdkcentral.github.io/firebolt/requirements/${version}/specifications/firebolt-open-rpc.json`;
    } else {
      // If no version is provided, get the latest
      url = `https://rdkcentral.github.io/firebolt/requirements/latest/specifications/firebolt-open-rpc.json`;
    }
    const response = await axios.get(url);
    deSchemaList = await $RefParser.dereference(response.data);
    return deSchemaList;
  
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
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
  if(!webSocketClient) {
      throw new Error("Websocket client not established")
  }
  webSocketClient.unsubscribe(MESSAGE)
  console.log("Websocket connection closed Successfully")
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
  getAndDeferenceOpenRPC,
  unsubscribe
}
