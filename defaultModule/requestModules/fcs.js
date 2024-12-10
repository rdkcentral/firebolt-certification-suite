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

// Note: paths for imports are given assuming we are running from node_modules/configModules.
// This is because Scripts/checkDefaultConfig.js copies neccessary folders missing from the configModule from here (defaultModule) to the config module.
const CONSTANTS = require('../../../cypress/support/constants/constants');
const UTILS = require('../../../cypress/support/cypress-support/src/utils');

/**
 * @module fcs
 * @function setResponse
 * @description Sending values to mfos via postCall
 * @param {Object} parsedParam - Params that needs to be sent to App(Ex: methodName and methodParams to invoke)
 * @example
 * setResponse({"action":"core","method":"device.version","params":{}})
 **/
function setResponse(parsedParam) {
  try {
    parsedParam = parsedParam.params;
    const { method } = parsedParam;
    let requestJson, URLParam;
    let publishMessage = {};
    if (parsedParam.response) {
      requestJson = { result: parsedParam.response };
      URLParam = `${CONSTANTS.STATE_METHOD}${method}/result`;
    } else if (parsedParam.error) {
      requestJson = { error: parsedParam.error };
      URLParam = `${CONSTANTS.STATE_METHOD}${method}/error`;
    }
    publishMessage = { requestJson, URLParam };
    return createPublishMessage(publishMessage);
  } catch (error) {
    assert(false, `${error.message} in setResponse`);
  }
}

/**
 * @module fcs
 * @function createPublishMessage
 * @description Create publish message with transport type and required options
 * @param {Object} publishMessage - Params that needs to be sent to App(Ex: methodName and methodParams to invoke)
 * @example
 * createPublishMessage({"URLParam":"search","requestJson":{"result":"jeo@deo.com"},"userId":"456~A"})
 **/
function createPublishMessage(publishMessage) {
  const { URLParam, requestJson } = publishMessage;
  return {
    transport: CONSTANTS.HTTP,
    options: {
      url: UTILS.getEnvVariable(CONSTANTS.MFOS_base_url) + URLParam,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-mockfirebolt-userid': UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_MOCK_USER),
      },
      payload: requestJson,
    },
  };
}

/**
 * @module fcs
 * @function setTestProvider
 * @description Test Provider registration is not required for MF
 * @example
 * setTestProvider("keyboard")
 **/
function setTestProvider(parsedData) {
  cy.log(parsedData.params + ' Provider is not required for MF');
}

function setLifecycleState(parsedData) {
  fireLog.error(CONSTANTS.SET_LIFECYCLE_STATE_MISSING);
}

/**
 * @module fcs
 * @function fetchEventResponse
 * @description Extracting a triggered event response from MAP, otherwise returning the parameter as-is.
 * @param {Object} parsedParam - request message having event id to fetch the response.
 * @example
 * fetchEventResponse({method: 'fcs.fetchEventResponse', params: '2'})
 **/
function fetchEventResponse(parsedParam) {
  let result;
  const responseMap = Cypress.env(CONSTANTS.EVENT_RESPONSE_MAP);
  if (responseMap && responseMap.has(parsedParam.params)) {
    result = responseMap.get(parsedParam.params);
    return result.listenerResponse;
  } else {
    return parsedParam;
  }
}

/**
 * @module fcs
 * @function triggerEvent
 * @description sending message to platform to make post call to set event values.
 * @param {String} key - key name of the event data
 * @example
 * triggerEvent({method: 'fcs.triggerevent', params: {'value': {
        "method": "device.onNetworkChanged",
        "result": {
            "state": "disconnected",
            "type": "ethernet"
        }
    }}})
 */
function triggerEvent(key) {
  fireLog.error(CONSTANTS.CONFIG_IMPLEMENTATION_MISSING);

}

/**
 * @module fcs
 * @function unloadApp
 * @description unloadApp
 * @param {Object} request - request body containing method and appId which is to be closed
 * unloadApp("method": "fcs.unloadApp","params": "test.test.test")
 **/
function unloadApp(request) {
  // Generic error message due to missing implementation.
  const appId = request.params;
  fireLog.info(
    'App unload requires platform implementation. AppId: ' + appId + ' was not able to be unloaded.'
  );
  fireLog.error(CONSTANTS.CONFIG_IMPLEMENTATION_MISSING);
}

/**
 * @module fcs
 * @function dismissApp
 * @description dismissApp
 * @param {Object} request - request body containing method and appId which is to be closed
 * dismissApp("method": "fcs.dismissApp","params": "test.test.test")
 **/
function dismissApp(request) {
  // Generic error message due to missing implementation.
  const appId = request.params;
  fireLog.info(
    'App dismiss requires platform implementation. AppId: ' +
      appId +
      ' was not able to be dismissed.'
  );
  fireLog.error(CONSTANTS.CONFIG_IMPLEMENTATION_MISSING);
}

/**
 * @module fcs
 * @function closeApp
 * @description closeApp
 * @param {Object} request - request body containing method and appId which is to be closed
 * closeApp("method": "fcs.closeApp","params": "test.test.test")
 **/
function closeApp(request) {
  // Base implementation to invoke lifecycle.close when communicating with the app via PUBSUB
  const appId = request.params;
  const requestTopic = UTILS.getTopic(appId);
  const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

  const communicationMode = UTILS.getCommunicationMode();
  additionalParams = {
    communicationMode: communicationMode,
    action: 'Lifecycle.validation',
  };
  const params = {
    mode: 'Lifecycle.validation',
    methodName: 'Lifecycle.close',
    methodParams: { reason: CONSTANTS.USER_EXIT_REASON },
  };
  const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.RUNTEST, params, additionalParams);
  fireLog.info(
    'Sending lifecycle close method to close app, method: ' +
      params.methodName +
      ' params: ' +
      JSON.stringify(params.methodParams)
  );
  try {
    cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((response) => {
      let result;
      try {
        response = JSON.parse(response);
        result = response.report.result;
        fireLog.info(
          'Received response from app to acknowledge close request. Response: ' +
            JSON.stringify(response)
        );
      } catch {
        result = response;
      }
      if (result === CONSTANTS.NO_RESPONSE || result === null) {
        fireLog.info('App closed successfully');
      } else {
        fireLog.info(false, 'App may have failed to close.');
      }
      cy.wait(5000);
    });
  } catch (error) {
    fireLog.info('Failed to close the 3rd party app: ', error);
  }
}

module.exports = {
  setResponse,
  setTestProvider,
  setLifecycleState,
  fetchEventResponse,
  triggerEvent,
  unloadApp,
  dismissApp,
  closeApp,
};
