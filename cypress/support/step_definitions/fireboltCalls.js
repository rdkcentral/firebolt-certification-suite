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
import { Given } from '@badeball/cypress-cucumber-preprocessor';
const CONSTANTS = require('../constants/constants');
const { _ } = Cypress;
import { apiObject, eventObject } from '../appObjectConfigs';
import UTILS from '../cypress-support/src/utils';

/**
 * @module fireboltCalls
 * @function And 1st party app invokes the '(.+)' API to '(.+)'
 * @description send message to platform to make api call.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the request data.
 * @example
 * Given 1st party app invokes the 'Firebolt' API to 'get device id'
 */
Given(/1st party app invokes the '(.+)' API to '(.+)'$/, async (sdk, key) => {
  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedData) => {
    const method = parsedData.method;
    const params = parsedData.params;
    const context = parsedData.context;
    const action = parsedData.action;
    const expected = parsedData.expected;
    const appId = Cypress.env(CONSTANTS.FIRST_PARTY_APPID);
    const requestMap = {
      method: method,
      params: params,
      action: action,
    };

    cy.log('Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(params));
    cy.sendMessagetoPlatforms(requestMap).then((originalResult) => {
      let result;
      //  To handle method raw response
      if (
        typeof originalResult === 'string' &&
        !originalResult.includes(CONSTANTS.SCHEMA_VALIDATION_RESPONSE)
      ) {
        cy.log('Response from Firebolt platform: ' + originalResult);

        //  Update method raw response received from platform(specifically those not coming from FCA) with schema validation and other fields, in the format FCS expects
        cy.updateResponseForFCS(
          originalResult,
          null,
          method,
          params,
          CONSTANTS.TASK.CALLMETHOD
        ).then((updatedResult) => {
          result = updatedResult;

          // If event and params are not supported setting isScenarioExempted as true for further validation.
          if (UTILS.isScenarioExempted(method, params)) {
            Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
          }
          // Creating object with event name, params, and response etc and storing it in a global list for further validation.
          const apiAppObject = new apiObject(
            method,
            params,
            context,
            result.report,
            expected,
            appId
          );
          UTILS.getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
        });
      } else {
        result = JSON.parse(originalResult);
        if (typeof result != 'object') {
          result = JSON.parse(result);
          result = result.report;
        }
        // Create a deep copy to avoid reference mutation
        const dataToBeCensored = _.cloneDeep(result);

        // Call the 'censorData' command to hide sensitive data
        cy.censorData(method, dataToBeCensored.apiResponse).then((maskedResult) => {
          dataToBeCensored.apiResponse = JSON.stringify(maskedResult);
          cy.log(`Response from Firebolt platform: ${JSON.stringify(dataToBeCensored)}`);
        });
        // If event and params are not supported setting isScenarioExempted as true for further validation.
        if (UTILS.isScenarioExempted(method, params)) {
          Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
        }
        // Creating object with event name, params, and response etc and storing it in a global list for further validation.
        const apiAppObject = new apiObject(method, params, context, result, expected, appId);
        UTILS.getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
      }
    });
  });
});

/**
 * @module fireboltCalls
 * @function And '(.+)' invokes the '(.+)' APi to '(.+)'
 * @description send message to 3rd party app to make api call.
 * @param {String} appId - 3rd party app id.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @example
 * Given '3rd party app' invokes the 'Firebolt' API to 'get device id'
 * Given 'test.test.test' invokes the 'Firebolt' API to 'get device id'
 */
