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

      fireLog.info(
        'Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(params)
      );
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
              fireLog
                .info(`NotSupported: ${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${method}`)
                .then(() => {
                  throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
                });
            }
          }

          cy.updateResponseForFCS(method, params, response).then((updatedResponse) => {
            // Create a deep copy to avoid reference mutation
            const dataToBeCensored = _.cloneDeep(response);

            // Call the 'censorData' command to hide sensitive data
            cy.censorData(method, dataToBeCensored).then((maskedResult) => {
              fireLog.info(`Response from Firebolt platform: ${JSON.stringify(maskedResult)}`);
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
          fireLog.info(`${CONSTANTS.PLATFORM_INVALID_RESPONSE_LOG} - ${response}`);
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

      fireLog.info(`Call from ${appId}, method: ${method} params: ${JSON.stringify(param)}`);
      if (Cypress.env('isRpcOnlyValidation')) {
        fireLog.info(
          `${method} response will be retrieved in subsequent steps and validated when the rpc-only methods are invoked. Proceeding to the next step.`
        );
      }

      // Adding additional details to created intent if any platform specific data is present in configModule.
      cy.runIntentAddon(CONSTANTS.TASK.CALLMETHOD, intentMessage).then((parsedIntent) => {
        const requestTopic = UTILS.getTopic(appId);
        const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);

        // Sending message to 3rd party app.
        cy.sendMessagetoApp(requestTopic, responseTopic, parsedIntent).then((result) => {
          if (!Cypress.env('isRpcOnlyValidation')) {
            if (result === CONSTANTS.NO_RESPONSE) {
              assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
            }

            result = JSON.parse(result);

            // Create a deep copy to avoid reference mutation
            const dataToBeCensored = _.cloneDeep(result.report.apiResponse);

            // Call the 'censorData' command to hide sensitive data
            cy.censorData(method, dataToBeCensored).then((maskedResult) => {
              fireLog.info(`Response from ${appId}: ${JSON.stringify(maskedResult)}`);
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
          }
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

      fireLog.info(
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
          fireLog.info(
            `Response from ${appId}: ${JSON.stringify(result.report.eventListenerResponse)}`
          );

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
      fireLog.info(
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
              assert(false, `${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${event}`);
            } else {
              fireLog
                .assert(`NotSupported: ${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${event}`)
                .then(() => {
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
            fireLog.info('Response from Firebolt platform: ' + JSON.stringify(response));
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
          fireLog.info(`${CONSTANTS.PLATFORM_INVALID_RESPONSE_LOG} - ${response}`);
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

        fireLog.info(
          'Call from 1st party App, method: ' + method + ' params: ' + JSON.stringify(params)
        );
        cy.sendMessagetoPlatforms(requestMap).then((result) => {
          fireLog.info('Response from Firebolt platform: ' + JSON.stringify(result));
        });
      } else {
        const appId = item.appId ? item.appId : Cypress.env(CONSTANTS.THIRD_PARTY_APP_ID);
        const requestTopic = UTILS.getTopic(appId);
        const responseTopic = UTILS.getTopic(appId, CONSTANTS.SUBSCRIBE);
        const params = { event: item.event };
        const intentMessage = UTILS.createIntentMessage(CONSTANTS.TASK.CLEAREVENTHANDLER, params);

        // Sending message to 3rd party app.
        cy.sendMessagetoApp(requestTopic, responseTopic, intentMessage).then((result) => {
          fireLog.info(
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
    cy.fireboltDataParser(key).then((parsedDataArr) => {
      parsedDataArr.forEach((parsedData) => {
        const method = parsedData.method;
        const param = parsedData.params;
        const context = parsedData.context;
        const action = parsedData.action;
        const expected = parsedData.expected;

        const appId = UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID);

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
          // Sending message to first party app.
          cy.sendMessagetoPlatforms(requestMap).then((response) => {
            cy.log('Response from Firebolt platform: ' + JSON.stringify(response));
            if (response === CONSTANTS.RESPONSE_NOT_FOUND) {
              cy.log(CONSTANTS.NO_MATCHED_RESPONSE).then(() => {
                assert(false, CONSTANTS.NO_MATCHED_RESPONSE);
              });
            }
            // saving the correlationId of rpc-only methods
            if (Cypress.env(CONSTANTS.IS_RPC_ONLY)) {
              cy.log(`correlationId - ${response.result.correlationId}`);
              Cypress.env(CONSTANTS.CORRELATIONID, response.result.correlationId);
            }
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
            cy.log(`${method} response from ${appId}: ${JSON.stringify(response)}`);
            if (typeof response == 'string') {
              response = JSON.parse(response);
            }
            // create new api object to push to global list
            const apiAppObject = new apiObject(
              method,
              param,
              context,
              response.report,
              expected,
              appId
            );
            UTILS.getEnvVariable(CONSTANTS.GLOBAL_API_OBJECT_LIST).push(apiAppObject);
          });
        }
      });
    });
  }
);

/**
 * @function User triggers event with value '{}}'
 * @description sending message to platform to make post call to set values.
 * @param {String} key - Name of event to be called.
 * @example
 * And User triggers event with value as ' DEVICE_ONHDCPCHANGED_EVENTS'
 */
Given(/User triggers event with value as '(.+)'/, (key) => {
  fireLog.info(CONSTANTS.STEP_DEFINITION_NEEDS_TO_IMPLEMENT).then(() => {
    throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
  });
});

/**
 * @module fireboltCalls
 * @function 1st party app invokes the '(.+)' API (?:'(.+)' )?to set '(.+)' to( invalid)? '(.+)'
 * @description Sending a message to platform to set a value
 * @param {String} sdk - sdk name.
 * @param {String} fireboltCallKey - key name passed to look for firebolt call object in fireboltCallData.
 * @param {String} attribute - The attribute to which the value is going to be set (ex. fontFamily).
 * @param {String} invalidValue - Determines whether expecting for an error or result.
 * @param {String} value - The value used by the set method to set the value (ex. monospaced_sanserif)
 * @example
 * Given '1st party app' invokes the 'Firebolt' API 'CLOSEDCAPTION_SETTINGS' to set 'enable' to 'true'
 * Given '1st party app' invokes the 'Firebolt' API 'CLOSEDCAPTION_SETTINGS' to set 'enable' to invalid 'test'
 * Given '1st party app' invokes the 'Firebolt' API to set 'enable' to 'true'
 */
Given(
  /1st party app invokes the '(.+)' API (?:'(.+)' )?to set '(.+)' to( invalid)? '(.+)'$/,
  async (sdk, fireboltCallKey, attribute, invalidValue, value) => {
    if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
      value = UTILS.parseValue(value);
      let fireboltCallObject;
      let fireboltCallObjectErrorMessage = CONSTANTS.NO_DATA_FOR_THE_KEY + fireboltCallKey;

      // runtime environment variable holds attribute and value
      Cypress.env('runtime', {
        attribute: attribute,
        value: value,
      });

      // When fireboltCall object key passed fetching the object from the fireboltCalls data else reading it from environment variable
      if (fireboltCallKey) {
        cy.getFireboltData(fireboltCallKey).then((fireboltData) => {
          fireboltCallObject = fireboltData;
          UTILS.getEnvVariable('runtime').fireboltCall = fireboltData;
        });
      } else {
        fireboltCallObject = UTILS.getEnvVariable('runtime').fireboltCall;
        fireboltCallObjectErrorMessage =
          'Unable to find the firebolt object in the runtime environment variable';
      }

      cy.then(() => {
        // Failing the test when fireboltCall object not there
        if (!fireboltCallObject) {
          fireLog.assert(false, fireboltCallObjectErrorMessage);
        } else {
          let setMethod =
            typeof fireboltCallObject.setMethod === CONSTANTS.TYPE_FUNCTION
              ? fireboltCallObject.setMethod()
              : fireboltCallObject.setMethod;
          let setParams;

          // Extracting the parameter from the fireboltCall object
          if (typeof fireboltCallObject.setParams === CONSTANTS.TYPE_FUNCTION) {
            setParams = { value: fireboltCallObject.setParams() };
          } else if (typeof fireboltCallObject.setParams === CONSTANTS.TYPE_OBJECT) {
            setParams = fireboltCallObject.setParams;

            // Iterating through the object and invoking it if it is a function
            for (const key in setParams) {
              if (typeof setParams[key] === CONSTANTS.TYPE_FUNCTION) {
                setParams[key] = setParams[key]();
              }
            }
          } else {
            setParams = { value: fireboltCallObject.setParams };
          }

          const context = {};
          const expected = invalidValue ? 'error' : 'result';
          const appId = Cypress.env(CONSTANTS.FIRST_PARTY_APPID);
          let action = CONSTANTS.ACTION_CORE.toLowerCase();

          // Splitting the method name if it contains an underscore and using the first part to determine the action that decides sdk.
          if (setMethod && setMethod.includes('_')) {
            action = setMethod.split('_')[0];
            setMethod = setMethod.split('_')[1];
          }

          // If method and params are not supported setting isScenarioExempted as true for further validation.
          if (UTILS.isScenarioExempted(setMethod, setParams)) {
            Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
          }
          const requestMap = {
            method: setMethod,
            params: setParams,
            action: action,
          };

          cy.log(
            'Call from 1st party App, method: ' +
              setMethod +
              ' params: ' +
              JSON.stringify(setParams)
          );
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
                  assert(false, `${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${setMethod}`);
                } else {
                  cy.log(`NotSupported: ${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${setMethod}`).then(
                    () => {
                      throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
                    }
                  );
                }
              }

              cy.updateResponseForFCS(setMethod, setParams, response).then((updatedResponse) => {
                // Create a deep copy to avoid reference mutation
                const dataToBeCensored = _.cloneDeep(response);

                // Call the 'censorData' command to hide sensitive data
                cy.censorData(setMethod, dataToBeCensored).then((maskedResult) => {
                  cy.log(`Response from Firebolt platform: ${JSON.stringify(maskedResult)}`);
                });

                // Creating object with method name, params, and response etc and storing it in a global list for further validation.
                const apiAppObject = new apiObject(
                  setMethod,
                  setParams,
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
        }
      });
    } else {
      fireLog.assert(false, `${sdk} SDK not Supported`);
    }
  }
);

/**
 * @module fireboltCalls
 * @function '(.+)' registers for the '(.*?)'(?: '(.*?)')? event
 * @description Sending a message to platform or app to register a event
 * @param {String} appId - app identtifier.
 * @param {String} sdk - sdk name.
 * @param {String} fireboltCallKey - key name passed to look for firebolt call object in fireboltCallData.
 * @example
 * And '1st party app' registers for the 'Firebolt' 'CLOSEDCAPTION_SETTINGS' event
 * And '3rd party app' registers for the 'Firebolt' 'CLOSEDCAPTION_SETTINGS' event
 * And '1st party app' registers for the 'Firebolt' event
 */
Given(
  /'(.+)' registers for the '(.*?)'(?: '(.*?)')? event$/,
  async (appId, sdk, fireboltCallKey) => {
    if (CONSTANTS.SUPPORTED_SDK.includes(sdk)) {
      let fireboltCallObject;
      let fireboltCallObjectErrorMessage = CONSTANTS.NO_DATA_FOR_THE_KEY + fireboltCallKey;

      // Creating runtime environment variable
      if (!UTILS.getEnvVariable('runtime', false)) {
        Cypress.env('runtime', {});
      }

      // When fireboltCall object key passed fetching the object from the fireboltCalls data else reading it from environment variable
      // TODO: appending the firebolt object will take care in optimization ticket
      if (fireboltCallKey) {
        cy.getFireboltData(fireboltCallKey).then((fireboltData) => {
          fireboltCallObject = fireboltData;
          UTILS.getEnvVariable('runtime').fireboltCall = fireboltData;
        });
      } else {
        fireboltCallObject = UTILS.getEnvVariable('runtime').fireboltCall;
        fireboltCallObjectErrorMessage =
          'Unable to find the firebolt object in the runtime environment variable';
      }

      cy.then(() => {
        // Failing the test when fireboltCall object not there
        if (!fireboltCallObject) {
          fireLog.assert(false, fireboltCallObjectErrorMessage);
        } else {
          let event =
            typeof fireboltCallObject.event === CONSTANTS.TYPE_FUNCTION
              ? fireboltCallObject.event()
              : fireboltCallObject.event;
          const eventParams = {};
          const context = {};
          appId =
            appId === CONSTANTS.THIRD_PARTY_APP
              ? UTILS.getEnvVariable(CONSTANTS.THIRD_PARTY_APP_ID)
              : appId === CONSTANTS.FIRST_PARTY_APP
                ? Cypress.env(CONSTANTS.FIRST_PARTY_APPID)
                : appId;
          let action = CONSTANTS.ACTION_CORE.toLowerCase();

          // Splitting the method name if it contains an underscore and using the first part to determine the action that decides sdk.
          if (event && event.includes('_')) {
            action = setMethod.split('_')[0];
            event = event.split('_')[1];
          }

          // If event and params are not supported setting isScenarioExempted as true for further validation.
          if (UTILS.isScenarioExempted(event, eventParams)) {
            Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
          }
          if (appId == UTILS.getEnvVariable(CONSTANTS.FIRST_PARTY_APPID)) {
            const requestMap = {
              method: event,
              params: eventParams,
              action: action,
              task: CONSTANTS.TASK.REGISTEREVENT,
            };

            // Assigning event_param env if param has empty object
            if (Object.keys(requestMap.params).length === 0) {
              // To Do :debug event_param issue by passing isrequired as false for getEnvVariable,need to debug further
              requestMap.params = UTILS.getEnvVariable(CONSTANTS.EVENT_PARAM, false);
            }
            fireLog.info(
              `Registering for the ${event} event using 1st party App with params : ${JSON.stringify(
                eventParams
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
                    assert(false, `${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${event}`);
                  } else {
                    fireLog
                      .assert(`NotSupported: ${CONSTANTS.PLATFORM_NOT_SUPPORT_LOG}: ${event}`)
                      .then(() => {
                        throw new Error(CONSTANTS.STEP_IMPLEMENTATION_MISSING);
                      });
                  }
                } else if (response && response.error && response.error.message) {
                  assert(
                    false,
                    `Event registration failed for event ${event} with error message: ${response.error.message} `
                  );
                }

                cy.updateResponseForFCS(event, eventParams, response).then((updatedResponse) => {
                  fireLog.info('Response from Firebolt platform: ' + JSON.stringify(response));
                  // If event and params are not supported setting isScenarioExempted as true for further validation.
                  if (UTILS.isScenarioExempted(event, eventParams)) {
                    Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
                  }

                  // Creating object with event name, params and response etc and storing it in a global list for further validation.
                  const eventAppObject = new eventObject(
                    event,
                    eventParams,
                    context,
                    updatedResponse,
                    appId
                  );
                  UTILS.getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).push(eventAppObject);
                });
              } else {
                fireLog.info(`${CONSTANTS.PLATFORM_INVALID_RESPONSE_LOG} - ${response}`);
              }
            });
          } else {
            let isNotSupportedApi = false;

            if (UTILS.isScenarioExempted(event, eventParams)) {
              isNotSupportedApi = true;
            }

            const communicationMode = UTILS.getCommunicationMode();
            const additionalParams = {
              communicationMode: communicationMode,
              action: action,
              isNotSupportedApi: isNotSupportedApi,
            };
            const params = { event: event, params: eventParams };

            // Creating intent message using above details to send it to 3rd party app.
            const intentMessage = UTILS.createIntentMessage(
              CONSTANTS.TASK.REGISTEREVENT,
              params,
              additionalParams
            );

            fireLog.info(
              `Registering for the ${event} event using ${appId} with params : ${JSON.stringify(eventParams)}`
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
                fireLog.info(
                  `Response from ${appId}: ${JSON.stringify(result.report.eventListenerResponse)}`
                );

                // If event and params are not supported setting isScenarioExempted as true for further validation.
                if (UTILS.isScenarioExempted(event, eventParams)) {
                  Cypress.env(CONSTANTS.IS_SCENARIO_EXEMPTED, true);
                }

                // Creating object with event name, params and response etc and storing it in a global list for further validation.
                const eventAppObject = new eventObject(
                  event,
                  eventParams,
                  context,
                  result.report,
                  appId
                );
                UTILS.getEnvVariable(CONSTANTS.GLOBAL_EVENT_OBJECT_LIST).push(eventAppObject);
              });
            });
          }
        }
      });
    } else {
      fireLog.assert(false, `${sdk} SDK not Supported`);
    }
  }
);