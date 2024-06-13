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
const _ = require('lodash');
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
 * Given 1st party app invokes the API to 'get device id
 */
Given(/1st party app invokes the (?:'(.+)' )?API to '(.+)'$/, async (sdk, key) => {
  // Fetching the data like method, param, context and action etc.
  cy.fireboltDataParser(key, sdk).then((parsedDataArr) => {
    parsedDataArr.forEach((parsedData) => {
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
      cy.sendMessagetoPlatforms(requestMap).then((response) => {
        if (response && typeof response == CONSTANTS.TYPE_OBJECT) {
          // If error and the error message having 'Method not found' or 'Method not Implemented' mark the testcase as undefined.
          if (
            response &&
            response.error &&
            response.error.message &&
            CONSTANTS.ERROR_LIST.includes(response.error.message)
          ) {
            if (UTILS.getEnvVariable(CONSTANTS.CERTIFICATION) == true) {
              assert(false, `${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${method}`);
            } else {
              cy.log(`NotSupported: ${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${method}`).then(() => {
                throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
              });
            }
          }

          cy.updateResponseForFCS(method, params, response).then((updatedResponse) => {
            // Create a deep copy to avoid reference mutation
            const dataToBeCensored = _.cloneDeep(response);

            // Call the 'censorData' command to hide sensitive data
            cy.censorData(method, dataToBeCensored).then((maskedResult) => {
              cy.log(`Response from Firebolt platform: ${JSON.stringify(maskedResult)}`);
            });
            // If event and params are not supported setting isScenarioExempted as true for further validation.
            if (UTILS.isScenarioExempted(method, params)) {
              Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
            }
            // Creating object with event name, params, and response etc and storing it in a global list for further validation.
            const apiAppObject = new apiObject(
              method,
              params,
              context,
              updatedResponse,
              expected,
              appId
            );
            UTILS.getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
          });
        } else {
          cy.log(`${CONSTANTS.PLATFORM_INVALID_RESPONSE_LOG} - ${response}`);
        }
      });
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
  cy.fireboltDataParser(key, sdk).then((parsedDataArr) => {
    parsedDataArr.forEach((parsedData) => {
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
      if (
        Cypress.env(CONSTANTS.TEST_TYPE) &&
        Cypress.env(CONSTANTS.TEST_TYPE).toLowerCase() == CONSTANTS.MODULE_NAMES.LIFECYCLE
      ) {
        cy.fetchLifecycleHistory(appId);
        cy.setAppObjectStateFromMethod(method, appId);
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
          const apiAppObject = new apiObject(
            method,
            param,
            context,
            result.report,
            expected,
            appId
          );
          UTILS.getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
        });
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
  cy.fireboltDataParser(key, sdk).then((parsedDataArr) => {
    parsedDataArr.forEach((parsedData) => {
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
  cy.fireboltDataParser(key, sdk).then((parsedDataArr) => {
    parsedDataArr.forEach((parsedData) => {
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
      cy.sendMessagetoPlatforms(requestMap).then((response) => {
        if (response && typeof response == CONSTANTS.TYPE_OBJECT) {
          // If error and the error message having 'Method not found' or 'Method not Implemented' mark the testcase as undefined.
          if (
            response &&
            response.error &&
            response.error.message &&
            CONSTANTS.ERROR_LIST.includes(response.error.message)
          ) {
            if (UTILS.getEnvVariable(CONSTANTS.CERTIFICATION) == true) {
              assert(false, `${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${method}`);
            } else {
              cy.log(`NotSupported: ${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${method}`).then(() => {
                throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
              });
            }
          } else if (response && response.error && response.error.message) {
            assert(
              false,
              `Event registration failed for event ${event} with error message: ${response.error.message} `
            );
          }

          cy.updateResponseForFCS(event, params, response).then((updatedResponse) => {
            cy.log('Response from Firebolt platform: ' + JSON.stringify(response));
            // If event and params are not supported setting isScenarioExempted as true for further validation.
            if (UTILS.isScenarioExempted(event, params)) {
              Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
            }

            // Creating object with event name, params and response etc and storing it in a global list for further validation.
            const eventAppObject = new eventObject(
              event,
              params,
              context,
              updatedResponse,
              appId,
              expected
            );
            UTILS.getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).push(eventAppObject);
          });
        } else {
          cy.log(`${CONSTANTS.PLATFORM_INVALID_RESPONSE_LOG} - ${response}`);
        }
      });
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
    // Check if parsedData is an array or an object
    const fireboltItems = Array.isArray(parsedData) ? parsedData : [parsedData];

    fireboltItems.forEach((item) => {
      const firstParty = item.firstParty;

      if (firstParty) {
        let params;
        const method = CONSTANTS.REQUEST_OVERRIDE_CALLS.CLEARLISTENER;
        const requestMap = {
          method: method,
          params: item,
        };

        cy.log('Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(params));
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          cy.log('Response from Firebolt platform: ' + JSON.stringify(result));
        });
      } else {
        const appId = item.appId ? item.appId : Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID);
        const requestTopic = UTILS.getTopic(appId);
        const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
        const params = { event: item.event };
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
});

/**
 * @module fireboltCalls
 * @function And Fetch response for '(.+)' (method|event) from (3rd party app|1st party app)
 * @description Fetch the Method or Event response from the App
 * @param {String} key - key name of the data contains event/method name and parameter.
 * @param {String} methodOrEvent - Flag to differentiate between method or event
 * @param {String} app - Flag to differentiate between 3rd party/ 1st party app
 * @example
 * And Fetch response for 'pinChallenge onRequestChallenge' event from '1st party app'
 * And Fetch response for 'profile approvePurchase' method from '3rd party app'
 */

Given(
  /Fetch response for '(.+)' (method|event) from (3rd party app|1st party app)$/,
  async (key, methodOrEvent, app) => {
    if (Cypress.env(CONSTANTS.TEST_TYPE).includes('rpc-Only')) {
      Cypress.env(CONSTANTS.IS_RPC_ONLY, true);
    }

    cy.fireboltDataParser(key).then((parsedDataArr) => {
      parsedDataArr.forEach((parsedData) => {
        const method = parsedData.method;
        let appId;
        appId = !appId
          ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
          : appId === CONSTANTS.FIRST_PARTY_APP
            ? UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)
            : appId;

        let params;
        if (app == CONSTANTS.FIRST_PARTY_APP) {
          const extractedEvent = UTILS.getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).filter(
            (element) => element.eventName == method
          );
          eventName = extractedEvent[extractedEvent.length - 1].eventObjectId;
          const requestMap = {
            method: CONSTANTS.REQUEST_OVERRIDE_CALLS.FETCH_EVENT_RESPONSE,
            params: eventName,
          };
          cy.log(
            'Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(params)
          );
          cy.sendMessagetoPlatforms(requestMap).then((response) => {
            cy.log('Response from Firebolt platform: ' + JSON.stringify(response));
            if (response === CONSTANTS.RESPONSE_NOT_FOUND) {
              cy.log(CONSTANTS.NO_MATCHED_RESPONSE).then(() => {
                assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
              });
            }
            cy.log(`correlationId - ${response.result.correlationId}`);
            Cypress.env(CONSTANTS.CORRELATIONID, response.result.correlationId);
          });
        } else if (app == CONSTANTS.THIRD_PARTY_APP) {
          params = { method: method };

          // Creating intent message using above details to send it to 3rd party app.
          const parsedIntent = UTILS.createIntentMessage(CONSTANTS.TASK.GETMETHODRESPONSE, params);
          // Fetching method response from third party app
          const requestTopic = UTILS.getTopic(appId);
          const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

          // Sending message to 3rd party app.
          cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((response) => {
            if (response === CONSTANTS.RESPONSE_NOT_FOUND) {
              cy.log(CONSTANTS.NO_MATCHED_RESPONSE).then(() => {
                assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
              });
            }
            cy.log(`Updated response of ${method}: ${JSON.stringify(response)}`);
            for (
              let index = 0;
              index < Cypress.env(CONSTANTS.GLOBAL_API_OBJECT_LIST).length;
              index++
            ) {
              if (Cypress.env(CONSTANTS.GLOBAL_API_OBJECT_LIST)[index].apiName == method) {
                Cypress.env(CONSTANTS.GLOBAL_API_OBJECT_LIST)[index].response = response;
              }
            }
            //create new api object to push to global list
          });
        }
      });
    });
  }
);