Given(/'(.+)' invokes the '(.+)' API to '(.+)'$/, async (appId, sdk, key) => {
  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedData) => {
    // If appId is having '3rd party app' taking default appId else using the value as-is.
    appId = !appId
      ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : appId === CONSTANTS.THIRD_PARTY_APP
        ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
        : appId;
    const method = parsedData.method;
    const param = parsedData.params;
    const context = parsedData.context;
    const action = parsedData.action;
    const expected = parsedData.expected;
    let isNotSupportedApi = false;

    if (UTILS.isScenarioExempted(method, param)) {
      isNotSupportedApi = true;
    }

    const communicationMode = UTILS.getCommunicationMode();
    const additionalParams = {
      communicationMode: communicationMode,
      action: action,
      isNotSupportedApi: isNotSupportedApi,
    };
    const params = { method: method, methodParams: param };

    // Creating intent message using above details to send it to 3rd party app.
    const intentMessage = UTILS.createIntentMessage(
      CONSTANTS.TASK.CALLMETHOD,
      params,
      additionalParams
    );

    cy.log(`Call from ${appId}, method: ${method} params: ${JSON.stringify(param)}`);

    // Adding additional details to created intent if any platform specific data is present in configModule.
    cy.runIntentAddon(CONSTANTS.TASK.CALLMETHOD, intentMessage).then((parsedIntent) => {
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

      // Sending message to 3rd party app.
      cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((result) => {
        if (result === CONSTANTS.NO_RESPONSE) {
          assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
        }
        result = JSON.parse(result);

        // Create a deep copy to avoid reference mutation
        const dataToBeCensored = _.cloneDeep(result.report.apiResponse);

        // Call the 'censorData' command to hide sensitive data
        cy.censorData(method, dataToBeCensored).then((maskedResult) => {
          cy.log(`Response from ${appId}: ${JSON.stringify(maskedResult)}`);
        });

        // If method and params are not supported setting isScenarioExempted as true for further validation.
        if (UTILS.isScenarioExempted(method, param)) {
          Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
        }

        // Creating object with method name, params and response etc and storing it in a global list for further validation.
        const apiAppObject = new apiObject(method, param, context, result.report, expected, appId);
        UTILS.getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
      });
    });
  });
});

/**
 * @module fireboltCalls
 * @function And '(.+)' registers for the '(.+)' event using the '(.+)' API
 * @description send message to 3rd party app to register the events.
 * @param {String} appId - 3rd party app id.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @example
 * Given '3rd party app' registers for the 'Closed Captions Settings' event using the 'Firebolt' API
 * Given 'test.test.test' registers for the 'Closed Captions Settings' event using the 'Firebolt' API
 */
Given(/'(.+)' registers for the '(.+)' event using the '(.+)' API$/, async (appId, key, sdk) => {
  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedData) => {
    // If appId is having '3rd party app' taking default appId else using the value as-is.
    appId = appId = !appId
      ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
      : appId === CONSTANTS.THIRD_PARTY_APP
        ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
        : appId;
    const event = parsedData.method;
    const param = parsedData.params;
    const context = parsedData.context ? parsedData.context : CONSTANTS.NO_CONTEXT;
    const action = parsedData.action;
    const expected = parsedData.expected;
    let isNotSupportedApi = false;

    if (UTILS.isScenarioExempted(event, param)) {
      isNotSupportedApi = true;
    }

    const communicationMode = UTILS.getCommunicationMode();
    const additionalParams = {
      communicationMode: communicationMode,
      action: action,
      isNotSupportedApi: isNotSupportedApi,
    };
    const params = { event: event, params: param };

    // Creating intent message using above details to send it to 3rd party app.
    const intentMessage = UTILS.createIntentMessage(
      CONSTANTS.TASK.REGISTEREVENT,
      params,
      additionalParams
    );

    cy.log(
      `Registering for the ${event} event using ${appId} with params : ${JSON.stringify(param)}`
    );

    cy.runIntentAddon(CONSTANTS.TASK.REGISTEREVENT, intentMessage).then((parsedIntent) => {
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

      // Sending message to 3rd party app.
      cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((result) => {
        if (result === CONSTANTS.NO_RESPONSE) {
          assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
        }
        result = JSON.parse(result);
        cy.log(`Response from ${appId}: ${JSON.stringify(result.report.eventListenerResponse)}`);

        // If event and params are not supported setting isScenarioExempted as true for further validation.
        if (UTILS.isScenarioExempted(event, param)) {
          Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
        }

        // Creating object with event name, params and response etc and storing it in a global list for further validation.
        const eventAppObject = new eventObject(
          event,
          param,
          context,
          result.report,
          appId,
          expected
        );
        UTILS.getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).push(eventAppObject);
      });
    });
  });
});

/**
 * @module fireboltCalls
 * @function And 1st party app registers for the '(.+)' event using the '(.+)' API
 * @description send message to platform to register the events.
 * @param {String} sdk - sdk name.
 * @param {String} key - key name of the firebolt data contains method/param/context.
 * @example
 * Given 1st party app registers for the 'Closed Captioning Changed' event using the 'Firebolt' API
 */
Given(/1st party app registers for the '(.+)' event using the '(.+)' API$/, async (key, sdk) => {
  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedData) => {
    const event = parsedData.method;
    const params = parsedData.params;
    const context = parsedData.context;
    const action = parsedData.action;
    const expected = parsedData.expected;
    const requestMap = {
      method: event,
      params: params,
      action: action,
      task: CONSTANTS.TASK.REGISTEREVENT,
    };
    const appId = UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID);
    // Assigning event_param env if param has empty object
    if (Object.keys(requestMap.params).length === 0) {
      // To Do :debug event_param issue by passing isrequired as false for getEnvVariable,need to debug further
      requestMap.params = UTILS.getEnvVariable(CONSTANTS.EVENT_PARAM, false);
    }
    cy.log(
      `Registering for the ${event} event using 1st party App with params : ${JSON.stringify(
        params
      )}`
    );

    // Sending the message to platform to register the event.
    cy.sendMessagetoPlatforms(requestMap).then((originalResult) => {
      let result;

      // To handle listener event raw response
      if (
        typeof originalResult === 'string' &&
        !originalResult.includes(CONSTANTS.EVENT_LISTENER_SCHEMA_RESULT)
      ) {
        // Update listener event raw response received from platform(specifically those not coming from FCA) with schema validation and other fields, in the format FCS expects
        cy.updateResponseForFCS(originalResult, null, event, null, null).then((updatedResult) => {
          result = updatedResult.report;
          cy.log(
            'Response from Firebolt platform: ' + JSON.stringify(result.eventListenerResponse)
          );

          // If event and params are not supported setting isScenarioExempted as true for further validation.
          if (UTILS.isScenarioExempted(event, params)) {
            Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
          }

          // Creating object with event name, params and response etc and storing it in a global list for further validation.
          const eventAppObject = new eventObject(event, params, context, result, appId, expected);
          UTILS.getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).push(eventAppObject);
        });
      } else {
        if (typeof originalResult === 'string') {
          result = JSON.parse(JSON.parse(originalResult));
          result = result.report;
        } else {
          result = originalResult;
        }
        cy.log('Response from Firebolt platform: ' + JSON.stringify(result.eventListenerResponse));
        // If event and params are not supported setting isScenarioExempted as true for further validation.
        if (UTILS.isScenarioExempted(event, params)) {
          Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
        }

        // Creating object with event name, params and response etc and storing it in a global list for further validation.
        const eventAppObject = new eventObject(event, params, context, result, appId, expected);
        UTILS.getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).push(eventAppObject);
      }
    });
  });
});

/**
 * @module fireboltCalls
 * @function And I clear '(.+)' listeners
 * @description sending message to platform/third party App to clear event listener.
 * @param {String} key - key name of the data contains event name and parameter.
 * @example
 * And I clear 'clear accessibility.onClosedCaptionsSettingsChanged' listeners
 */
Given(/I clear '(.+)' listeners$/, async (key) => {
  key = key.replaceAll(' ', '_').toUpperCase();
  cy.getFireboltData(key, CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS).then((parsedData) => {
    const firstParty = parsedData.firstParty;

    if (firstParty) {
      let params;
      const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.CLEARLISTENER;
      const requestMap = {
        method: method,
        params: parsedData,
      };

      cy.log('Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(params));
      cy.sendMessagetoPlatforms(requestMap).then((result) => {
        cy.log('Response from Firebolt platform: ' + JSON.stringify(result));
      });
    } else {
      const appId = parsedData.appId ? parsedData.appId : Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID);
      const requestTopic = UTILS.getTopic(appId);
      const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
      const params = { event: parsedData.event };
      const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.CLEAREVENTHANDLER, params);

      // Sending message to 3rd party app.
      cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
        cy.log(
          `Response from ${Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID)}: ${JSON.stringify(result)}`
        );
      });
    }
  });
});

/**
 * @module fireboltCalls
 * @function Framework registers '(.+)' test provider
 * @description Informs the platform to use the test provider for simulating user inputs. This would require platform specific implementation in each configModule
 * @param {String} param - Provider name that needs to register for
 * Framework registers 'pinChallenge' test provider
 * Framework registers 'keyboard' test provider
 */
Given(/Framework registers '(.+)' test provider$/, async (provider) => {
  const requestMap = {
    method: CONSTANTS.REQUEST_OVERRIDE_CALLS.SETTESTPROVIDER,
    params: provider,
  };
  // Sending message to the platform to register the provider.
  cy.sendMessagetoPlatforms(requestMap).then((result) => {
    cy.log('Provider registration response: ' + JSON.stringify(result));
  });
});

/**
 * @module fireboltCalls
 * @function Given User '(.+)' recording lifecycle history for '(.+)'
 * @description Sending a message to the platform/app to start/stop recording lifecycle histories.
 * @param {String} recordTaskType - A record type that contains either start or stop.
 * @param {String} appCallSign - appCallSign to determine on which app to start/stop recording.
 * And User 'starts' recording lifecycle history for '1st party app'
 * And User 'starts' recording lifecycle history for '3rd party app'
 */
Given(
  /User '(.+)' recording lifecycle history for '(.+)'$/,
  async (recordTaskType, appCallSign) => {
    const lifecycleHistoryRecordType =
      recordTaskType == CONSTANTS.RECORD_TASK_TYPE_START
        ? CONSTANTS.TASK.STARTLIFECYCLERECORDING
        : CONSTANTS.TASK.STOPLIFECYCLERECORDING;
    let envKey;
    cy.fixture(CONSTANTS.LIFECYCLE_HISTORY_SCHEMA_PATH).then((schema) => {
      if (appCallSign === CONSTANTS.FIRST_PARTY_APP) {
        // Constructing envirnoment variable name with appId
        envKey =
          UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID) + CONSTANTS.APP_LIFECYCLE_HISTORY;
        const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.RECORD_LIFECYCLE_HISTORY;
        const requestMap = {
          method: method,
          params: {
            task: lifecycleHistoryRecordType,
            appId: UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID),
          },
        };

        cy.log(
          `Call to 1st party App to ${recordTaskType.slice(
            0,
            -1
          )} lifecycle recording, ${JSON.stringify(requestMap)}`
        );
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          cy.log('Response from 1st party App: ' + result);
          result = JSON.parse(result);
          if (typeof result != CONSTANTS.OBJECT) {
            result = JSON.parse(result);
            result = result.report;
          }

          UTILS.lifecycleHistorySchemaValidation(
            result,
            schema,
            lifecycleHistoryRecordType,
            envKey
          );
        });
      } else {
        const appId =
          appCallSign === CONSTANTS.THIRD_PARTY_APP
            ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
            : appCallSign;
        const requestTopic = UTILS.getTopic(appId);
        const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
        const params = { appId: appId, params: [] };

        // Creating intent message to send it to 3rd party app
        const intentMessage = UTILS.createIntentMessage(lifecycleHistoryRecordType, params);

        // Constructing envirnoment variable name with appId
        envKey = appId + CONSTANTS.APP_LIFECYCLE_HISTORY;

        cy.log(
          `Call to 3rd party App ${appId} to ${recordTaskType.slice(
            0,
            -1
          )} lifecycle recording, ${JSON.stringify(intentMessage)}`
        );
        // Sending message to 3rd party app to start/stop the lifecycle transtions recording.
        cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
          cy.log(`Response from 3rd party App ${appId}: ${result}`);

          if (!result || result === CONSTANTS.NO_RESPONSE) {
            assert(
              false,
              'Response not received within the specified time for the current request.'
            );
          }
          result = JSON.parse(result).report;

          UTILS.lifecycleHistorySchemaValidation(
            result,
            schema,
            lifecycleHistoryRecordType,
            envKey
          );
        });
      }
    });
  }
);

/**
 * @module fireboltCalls
 * @function And User set response for '(.+)'
 * @description Making a call to set the value in 1st party app or 3rd party app.
 * @param {String} setResponseKey - key name of the object.
 * @example
 * And User set response for 'set closedcaptions as true'
 */
Given(/User set response for '(.+)'/, (setResponseKey) => {
  setResponseKey = setResponseKey.replaceAll(' ', '_').toUpperCase();
  cy.getFireboltData(setResponseKey, CONSTANTS.SUPPORTED_CALLTYPES.FIREBOLTMOCKS).then(
    (parsedSetResponseObject) => {
      cy.setResponse(parsedSetResponseObject);
    }
  );
});
